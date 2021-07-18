
/*
 >  Meisam Farahani
 >  Full-stack .NET Developer
 >  https://meisamfarahani.ir
 */

// Extensions

if (!String.prototype.trimEnd)
    /**
     * Removes all trailing occurrences of the string 'c' from the current String object and returns the result.
     *
     * @param {string} c    Unicode character or string to remove (default=' '(space))
     * @param {boolean} matchCase    Case sensitivity, false for case insensitive (default=true)
     * @param {number} occurrences  Number of occurrences to be removed, -1 for all (default=-1)
     */
    String.prototype.trimEnd = function (c = ' ', matchCase = true, occurrences = -1) {
        if (this != null)
            if (c != ' ')
                if (this.toLowerCase().endsWith(c.toLowerCase())) {
                    var r = this;
                    var t = r;
                    do {
                        t = r;
                        r = r.replace(new RegExp(c.escapeRegExp() + "*$", (matchCase ? '' : 'i')), '');
                        occurrences--;
                    } while (r != t && occurrences != 0)
                    return r;
                }
        return this.replace(/\s+$/, '');
    }

if (!String.prototype.trimStart)
    /**
     * Removes all leading occurrences of the string 'c' from the current String object and returns the result.
     *
     * @param {string} c    Unicode character or string to remove (default=' '(space))
     * @param {boolean} matchCase    Case sensitivity, false for case insensitive (default=true)
     * @param {number} occurrences  Number of occurrences to be removed, -1 for all (default=-1)
     */
    String.prototype.trimStart = function (c = ' ', matchCase = true, occurrences = -1) {
        if (c != ' ')
            if (this.toLowerCase().startsWith(c.toLowerCase())) {
                var r = this;
                var t = r;
                do {
                    t = r;
                    r = r.replace(new RegExp("^" + c.escapeRegExp() + "*", (matchCase ? '' : 'i')), '');
                    occurrences--;
                } while (r != t && occurrences != 0)
                return r;
            }
        return this.replace(/^\s+/, '');
    }

if (!String.prototype.escapeRegExp)
    /**
     * Puts a backslash in front of all the RegExp special characters of the current String object.
     */
    String.prototype.escapeRegExp = function () {
        return this.replace(/[.*+?^${}()|[\]\/\\]/g, "\\$0");
    };

if (!String.prototype.trimOrig) {
    String.prototype.trimOrig = String.prototype.trim;

    /**
     * Removes all leading and trailing occurrences of the string 'c' from the current String object and returns the result.
     * 
     * @param {string} c    Unicode character or string to remove (default=' '(space))
     * @param {boolean} matchCase    Case sensitivity, false for case insensitive (default=true)
     * @param {number} occurrences  Number of occurrences to be removed, -1 for all (default=-1)
     */
    String.prototype.trim = function (c = ' ', matchCase = true, occurrences = -1) {
        if (c != ' ') {
            var _occur = occurrences;
            return this.trimEnd(c, matchCase, occurrences).trimStart(c, matchCase, occurrences);
        }
        return this.trimOrig();
    }
}

if (!String.prototype.encodeHTML)
    String.prototype.encodeHTML = function () {
        return this.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

if (!String.prototype.decodeHTML)
    String.prototype.decodeHTML = function () {
        return this.replace(/&apos;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&amp;/g, '&');
    };


// Adds support for CustomEvent to IE
var CustomEvent;
CustomEvent = function (event, params) {
    var evt;
    params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
    };
    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
};
CustomEvent.prototype = window.Event.prototype;
window.CustomEvent = CustomEvent;

// End: Extensions

