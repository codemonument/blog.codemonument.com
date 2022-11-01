---
title: "🛳 Arriving on Fresh Islands: Back-to-Front Type Safety with TRPC!"
publish_date: 2022-10-26
# cover_html: "<img src=\"https://unsplash.com/photos/ohNxxapID_k/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8bGVtb258ZW58MHx8fHwxNjY2Nzk4Nzc3&force=true&w=1920\">"
cover_html: "<img src=\"https://unsplash.com/photos/7WAGthfGJ9w/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8bGVtb258ZW58MHx8fHwxNjY2ODA0MTgz&force=true&w=1920\">"
---

Inspired by the [TRPC](https://trpc.io/) usage in [Create-T3-App](https://create.t3.gg/), I wondered how this awesome package could be utilized in Island Components in the Deno 'Fresh' Framework. 
To distinquish the framework 'Fresh' from the word 'fresh', I will write it from now on with a capital F. 

## TL;DR 

You can look directly at my example repo here: https://github.com/jbscratch/trpc10-in-fresh/  
 
It is also hosted at: https://trpc10-in-fresh.deno.dev/

(The surface is not very exciting, it simply prints "Hello World". But under the hood it's very cool, whcih is why I'm writing this blogpost!)

For the eager amongst you, here are the basic ingredients for integrating TRPC with Fresh Islands. 
However, keep in mind, that these steps need some adjustments to run in deno and fresh: 

- 1 Standard TRPC Setup, adjusted to use with Deno: https://trpc.io/docs/v10/quickstart  
- 2 With TRPC `fetch` adapter, originally developed for Cloudflare Workers: https://trpc.io/docs/v10/fetch  
- 3 Create a new Fresh Route file for TRPC under `routes` with a file named `/routes/trpc/[...path].ts`;   
- 4 Add a Fresh Route Handler for GET and POST inside the TRPC route file as described here:  
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

[Fresh](fresh.deno.dev) is a frontend framework for [Deno](deno.land), which ships zero js per default to the client and provides a way to have interactive 'islands' components on the clients. 
These island components are preact components, and by shipping only the needed js to the client, 
the loading times are cut to a minimum. 

Furthermore, Fresh Apps are fully written in Typescript and mostly server rendered. This makes it a great fit for TRPC, which has the biggest impact when server and client are both written in Typescript. 
It also helps a lot that Deno can run Typescript directly and out of the box, which makes the integration feel great!

## The Integration 

### Preparation 

As preparation I added the following import mapping to my `import_map.json`: 

```json
{
  "imports": {
    "@/": "./"
  }
}

```

This allows me to import files from the current repo by referencing them from the root of the git repo like this: 
`import {smth} from '@/src/someFolder/someFile.ts'`.

### The TRPC Router in `server.ts` 

To connect to an API, we first have to define it! 
Therefore start by creating a `src/trpc` folder inside your Fresh repo and add a `server.ts` file to it. 
You should not put this file somewhere below the `routes` folder of fresh, because the files inside will not render as routes.  

This file is very similar to the one the TRPC Tutorials, but because it needs a special extra for this integration, we'll go through it again.
Note, that I'm using TRPC V10 here, since it is mostly stable and will be final soon. 

First, here is the whole file: 

```ts
import { initTRPC } from "@trpc/server";
import { Context } from "./fetch-context.ts";
import { z } from "zod";

const t = initTRPC.context<Context>().create();

// This export is needed for integrating TRPC with Fresh in `/routes/trpc`
// It is only used on the server!
export const appRouter = t.router({
  hello: t.procedure
    .input(z.string())
    .query((req) => {
      return `Hello ${req.input}`;
    }),
});

// This export only export the *type signature* of the trpc router!
// This avoids accidentally importing the full Router into client-side code
export type AppRouter = typeof appRouter;

```

### What is this `Context`?

We see, that the first import is initTRPC, like in the TRPC tutorials.  
But in the second line, we need something extra. 
This imports a `Context` type which is defined in the `./fetch-context.ts` in the `src/trpc` folder: 

```ts
import { inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createContext({ req }: FetchCreateContextFnOptions) {
  return { req };
}

export type Context = inferAsyncReturnType<typeof createContext>;

```

But what exactly is that `Context` now?  
When we go into the [TRPC docs for the TRPC fetch-integration](https://trpc.io/docs/v10/fetch#create-the-context) (which we are using), we see the following: 

> Then you need a context that will be created for each request.

This basically means, TRPC allows us to enrich the context which is passed to each api handler with extra information per request!
Since their example is for running TRPC in Cloudflare Workers, their `createContext` Example looks like this: 

```ts
export function createContext({ req }: FetchCreateContextFnOptions) {
  const user = { name: req.headers.get('username') ?? 'anonymous' };
  return { req, user };
}
```

**But we don't need that functionality today, so we simply pass the request down to the TRPC handlers without changes.**

### The TRPC Client in `client.ts`

Now that we have a server, we need a TRPC Client!
Since Fresh does the separation of server-side code in routes and client-side code in islands completely automatic, 
we can put this `client.ts` directly besides the `server.ts` into `src/trpc`: 

```ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { IS_BROWSER } from "$fresh/runtime.ts";

import type { AppRouter } from "./server.ts";

/**
 * This guard check for IS_BROWSER is necessary,
 * since `location` is not defined in global scope on server and crashes on deno deploy.
 */
let host;
if (IS_BROWSER) {
  console.log("Origin: ", location?.origin);
  host = location?.origin;
}

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${host}/trpc`,
    }),
  ],
});

