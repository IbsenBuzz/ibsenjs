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
        $Ibsen.buzz.desktop = function (object) {
            if (this.support.hasSupport()) {
                var $Notification = this.support.Notification();

                if ($Notification.permission === "granted") {
                    $options = $.extend(object || {}, {
                        title: 'IbsenBuzz!',
                        body : 'Visit more of our projects in https://ibsenbuzz.com/git'
                    });

                    return new $Notification($options.title, $options);
                } else if ($Notification.permission !== 'denied') {
                    return this.desktop(object);
                }
            }
        };

        $Ibsen.buzz.desktop.support = {
            hasSupport  : function () {
                if (($Ibsen.hasSupport('Notification') || $Ibsen.hasSupport('mozNotification') || $Ibsen.hasSupport('webkitNotification')) && !$Ibsen.hasSupport('FileReader')) {
                    return true;
                } else {
                    $Ibsen.error.log('$Ibsen.buzz.desktop() Not supported in your browser.');
                    return false;
                }
            },
            Notification: function () {
                return window.Notification || window.mozNotification || window.webkitNotification;
            }
        };
    }
})(window.jQuery, window.$Ibsen);