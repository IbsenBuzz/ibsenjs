/*
 * jQuery Ibsen Buzz!
 * @author: Luis Suárez (@HolaSoyGuicho)
 * @url: https://ibsenbuzz.com/projects/ibsenjs
 * 
 * @package: IbsenJS - Buzz Notification
 * @file: ibsen.buzz.js
 */
(function ($, $Ibsen) {
    if (typeof $ === 'undefined') {
        console.error('$Ibsen.buzz require jQuery. Download http://jquery.com/');
    } else if (typeof $Ibsen === 'undefined') {
        console.error('$Ibsen.buzz require $IbsenJS. Download https://ibsenbuzz.com/projects/ibsenjs');
    } else {
        $Ibsen.buzz = {
            desktop: function (object) {
                if ($Ibsen.hasSupport('Notification')) {
                    $options = $.extend(object || {}, {
                        title: 'Ibsen Buzz',
                        body:  'Content Body'
                    });
                    var notification = new Notification($options.title, {
                        icon: $options.icon,
                        body: $options.body
                    });

                    notification.onclick = function () {
                        console.info("Notification clicked");
                    };

                    notification.onclose = function () {
                        console.info("Notification closed");
                    };

                    notification.onshow = function () {
                        console.info("Notification closed");
                    };

                    return notification;
                }
            }
        };
    }
})(window.jQuery, window.$Ibsen);