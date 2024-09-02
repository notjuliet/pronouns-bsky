## Configuration

Run `npx @skyware/labeler setup` to convert an existing account into a labeler.

Create a `.env` file:

```Dotenv
DID = "did:plc:xxx"
SIGNING_KEY = "xxx"
```

A `cursor.txt` also needs to be present. It can be left empty, and will update every minute with a new cursor.

Create labels with `npx @skyware/labeler label add` and edit `src/constants.ts` with their related post rkeys and IDs.

## Installation & Usage

```sh
npm i
```

```sh
npm start
```
