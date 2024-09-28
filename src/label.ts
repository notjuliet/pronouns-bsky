import { DID, PORT, SIGNING_KEY } from "./constants.js";
import { LabelerServer } from "@skyware/labeler";

const server = new LabelerServer({ did: DID, signingKey: SIGNING_KEY });

server.start(PORT, (error, address) => {
  if (error) console.error(error);
  else console.log(`Labeler server listening on ${address}`);
});

export const labelVideo = (uri: string) => {
  server
    .createLabel({ uri: uri, val: "video" })
    .catch((err) => console.log(err))
    .then(() => console.log(`${new Date().toISOString()}: Labeled ${uri}`));
};
