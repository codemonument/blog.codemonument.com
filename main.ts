import blog, {
  ga,
  h,
  redirects,
} from "https://deno.land/x/blog@0.3.3/blog.tsx";

/**
 * TODO: write a small webcomponent, which loads an image from unsplash and shows attribution directly on top of the image (for example as small grey text)
 */

blog({
  title: "Code Monuments",
  description: "Make the web the best platform it can be!",
  cover: "./assets/banner-left.jpg",
  // coverStyle: "avatar-rounded",
  author: "Benjamin Jesuiter",
  background: "#f9f9f9",
  coverTextColor: "#f9f9f9",
  avatar: "./assets/avatar.jpg",
  links: [
    { title: "Email", url: "mailto:blog@codemonument.com" },
    { title: "GitHub Codemonument", url: "https://github.com/codemonument" },
    { title: "GitHub bjesuiter", url: "https://github.com/bjesuiter" },
    { title: "Twitter", url: "https://twitter.com/codemonument" },
  ],
  // header:  <header>Your custom header</header>,
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
