import cors from "cors";
import express from "express";
import coinRouter from "./routes/coin";

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:3000", // Development (Next.js local)
  "https://mycelia.solla.dev", // Production
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.use("/coin", coinRouter);

app.get("/ping", (_, res) => {
  res.json({ pong: true });
});

app.use((req, res) => {
  console.log("404 hit:", req.url);
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`🚀 API listening on http://127.0.0.1:${PORT}`);
});
