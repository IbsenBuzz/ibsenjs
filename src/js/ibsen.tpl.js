/*
 * jQuery Ibsen Template!
 * @author: Luis Suárez (@Lu1sSuarez)
 * @url: https://ibsenbuzz.com/projects/ibsenjs
 *
 * @package: IbsenJS - Template Package
 * @file: ibsen.tpl.js
 */
(function ($, $Ibsen) {
    if (typeof $ === 'undefined') {
        console.error(`$Ibsen.tpl require jQuery. Download http://jquery.com/download/`);
    } else if (typeof $Ibsen === 'undefined') {
        console.error(`$Ibsen.tpl require $IbsenJS. Download https://ibsenbuzz.com/projects/ibsenjs`);
    } else {
        const $bjs = {};

        window.$Ibsen.tpl = $bjs;
    }
})(window.jQuery, window.$Ibsen);