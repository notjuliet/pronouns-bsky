## Configuration

Run `npx @skyware/labeler setup` to convert an existing account into a labeler.

Create a `.env` file:

```Dotenv
DID = "did:plc:xxx"
SIGNING_KEY = "xxx"
```

Create labels with `npx @skyware/labeler label add`.

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
