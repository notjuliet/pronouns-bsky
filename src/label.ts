import { did, getAgent } from "./agent.js";
import { AppBskyFeedPost, BskyAgent } from "@atproto/api";
import { PRONOUNS } from "./constants.js";

const getPostContent = async (agent: BskyAgent, uri: string) => {
  return await agent
    .getPosts({ uris: [uri] })
    .catch((err) => {
      console.error(err.message);
    })
    .then((posts) => {
      if (posts && AppBskyFeedPost.isRecord(posts.data.posts[0].record))
        return posts.data.posts[0].record.text;
      else return "";
    });
};

export const label = async (subject: string, uri: string) => {
  const agent = await getAgent();

  const repo = await agent
    .withProxy("atproto_labeler", did)
    .api.tools.ozone.moderation.getRepo({ did: subject });

  const post = await getPostContent(agent, uri);

  if (repo.data.labels && post.includes("Like this post to delete")) {
    await agent
      .withProxy("atproto_labeler", did)
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
      .withProxy("atproto_labeler", did)
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
      });
  }
};
