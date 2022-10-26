---
title: "🛳 Arriving on Fresh Islands: Back-to-Front Type Safety! (TRPC V10)"
publish_date: 2022-10-26
cover_html: "<img src=\"https://unsplash.com/photos/ohNxxapID_k/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8bGVtb258ZW58MHx8fHwxNjY2Nzk4Nzc3&force=true&w=1920\">"
---

Since the new hottnes on the block is typesafe apis from backend to frontend, I wondered how this could be integrated into 

## TL;DR 

For the eager amongst you, here are the basic ingredients for integrating TRPC with Fresh Islands: 

1. Standard TRPC Setup, adjusted to use with deno: https://trpc.io/docs/v10/quickstart
2. With TRPC `fetch` adapter, originally developed for Cloudflare Workers: https://trpc.io/docs/v10/fetch
3. Create a new Fresh Route file for TRPC under `routes` with a file named `/routes/trpc/[...path].ts`; 
4. Add a Fresh Route Handler for GET and POST inside the trpc route file as described here:  
   https://fresh.deno.dev/docs/getting-started/custom-handlers