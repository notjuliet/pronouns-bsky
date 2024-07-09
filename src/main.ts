import { AppBskyFeedLike } from "@atproto/api";
import { Firehose } from "@skyware/firehose";
import { getAgent } from "./agent.js";
import { label } from "./label.js";
import { DID } from "./constants.js";
import "dotenv/config";

const subscribe = async () => {
  const agent = await getAgent();

  // add firehose cursor save
  const firehose = new Firehose();

  firehose.on("error", ({ cursor }) => {
    agent.api.chat.bsky.convo.sendMessage(
      {
        convoId: process.env.CONVO_ID ?? "",
        message: {
          text: `Firehose errored on cursor: ${cursor}`,
        },
      },
      {
        encoding: "application/json",
        headers: {
          "atproto-proxy": "did:web:api.bsky.chat#bsky_chat",
        },
      },
    );
  });

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
