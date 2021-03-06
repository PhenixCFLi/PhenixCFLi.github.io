var DISQUSWIDGETS, disqus_domain, disqus_shortname;
typeof DISQUSWIDGETS == "undefined" && (DISQUSWIDGETS = function () {
    var d = {}, m = document.getElementsByTagName("HEAD")[0] || document.body,
        n = 0,
        f = {}, j = {
            identifier: 1,
            url: 2,
            slug: 3
        };
    d.domain = "disqus.com";
    d.forum = "";
    d.getCount = function () {
        var b, a, k = [],
            g = 0,
            e = 10;
        a = document.getElementsByTagName("A");
        for (var c, l = 0; l < a.length; l++)
            if (c = a[l], c.href.indexOf("#disqus_thread") >= 0 || c.getAttribute("data-disqus-identifier")) {
                var h = void 0,
                    i = void 0;
                (c.hasAttribute ? c.hasAttribute("data-disqus-identifier") : c.getAttribute("data-disqus-identifier") !==
                    null) ? (h = j.identifier, i = c.getAttribute("data-disqus-identifier")) : (c.hasAttribute ? c.hasAttribute("data-disqus-slug") : c.getAttribute("data-disqus-slug") !== null) ? (h = j.slug, i = c.getAttribute("data-disqus-slug")) : (h = j.url, i = c.href.replace("#disqus_thread", ""));
                f[n++] = {
                    element: c,
                    type: h,
                    value: i
                }
            }
        for (b in f) f.hasOwnProperty(b) && k.push(encodeURIComponent(b) + "=" + encodeURIComponent(f[b].type) + "," + encodeURIComponent(f[b].value));
        for (b = k.slice(g, e); b.length > 0;) a = document.createElement("script"), a.type = "text/javascript",
        a.async = !0, a.src = document.location.protocol + "//" + d.forum + "." + d.domain + "/count-data.js?q=1&" + b.join("&"), m.appendChild(a), g += 10, e += 10, b = k.slice(g, e)
    };
    d.displayCount = function (b) {
        for (var a, d, g, e = 0; e < b.counts.length; e++)
            if (a = b.counts[e], d = f[a.uid]) g = a.comments === 0 ? b.text.comments.zero : a.comments == 1 ? b.text.comments.one : b.text.comments.multiple, a = g.replace("{num}", a.comments), d.element.innerHTML = a
    };
    return d
}());
(function () {
    if (typeof disqus_domain != "undefined") DISQUSWIDGETS.domain = disqus_domain;
    DISQUSWIDGETS.forum = disqus_shortname;
    DISQUSWIDGETS.getCount()
})();