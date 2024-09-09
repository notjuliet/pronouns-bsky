import { label } from "./label.js";
import { DID, RELAY } from "./constants.js";
import { EventStream } from "./types.js";
import fs from "node:fs";
import WebSocket from "ws";

const subscribe = async () => {
  let cursor = 0;
  let intervalID: NodeJS.Timeout;
  const cursorFile = fs.readFileSync("cursor.txt", "utf8");

  const relay = cursorFile ? RELAY.concat("&cursor=", cursorFile) : RELAY;
  if (cursorFile) console.log(`Initiate firehose at cursor ${cursorFile}`);
  const ws = new WebSocket(relay);

  ws.on("error", (err) => console.error(err));

  ws.on("open", () => {
    intervalID = setInterval(() => {
      console.log(`${new Date().toISOString()}: ${cursor}`);
      fs.writeFile("cursor.txt", cursor.toString(), (err) => console.log(err));
    }, 60000);
  });

  ws.on("close", () => {
    clearInterval(intervalID);
  });

  ws.on("message", (data) => {
    const event: EventStream = JSON.parse(data.toString());
    cursor = event.time_us;
    if (
      event.commit?.record?.subject?.uri?.includes(DID + "/app.bsky.feed.post")
    ) {
      label(event.did, event.commit.record.subject.uri.split("/").pop()!);
    }
  });
};

subscribe();
