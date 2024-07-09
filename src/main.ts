import { AppBskyFeedLike } from "@atproto/api";
import { Firehose } from "@skyware/firehose";
import { did, getAgent } from "./agent.js";
import { label } from "./label.js";

const subscribe = async () => {
  const agent = await getAgent();

  const firehose = new Firehose();
  firehose.on("commit", (commit) => {
    for (const op of commit.ops) {
      if (op.action === "delete") continue;
      if (AppBskyFeedLike.isRecord(op.record)) {
        if (op.record.subject.uri.includes(did)) {
          if (op.record.subject.uri.includes("app.bsky.feed.post")) {
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
