import { AppBskyFeedLike } from "@atproto/api";
import { Firehose } from "@skyware/firehose";
import { getAgent } from "./agent.js";
import { label } from "./label.js";
import { DID } from "./constants.js";

const subscribe = async () => {
  const agent = await getAgent();

  // add firehose cursor save
  const firehose = new Firehose({ cursor: "759165458" });
  firehose.on("commit", (commit) => {
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
