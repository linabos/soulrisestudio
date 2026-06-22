/*
 * Cookie consent + consent-gated marketing trackers.
 * Loads the Meta Pixel and the Instagram embed ONLY after the visitor
 * accepts. The choice is stored in localStorage so the banner is shown
 * once. Page-specific events (e.g. ViewContent) register on
 * window._consentQueue and fire after consent is given.
 */
(function () {
    'use strict';

    var PIXEL_ID = '2194947754656140';
    var KEY = 'cookieConsent';
    var POLICY_URL = 'integritetspolicy.html';

    window._consentQueue = window._consentQueue || [];

    function lang() {
        try { return localStorage.getItem('selectedLanguage') === 'sv' ? 'sv' : 'en'; }
        catch (e) { return 'en'; }
    }
    function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

    var loaded = false;
    function loadTrackers() {
        if (loaded) return;
        loaded = true;

        // Meta Pixel
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', PIXEL_ID);
        fbq('track', 'PageView');

        // Fire any queued page-specific events, then make future pushes fire immediately.
        var queued = Array.isArray(window._consentQueue) ? window._consentQueue : [];
        window._consentQueue = { push: function (fn) { try { fn(); } catch (e) {} } };
        queued.forEach(function (fn) { try { fn(); } catch (e) {} });

        // Instagram embed (third-party) — only after consent
        var ig = document.createElement('script');
        ig.async = true;
        ig.src = 'https://www.instagram.com/embed.js';
        document.body.appendChild(ig);
    }

    function removeBanner() {
        var el = document.getElementById('cookie-consent-banner');
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }
    function accept() { setConsent('accepted'); removeBanner(); loadTrackers(); }
    function decline() { setConsent('declined'); removeBanner(); }

    var T = {
        en: {
            text: 'We use cookies for analytics and marketing (Meta Pixel) to improve your experience and our advertising. You can accept or decline. ',
            link: 'Privacy Policy', accept: 'Accept', decline: 'Decline'
        },
        sv: {
            text: 'Vi använder cookies för statistik och marknadsföring (Meta Pixel) för att förbättra din upplevelse och våra annonser. Du kan acceptera eller neka. ',
            link: 'Integritetspolicy', accept: 'Acceptera', decline: 'Neka'
        }
    };

    function showBanner() {
        if (document.getElementById('cookie-consent-banner')) return;
        var t = T[lang()];

        var bar = document.createElement('div');
        bar.id = 'cookie-consent-banner';
        bar.setAttribute('role', 'dialog');
        bar.setAttribute('aria-label', t.link);
        bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2000;background:#2F170F;color:#F0E6D2;padding:1rem 1.25rem;box-shadow:0 -2px 12px rgba(0,0,0,.25);font-size:.95rem;';

        var inner = document.createElement('div');
        inner.style.cssText = 'max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.75rem 1.25rem;';

        var msg = document.createElement('div');
        msg.style.cssText = 'flex:1 1 320px;min-width:240px;line-height:1.5;';
        msg.appendChild(document.createTextNode(t.text));
        var a = document.createElement('a');
        a.href = POLICY_URL; a.textContent = t.link;
        a.style.cssText = 'color:#e6a756;text-decoration:underline;';
        msg.appendChild(a);

        var btns = document.createElement('div');
        btns.style.cssText = 'display:flex;gap:.6rem;flex:0 0 auto;';

        var declineBtn = document.createElement('button');
        declineBtn.type = 'button';
        declineBtn.textContent = t.decline;
        declineBtn.style.cssText = 'background:transparent;color:#F0E6D2;border:1px solid #a69073;border-radius:50px;padding:.5rem 1.4rem;cursor:pointer;font-weight:600;';
        declineBtn.addEventListener('click', decline);

        var acceptBtn = document.createElement('button');
        acceptBtn.type = 'button';
        acceptBtn.textContent = t.accept;
        acceptBtn.style.cssText = 'background:linear-gradient(45deg,#e6a756,#f4c571);color:#2F170F;border:none;border-radius:50px;padding:.5rem 1.6rem;cursor:pointer;font-weight:700;';
        acceptBtn.addEventListener('click', accept);

        btns.appendChild(declineBtn);
        btns.appendChild(acceptBtn);
        inner.appendChild(msg);
        inner.appendChild(btns);
        bar.appendChild(inner);
        document.body.appendChild(bar);
    }

    // Let visitors reopen the banner to change their choice (e.g. from a footer link).
    window.openCookieSettings = function () {
        try { localStorage.removeItem(KEY); } catch (e) {}
        showBanner();
    };

    // Boot
    var c = getConsent();
    if (c === 'accepted') {
        loadTrackers();
    } else if (c === 'declined') {
        // do nothing — no tracking
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showBanner);
        } else {
            showBanner();
        }
    }
})();
