---
title: "🛳 Arriving on Fresh Islands: Back-to-Front Type Safety! (TRPC V10)"
publish_date: 2022-10-26
# cover_html: "<img src=\"https://unsplash.com/photos/ohNxxapID_k/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8bGVtb258ZW58MHx8fHwxNjY2Nzk4Nzc3&force=true&w=1920\">"
cover_html: "<img src=\"https://unsplash.com/photos/7WAGthfGJ9w/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8bGVtb258ZW58MHx8fHwxNjY2ODA0MTgz&force=true&w=1920\">"
---

Inspired by the [TRPC](https://trpc.io/) usage in [Create-T3-App](https://create.t3.gg/), I wondered how this awesome package could be utilized in Island Components in the Deno 'Fresh' Framework. To distinquish the framework 'Fresh' from the word 'fresh', I will write it from now on with a capital F. 

## TL;DR 

You can look directly at the example repo here: github.com/jbscratch/trpc10-in-fresh/tree/2.2.0
It is also hosted at: trpc10-in-fresh.deno.dev/

For the eager amongst you, here are the basic ingredients for integrating TRPC with Fresh Islands. 
However, keep in mind, that these steps need a lot of adjustments to run in deno and fresh: 

- 1 Standard TRPC Setup, adjusted to use with Deno: https://trpc.io/docs/v10/quickstart  
- 2 With TRPC `fetch` adapter, originally developed for Cloudflare Workers: https://trpc.io/docs/v10/fetch  
- 3 Create a new Fresh Route file for TRPC under `routes` with a file named `/routes/trpc/[...path].ts`;   
- 4 Add a Fresh Route Handler for GET and POST inside the trpc route file as described here:  
   https://fresh.deno.dev/docs/getting-started/custom-handlers  

For an exact description of the journey I took, go to this Github Discussion: 
https://github.com/denoland/fresh/discussions/866

Or, simply finish reading this post to learn exactly, how this can be implemented! 😉

## The Parts 

### TRPC 
If you need a quick refresher, what TRPC is doing and why it is awesome, 
watch this Youtube Short by Ben Holmes ([@BHolmesDev on Twitter](https://twitter.com/BHolmesDev)):  

https://www.youtube.com/embed/YLwtF4yxWrY

<!-- TODO: Find way to embedd this youtube thing into my blog! -->
<!-- TODO: Checkout Blogpost: How to build a blog with fresh: https://deno.com/blog/build-a-blog-with-fresh -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/YLwtF4yxWrY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

## Fresh 

[Fresh](fresh.deno.dev) is a frontend framework for [Deno](deno.land), which ships zero js per default to the client and provides a way to have interactive 'islands' components on the clients. These island components are preact components, and by shipping only the needed js to the client, 
the loading times are cut to a minimum. 

Furthermore, Fresh Apps are fully written in Typescript and mostly server rendered. This makes it a great fit for trpc, which has the biggest impact when server and client are both written in Typescript. 
It also helps that Deno can run Typescript directly and out of the box, which makes the integration feel great!