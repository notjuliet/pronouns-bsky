import "dotenv/config";

export const PRONOUNS: Record<string, string> = {
  "she/her": "she",
  "he/him": "he",
  "they/them": "they",
  "it/its": "it",
  "any/all": "any",
  ask: "ask",
  avoid: "avoid",
  "look at bio": "bio",
};

export const URIs: Record<string, string> = {
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwsqucto3j2a":
    "Like this post to delete your labels",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwss4ldkwd2j":
    "they/them",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwss4fmiow2n":
    "it/its",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwss4bzqlw2k":
    "he/him",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwss45mxrh2j":
    "she/her",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwst2tn2342f":
    "look at bio",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwsslg3gqk2t":
    "avoid",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwssldhzme27":
    "ask",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwss4vc4cw2x":
    "any/all",
};

export const DID = process.env.DID ?? "";
