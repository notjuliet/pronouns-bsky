import "dotenv/config";

export const DID = process.env.DID ?? "";
export const SIGNING_KEY = process.env.SIGNING_KEY ?? "";
export const PORT = 4002;
export const URL = process.env.URL ?? "wss://jetstream.atproto.tools/subscribe";
