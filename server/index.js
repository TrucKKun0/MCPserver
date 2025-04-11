import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { createPost } from "./Mcptools.js";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});

server.tool(
  "AddTwoNumber",
  "Add two numbers",
  {
    a: z.number(),
    b: z.number()
  },
  async (args) => {
    const { a, b } = args;
    return {
      content: [
        {
          type: "text",
          text: `The sum of ${a} and ${b} is ${a + b}`
        }
      ]
    };
  }
);
server.tool(
  "CreatePsot",
  "Create a post on X formally known as twitter",
  {
    status: z.string()
  },
  async (args) => {
    const { status } = args;
    return createPost(status);
  }
)

const app = express();

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports= {};

app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId ;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(3001,(req,res)=>{
    console.log("server is running on port 3001");
});
