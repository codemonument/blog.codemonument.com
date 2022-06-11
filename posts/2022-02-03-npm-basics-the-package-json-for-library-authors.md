---
title: Node Basics - The package.json for Library Authors
publish_date: 2022-02-03
---

> **Note!**  
> This is the first blogpost for my exploration Series (after the introduction): 
> [How2 - Crafting Great NPM Libraries](https://blog.codemonument.com/series/how2-npm-libs). 

## The first question

My first question, which comes to my mind as I explore this topic is: 

> "What can I do with the platform alone for publishing great libraries"?  
> [e.g. NPM, without any helper CLIs]

This leads me to our first stop: 

## The `package.json`

Each npm project has a `package.json` file.  
It's main purpose is to record all dependencies used in this project and provide a consistent environment for path resolution, helper cli tools for code management and generally providing common conventions on how we can use shared code inside our own npm libraries. 

---
 
> **Side Note**  
> If you want further information on what a `package.json` file is and how it's structured, see [this official guide on nodejs.dev](https://nodejs.dev/learn/the-package-json-guide)

---

Lets establish two perspectives here:  

1. First, we have the perspective of a Node developer **using** a library (= "the lib user").  
They simply want to `require('my-lib')` (when they work in old node-es5 land), or use `import {SomeExport} from 'my-lib'` when using ES-Modules or TypeScript, and don't want to worry about anything under the hood. How does node know which exact js file to load? How does it find the typings for the package, if it's a package which has TypeScript typings? Does this package also works in the browser? These should be very small to non-issues for the lib user. 

2. Second, we have the other perspective, the Node library developer (= "the lib developer").   
It's job is to figure out all this complicated integration stuff and configure it's npm package correctly, so that the lib user does not need to care about this stuff. 

Our goal as lib developers is to provide the simplest experience for the lib user. 
However, figuring that out alone is a daunting task and nearly requires a degree only for that.  
Fortunately, there are some smart people, who crafted npm packages themselves for making it easier / automate the deployment of node libs. (We may see some of them later on our journey) 

For now, let's deep dive into the properties we can define in package.json to announce to users of our library, what and how they can do anything with our package. 

---

> **Side Note**  
> During this blogpost I will use node library and node package interchangeably.  
> However, not all node packages are inevitably "libraries" in a technical sense. 
> They can also contain things like nodejs scripts packaged as cli apps, or even be hijacked to provide a versioned package of something completely different from code, like, for example, fonts.  
> We will explore this topic in greater depth later in this series. 

---

## The Essential Properties `name` and `version`

The two properties `name` and `version` are essential to each node package and are therefore required.

### The `name` property 
The `name` property contains the identifier of the npm package you create. 
This is also the name which will be used by node lib users to `require` or `import` your package. 

The simplest package name consists only of lowercase letters, hyphens (-) and underscores. The problem is, that each package name must be unique in the npm package registry. Therefore, you can create a, so called, scoped package instead. 

A scoped package contains your npm username or your organizations name at the front, prefixed by an at(@)-sign. The scope for libraries related to this blog is `@codemonument`, since that is the username for this identity on npm.  
Therefore, a correct npm package name example would be `@codemonument/my-package` 

Scoped packages have the enormous advantage, that the library names you choose must only be unique inside your scope. Furthermore, it can give your online identity as a developer more exposure by linking your packages to your online identity, for example on twitter. This improves your developer portfolio, since potential employers can now search you online and better evaluate your skills on actual code. 

> **Recommendation**
> If in doubt, publish your library under your scope first. 
> This keeps the unscoped packages clean and if you want to really invest the time for creating a 'default' library for a certain use-case, you can publish that unscoped at every time. 

### The `version` property 

The version property is the second essential property of a node package. 
Each package can have a three part version number with an additional postfix identifier for beta, prerelease or other special versions.  

Example for a normal version string: 

```
{
    "version": "1.5.15"
}

```

Example for a version string with additional postfix identifier
```
{
    "version": "1.5.16-BETA.1"
}
```
---

> **Recommendation**  
> NPM recommends using semantic versioning for npm libraries, and I tend to agree for most types of libraries.  If you want to learn more about semantic versioning, go to the [official npm docs about semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

---

> **Advanced Tip**  
> I would only diverge from semantic versioning, when your node package is some kind of transformed other package, but adds nothing to the functionality itself. Then it would be more helpful from my perspective, to have major, minor and patch version synchronized with the other package and denote updates to your own package via postfix identifiers, like `x.y.z-BUILD.1`. This would allow you to indicate your own build number without breaking the versioning of the original package. 

---

## The optional, but nice properties

Currently, our `package.json` consists of a `name` and a `version` property. 
This would be enough, but for a great npm library (which we want to make!), we should add some more optional properties. 
These will help users of our package incase of problems, or if they want to contribute!
I will use one of the packages from my private account as an example, the [filter-async-rxjs-pipe](https://www.npmjs.com/package/filter-async-rxjs-pipe).

Here is the relevant portion of it's `package.json` (scripts and dependencies are cut out for readability): 

```
{
  "name": "filter-async-rxjs-pipe",
  "version": "1.0.0",
  "description": "Some pipeable functions for rxjs 6+ which accept predicate lambdas with async return value (Promise or Observable)", 
  "author": "Benjamin Jesuiter <bjesuiter@gmail.com>",
  "main": "./dist/src/index.js",
  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/bjesuiter/filter-async-rxjs-pipe.git"
  },
  "keywords": [
    "rxjs",
    "rxjs6",
    "rxjs-pipe",
    "rxjs-filter",
    "rxjs-async-filter",
    "observable",
    "filter"
  ],
  "license": "Apache-2.0",
  "bugs": {
    "url": "https://github.com/bjesuiter/filter-async-rxjs-pipe/issues"
  },
  "homepage": "https://github.com/bjesuiter/filter-async-rxjs-pipe#readme",
  "files": [
    "dist/**/*"
  ]
}
```

I highly recommend setting the following options: 

- `description` - a brief description of the package/library, to help a user identify what it's about
- `author` - a combined string of your name and email in the form of `"CodeMonument <npm@codemonument.com>"`, so that users of your package can contact you. 
- `contributors` - This one is lesser known, but if you work on a package as a team, mention your contributors here to give them exposure too!
- `keywords` - These are important for your package to be discovered on npm! 
    Try to use keywords others might search for when in need  your package. 
- `license` - Licenses are a complicated topic, so I'll simply link to the [explanation on the npm package.json options page](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#license). However, to get you started, I use 
  - `"UNLICENSED"` as a value for internal corporate libraries on a private npm registry,  
  - and `"Apache-2.0"` or `"MIT"` license for my packages on public npm.  

  This way most people are able to use my shiny libraries!
- `bugs` - This field should contain an url to your issue tracker. This is not needed in the beginning, but will get very important once your lib will be used for mission critical work to get feedback! Otherwise, if your lib users encounter an error, they simply jump ship to another library or implement the functionality themselves. 
- `homepage` - This is nice to link to your git repos webpage or the homepage of your organisation. If people like your library, this is another way of connecting with them. 
- `engines` - denotes, on which versions of nodejs your library will run (can be omitted for web libraries or other packages, which can't be executed by node)

> **Heads Up!**
> If you need more detailed descriptions of the fields, head over to the [npm full documentation of package.json options](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)! They are worth a read!

## What's next 

In the next part we will explore the basic plain js node package setups possible. 
Stay tuned! 