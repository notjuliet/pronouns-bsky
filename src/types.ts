export interface EventStream {
  did: string;
  time_us: number;
  type: string;
  commit: Commit;
}

export interface Commit {
  rev: string;
  type: string;
  collection: string;
  rkey: string;
  record: Record;
}

export interface Record {
  $type: string;
  createdAt: string;
  subject: Subject;
}

export interface Subject {
  cid: string;
  uri: string;
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
