---
title: "How to import CSS through JS in (hopefully) 2023"
publish_date: 2022-12-03
# cover_html: "<img src=\"https://unsplash.com/photos/ohNxxapID_k/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8bGVtb258ZW58MHx8fHwxNjY2Nzk4Nzc3&force=true&w=1920\">"
# cover_html: "<img src=\"https://unsplash.com/photos/7WAGthfGJ9w/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8bGVtb258ZW58MHx8fHwxNjY2ODA0MTgz&force=true&w=1920\">"

---

A friend asked me today how he could import a css file relative to an ES Module js file, which got me on a little journey! 

## TL;DR 

1. If you need something stable for today, use `import.meta.url` in the js module as a base for the css url, 
   then load the css via a style tag inserted into the dom. 
2. If you don't need Safari right now: Use [Constructable Stylesheets](https://web.dev/constructable-stylesheets/) together with `fetch()`! 
3. If you want to be even more adventurous, use the new [CSS Module Scripts](https://web.dev/css-module-scripts/#using-css-module-scripts) Syntax, which is only available in Chrome and Edge at the time of writing. 

## 1. The Safe Route
## 2. The (hopefully near) Future:  Constructable Stylesheets 
## 2. The more distant, but exciting Future: CSS Module Scripts!