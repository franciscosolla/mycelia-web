import Fastify from "fastify";

const server = Fastify();

server.get("/ping", async () => {
  return { pong: true };
});

const port = Number(process.env.PORT ?? 4000);

server.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 API listening on ${address}`);
});
