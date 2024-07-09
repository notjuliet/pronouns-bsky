import { BskyAgent } from "@atproto/api";
import { DID, PRONOUNS, URIs } from "./constants.js";

export const label = async (agent: BskyAgent, subject: string, uri: string) => {
  const repo = await agent
    .withProxy("atproto_labeler", DID)
    .api.tools.ozone.moderation.getRepo({ did: subject });

  const post = URIs[uri];

  if (repo.data.labels && (post ?? "").includes("Like this post to delete")) {
    await agent
      .withProxy("atproto_labeler", DID)
      .api.tools.ozone.moderation.emitEvent({
        event: {
          $type: "tools.ozone.moderation.defs#modEventLabel",
          createLabelVals: [],
          negateLabelVals: repo.data.labels.map((label) => label.val),
        },
        subject: {
          $type: "com.atproto.admin.defs#repoRef",
          did: subject,
        },
        createdBy: agent.session!.did,
        createdAt: new Date().toISOString(),
        subjectBlobCids: [],
      });
    return;
  }

  if (repo.data.labels && repo.data.labels.length >= 4) return;

  if (PRONOUNS[post]) {
    await agent
      .withProxy("atproto_labeler", DID)
      .api.tools.ozone.moderation.emitEvent({
        event: {
          $type: "tools.ozone.moderation.defs#modEventLabel",
          createLabelVals: [PRONOUNS[post]],
          negateLabelVals: [],
        },
        subject: {
          $type: "com.atproto.admin.defs#repoRef",
          did: subject,
        },
        createdBy: agent.session!.did,
        createdAt: new Date().toISOString(),
        subjectBlobCids: [],
      })
      .then(() => console.log(`Labeled ${subject} with ${post}`));
  }
};
