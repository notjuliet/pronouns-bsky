import { label } from "./label.js";
import { DID, URL } from "./constants.js";
import fs from "node:fs";
import { Jetstream } from "@skyware/jetstream";
import { AppBskyFeedLike } from "@atcute/client/lexicons";

let intervalID: NodeJS.Timeout;
const cursorFile = fs.readFileSync("cursor.txt", "utf8");
if (cursorFile) console.log(`Initiate firehose at cursor ${cursorFile}`);

const jetstream = new Jetstream({
  endpoint: URL,
  wantedCollections: ["app.bsky.feed.like"],
  cursor: cursorFile ?? 0,
});

jetstream.on("open", () => {
  intervalID = setInterval(() => {
    if (jetstream.cursor) {
      fs.writeFile("cursor.txt", jetstream.cursor.toString(), (err) => {
        if (err) console.log(err);
      });
    }
  }, 60000);
});

jetstream.on("error", (err) => console.error(err));

jetstream.on("close", () => clearInterval(intervalID));

jetstream.onCreate("app.bsky.feed.like", (event) => {
  const record = event.commit.record as AppBskyFeedLike.Record;
  if (record.subject?.uri?.includes(`${DID}/app.bsky.feed.post`))
    label(event.did, record.subject.uri.split("/").pop()!);
});

jetstream.start();
