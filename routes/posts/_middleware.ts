// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";

/**
 * This is the markdown data loaded from disk
 */
interface MdData {
  rawContent: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<MdData>,
) {
  //   await Deno.readTextFile(``);
  //   console.log(req);
  ctx.state.rawContent = "myData";
  const resp = await ctx.next();
  return resp;
}
