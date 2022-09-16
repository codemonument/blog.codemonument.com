/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "https://deno.land/x/gfm/mod.ts";

interface MdData {
  rawContent: string;
}


/**
 * Working Test URL: http://localhost:8000/posts/2022-01-15-airpodspro-quicktip 
 * Not Working Test URL: http://localhost:8000/posts/bob
 */
export const handler: Handlers<MdData > = {
  async GET(_, ctx) {
    const { post } = ctx.params;

    try {
      const content = await Deno.readTextFile(`content/posts/${post}.md`);
      const mdData: MdData = {rawContent: content};
      return ctx.render(mdData);

    } catch (e: unknown) {
      if (e instanceof Deno.errors.NotFound) return ctx.renderNotFound();
    }
    
    return ctx.renderNotFound()
  },
};

export default function RenderPost(props: PageProps) {

  if (!props.data) {
    return <h1> Blogpost not found!</h1>
  }

  const rootUrl = "https://example.com";

  const body = {
    __html: render(props.data.rawContent, {baseUrl: "http://localhost", allowIframes: false})
  }

  return <div>
    <h1>Post {props.params.post}</h1>
    <div dangerouslySetInnerHTML={body}></div>
  </div>;
}
