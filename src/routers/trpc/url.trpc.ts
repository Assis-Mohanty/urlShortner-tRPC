import { initTRPC } from "@trpc/server";
import { UrlController } from "../../controllers/url.controller";

const t = initTRPC.create();
export const r = t.router;
export const urlProcedure=t.procedure;

export const urlRouter = r(UrlController)