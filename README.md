## Configuration

Run `npx @skyware/labeler setup` to convert an existing account into a labeler.

Create a `.env` file:

```Dotenv
DID = "did:plc:xxx"
SIGNING_KEY = "xxx"
```

A `cursor.txt` also needs to be present. It can be left empty, and will update the file every minute with a new cursor.

Create labels with `npx @skyware/labeler label add` and edit `src/constants.ts` with the related post rkeys and label IDs.

The server has to be reachable outside your local network using the URL you provided during the account setup (typically, using a reverse proxy such as [Caddy](https://caddyserver.com/)):

```Caddyfile
labeler.example.com {
	reverse_proxy 127.0.0.1:4001
}
```

## Installation & Usage

```sh
npm i
```

```sh
npm start
```