var jsHelper = {
    /**
     * Returns a new string that is equivalent to the 'input' except that all instances of 'find' are replaced with 'replace'. If 'find' is not found in the 'input', the method returns the 'input' unchanged.
     *
     * @param {string}  input  A string that is equivalent to the 'input' except that all instances of find are replaced with 'replace'. If 'find' is not found in the current instance, the method returns the 'input' unchanged.
     * @param {string}  find   The string to be replaced.
     * @param {string}  replace The string to replace all occurrences of 'find'.
     */
    replaceAllString(input, find, replace) {
        try {
            return input.replace(new RegExp(find, "gi"), replace);
        } catch (ex) { return input; }
    },

    /**
     * Returns Decoded Url Parameter by its Title(key).
     *
     * @param {string} key  Url Parameter Title
     * @param {string} [query] Url Search Section (default=window.location.search)
     */
    getUrlParamEncoded(key, query = window.location.search) {
        var re = new RegExp("[?|&]" + key + "=(.*?)&");
        var matches = re.exec(query + "&");
        if (!matches || matches.length < 2)
            return "";
        return decodeURIComponent(matches[1].replace("+", " "));
    },

    /**
     * Sets and Encodes Url Parameter Value.
     *
     * @param {string} key  Url Parameter Title
     * @param {string} key  Url Parameter Value
     * @param {string} [query] Url Search Section (default=window.location.search)
     */
    setUrlParamEncoded(key, value, query = window.location.search) {
        var q = query + "&";
        var re = new RegExp("[?|&]" + key + "=.*?&");
        if (!re.test(q))
            q += key + "=" + encodeURI(value);
        else
            q = q.replace(re, "&" + key + "=" + encodeURIComponent(value) + "&");
        q = q.trimStart("&").trimEnd("&");
        return q[0] == "?" ? q : q = "?" + q;
    },

    /**
     * Returns a random integer that is within a specified range. The integer is greater than or equal to min and less than max.
     *
     * @param {number} min  The inclusive lower bound of the random number returned.
     * @param {number} max  The exclusive upper bound of the random number returned. max must be greater than or equal to min.
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    supportViewportUnits() {
        var div = document.createElement("DIV");
        div.id = 'supportViewportUnits';
        div.setAttribute('style', 'height:0;width:100vw;position:absolute;z-index:-1')
        document.body.appendChild(div);

        var d = div.offsetWidth - window.innerWidth;
        var result = false;
        setTimeout(function () {
            div.remove();
        }, 300);
        if ((d == 0) || (d >= 15 && d <= 20)) {
            result = true;
        }
        return result;
    },

    getMobileOS() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return 'Windows Phone';
        }

        if (/android/i.test(userAgent)) {
            return 'Android';
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if ([
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            // iPad on iOS 13 detection
            || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)) {
            return 'iOS';
        }

        return 'unknown';
    },

    iOSversion() {

        if (getMobileOS() == 'iOS') {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return parseFloat([parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]);
        }

        return 0;
    },

    viewport() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    },

    getPersianDigit(input) {
        var inputS = input.toString();
        if (inputS.length > 0) {
            var fardigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            var result = '';
            for (var i = 0; i < inputS.length; i++) {
                result += fardigits[inputS[i]] ? fardigits[inputS[i]] : inputS[i];
            }
            return result;
        }
        return input;
    },

    getEnglishDigit(input, removeLetters, integer, signed, eventType) {
        var inputS = input.toString();
        if (inputS.length > 0) {
            removeLetters = removeLetters || false;
            integer = integer || false;
            signed = signed || false;
            eventType = eventType || '';

            var fardigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            var engdigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '/', ','];

            if (integer) {
                engdigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            }

            var result = '';

            if (signed)
                if (inputS[0] == '-')
                    result = '-';

            for (var i = 0; i < inputS.length; i++) {
                result += fardigits.indexOf(inputS[i]) > -1 ? fardigits.indexOf(inputS[i]) : ((removeLetters && engdigits.indexOf(inputS[i]) < 0) ? '' : inputS[i]);
            }

            if (!integer && removeLetters) {
                result = result.replace('/', '.').replace(',', '.');
                if (result.indexOf('-.') == 0) {
                    result = result.replace('-.', '-0.');
                } else if (result.indexOf('.') == 0) {
                    result = result.replace('.', '0.');
                }

                if (result.indexOf('.') > 0)
                    if (result.indexOf('.') != result.lastIndexOf('.')) {
                        var temp = result.split('.');

                        result = temp[0] + '.';

                        for (var ii = 1; ii < temp.length; ii++) {
                            result += temp[ii];
                        }
                    }

                if (eventType == 'blur' || eventType == 'focusout' || eventType == 'paste')
                    if (result.lastIndexOf('.') == result.length - 1) {
                        result = result.replace('.', '');
                    }
            }
            return result;
        }
        return input;
    },

    getAllIndexes(array, value) {
        var indexes = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value)
                indexes.push(i);
        }
        return indexes;
    },

    //  shuffles elements of an input array
    shuffle(arrayToShuffle) {
        if (arrayToShuffle != null && arrayToShuffle.length > 0) {
            var j, x, i = 0;
            for (i = arrayToShuffle.length; i; i--) {
                j = getRandomInt(0, arrayToShuffle.length - 1);
                x = arrayToShuffle[i - 1];
                arrayToShuffle[i - 1] = arrayToShuffle[j];
                arrayToShuffle[j] = x;
            }
        }
        return arrayToShuffle;
    },

    // seperates numbers every three digits
    getCurrencyFormat(number, separator) {
        try {
            separator = separator || ',';
            if (number != null) {
                return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator);
            }
        }
        catch (ex) {
            console.log(ex);
            return number;
        }
    },

    setCookie(name, value, expireSeconds) {
        try {
            if (name != null && name.length > 0) {
                var d = new Date();
                d.setTime(d.getTime() + expireSeconds * 1000);
                var exp = 'expires=' + d.toUTCString();
                document.cookie = name + '=' + value + ';' + exp;
                return true;
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return false;
    },

    getCookie(name) {
        try {
            if (name != null && name.length > 0) {
                name += '=';

                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt('0') == ' ') {
                        c = c.substring(1);
                    }

                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return '';
    },

    deleteCookie(name) {
        try {
            if (name != null && name.length > 0) {
                document.cookie = name + '=;' + 'expires=Wed; 01 Jan 1970';
                return true;
            }
        }
        catch (ex) { console.log(ex); }
        return false;
    },

    isInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },

    getListEvents(dom) {
        var result = [];
        for (var key in dom) {
            if (key.indexOf('on') === 0) {
                result.push(key.slice(2));
            }
        }
        return result.join(' ');
    },

    getThumbUrl(input, thumbWidth, thumbHeight) {
        input = input || '';
        thumbWidth = thumbWidth || 0;
        thumbHeight = thumbHeight || 0;

        if (input.length < 1)
            return ionput;

        if (thumbWidth < 1)
            return input;

        var thumbSize = thumbWidth.toString();

        if (thumbHeight > 0)
            thumbSize += ("x" + thumbHeight.toString());

        var result = input.substring(0, input.lastIndexOf('/'));

        var fileName = input.substring(input.lastIndexOf('/'));

        return (result + "/" + thumbSize.toString() + fileName);
    },

    copyToClipboard(elem) {

        if (elem) {
            // create hidden text element, if it doesn't already exist
            var targetId = "_hiddenCopyText_";
            var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
            var origSelectionStart, origSelectionEnd;
            if (isInput) {
                // can just use the original source element for the selection and copy
                target = elem;
                origSelectionStart = elem.selectionStart;
                origSelectionEnd = elem.selectionEnd;
            } else {
                // must use a temporary form element for the selection and copy
                target = document.getElementById(targetId);
                if (!target) {
                    var target = document.createElement("textarea");
                    target.style.position = "absolute";
                    target.style.left = "-9999px";
                    target.style.top = "0";
                    target.id = targetId;
                    document.body.appendChild(target);
                }
                target.textContent = elem.textContent;
            }
            // select the content
            var currentFocus = document.activeElement;
            target.focus();
            target.setSelectionRange(0, target.value.length);
            // copy the selection
            var succeed;
            try {
                succeed = document.execCommand("copy");

            } catch (e) {

                succeed = false;
            }
            // restore original focus
            if (currentFocus && typeof currentFocus.focus === "function") {
                currentFocus.focus();
            }

            if (isInput) {
                // restore prior selection
                elem.setSelectionRange(origSelectionStart, origSelectionEnd);
            } else {

                // clear temporary content
                target.textContent = "";
            }
            return succeed;
        }
    }
}
