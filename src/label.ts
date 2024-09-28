import { ComAtprotoLabelDefs } from "@atcute/client/lexicons";
import {
  DID,
  PORT,
  LABEL_LIMIT,
  POSTS,
  SIGNING_KEY,
  DELETE,
} from "./constants.js";
import { LabelerServer } from "@skyware/labeler";

const server = new LabelerServer({ did: DID, signingKey: SIGNING_KEY });

server.start(PORT, (error, address) => {
  if (error) console.error(error);
  else console.log(`Labeler server listening on ${address}`);
});

export const label = (did: string, rkey: string) => {
  const query = server.db
    .prepare<
      unknown[],
      ComAtprotoLabelDefs.Label
    >(`SELECT * FROM labels WHERE uri = ?`)
    .all(did);

  const labels = query.reduce((set, label) => {
    if (!label.neg) set.add(label.val);
    else set.delete(label.val);
    return set;
  }, new Set<string>());

  const time = new Date().toISOString();

  if (rkey.includes(DELETE)) {
    server
      .createLabels({ uri: did }, { negate: [...labels] })
      .catch((err) => console.log(err))
      .then(() => console.log(`${time}: Deleted labels for ${did}`));
  } else if (labels.size < LABEL_LIMIT && POSTS[rkey]) {
    server
      .createLabel({ uri: did, val: POSTS[rkey] })
      .catch((err) => console.log(err))
      .then(() => console.log(`${time}: Labeled ${did} with ${POSTS[rkey]}`));
  }
};
