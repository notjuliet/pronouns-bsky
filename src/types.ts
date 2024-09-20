export interface LikeRecord {
  $type: string;
  createdAt: string;
  subject: {
    cid: string;
    uri: string;
  };
}

export interface Label {
  ver?: number;
  src: string;
  uri: string;
  cid?: string;
  val: string;
  neg?: boolean;
  cts: string;
  exp?: string;
  sig?: Uint8Array;
  [k: string]: unknown;
}
