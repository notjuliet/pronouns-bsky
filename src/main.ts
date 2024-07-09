import { AppBskyFeedLike } from "@atproto/api";
import { Firehose } from "@skyware/firehose";
import { getAgent } from "./agent.js";
import { label } from "./label.js";
import { DID } from "./constants.js";
import "dotenv/config";

const subscribe = async () => {
  const agent = await getAgent();
  let cursorSave = 0;

  // add firehose cursor save
  //const firehose = new Firehose({ cursor: "760303563" });
  const firehose = new Firehose();

  firehose.on("error", async ({ cursor }) => {
    console.log(`Firehose errored on cursor: ${cursor}`);
  });

  firehose.on("open", () => {
    setInterval(() => {
      console.log(`cursor: ${cursorSave}`);
    }, 60000);
  });

  firehose.on("commit", (commit) => {
    cursorSave = commit.seq;
    for (const op of commit.ops) {
      if (op.action === "delete") continue;
      if (AppBskyFeedLike.isRecord(op.record)) {
        if ((op.record.subject.uri ?? "").includes(DID)) {
          if ((op.record.subject.uri ?? "").includes("app.bsky.feed.post")) {
            label(agent, commit.repo, op.record.subject.uri).catch((err) =>
              console.error(err),
            );
          }
        }
      }
    }
  });

  firehose.start();
};

subscribe();
