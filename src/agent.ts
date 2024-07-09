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

export const did = await getAgent().then((agent) => agent.session!.did);

BskyAgent.configure({
  appLabelers: [did],
});
