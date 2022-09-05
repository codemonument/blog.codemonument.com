/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
// import Counter from "../islands/Counter.tsx";

export default function PostsHome() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      
      <p class={tw`my-6`}>
        Welcome to the `Posts` Homepage!
      </p>
      <a href="series/blogpost-series-a">Blogpost Series A</a><br></br>
      <a href="series/blogpost-series-b">Blogpost Series B</a>
      {/* <Counter start={3} /> */}
    </div>
  );
}
