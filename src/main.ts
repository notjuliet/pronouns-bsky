import { labelVideo } from "./label.js";
import { URL } from "./constants.js";
import { Jetstream } from "@skyware/jetstream";

const jetstream = new Jetstream({
  endpoint: URL,
  wantedCollections: ["app.bsky.feed.post"],
});

jetstream.on("error", (err) => console.error(err));

jetstream.onCreate("app.bsky.feed.post", (event) => {
  if (
    event.commit.record.embed?.$type === "app.bsky.embed.video" ||
    (event.commit.record.embed?.$type === "app.bsky.embed.recordWithMedia" &&
      event.commit.record.embed.media.$type === "app.bsky.embed.video")
  )
    labelVideo(
      `at://${event.did}/${event.commit.collection}/${event.commit.rkey}`,
    );
});

jetstream.start();
