import { UrlController } from "../../controllers/url.controller";
import { r } from "../trpc/url.trpc";

export const urlRouter = r(UrlController)