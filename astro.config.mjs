// TODO: Activate these imports when astro works with deno without npm
// import { defineConfig } from 'npm:astro/config';
// import deno from 'npm:@astrojs/deno'
import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno'

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: deno(),
});
