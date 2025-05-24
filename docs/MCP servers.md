---
id: MCP servers
date: "10 April, 2025"
---

# MCP servers

MCP is Model Context Protocol, and it's a agreed set of interfaces that shape up a kind of API that connects LLMs to
traditional APIs and datasources.

It acts as a server like a language server which responds to a known set of endpoints.

In the case of MCP servers, it exposes Resources, Tools and Prompts.

Servers expose tools and resources through `tools/list` and `resources/list` endpoints.
Servers call tools and read resources through `tools/call` and `resources/read`.

## Usage

### Getting started

To get started with [[TypeScript]], install [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk):
```shell
npm install @modelcontextprotocol/sdk
```

Then, create a new server and wait for connections:
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

You'll need top-level await, see [[Promises]].

### Debugging with the Inspector

From here, you can use the [MCP Inspector to check everything is working as expected.](https://modelcontextprotocol.io/docs/tools/inspector)

The documentation recommends using `npx` instead of installing - do that if you'd prefer, but I prefer to install my tooling locally:
```shell
npm install -D @modelcontextprotocol/inspector
```

From here, you can start your server locally:
```shell
npx mcp-inspector node ./path/to/index.js

# If using TypeScript, it'll probably be:
npx mcp-inspector node ./dist/index.js

# If you add a shebang and add executable permissions, then you could just
npx mcp ./dist/index.js
```

### Sample client

You can create and use a client similarly to a server:
```js
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
    command: "node",
    // For connecting to a local MCP server
    args: [join(__dirname, "..", "dist", "index.js")],
});

const client = new Client({
    name: "test-client",
    version: "0.0.0",
});

await client.connect(transport);

await client.ping();

await client.close();
await transport.close();
```

## Registering tools

Probably the main thing you'll be doing with an MCP server is registering
tools.



