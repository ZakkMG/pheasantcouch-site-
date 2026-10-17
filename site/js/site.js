/* =====================================================================
   PHEASANTCOUCH.COM: PAGE BUILDER
   Reads window.SITE from content.js and fills in whichever page is open.
   Everyday edits happen in content.js; this file rarely needs touching.
   ===================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var S = window.SITE;

  function errorBar(html) {
    var bar = document.createElement('div');
    bar.className = 'config-error';
    bar.setAttribute('role', 'alert');
    bar.innerHTML = html;
    body.insertBefore(bar, body.firstChild);
  }

  if (!S) {
    errorBar('<strong>The site couldn’t read content.js.</strong> That almost always means a quote or a comma went missing in the last edit. Undo it (Ctrl+Z), save, and refresh. In Chrome or Edge, press <code>F12</code> and open the Console tab: it names the line.');
    return;
  }

  var page = body.getAttribute('data-page') || 'studio';
  var studio = S.studio || {};
  var games = S.games || [];

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }
  function isExternal(href) { return /^https?:/i.test(href || ''); }
  function link(href, cls, text) {
    var a = el('a', cls, text);
    a.href = href;
    if (isExternal(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }
  function arrow(label, href) { return isExternal(href) ? label + ' ↗' : label; }
  function setText(id, text) {
    var n = $(id);
    if (!n) return;
    n.textContent = text || '';
    n.hidden = !text;
  }
  function paragraphs(into, list) {
    if (!into) return 0;
    var n = 0;
    (Array.isArray(list) ? list : [list]).forEach(function (t) { if (t) { into.appendChild(el('p', null, t)); n++; } });
    return n;
  }
  function hide(id) { var n = $(id); if (n) n.hidden = true; }
  function gameBySlug(slug) {
    for (var i = 0; i < games.length; i++) if (games[i] && games[i].slug === slug) return games[i];
    return null;
  }
  function featuredGame() {
    for (var i = 0; i < games.length; i++) if (games[i] && games[i].featured) return games[i];
    return games[0] || null;
  }
  function fillTitle(node, g) {
    if (!node) return;
    node.textContent = '';
    (g.titleLines && g.titleLines.length ? g.titleLines : [g.name]).forEach(function (line, i) {
      node.appendChild(el('span', i ? 'sub' : null, line));
    });
  }
  function chips(into, list) {
    if (!into) return;
    (list || []).forEach(function (p) { if (p) into.appendChild(el('span', 'chip', p)); });
    into.hidden = !into.children.length;
  }
  /* Store buttons. The first one shown is the main (red) button unless the
     caller already put a main button in front of it. */
  var STORE_ORDER = [['steam', 'tape-blue'], ['appStore', 'tape-black'], ['googlePlay', 'tape-green'], ['playBrowser', 'tape-black']];
  function storeButtons(g, into, firstIsMain) {
    var B = g.buttons || {};
    STORE_ORDER.forEach(function (pair) {
      var b = B[pair[0]];
      if (!b || !b.url) return;
      var color = firstIsMain && !into.children.length ? 'tape-red' : pair[1];
      into.appendChild(link(b.url, 'tape big ' + color, arrow(b.label || pair[0], b.url)));
    });
  }
  function renderNews(ul, items, withGameLink) {
    if (!ul) return 0;
    items.forEach(function (n) {
      if (!n) return;
      var li = el('li');
      li.appendChild(el('span', 'date', n.date || ''));
      var b = el('div');
      b.appendChild(el('h3', null, n.title || ''));
      paragraphs(b, n.text);
      if (withGameLink && n.game && games.length > 1) {   /* only worth saying once there's more than one game */
        var g = gameBySlug(n.game);
        if (g && g.page) b.appendChild(link(g.page, 'game-tag', g.name + ' →'));
      }
      li.appendChild(b);
      ul.appendChild(li);
    });
    return ul.children.length;
  }

  /* ---------- on every page ---------- */
  function fillCommon() {
    var email = S.email || '';
    var values = {
      email: email,
      studio: studio.name || '',
      founder: studio.founder || '',
      year: studio.year || String(new Date().getFullYear()),
      domain: String(S.domain || '').replace(/^https?:\/\//, '').replace(/\/$/, ''),
      games: games.map(function (g) { return g && g.name; }).filter(Boolean).join(', ')
    };
    document.querySelectorAll('[data-fill]').forEach(function (n) {
      var v = values[n.getAttribute('data-fill')];
      if (v !== undefined) n.textContent = v;
    });
    document.querySelectorAll('[data-email-link]').forEach(function (a) {
      if (!email) { a.hidden = true; return; }
      a.href = 'mailto:' + email;
      if (!a.textContent.trim()) a.textContent = email;
    });
    document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
      if (!email) { btn.hidden = true; return; }
      btn.addEventListener('click', function () {
        function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1600); }
        function fallback() {
          var t = document.createElement('textarea');
          t.value = email; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
          document.body.appendChild(t); t.select();
          try { document.execCommand('copy'); done(); } catch (e) { /* nothing else to try */ }
          t.remove();
        }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).then(done, fallback);
        else fallback();
      });
    });
    var copy = $('copy');
    if (copy) copy.textContent = '© ' + values.year + ' ' + values.founder + ' · ' + values.studio;
    setText('footLine', S.footer && S.footer.line);
  }

  /* ---------- the studio homepage ---------- */
  function renderStudio() {
    setText('studioTagline', studio.tagline);

    var g = featuredGame();
    if (!g) hide('games');
    else {
      fillTitle($('featTitle'), g);
      setText('featTagline', g.tagline);
      setText('featPitch', g.pitch);
      var acts = $('featActions');
      if (g.page) acts.appendChild(link(g.page, 'tape big tape-red', 'See the game'));
      storeButtons(g, acts, false);
      acts.hidden = !acts.children.length;
      chips($('featChips'), g.platforms);
      setText('featStatus', g.status);
      var img = $('featImg');
      if (g.cardImage && img) {
        img.src = g.cardImage;
        img.alt = g.cardCaption ? g.name + ': ' + g.cardCaption : 'Screenshot of ' + g.name;
        setText('featCaption', g.cardCaption);
      } else hide('featShot');
    }

    var rest = games.filter(function (x) { return x && x !== g; });
    if (rest.length) {
      $('more-games').hidden = false;
      var grid = $('gamesGrid');
      rest.forEach(function (x) {
        var card = x.page ? link(x.page, 'game-card') : el('div', 'game-card');
        if (x.cardImage) { var im = el('img'); im.src = x.cardImage; im.alt = ''; im.loading = 'lazy'; card.appendChild(im); }
        var b = el('div', 'body');
        b.appendChild(el('h3', null, x.name));
        if (x.pitch) b.appendChild(el('p', null, x.pitch));
        if (x.status) b.appendChild(el('span', 'status', x.status));
        card.appendChild(b);
        grid.appendChild(card);
      });
    }

    if (!paragraphs($('studioAbout'), studio.about)) hide('studio');
    var ul = $('credits');
    (studio.credits || []).forEach(function (row) {
      if (!row) return;
      var li = el('li');
      li.appendChild(el('span', 'role', row[0]));
      li.appendChild(el('span', 'who', row[1]));
      ul.appendChild(li);
    });
    if (!ul.children.length) hide('creditsCard');

    if (!renderNews($('newsList'), S.news || [], true)) hide('news');

    var soc = $('social');
    (studio.social || []).forEach(function (s) { if (s && s.url) soc.appendChild(link(s.url, 'dl', arrow(s.label || s.url, s.url))); });
    soc.hidden = !soc.children.length;
  }

  /* ---------- a game page ---------- */
  function renderGame(slug) {
    var g = gameBySlug(slug);
    if (!g) {
      errorBar('<strong>This page asks for a game called “' + String(slug).replace(/[<>&]/g, '') + '”, but content.js has no game with that slug.</strong> Check that the <code>data-game</code> value at the top of this page matches a <code>slug</code> in content.js.');
      return;
    }

    var bg = $('heroBg');
    if (bg && g.heroImage) bg.style.backgroundImage = 'url("' + g.heroImage + '")';
    setText('kicker', studio.name ? studio.name + ' presents' : '');
    fillTitle($('gameTitle'), g);
    setText('gameTagline', g.tagline);
    setText('gameLede', g.lede);
    var acts = $('gameActions');
    storeButtons(g, acts, true);
    acts.hidden = !acts.children.length;
    chips($('gameChips'), g.platforms);
    setText('gameStatus', g.status);

    var W = g.workOrder;
    if (W && W.lines && W.lines.length) {
      setText('woNumber', 'Work order ' + (W.number || ''));
      setText('woRoom', W.room);
      var dl = $('woLines');
      W.lines.forEach(function (row) { dl.appendChild(el('dt', null, row[0])); dl.appendChild(el('dd', null, row[1])); });
      setText('woStamp', W.stamp);
    } else hide('ticket');

    if (!paragraphs($('gameAbout'), g.about)) hide('about');

    var cards = $('cards');
    (g.features || []).forEach(function (f) {
      if (!f) return;
      var c = el('article', 'card');
      if (f.tag) c.appendChild(el('span', 'tape tape-yellow tag', f.tag));
      c.appendChild(el('h3', null, f.title));
      if (f.text) c.appendChild(el('p', null, f.text));
      cards.appendChild(c);
    });
    if (!cards.children.length) hide('features');

    var shots = $('shots');
    (g.screens || []).forEach(function (sc) {
      if (!sc || !sc.file) return;
      var b = el('button', 'shot');
      b.type = 'button';
      b.setAttribute('aria-label', 'Open screenshot' + (sc.caption ? ': ' + sc.caption : ''));
      var im = el('img'); im.src = sc.file; im.alt = sc.caption || ''; im.loading = 'lazy';
      b.appendChild(im);
      if (sc.caption) { var cap = el('span', 'cap'); cap.appendChild(el('span', 'tape', sc.caption)); b.appendChild(cap); }
      b.addEventListener('click', function () { openLightbox(sc, b); });
      shots.appendChild(b);
    });
    if (!shots.children.length) shots.appendChild(el('div', 'empty', 'Put images in this game’s screens folder and list them under screens in content.js.'));

    var ST = g.soundtrack;
    if (!ST || !(ST.tracks && ST.tracks.length)) hide('soundtrack');
    else {
      setText('stArtist', ST.artist);
      setText('stBlurb', ST.blurb);
      var ol = $('tracks');
      ST.tracks.forEach(function (tr, i) {
        if (!tr) return;
        var li = el('li');
        li.appendChild(el('span', 'n', (i < 9 ? '0' : '') + (i + 1)));
        var t = el('span', 't');
        t.appendChild(el('b', null, tr.title));
        if (tr.plays) t.appendChild(el('span', null, tr.plays));
        li.appendChild(t);
        if (tr.url) li.appendChild(link(tr.url, 'tape tape-blue', 'Listen ↗'));
        ol.appendChild(li);
      });
      var more = $('stMore');
      (ST.more || []).forEach(function (m) { if (m && m.url) more.appendChild(link(m.url, 'tape', arrow(m.label, m.url))); });
      more.hidden = !more.children.length;
    }

    var mine = (S.news || []).filter(function (n) { return n && n.game === g.slug; });
    if (!renderNews($('gameNews'), mine, false)) hide('news');

    var P = g.press || {};
    var facts = $('facts');
    (P.facts || []).forEach(function (row) { if (row) { facts.appendChild(el('dt', null, row[0])); facts.appendChild(el('dd', null, row[1])); } });
    if (S.domain && g.page) {
      facts.appendChild(el('dt', null, 'Website'));
      var dd = el('dd');
      var url = String(S.domain).replace(/\/$/, '') + '/' + String(g.page).replace(/\.html$/, '');
      dd.appendChild(link(url, null, url.replace(/^https?:\/\//, '')));
      facts.appendChild(dd);
    }
  }

  function openLightbox(sc, opener) {
    var box = el('div', 'lightbox');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', sc.caption || 'Screenshot');
    var inner = el('div', 'lightbox-inner');
    var im = el('img'); im.src = sc.file; im.alt = sc.caption || '';
    inner.appendChild(im);
    if (sc.caption) inner.appendChild(el('span', 'tape', sc.caption));
    var close = el('button', 'tape tape-red close', 'Close');
    close.type = 'button';
    box.appendChild(inner);
    box.appendChild(close);
    function shut() { box.remove(); document.removeEventListener('keydown', onKey); if (opener) opener.focus(); }
    function onKey(e) { if (e.key === 'Escape') shut(); }
    close.addEventListener('click', shut);
    box.addEventListener('click', function (e) { if (e.target === box) shut(); });
    document.addEventListener('keydown', onKey);
    body.appendChild(box);
    close.focus();
  }

  /* ---------- ads ---------- */
  function renderAds() {
    var A = S.ads || {};
    var mode = A.mode || 'off';
    var client = String((A.adsense && A.adsense.client) || '').trim();
    var adsenseReady = /^ca-pub-\d{6,}$/.test(client);
    var house = A.house || {};
    /* The AdSense code pasted into a page's <head> loads Google's script on its own. */
    var adsenseTag = document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');

    /* "adsense" without a real client ID loads nothing, so it counts as "off". */
    var slotMode = mode === 'adsense' ? (adsenseReady ? 'adsense' : 'off') : (mode === 'house' ? 'house' : 'off');
    /* The privacy page says whatever is true on the page: if Google's script is there, it gets Google's wording. */
    var privacyMode = (adsenseTag || slotMode === 'adsense') ? 'adsense' : slotMode;
    var housePromos = (slotMode === 'house' || slotMode === 'adsense') && Object.keys(house).some(function (k) { return house[k] && house[k].text && house[k].url; });

    document.querySelectorAll('[data-ads-mode]').forEach(function (n) {
      n.hidden = n.getAttribute('data-ads-mode').split(/\s+/).indexOf(privacyMode) === -1;
    });
    document.querySelectorAll('[data-house-promos]').forEach(function (n) { n.hidden = !housePromos; });

    function showHouse(s) {
      var h = house[s.getAttribute('data-slot')];
      if (!h || !h.text || !h.url) return;
      var box = el('div', 'house-ad');
      box.appendChild(el('p', null, h.text));
      var cls = body.classList.contains('theme-night') ? 'tape big tape-yellow' : 'btn btn-olive';
      box.appendChild(link(h.url, cls, arrow(h.button || 'Take a look', h.url)));
      s.querySelector('.ad-box').appendChild(box);
      s.querySelector('.ad-label').textContent = 'From the couch';
      s.hidden = false;
    }

    var slots = document.querySelectorAll('.ad-slot[data-slot]');
    if (slotMode === 'adsense') {
      var units = 0;
      slots.forEach(function (s) {
        var id = String(((A.adsense.slots || {})[s.getAttribute('data-slot')]) || '').trim();
        if (!id) { showHouse(s); return; }   /* no ad unit yet: your own promo holds the spot */
        var ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', client);
        ins.setAttribute('data-ad-slot', id);
        ins.setAttribute('data-ad-format', 'auto');
        ins.setAttribute('data-full-width-responsive', 'true');
        s.querySelector('.ad-box').appendChild(ins);
        s.querySelector('.ad-label').textContent = 'Advertisement';
        s.hidden = false;
        units++;
      });
      if (!adsenseTag) {   /* only for a page that doesn't carry the AdSense code itself */
        var sc = document.createElement('script');
        sc.async = true;
        sc.crossOrigin = 'anonymous';
        sc.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(client);
        document.head.appendChild(sc);
      }
      for (var i = 0; i < units; i++) (window.adsbygoogle = window.adsbygoogle || []).push({});
    } else if (slotMode === 'house') {
      slots.forEach(showHouse);
    }
  }

  /* ---------- go ---------- */
  fillCommon();
  if (page === 'studio') renderStudio();
  else if (page === 'game') renderGame(body.getAttribute('data-game'));
  renderAds();
})();
