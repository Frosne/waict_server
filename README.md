# WAICT Demo Server

A developer-facing demo server for testing the Firefox WAICT implementation. Supports enforce mode, report mode, and navigation tests.

## Run

No build step required. Start the server with:

```bash
node server.js
```

Server listens on `http://localhost:8080`.

## Prerequisites

Enable the following prefs in `about:config`:

- `security.waict.enabled` — enables WAICT enforcement
- `dom.reporting.enabled` — enables `ReportingObserver`, required for the violation reports UI

---

Pictures used in this repository are AI-generated.
