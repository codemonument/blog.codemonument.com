/**
 * CODE SNIPPETS
 * -------------
 */


/**
 * code_relative-asset-urls-from-esmodule
 */

// inside the current ESModule file
const myFileUrlString = import.meta.url;

// simply construct a new relative URL like this:
const mySiblingCssUrl = new URL("mySibling.css", myFileUrlString);

// Explanation: The second param of the URL constructor is used as the base URL for the first parameter.
// This can be used for navigation relative to the current ESModule!
const myGlobalCssUrl = new URL("../../assets/global.css", myFileUrlString);



/**
 * code_importing-css-via-link-tag
 */

// Get HTML head element
const head = document.querySelector("head");

// Create new link Element
const link = document.createElement("link");

// set the attributes for link element
link.rel = "stylesheet";
link.type = "text/css";
link.href = mySiblingCssUrl.href;

// Append link element to HTML head
head.appendChild(link);



/**
 * Using a Constructible Stylesheet with fetch
 * code_constructible-stylesheet-with-fetch
 */

// construct a new url to your css file
const myTargetCss = new URL("myTarget.css", import.meta.url);

// directly fetch its content
const cssContent = await (await fetch(myTargetCss)).text;

// construct a new stylesheet
// => aka Constructible Stylesheet! 🤯
const sheet = new CSSStyleSheet();
await sheet.replace(cssContent);

// adopt the stylesheet objects to a document ...
document.adoptedStyleSheets = [sheet];

// ... or to a shadow root
const node = document.createElement("div");
const shadow = node.attachShadow({ mode: "open" });
shadow.adoptedStyleSheets = [sheet];



/**
 * code_loading-css-in-webpack-small
 */
// in the js file
import css from "file.css";

/**
 * CSS Loader in webpack
 * code_css-loader-setup-in-webpack
 */

// install the webpack loader package 
npm install --save-dev css-loader

// in the webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};


/**
 * code_css-module-import-example
 */

// Woha, whats that?!? We can import css directly into an ESModule?
import sheet from './styles.css' assert { type: 'css' };

// The type of sheet is a normal constructible stylesheet, 
// so it can be adopted to any document or shadow root!
document.adoptedStyleSheets = [sheet];
shadowRoot.adoptedStyleSheets = [sheet];


/**
 * header_css-module-scripts-import
 */

// Woha, whats that?!? We can import css directly into an ESModule?
import sheet from './styles.css' assert { type: 'css' };

// The type of sheet is a normal constructible stylesheet, 
// so it can be adopted to any document or shadow root!
document.adoptedStyleSheets = [sheet];
shadowRoot.adoptedStyleSheets = [sheet];

// To learn more, go on reading the Blogpost!