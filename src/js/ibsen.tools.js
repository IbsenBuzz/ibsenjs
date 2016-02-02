/*
 * jQuery Ibsen Tools!
 * @author: Luis Suárez (@Lu1sSuarez)
 * @url: https://ibsenbuzz.com/projects/ibsenjs
 *
 * @package: IbsenJS - Tools
 * @file: ibsen.tools.js
 */
(function ($, $Ibsen) {
    if (typeof $ === 'undefined') {
        console.error(`$Ibsen.tools require jQuery. Download http://jquery.com/download/`);
    } else if (typeof $Ibsen === 'undefined') {
        console.error(`$Ibsen.tools require $IbsenJS. Download https://ibsenbuzz.com/projects/ibsenjs`);
    } else {
        const $bjs    = {};

        $bjs.shortcut = function () {

        };

        window.$Ibsen.tools = $bjs;
    }
})(window.jQuery, window.$Ibsen);