```

The only thing special here is the `IS_BROWSER` check. 
This is needed to only read `locaton?.origin` when executing this file on the client, 
otherwise the server will crash while building the island component, where this client is used. 

### The Magic: Fresh Route for TRPC!

The last thing missing now is the link between the TRPC client and the TRPC router. 
Since we don't control the server on which fresh is running, we should integrate these two through Fresh. 

Fortunately, fresh provides us a way to set up a route and capture all following route parts at once,
by using a syntax in the filename of a route similar to JS Rest params: `[...path.ts]`. 

With this knowledge, we create a file at `routes/trpc/[...path].ts` and add the following code to it: 

```ts
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/src/trpc/server.ts";
import { createContext } from "@/src/trpc/fetch-context.ts";

export const handler: Handlers = {
  GET(_req: Request, ctx: HandlerContext) {
    return fetchRequestHandler({
      endpoint: "/trpc",
      req: _req,
      router: appRouter,
      createContext,
    });
  },
  POST(_req: Request, ctx: HandlerContext) {
    return fetchRequestHandler({
      endpoint: "/trpc",
      req: _req,
      router: appRouter,
      createContext,
    });
  },
};
```

Going quickly through this code, it shows: 

- We create a [dynamic route handler in Fresh](https://fresh.deno.dev/docs/getting-started/custom-handlers) for both `GET` and `POST` HTTP Methods. 
- In each handler, we call the fetchRequestHandler from the trpc adapters folder and pass it
  - the endpoint configured in the TRPC router: `/trpc`
  - the request as captured by Fresh: `_req`
  - the trpc router which should handle this request: `appRouter` imported from `@/src/trpc/server.ts`
  - the createContext function built earlier in `fetch-context.ts`

## Testing the TRPC Integration 

To test this, create a new Island component in `./islands`, called `TrpcPlayground.tsx`: 

```ts
import { useState } from "preact/hooks";
import { trpc } from "@/src/trpc/client.ts";

export default function TrpcPlayground() {
  const [greeting, setGreeting] = useState("");

  const fireQuery = () => {
    trpc.hello.query("World")
      .then((res) => setGreeting(res));
  };

  return (
    <div>
      <button onClick={fireQuery}>Fire TRPC Query</button>
      <p>{greeting}</p>
    </div>
  );
}

```

What we see here: 
- We use the TRPC client imported from `@/src/client.ts` to query a route, we defined earlier on the trpc router. 
- Nice thing: VSCode gives us autocomplete when typing `trpc.`, with all available queries and mutations! 

   ![](./assets/2022-11-01_trpc-autocomplete.png)

- 

