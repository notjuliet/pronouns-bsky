import { ComAtprotoLabelDefs } from "@atcute/client/lexicons";
import { DID, PORT, MAXLABELS, POSTS, SIGN_KEY, DELETE } from "./constants.js";
import { LabelerServer } from "@skyware/labeler";

const server = new LabelerServer({ did: DID, signingKey: SIGN_KEY });
server.start(PORT, (error, address) => {
  if (error) console.error(error);
  else console.log(`Labeler server listening on ${address}`);
});

export const label = (did: string, rkey: string) => {
  const query = server.db
    .prepare<string[]>(`SELECT * FROM labels WHERE uri = ?`)
    .all(did) as ComAtprotoLabelDefs.Label[];

  const labels = query.reduce((set, label) => {
    if (!label.neg) set.add(label.val);
    else set.delete(label.val);
    return set;
  }, new Set<string>());

  try {
    if (rkey.includes(DELETE)) {
      server.createLabels({ uri: did }, { negate: [...labels] });
      console.log(`${new Date().toISOString()} Deleted labels: ${did}`);
    } else if (labels.size < MAXLABELS && POSTS[rkey]) {
      server.createLabel({ uri: did, val: POSTS[rkey] });
      console.log(`${new Date().toISOString()} Labeled ${did}: ${POSTS[rkey]}`);
    }
  } catch (err) {
    console.error(err);
  }
};
