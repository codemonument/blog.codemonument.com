## Problems I have with nx 

- @nrwl/run-commands does not support running multiple and long-running commands (for example multiple dev servers)
- @nrwl/run-commands does not support interactive commands: 
  https://github.com/nrwl/nx/issues/8269 

  => Concrete Problem: Can't run `npm publish` with two-factor-auth in interactive mode, have to provide otp token via argument: 
     `npm publish --otp `
  => Problem: have to change the command every time in project.json instead of being asked for the Token :(

- No @nrwl first party plugin supports releasing cjs & esm versions of a lib package at the same time. 
    - @nrwl/js => can only do...
    - @nrwl/web => can only do ...

- @nrwl does mostly work with cjs. => changing the main package.json of the workspace to `type: module` breaks most configs around jest, typescript and potentially even more, like webpack 

- @nrwl still uses webpack under the hood, even for serving stuff. 
  => This is slooooooooowwwww 

- We COULD write a plugin as community for using vite, but that is a big maintenance burden for what I would see as something someone of the platform providers should have figured out already 

## These are all sympthoms of bigger problems imho: 

- nx was born from angular => nx seems to have the same attitude: 
  Try to provide a solution for anything, but need 100% buy-in to leverage all features