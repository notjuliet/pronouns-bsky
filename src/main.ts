import { AppBskyFeedLike } from "@atproto/api";
import { Firehose } from "@skyware/firehose";
import { getAgent } from "./agent.js";
import { label } from "./label.js";
import { DID } from "./constants.js";
import "dotenv/config";

const subscribe = async () => {
  const agent = await getAgent();

  console.log(`Logged in as: ${agent.session?.handle}`);

  let cursorSave = 0;

  // TODO: save cursor to a file
  const firehose = new Firehose({ cursor: "762474730" });

  firehose.on("error", ({ cursor }) => {
    console.log(`Firehose errored on cursor: ${cursor}`);
  });

  let count = 0;

  firehose.on("commit", (commit) => {
    // cursorSave = commit.seq;

    if (count === 0) {
      console.log("Trying to run ...");
      commit.ops.forEach(async (op) => {
        if (op.action !== "delete" && AppBskyFeedLike.isRecord(op.record)) {
          // if ((op.record.subject.uri ?? "").includes(DID)) {
          //   if ((op.record.subject.uri ?? "").includes("app.bsky.feed.post")) {
          label(agent, commit.repo, op.record.subject.uri).catch((err) =>
            console.error(err)
          );
          //   }
          // }
        }
      });
    }

    count++;
  });

  firehose.start();
};

subscribe();
