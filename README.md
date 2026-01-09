# WAICT Small Test Server

## Run

```bash
node server.js
```

Server listens on `http://localhost:8080`.

## Test WAICT header behavior

```bash
# v2: server does not support, returns an error response
curl -I -H 'Sec-CH-WAICT: 2' http://localhost:8080/

# v1: returns response headers pointing to the manifest
curl -I -H 'Sec-CH-WAICT: 1' http://localhost:8080/

# no header: normal response with no WAICT headers
curl -I http://localhost:8080/
```
