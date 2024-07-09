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
  "fae/faer": "fae",
  "bun/buns": "bun",
  "xe/xir": "xe",
  "drae/draer": "drae",
  "e/em/eir": "e",
  "sier/siehn/siere": "sier",
  "ey/em/eir": "ey",
  "shey/sheir/sher": "shey",
  "voi/void": "voi",
  "mew/mews": "mew",
  "paw/paws": "paw",
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
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu55hxj4b2a":
    "fae/faer",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu5d6rq352v":
    "bun/buns",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu5s4lt6f2k":
    "xe/xir",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu5sjyg4m2f":
    "drae/draer",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu5stootb2q":
    "e/em/eir",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu5taglmr2q":
    "sier/siehn/siere",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu6b3cnd52k":
    "ey/em/eir",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwu7n26cgm2m":
    "shey/sheir/sher",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwue4lqwjb2q":
    "voi/void",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwueewr2p22j":
    "mew/mews",
  "at://did:plc:wkoofae5uytcm7bjncmev6n6/app.bsky.feed.post/3kwukwwz4nt2j":
    "paw/paws",
};

export const DID = process.env.DID ?? "";
