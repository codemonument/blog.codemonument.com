---
title: How2 - Crafting Great NPM Libraries
publish_date: 2022-01-19
---

The Series (Introduction)

The first bits of code, I wanted to share as a library on npm where super simple RxJS pipelines, which I thought (and still think!) would be useful to other people. 

However, this was when these and other questions did arise: 
- Do I publish in nodejs format (with `require()` calls) or do I use ESM Modules? 
- Do I publish with types (which is nice for using your lib with typescript)? 
- How do I publish with types, so that VSCode and other tooling can find my types when my library is used? 

Back then I wished, I could have a comprehensive guide 
on how to build npm libraries `the right way` (TM). 

They should be: 
- Usable by simple "npm install" + importing them  
 via esm `import` and traditional `require`
- Working in browsers and nodejs alike, since RxJS pipes can be handy everywhere!
- Publishing typings, so that your editor or IDE of choice can autocomplete successfully! 
- Easily testable with unit and, if applicable, integration tests! 
   This is especially hard to do sometimes, due to the different module loading mechanisms and differences in platform between web and nodeJS! 
- Bonus: should work with the new-ish deno runtime too! 

So i decided, to write down my exploration to find the best way to craft good npm libraries, with a, hopefully comprehensive, 'best practices' guide at the end of this series! 

Come along for the ride and stay tuned for the first post in this series! 