import { Router } from "express";
import metadataRoute from "./metadata";

const coinRouter = Router();

coinRouter.use(metadataRoute);

export default coinRouter;
