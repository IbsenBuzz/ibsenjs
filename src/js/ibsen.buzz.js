/*
 * jQuery Ibsen Buzz!
 * @author: Luis Suárez (@HolaSoyGuicho)
 * @url: https://ibsenbuzz.com/git/ibsenjs
 * 
 * @package: IbsenJS - Buzz Notification
 * @file: ibsen.buzz.js
 */
(function ($, $Ibsen) {
    if (typeof $ === 'undefined') {
        console.error('$Ibsen.buzz require jQuery. Download http://jquery.com/download/');
    } else if (typeof $Ibsen === 'undefined') {
        console.error('$Ibsen.buzz require $IbsenJS. Download https://ibsenbuzz.com/git/ibsenjs');
    } else {
        $Ibsen.buzz = {
            default: {
                desktop: {
                    title: 'IbsenBuzz!',
                    body : 'Visit more of our projects in https://ibsenbuzz.com/git',
                    tag  : 'ibsenbuzz'
                }
            }
        };

        $Ibsen.buzz.desktop = function (object) {
            if ($Ibsen.buzz.desktop.support.hasSupport()) {
                var $Notification = $Ibsen.buzz.desktop.support.Notification();

                $options = $.extend({}, $Ibsen.buzz.default.desktop, object || {});

                if ($Notification.permission === "granted") {
                    return new $Notification($options.title, $options);
                } else if ($Notification.permission !== 'denied') {
                    $Notification.requestPermission(function (permission) {
                        if (permission === "granted") {
                            return $Ibsen.buzz.desktop(object);
                        } else {
                            return $Ibsen.buzz.desktop(object);
                        }
                    });
                }
            }
        };

        $Ibsen.buzz.desktop.support = {
            hasSupport  : function () {
                if (($Ibsen.hasSupport('Notification') || $Ibsen.hasSupport('mozNotification') || $Ibsen.hasSupport('webkitNotification'))) {
                    return true;
                } else {
                    $Ibsen.error.log('$Ibsen.buzz.desktop() Not supported in your browser.');
                    return false;
                }
            },
            Notification: function () {
                return window.Notification || window.mozNotification || window.webkitNotification;
            },
            default     : {}
        };
    }
})(window.jQuery, window.$Ibsen);