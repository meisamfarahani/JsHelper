/*
 >  Meisam Farahani
 >  Full-stack .NET Developer
 >  https://meisamfarahani.ir
 */

// Extensions

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
    uint32 
}

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

/**
 * Puts a backslash in front of all the RegExp special characters of the current String object
 */
String.prototype.escapeRegExp = function () {
    return this.replace(/[.*+?^${}()|[\]\/\\]/g, "\\$0");
};


var jsHelper = {

    /**
     * Returns a new string that is equivalent to the 'input' except that all instances of 'find' are replaced with 'replace'. If 'find' is not found in the 'input', the method returns the 'input' unchanged.
     *
     * @param {string}  input  A string that is equivalent to the 'input' except that all instances of find are replaced with 'replace'. If 'find' is not found in the current instance, the method returns the 'input' unchanged.
     * @param {string}  find   The string to be replaced.
     * @param {string}  replace The string to replace all occurrences of 'find'.
     *
     * @return {string} A string 
     */
    replaceAllString(input, find, replace) {
        try {
            return input.replace(new RegExp(find, "gi"), replace);
        } catch (ex) { return input; }
    },

    /**
     * Returns Decoded Url Parameter by its Title(key)
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
      * Sets and Encodes Url Parameter Value 
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
    }
}

