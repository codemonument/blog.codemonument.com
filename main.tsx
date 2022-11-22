/** @jsx h */

/** @jsxFrag Fragment */
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import blog, { h } from "https://deno.land/x/blog@0.5.0/blog.tsx";
import { blogVersionMiddleware } from "./src/blogVersionMiddleware.ts";

/**
 * TODO: write a small webcomponent, which loads an image from unsplash and shows attribution directly on top of the image (for example as small grey text)
 */

blog({
  title: "CodeMonument",
  description: "Make the web the best platform it can be!",
  cover: "./assets/banner.jpeg",
  // coverStyle: "avatar-rounded",
  author: "Benjamin Jesuiter",
  theme: "light",
  coverTextColor: "#f9f9f9",
  avatar: "./assets/avatar.jpeg",
  links: [
    { title: "Email", url: "mailto:blog@codemonument.com" },
    { title: "GitHub Codemonument", url: "https://github.com/codemonument" },
    { title: "GitHub bjesuiter", url: "https://github.com/bjesuiter" },
    { title: "Twitter", url: "https://twitter.com/codemonument" },
  ],
  // TODO: Figure out how this header customization works!!!!
  // header: <div> <h2> Testheader < /h2></div>,
  // middlewares: [

  // If you want to set up Google Analytics, paste your GA key here.
  // ga("UA-XXXXXXXX-X"),

  // If you want to provide some redirections, you can specify them here,
  // pathname specified in a key will redirect to pathname in the value.
  // redirects({
  //  "/hello_world.html": "/hello_world",
  // }),

  // ]
  // Note: Replaces header completely!
  // header: <header></header>
  // showHeaderOnPostPage: true,
  // Note: footer replaces footer completely!
  footer: <footer style={{marginTop: "50px", marginBottom: "20px", paddingBlock:"15px", borderTop: "solid 1px #D843EB", color: "#D843EB"}}>
      {/* style={{display: 'flex', flexFlow: 'column nowrap', gap: '10px'}} */}
      <section >
        <label for="mastodon">Comment and follow me on Mastodon! &nbsp;</label>
        <a id="mastodon" rel="me" href="https://techhub.social/@codemonument" style={{textDecoration: "underline"}}> 
          https://techhub.social/@codemonument
        </a>
        <br></br>
        <label for="rss">Or add this blog to your rss reader! &nbsp;</label>
        <a id="rss" href="https://blog.codemonument.com/feed" style={{ textDecoration: "underline"}}>
          <img src="./assets/rss-icon-svgrepo.svg" style={{height: '0.9em', width: '0.9em', display: 'inline-block', marginBottom: '5px'}}></img> RSS
        </a>
      </section>
    </footer>,
  middlewares: [blogVersionMiddleware],
});
