---
title: 🎉 filter-async-rxjs-pipe@1.00 🎉
publish_date: 2022-02-02
---

Today, I'm very proud to share with you the release announcement of version 1.0.0 of my package [filter-async-rxjs-pipe on npm](https://www.npmjs.com/package/filter-async-rxjs-pipe)! 🥳

## TL;DR 

This update contains version bumps for all dev and prod dependencies to avoid security risks. 
However, I noticed, that this package has 90 - 300 weekly downloads, so I want to declare it stable as it is now. 

## The Origins 

This package originated from [a question on StackOverflow](https://stackoverflow.com/questions/28490700/is-there-an-async-version-of-filter-operator-in-rxjs/51966591#51966591), asking if there is a filter operator for rxjs which accepts a promise in return. This would allow making network requests inside filter functions or using other async browser apis. 

I took the suggestions from there (Shoutout to Brandon for the original answer!) and wrapped it into a neat little npm library. 

## What's inside? 

### RxJS Pipe `filterByPromise`
This rxjs 6+ pipe accepts a predicate function which returns a Thenable<boolean> for filtering. (e.g. any object with a 'then' method === Promise and custom promise implementations)

### RxJS Pipe `filterAsync`
This rxjs 6+ pipe accepts a predicate function which returns an Observable<boolean> for filtering.

> Note  
> Both of these functions have a parallel flag to indicate, that they should run the predicate function in parallel for each emitted event from the source observable. 
It should work, however, I currently have no valid test case for that.  
So, if you have any idea, how to test this correctly, please file an issue [here on my repo](https://github.com/bjesuiter/filter-async-rxjs-pipe/issues)!


Thank you for reading!
You can reach me on Twitter via [@codemonument](https://twitter.com/codemonument) or see my other repositories at github.com/codemonument or at my private account github.com/bjesuiter!
