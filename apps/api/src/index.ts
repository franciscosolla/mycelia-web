import Fastify from "fastify";

const server = Fastify();

server.get("/ping", async () => {
  return { pong: true };
});

server.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 API listening on ${address}`);
});
