import { AppBskyFeedLike } from "@atproto/api";
import { Firehose } from "@skyware/firehose";
import { getAgent } from "./agent.js";
import { label } from "./label.js";
import { DID, SIGNING_KEY } from "./constants.js";
import fs from "node:fs";
import { LabelerServer } from "@skyware/labeler";

const server = new LabelerServer({ did: DID, signingKey: SIGNING_KEY });

server.start(4001, (error, address) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Labeler server listening on ${address}`);
  }
});

const subscribe = async () => {
  const agent = await getAgent();

  let cursorFirehose = 0;
  const cursorFile = fs.readFileSync("cursor.txt", "utf8");

  const firehose = new Firehose({ cursor: cursorFile ?? "" });
  if (cursorFile) console.log(`Initiate firehose at cursor ${cursorFile}`);

  firehose.on("error", ({ cursor, error }) => {
    console.log(`Firehose errored on cursor: ${cursor}`, error);
  });

  firehose.on("open", () => {
    setInterval(() => {
      const timestamp = new Date().toISOString();
      console.log(`${timestamp} cursor: ${cursorFirehose}`);
      fs.writeFile("cursor.txt", cursorFirehose.toString(), (err) => {
        if (err) console.error(err);
      });
    }, 60000);
  });

  firehose.on("commit", async (commit) => {
    cursorFirehose = commit.seq;
    commit.ops.forEach(async (op) => {
      if (op.action !== "delete" && AppBskyFeedLike.isRecord(op.record)) {
        if ((op.record.subject.uri ?? "").includes(DID)) {
          if ((op.record.subject.uri ?? "").includes("app.bsky.feed.post")) {
            await label(agent, commit.repo, op.record.subject.uri).catch(
              (err) => console.error(err),
            );
          }
        }
      }
    });
  });

  firehose.start();
};

subscribe();
