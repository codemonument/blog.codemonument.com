/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

interface MdData {
  rawContent: string;
}


export const handler: Handlers<MdData | null> = {
  async GET(_, ctx) {
    const { post } = ctx.params;
    const content = await Deno.readTextFile(`content/posts/${post}.md`);
    // const resp = await fetch(`https://api.github.com/users/${username}`);
    // if (resp.status === 404) {
    //   return ctx.render(null);
    // }
    const mdData: MdData = {rawContent: content}
    return ctx.render(mdData);
  },
};

export default function RenderPost(props: PageProps) {
  return <div>
    <h1>Post {props.params.post}</h1>
    <p>{props.data.rawContent}</p>
  </div>;
}
