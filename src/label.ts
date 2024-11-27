import { DID, PORT, MAXLABELS, POSTS, SIGN_KEY, DELETE } from "./constants.js";
import { LabelerServer } from "@skyware/labeler";

const server = new LabelerServer({ did: DID, signingKey: SIGN_KEY });
server.start(PORT, (error, address) => {
  if (error) console.error(error);
  else console.log(`Labeler server listening on ${address}`);
});

export const label = async (did: string, rkey: string) => {
  const query = await server.db.execute({
    sql: "SELECT val, neg FROM labels WHERE uri = ?",
    args: [did],
  });

  const labels = query.rows.reduce((set, label) => {
    if (!label.neg) set.add(label.val!.toString());
    else set.delete(label.val!.toString());
    return set;
  }, new Set<string>());

  try {
    if (rkey.includes(DELETE)) {
      await server.createLabels({ uri: did }, { negate: [...labels] });
      console.log(`${new Date().toISOString()} Deleted labels: ${did}`);
    } else if (labels.size < MAXLABELS && POSTS[rkey]) {
      await server.createLabel({ uri: did, val: POSTS[rkey] });
      console.log(`${new Date().toISOString()} Labeled ${did}: ${POSTS[rkey]}`);
    }
  } catch (err) {
    console.error(err);
  }
};
