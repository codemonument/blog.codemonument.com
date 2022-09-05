/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function RenderPost(props: PageProps) {
  return <div>Hello Blogpost {props.params.post}</div>;
}
