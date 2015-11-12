/*
 * jQuery Ibsen Buzz!
 * @author: Luis Suárez (@HolaSoyGuicho)
 * @url: https://ibsenbuzz.com/git/ibsenjs
 * 
 * @package: IbsenJS
 * @file: ibsen.js
 */
(function ($) {
    if (typeof $ !== 'undefined') {
        $Ibsen = {
            error:         {
                log:   function (msg) {
                    console.error(msg);
                },
                how:   function (msg, how) {
                    this.log(msg);
                    console.info('How to use:\n' + how);
                },
                debug: function (msg) {
                    console.info(msg);
                }
            },
            hasSupport:    function (has) {
                if (typeof has === 'string') {
                    return ((has in window) && window[has] !== null);
                } else {
                    this.error.how('$Ibsen.hasSupport(string) require value has.', "if ($Ibsen.hasSupport('Notification') { \n\t// code here \n}");
                }
            },
            hasAttr:       function (selector, has) {
                if (typeof selector !== 'undefined' && typeof has !== 'undefined') {
                    return ($(selector).attr(has) !== 'undefined');
                } else {
                    this.error.how('$Ibsen.hasAttr(selector, string) require selector and value has.', "if ($Ibsen.hasAttr('#body', 'valid') { \n\t// code here \n}");
                }
            },
            validateInput: function (selector, valid) {
                if (typeof selector !== 'undefined' && typeof valid !== 'undefined') {
                    return $(docuemnt).on('keypress', selector, function (a) {
                        var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = valid;
                        (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault();
                    });
                } else {
                    this.error.how('$Ibsen.validateInput(selector, string) require selector and char valid input.', "$Ibsen.validateInput('#dni, #telephone', '0123456789-.');");
                }
            },
            isValidType:   function (value, to) {
                if (typeof value !== 'undefined' && typeof to !== 'undefined') {
                    return ((typeof value !== 'undefined') && (value !== '') && (typeof value === to));
                } else {
                    this.error.how('$Ibsen.isValidType(value, typeof) require value and typeof check.', "$Ibsen.isValidType($debug, 'boolean');");
                }
            }
        };

        window.$Ibsen = $Ibsen;
    } else {
        window.$Ibsen = {};
        console.error('IbsenJS require jQuery. Download http://jquery.com/download/');
    }
})(window.jQuery);