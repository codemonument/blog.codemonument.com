/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
// import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
     
      <p class={tw`my-6`}>
        Welcome to the main blog index page.
      </p>
      {/* <Counter start={3} /> */}
    </div>
  );
}
