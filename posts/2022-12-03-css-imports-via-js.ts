/**
 * CODE SNIPPETS
 * -------------
 */

/**
 * code_relative-asset-urls-from-esmodule
 */

// // inside the current ESModule file
// const myFileUrlString = import.meta.url;

// // simply construct a new relative URL like this:
// const mySiblingCssFile = new URL('mySibling.css', myFileUrlString);

// // Explanation: The second param of the URL constructor is used as the base URL for the first parameter.
// // This can be used for navigation relative to the current ESModule!
// const myGlobalCssFile = new URL('../../assets/global.css', myFileUrlString);
