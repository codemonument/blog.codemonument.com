import { BlogContext, BlogMiddleware } from "/deps/blog.tsx";

export const blogVersionMiddleware: BlogMiddleware = async (
  req: Request,
  ctx: BlogContext,
): Promise<Response> => {
  const res = await ctx.next();

  res.headers.append("X-DENO-BLOG-VERSION", "0.5.0");
  return res;
};
