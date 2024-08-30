import { AppBskyActorDefs, Agent } from "@atproto/api";
import { DID, PRONOUNS, URIs } from "./constants.js";

export const label = async (
  agent: Agent,
  subject: string | AppBskyActorDefs.ProfileView,
  uri: string,
) => {
  const did = AppBskyActorDefs.isProfileView(subject) ? subject.did : subject;
  const labels = await agent
    .withProxy("atproto_labeler", DID)
    .com.atproto.label.queryLabels({ sources: [DID], uriPatterns: [did] })
    .catch((err) => {
      console.log(err);
    });
  if (!labels) return;

  const post = URIs[uri];

  if (post?.includes("Like this post to delete")) {
    await agent
      .withProxy("atproto_labeler", DID)
      .tools.ozone.moderation.emitEvent({
        event: {
          $type: "tools.ozone.moderation.defs#modEventLabel",
          createLabelVals: [],
          negateLabelVals: labels.data.labels.map((label) => label.val),
        },
        subject: {
          $type: "com.atproto.admin.defs#repoRef",
          did: did,
        },
        createdBy: agent.did!,
        createdAt: new Date().toISOString(),
        subjectBlobCids: [],
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => console.log(`Deleted labels for ${did}`));
    return;
  }

  const labelCount = labels.data.labels.reduce((set, label) => {
    if (!label.neg) set.add(label.val);
    else set.delete(label.val);
    return set;
  }, new Set()).size;

  if (labelCount < 4 && PRONOUNS[post]) {
    await agent
      .withProxy("atproto_labeler", DID)
      .tools.ozone.moderation.emitEvent({
        event: {
          $type: "tools.ozone.moderation.defs#modEventLabel",
          createLabelVals: [PRONOUNS[post]],
          negateLabelVals: [],
        },
        subject: {
          $type: "com.atproto.admin.defs#repoRef",
          did: did,
        },
        createdBy: agent.did!,
        createdAt: new Date().toISOString(),
        subjectBlobCids: [],
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => console.log(`Labeled ${did} with ${post}`));
  }
};
