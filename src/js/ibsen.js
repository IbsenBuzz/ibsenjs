/*
 * jQuery Ibsen JS!
 * @author: Luis Suárez (@Lu1sSuarez)
 * @url: https://ibsenbuzz.com/projects/ibsenjs
 *
 * @package: IbsenJS
 * @file: ibsen.js
 */
(function ($) {
    if (typeof $ !== 'undefined') {
        const $bjs = {};

        $bjs.log = {
            error: function ($msg) {
                console.error($msg);
            },
            how:   function ($msg, $how) {
                this.error($msg);
                console.info(`How to use:\n${$how}`);
            },
            debug: function ($msg) {
                console.info($msg);
            }
        };

        $bjs.isUndefined = function ($value) {
            return (typeof $value === 'undefined');
        };

        $bjs.isType = function ($value, $type) {
            if (!this.isUndefined($value) && !this.isUndefined($type)) {
                return (!this.isUndefined($value) && $value && (typeof $value === $type));
            } else {
                this.log.how(`$Ibsen.isType(value, typeof) require value and typeof check.`, `$Ibsen.isType($debug, 'boolean');`);
            }
        };

        $bjs.hasSupport = function ($has) {
            if (this.isType($has, 'string')) {
                return (($has in window) && window[$has] !== null);
            } else {
                this.log.how(`$Ibsen.hasSupport(string) require value has.`, `if ($Ibsen.hasSupport('Notification') { \n\t// code here \n}`);
            }
        };

        $bjs.hasAttr = function ($selector, $has) {
            if (!this.isUndefined($selector) && !this.isUndefined($has)) {
                return !this.isUndefined($($selector).attr($has));
            } else {
                this.log.how(`$Ibsen.hasAttr(selector, string) require selector and value has.`, `if ($Ibsen.hasAttr('#body', 'valid') { \n\t// code here \n}`);
            }
        };

        $bjs.validate = function ($selector, $valid_text) {
            if (!this.isUndefined($selector) && !this.isUndefined($valid_text)) {
                return $(document).on('keypress', $selector, function (a) {
                    var c = a.which, d = a.keyCode, e = String.fromCharCode(c).toLowerCase(), f = $valid_text;
                    (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault();
                });
            } else {
                this.log.how(`$Ibsen.validate(selector, string) require selector and char valid input.`, `$Ibsen.validate('#dni, #telephone', '0123456789-.');`);
            }
        };

        $bjs.tools = {
            paste:         function () {
                this.exec('paste');
            },
            copy:          function () {
                this.exec('copy');
            },
            cut:           function () {
                this.exec('cut');
            },
            hasSupport:    function ($command) {
                if (!!document.queryCommandSupported($command)) {
                    return true;
                } else {
                    $bjs.log.error(`execCommand("${$command}") is not supported in your browser.`);
                }
            },
            exec:          function ($command, $val) {
                if (this.hasSupport($command)) {
                    return document.execCommand($command, false, ($val || ''));
                }
            },
            is:            function ($rg, $test) {
                return RegExp($rg, "i").test($test || window.navigator.userAgent);
            },
            browser_match: function ($user_agent) {
                if ($bjs.isUndefined($user_agent)) {
                    $user_agent = window.navigator.userAgent;
                }

                $user_agent = $user_agent.toLowerCase();
                $css        = [];

                $match = /(edge)\/([\w.]+)/.exec($user_agent) ||
                    /(opr)[\/]([\w.]+)/.exec($user_agent) ||
                    /(chrome)[ \/]([\w.]+)/.exec($user_agent) ||
                    /(iemobile)[\/]([\w.]+)/.exec($user_agent) ||
                    /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec($user_agent) ||
                    /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec($user_agent) ||
                    /(webkit)[ \/]([\w.]+)/.exec($user_agent) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec($user_agent) ||
                    /(msie) ([\w.]+)/.exec($user_agent) ||
                    $user_agent.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec($user_agent) ||
                    $user_agent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec($user_agent) ||
                    /(gecko)[\/]([\w.]+)/.exec($user_agent) ||
                    [];

                $platform_match = /(ipad)/.exec($user_agent) ||
                    /(ipod)/.exec($user_agent) ||
                    /(windows phone)/.exec($user_agent) ||
                    /(iphone)/.exec($user_agent) ||
                    /(kindle)/.exec($user_agent) ||
                    /(silk)/.exec($user_agent) ||
                    /(android)/.exec($user_agent) ||
                    /(win)/.exec($user_agent) ||
                    /(mac)/.exec($user_agent) ||
                    /(linux)/.exec($user_agent) ||
                    /(cros)/.exec($user_agent) ||
                    /(playbook)/.exec($user_agent) ||
                    /(bb)/.exec($user_agent) ||
                    /(blackberry)/.exec($user_agent) ||
                    [];

                $browser = {};
                $matched = {
                    browser:       $match[5] || $match[3] || $match[1] || 'Other',
                    version:       $match[2] || $match[4] || 0,
                    versionNumber: $match[4] || $match[2] || 0,
                    platform:      $platform_match[0] || 'Other'
                };

                if ($matched.browser) {
                    $browser[$matched.browser] = true;
                    $browser.version           = $matched.version;
                    $browser.versionNumber     = parseInt($matched.versionNumber, 10);
                }

                if ($matched.platform) {
                    $browser[$matched.platform] = true;
                }

                if ($browser.android || $browser.bb || $browser.blackberry || $browser.ipad || $browser.iphone || $browser.ipod || $browser.kindle || $browser.playbook || $browser.silk || $browser["windows phone"]) {
                    $browser.mobile = true;
                    $css.push('mobile');
                }

                if ($browser.cros || $browser.mac || $browser.linux || $browser.win) {
                    $browser.desktop = true;
                    $css.push('desktop');
                }

                if ($browser.chrome || $browser.opr || $browser.safari) {
                    $browser.webkit = true;
                    $css.push('webkit');
                }

                if ($browser.rv || $browser.iemobile) {
                    $matched.browser = 'msie';
                    $browser['msie'] = true;
                }

                if ($browser.edge) {
                    delete $browser.edge;
                    $matched.browser   = 'msedge';
                    $browser['msedge'] = true;
                }

                if (($browser.safari && $browser.blackberry) || $browser.bb) {
                    $matched.browser       = 'blackberry';
                    $browser['blackberry'] = true;
                }

                if ($browser.safari && $browser.playbook) {
                    $matched.browser     = 'playbook';
                    $browser['playbook'] = true;
                }

                if ($browser.opr) {
                    $matched.browser  = 'opera';
                    $browser['opera'] = true;
                }

                if ($browser.safari && $browser.android) {
                    $matched.browser    = 'android';
                    $browser['android'] = true;
                }

                if ($browser.safari && $browser.kindle) {
                    $matched.browser   = 'kindle';
                    $browser['kindle'] = true;
                }

                if ($browser.safari && $browser.silk) {
                    $matched.browser = 'silk';
                    $browser['silk'] = true;
                }

                if ($browser.mozilla) {
                    $matched.browser    = 'firefox';
                    $browser['firefox'] = true;
                }

                $version = function ($value, $re) {
                    $value = $value.replace(".", "_");
                    var $i = $value.indexOf('_'), $version = "";

                    while ($i > 0) {
                        $version += " " + $re + $value.substring(0, $i);
                        $i = $value.indexOf('_', $i + 1);
                    }

                    $version += " " + $value + $re;

                    return $version;
                };

                $is = $bjs.tools.is;

                $browser.name     = $matched.browser;
                $browser.platform = $matched.platform;
                $browser.os       = $is('j2me') ? 'j2me' : $is('ipad|ipod|iphone') ? ((/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test($user_agent) ? 'ios' + $version('ios', RegExp.$2) : '') + ' ' + (/(ip(ad|od|hone))/gi.test($user_agent) ? RegExp.$1 : ""))
                    : $is('playbook') ? 'playbook'
                    : $is('kindle|silk') ? 'kindle'
                    : $is('playbook') ? 'playbook'
                    : $is('mac') ? 'mac' + (/mac os x ((\d+)[.|_](\d+))/.test($user_agent) ? ( ' mac' + (RegExp.$2) + ' mac' + (RegExp.$1).replace('.', "_")  ) : '' )
                    : $is('win') ? 'win' + (
                    $is('windows nt 6.2') ? ' win8'
                        : $is('windows nt 6.1') ? ' win7'
                        : $is('windows nt 6.0') ? ' vista'
                        : $is('windows nt 5.2') || $is('windows nt 5.1') ? ' win_xp'
                        : $is('windows nt 5.0') ? ' win_2k'
                        : $is('windows nt 4.0') || $is('WinNT4.0') ? ' win_nt'
                        : ''
                ) : $is('freebsd') ? 'freebsd' : ($is('x11|linux')) ? 'linux' : '';

                $css.push($browser.name);
                $css.push($browser.name + $browser.versionNumber);
                $css.push($browser.os);
                $css.push('js');

                document.body.className = (document.body.className + $css.join(' '));

                return $browser;
            }
        }

        $bjs.browser       = $bjs.tools.browser_match(window.navigator.userAgent);
        $bjs.browser.match = $bjs.tools.browser_match;

        window.$Ibsen = $bjs;
    } else {
        window.$Ibsen = {};
        console.error(`$IbsenJS require jQuery. Download http://jquery.com/download/`);
    }
})(window.jQuery);