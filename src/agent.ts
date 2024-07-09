import { BskyAgent } from "@atproto/api";
import "dotenv/config";

export const getAgent = async () => {
  const agent = new BskyAgent({
    service: process.env.BSKY_SERVICE ?? "https://bsky.social",
  });

  await agent.login({
    identifier: process.env.BSKY_IDENTIFIER!,
    password: process.env.BSKY_PASSWORD!,
  });

  return agent;
};

BskyAgent.configure({
  appLabelers: [process.env.DID ?? ""],
});
