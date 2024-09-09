import {
  DID,
  PORT,
  LABEL_LIMIT,
  POSTS,
  SIGNING_KEY,
  DELETE,
} from "./constants.js";
import { Label } from "./types.js";
import { LabelerServer } from "@skyware/labeler";

const server = new LabelerServer({ did: DID, signingKey: SIGNING_KEY });

server.start(PORT, (error, address) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Labeler server listening on ${address}`);
  }
});

export const label = async (did: string, rkey: string) => {
  const query = server.db
    .prepare<unknown[], Label>(`SELECT * FROM labels WHERE uri = ?`)
    .all(did);

  const labels = query.reduce((set, label) => {
    if (!label.neg) set.add(label.val);
    else set.delete(label.val);
    return set;
  }, new Set<string>());

  const timestamp = new Date().toISOString();

  if (rkey.includes(DELETE)) {
    await server
      .createLabels({ uri: did }, { negate: [...labels] })
      .catch((err) => {
        console.log(err);
      })
      .then(() => console.log(`${timestamp}: Deleted labels for ${did}`));
  } else if (labels.size < LABEL_LIMIT && POSTS[rkey]) {
    await server
      .createLabel({ uri: did, val: POSTS[rkey] })
      .catch((err) => {
        console.log(err);
      })
      .then(() =>
        console.log(`${timestamp}: Labeled ${did} with ${POSTS[rkey]}`),
      );
  }
};
