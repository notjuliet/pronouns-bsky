import { AppBskyActorDefs, BskyAgent } from "@atproto/api";
import { DID, PRONOUNS, URIs } from "./constants.js";

const CREATE_LABEL_VALS: string[] = [];
const NEGATE_LABEL_VALS: string[] = [];
const SUBJECT_DID = "did:plc:5zbvredb4ovf3wrcslt56czc";

export const label = async (
  agent: BskyAgent,
  subject: string | AppBskyActorDefs.ProfileView,
  uri: string
) => {
  // const did = AppBskyActorDefs.isProfileView(subject) ? subject.did : subject;
  // console.log(did);
  console.log("Trying to fetch repo ...");

  try {
    const repo = await agent
      .withProxy("atproto_labeler", DID)
      .api.tools.ozone.moderation.getRepo({
        did: SUBJECT_DID,
      });

    // const post = URIs[uri];

    // if (repo.data.labels && (post ?? "").includes("Like this post to delete")) {
    //   try {
    //     await agent
    //       .withProxy("atproto_labeler", DID)
    //       .api.tools.ozone.moderation.emitEvent({
    //         event: {
    //           $type: "tools.ozone.moderation.defs#modEventLabel",
    //           createLabelVals: [],
    //           negateLabelVals: repo.data.labels.map((label) => label.val),
    //         },
    //         subject: {
    //           $type: "com.atproto.admin.defs#repoRef",
    //           did: did,
    //         },
    //         createdBy: agent.session!.did,
    //         createdAt: new Date().toISOString(),
    //         subjectBlobCids: [],
    //       });

    //     console.log(`Deleted labels for ${did}`);
    //   } catch (err) {
    //     console.log({
    //       error: err,
    //     });
    //   }
    //   return;
    // }

    // if (repo.data.labels && repo.data.labels.length >= 4) return;

    // if (PRONOUNS[post]) {
    try {
      await agent
        .withProxy("atproto_labeler", DID)
        .api.tools.ozone.moderation.emitEvent({
          event: {
            $type: "tools.ozone.moderation.defs#modEventLabel",
            createLabelVals: CREATE_LABEL_VALS,
            negateLabelVals: NEGATE_LABEL_VALS,
          },
          subject: {
            $type: "com.atproto.admin.defs#repoRef",
            did: repo.data.did,
          },
          createdBy: agent.session!.did,
          createdAt: new Date().toISOString(),
          subjectBlobCids: [],
        });
      console.log(`Labeled ${repo.data.did} with ask`);
    } catch (err) {
      console.log({
        error: err,
      });
    }
    // }
  } catch (err) {
    console.log(err);
  }

  console.log("Finished run ...");
};
