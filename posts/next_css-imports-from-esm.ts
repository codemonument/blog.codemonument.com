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
