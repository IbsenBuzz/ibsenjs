/*
 * jQuery Ibsen Buzz!
 * @author: Luis Suárez (@Lu1sSuarez)
 * @url: https://ibsenbuzz.com/projects/ibsenjs
 *
 * @package: IbsenJS - Buzz Notification
 * @file: ibsen.buzz.js
 */
(function ($, $Ibsen) {
    if (typeof $ === 'undefined') {
        console.error(`$Ibsen.buzz require jQuery. Download http://jquery.com/download/`);
    } else if (typeof $Ibsen === 'undefined') {
        console.error(`$Ibsen.buzz require $IbsenJS. Download https://ibsenbuzz.com/projects/ibsenjs`);
    } else {
        const $bjs = {};
        $bjs.buzz  = {
            default: {
                desktop: {
                    title: `Ibsen Buzz!`,
                    body:  `Visit more of our projects in https://ibsenbuzz.com/projects`,
                    tag:   `ibsenbuzz`
                }
            }
        };

        $bjs.buzz.desktop = function ($object) {
            if ($bjs.buzz.desktop.support.hasSupport()) {
                var $Notification = $bjs.buzz.desktop.support.Notification();
                var $options      = $.extend({}, $bjs.buzz.default.desktop, ($Ibsen.isType($object || {}, 'object') ? $object : {}));

                if ($Notification.permission === "granted") {
                    $bjs.buzz.desktop.support._this = new $Notification($options.title, $options);
                    return $bjs.buzz.desktop;
                } else if ($Notification.permission !== 'denied') {
                    $Notification.requestPermission(function (permission) {
                        if (permission === "granted") {
                            return $bjs.buzz.desktop($object);
                        } else {
                            return $bjs.buzz.desktop($object);
                        }
                    });
                }
            }
        };

        $bjs.buzz.desktop.on = {
            show:  function ($fn) {
                if (!$Ibsen.isUndefined($fn)) {
                    if ($Ibsen.isType($fn, 'function')) {
                        $bjs.buzz.desktop.support._this.onshow = $fn;
                    }

                    return $bjs.buzz.desktop.on;
                }
            },
            click: function ($fn) {
                if (!$Ibsen.isUndefined($fn)) {
                    if ($Ibsen.isType($fn, 'function')) {
                        $bjs.buzz.desktop.support._this.onclick = $fn;
                    }

                    return $bjs.buzz.desktop.on;
                }
            },
            close: function ($fn) {
                if (!$Ibsen.isUndefined($fn)) {
                    if ($Ibsen.isType($fn, 'function')) {
                        $bjs.buzz.desktop.support._this.onclose = $fn;
                    }

                    return $bjs.buzz.desktop.on;
                }
            },
            error: function ($fn) {
                if (!$Ibsen.isUndefined($fn)) {
                    if ($Ibsen.isType($fn, 'function')) {
                        $bjs.buzz.desktop.support._this.onerror = $fn;
                    }

                    return $bjs.buzz.desktop.on;
                }
            }
        };

        $bjs.buzz.desktop.support = {
            _this:        null,
            hasSupport:   function () {
                if (($Ibsen.hasSupport('Notification') || $Ibsen.hasSupport('mozNotification') || $Ibsen.hasSupport('webkitNotification'))) {
                    return true;
                } else {
                    $Ibsen.error.log(`$Ibsen.buzz.desktop() is not supported in your browser.`);
                    return false;
                }
            },
            Notification: function () {
                return window.Notification || window.mozNotification || window.webkitNotification;
            }
        };

        $bjs.buzz.html = function ($object) {

        };

        window.$Ibsen.buzz         = $bjs.buzz.desktop;
        window.$Ibsen.buzz.desktop = $bjs.buzz.desktop;
        window.$Ibsen.buzz.html    = $bjs.buzz.html;
    }
})(window.jQuery, window.$Ibsen);