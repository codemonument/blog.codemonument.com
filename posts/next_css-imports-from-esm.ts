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
