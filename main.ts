import blog, { ga, redirects } from "https://deno.land/x/blog@0.3.3/blog.tsx";

blog({
  title: "Code Monuments",
  description: "Make the web the best platform it can be!",
  cover: "./assets/banner.jpg",
  // coverStyle: "avatar-rounded",
  author: "Benjamin Jesuiter",
  background: "#f9f9f9",
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
