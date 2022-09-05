/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function RenderSeries(props: PageProps) {
  return <div>Hello blogpost series: {props.params.seriesSlug}</div>;
}
