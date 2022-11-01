## Problems I have with nx 

- @nrwl/run-commands does not support running multiple and long-running commands (for example multiple dev servers)
- @nrwl/run-commands does not support interactive commands: 
  https://github.com/nrwl/nx/issues/8269 

  => Concrete Problem: Can't run `npm publish` with two-factor-auth in interactive mode, have to provide otp token via argument: 
     `npm publish --otp `
  => Problem: have to change the command every time in project.json instead of being asked for the Token :(