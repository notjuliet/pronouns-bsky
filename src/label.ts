import { AppBskyActorDefs } from "@atproto/api";
import { DID, PRONOUNS, SIGNING_KEY, URIs } from "./constants.js";
import { LabelerServer } from "@skyware/labeler";
import { getAgent } from "./agent.js";

const server = new LabelerServer({ did: DID, signingKey: SIGNING_KEY });
const agent = await getAgent();

server.start(4001, (error, address) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Labeler server listening on ${address}`);
  }
});

export const label = async (
  subject: string | AppBskyActorDefs.ProfileView,
  uri: string,
) => {
  const did = AppBskyActorDefs.isProfileView(subject) ? subject.did : subject;
  const labels = await agent.com.atproto.label
    .queryLabels({ sources: [server.did], uriPatterns: [did] })
    .catch((err) => {
      console.log(err);
    });
  if (!labels) return;

  const post = URIs[uri];

  if (post?.includes("Like this post to delete")) {
    await server
      .createLabels(
        { uri: did },
        { negate: labels.data.labels.map((label) => label.val) },
      )
      .catch((err) => {
        console.log(err);
      })
      .then(() => console.log(`Deleted labels for ${did}`));
  } else if (labels.data.labels.length < 4 && PRONOUNS[post]) {
    await server
      .createLabel({
        src: server.did,
        uri: did,
        val: PRONOUNS[post],
        cts: new Date().toISOString(),
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => console.log(`Labeled ${did} with ${post}`));
  }
};
