# blog.codemonument.com

Based on https://deno.land/x/blog

## Repo Log 

### 2022-09-16 - Try running astro build with deno 

- Problem: astro.config.mjs includes imports which need to be resolved. 
  => when importing with deno syntax, they fail, bc. this file is read by astro cli and assumed to run on node 
  => when importing with node syntax, they fail bc. node_modules folder is missing (due to using deno-node integration)

### 2022-09-05 - Switch to Astro 

1. Run `npm create astro@latest` to see what files are being created. 
    - default name: my-astro-site 
    - with template: just the basics 
2. Note: See commit history for detailed steps 
3. Install astro cli globally (since running it via deno does not work yet):  
   `npm i -g astro`
4. Build astro with `astro build`