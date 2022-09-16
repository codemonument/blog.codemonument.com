/** @jsx h */

/** @jsxFrag Fragment */
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import blog, { h } from "blog";

/**
 * TODO: write a small webcomponent, which loads an image from unsplash and shows attribution directly on top of the image (for example as small grey text)
 */

blog({
  title: "Code Monuments",
  description: "Make the web the best platform it can be!",
  cover: "./assets/banner.jpeg",
  // coverStyle: "avatar-rounded",
  author: "Benjamin Jesuiter",
  background: "#f9f9f9",
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
});
