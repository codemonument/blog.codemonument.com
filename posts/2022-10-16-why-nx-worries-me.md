---

---

# Why Nx worries me right now

-Good: Their Goal - Being the one-stop shop for monorepos (or maybe bad bc. Too broad and unfocused?) 

- Bad: Massive Surface Area

Example: VSCode 
- Basic Editor, extendable with plugins 
Expectation for Nx: 
- manage the core monorepo well, have plugins for things that you don't know. => this is the case, but core monorepo management is constantly changing:

1. NX came from angular world with angular.json and split it into workspace.json and project.json
2. The 'angular workspace' format is very verbose and duplicates functionality (Targets are more complicated versions of npm scripts, developing an Executor feels like developing a special grunt/gulp JavaScript, despite having access to a cli tool.

Better solution from my view: simply fix the painpoints with executing arbitrary clis in npm scripts: the non-unified shell beneath! 
=> provide a field for an executor, which accepts a cli command string with - consistent Env var interpolation across operating systems 
- a good story to run multiple daemons at the same time (a.k.a like the 'concurrently' package in npm but faster!) 
    


Feeling with nx: I have to commit 100% to the ecosystem to leverage it well. 
Also the feeling: When I'm committed I can't go back easily. 

Example: we had to wait until nx 15 to get esbuild (bundle-less workflow) 
Reason: you can't simply plug the esbuild cli into the system due to the custom executors in the plugins, where you simply are out of luck when they don't provide an option you need. 

Feeling with nx: It works well when you have exactly the usecase the packages where written for. 
Also the feeling: If your usecase diverges too much, many plugins are not flexible enough to let you fix that. 


## In general 

- The Nx philosophy feels a lot like angulars, which maybe was a good thing in the beginning but now it shows it's age. 

- instead of finding the correct and well-working primitives (like react) , their goal for 'having anything you need for a monorepo' results in them adding lots and lots of small fixes to the experience but this adds massive surface area for that tool. 

It basically feels like jetbrains IDEs, which, back in the day, had better language Support in their IDE because they build special Language Assistance for **every** language. Since then it got surpassed by vscode in language service quality in my opinion, bc. VSCode relies on the original language servers of the project authors and simply provided the extension point with the needed protocol and infrastructure for language servers.
