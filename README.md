# pheasantcouch.com

The website for Pheasant Couch Productions: a studio homepage that features
Pew Pew Pest Control, the game's own page, a privacy policy and a support page.
Plain files. No build step, no framework, nothing to install to edit it.

```
pheasantcouch-site/
├── README.md          this guide
├── wrangler.jsonc     tells Cloudflare which folder is the website
├── serve.bat          Windows: double-click to preview at http://localhost:8080
├── serve.sh           Mac/Linux: same thing
├── serve.py           the preview server both of those run
└── site/              ← THE WEBSITE. This is the folder you upload.
    ├── content.js                 ← every word, link and picture. Edit this.
    ├── index.html                 the studio homepage
    ├── pew-pew-pest-control.html  the game's page
    ├── privacy.html               privacy policy (app stores need its address)
    ├── support.html               support page (the App Store needs its address)
    ├── 404.html                   shown for addresses that don't exist
    ├── css/style.css              colors and fonts at the top, layout below
    ├── js/site.js                 fills the pages in from content.js
    ├── favicon.ico, site.webmanifest, robots.txt, sitemap.xml, CNAME
    └── assets/
        ├── brand/                 logos at web sizes
        │   └── download/          full-size logos for press and store pages
        ├── icons/                 home-screen and app icons
        ├── og/                    the pictures shown when someone shares a link
        ├── fonts/                 the three typefaces (SIL Open Font License)
        └── games/pew-pew-pest-control/   hero picture and screenshots
```

---

## Editing

**Almost everything lives in `site/content.js`.** Open it in Notepad, change the
words between the quotes, save, refresh the browser. Notes inside the file
explain every part. The rules that keep it working:

- Keep the quotes around text and the commas between items.
- Each `"string"` inside `[ ]` is its own paragraph.
- An empty link (`url: ""`) hides its button everywhere.
- Need a quote mark inside text? Use the curly ones: “ ” ’
- If a page shows a red bar or goes blank after an edit, a quote or comma went
  missing. Undo (Ctrl+Z), save, refresh. In Chrome or Edge, F12 → Console names
  the line.

Common jobs:

| To… | Do this in `content.js` |
| --- | --- |
| Change the homepage line | `studio.tagline` |
| Add a store button | fill in the `url` under the game's `buttons` (Steam, App Store, Google Play) |
| Hide the free browser version | set `playBrowser`'s `url` to `""` |
| Add a news post | copy a line in `news`, put it at the top, change the words |
| Add a screenshot | drop the image in `assets/games/pew-pew-pest-control/screens/`, add a line to `screens` |
| Add YouTube / Discord / Bluesky | remove the `//` in front of the line in `studio.social`, paste your link |
| Change the email address | `email` at the top (it updates every page, including privacy and support) |
| Give a soundtrack track a Listen button | put the store link in that track's `url` |

**Not in content.js:**

- The privacy and support wording is plain text in `privacy.html` and
  `support.html`. Edit it there. (The email address in them still comes from
  content.js.) Change the date on the privacy page when you change the policy.
- Page titles and link-preview text are in the `<head>` at the top of each page.
  Link previews (Discord, iMessage, X, Steam) don't run JavaScript, so those
  lines have to be written out in the page itself.
- Colors and fonts: the `:root` block at the top of `css/style.css`.

### Adding your next game

1. Copy `pew-pew-pest-control.html` and name the copy after the new game, e.g.
   `aerak-nedd.html`.
2. In the copy, find `data-game="pew-pew-pest-control"` near the top and change it
   to the new slug: `data-game="aerak-nedd"`. Update the `<title>`, description
   and `og:` lines in its `<head>`.
3. In `content.js`, inside `games: [ ... ]`, put a comma after the last game's
   closing `}`, paste a copy of a whole game block, and change it: `slug` to
   `"aerak-nedd"`, `page` to `"aerak-nedd.html"`, then the words and pictures.
4. Make a folder `assets/games/aerak-nedd/` for its pictures.
5. Add its address to `sitemap.xml`.

The homepage shows a "More from the couch" row by itself as soon as there's a
second game. The first game in the list stays the featured one; move a block to
the top of the list to feature it instead.

---

## Previewing on your PC

- **Quickest:** double-click `site/index.html`. Everything works from a plain file.
- **Like the real thing:** double-click `serve.bat` (Windows) or run `./serve.sh`
  (Mac/Linux). It opens http://localhost:8080 and behaves the way the live host
  will: `/privacy` works without `.html`, missing pages show your 404 page,
  nothing is cached. It needs Python; if it's missing, the window tells you where
  to get it. To look at it from your phone on the same Wi-Fi, open a Command
  Prompt in this folder and run `serve.bat --lan`.

---

## Putting it on pheasantcouch.com

**Recommended: GitHub + Cloudflare.** The site lives in a GitHub repository and
Cloudflare publishes it every time the repository changes. Free, HTTPS included,
always on, no PC involved, and every past version is kept, so any change can be
undone. Moving your domain's DNS to Cloudflare also unlocks free email forwarding
(next section) and the host-from-your-PC option, so it's step one either way.

### 1. Move the domain's DNS to Cloudflare (skip if you bought it at Cloudflare)

1. Make a free account at cloudflare.com and choose **Add a domain**. Enter
   `pheasantcouch.com` and pick the **Free** plan.
2. Cloudflare shows you two nameservers (names like `xxx.ns.cloudflare.com`).
3. Sign in where you bought the domain, find **Nameservers** for pheasantcouch.com,
   switch to custom nameservers, and paste Cloudflare's two in place of the old ones.
4. Wait for Cloudflare's email saying the domain is active. Often minutes, can be
   up to a day.

### 2. Put the site on GitHub

1. Make a free account at github.com if you don't have one.
2. Create a **private**, **empty** repository at github.com/new named
   `pheasantcouch-site`. Don't add a README, .gitignore or license.
3. Put everything in this folder into it: `README.md`, `wrangler.jsonc`, the
   `serve` files and the `site` folder. If Claude is connected to your GitHub,
   ask it to do this part.

### 3. Connect Cloudflare to the repository

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **GitHub**.
   Sign in to GitHub when asked, and let Cloudflare see `pheasantcouch-site`.
2. Name the project **`pheasantcouch`**. It has to match the `name` in
   `wrangler.jsonc`, or the build fails.
3. Leave the build command empty and keep the deploy command as it is
   (`npx wrangler deploy`). Select **Save and Deploy**.
4. About a minute later it's live at a `workers.dev` address. Click around and
   check it.

### 4. Point pheasantcouch.com at it

1. Open the `pheasantcouch` Worker → **Settings** → **Domains & Routes** →
   **Add** → **Custom domain** → `pheasantcouch.com`.
2. Do it again for `www.pheasantcouch.com`.
3. HTTPS turns on by itself within a few minutes.

### Updating the live site later

Change the files (in GitHub's website editor, on your PC, or by asking Claude) and
commit them to the `main` branch. Cloudflare publishes every commit to `main` in
about a minute. A change made on any other branch gets its own preview address
first (under the Worker's **Previews**), so you can check it before it goes live.

**No GitHub?** Cloudflare also takes a dragged folder: **Workers & Pages** →
**Create application**, then its option to upload files. Drag in the **`site`
folder**, not the whole `pheasantcouch-site` folder. Updating then means
dragging the folder in again each time.

---

## Email: hello@pheasantcouch.com

The site lists **hello@pheasantcouch.com** everywhere. That address doesn't exist
until you set up forwarding, so do this **before** the site goes live, or the
first press email bounces.

Cloudflare Email Routing (free, needs step 1 above):

1. Dashboard → **Compute** → **Email Service** → **Email Routing** → **Onboard Domain**
   → pick pheasantcouch.com → **Done**. It adds the mail records for you.
2. **Destination Addresses** → add your Gmail (or whichever inbox you read) →
   click the link in the verification email it sends.
3. **Routing Rules** → **Create routing rule** → Email pattern `hello`, Action
   **Send to an email**, Destination your inbox → **Save**.
4. Test it from a *different* email account than the one it forwards to.

This receives and forwards. Replies go out from your normal address unless you
also set up sending, which is a separate (and fiddlier) job. If you'd rather use
a different address, change `email` at the top of `content.js`.

Cloudflare moves menus around now and then. If a name above doesn't match,
search the dashboard for "Email Routing" or "Tunnels".

---

## Hosting from your own PC instead

This works, and the files don't change. The safe way is a **Cloudflare Tunnel**:
your PC makes an outgoing connection to Cloudflare, visitors reach the site through
Cloudflare, and you never open ports on your router or reveal your home address.

The catch: the site is only up while the PC is on, awake, online and running the
server. Sleep, a Windows Update restart or a power cut takes pheasantcouch.com
down until you start it again. Publishing through Cloudflare has none of that,
which is why it's the recommendation. If you still want the PC:

1. Do step 1 above (DNS on Cloudflare).
2. Dashboard → **Networking** → **Tunnels** → **Create a tunnel** → give it a name →
   **Create Tunnel**. Choose **Windows**, copy the install command it shows, and
   run it in a Command Prompt opened as Administrator. When the tunnel shows as
   connected, select **Continue**.
3. In the tunnel → **Routes** → **Add route** → **Published application**. Domain:
   `pheasantcouch.com`. Subdomain: `www` (and a second route with the subdomain
   left empty for the bare domain, if the form allows it). **Service URL:**
   `http://localhost:8080` → **Add route**.
4. Start the server: open a Command Prompt in this folder, run
   `serve.bat --no-open`, and leave that window open.
5. In Windows **Settings → System → Power**, set sleep to **Never** while plugged in.

`serve.py` only listens on your own PC (not your network) unless you add `--lan`,
only serves what's inside `site/`, and never lists folders. It's fine for a small
static site behind a tunnel. If the site ever gets real traffic, move it to
Cloudflare's hosting.

---

## Other hosts

The `site` folder works on any static host. If you'd rather keep your DNS where
you bought the domain, **GitHub Pages** is the other free option:

1. Make a repository, upload the *contents* of `site/`, then **Settings → Pages**
   → deploy from the `main` branch, root folder. Custom domain: `pheasantcouch.com`.
   (The `CNAME` file already in the folder keeps that setting from getting lost.)
2. At your registrar, add these DNS records:
   - four **A** records for `@`: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - optional **AAAA** records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - a **CNAME** for `www` pointing to `yourusername.github.io`
3. Back in **Settings → Pages**, tick **Enforce HTTPS** once it appears (it can
   take up to a day).

Email forwarding on that route comes from your registrar instead of Cloudflare;
most offer it free.

---

## Ads

`content.js` → `ads.mode` picks one of three, and the privacy page rewrites its own
ad section to match:

- `"off"`: no ads.
- `"house"` (the setting now): your own promos, one on the homepage and one on the
  game page. Ordinary links, no ad network, no tracking, no consent banner needed.
  The homepage one points at EMP on Beatport. The game-page one is ready for your
  Steam wishlist link and stays hidden until it has one.
- `"adsense"`: Google AdSense in the same two spots.

### Turning on AdSense

1. **Eligibility.** Google needs the account holder to be 18 or older (younger
   applicants apply through a parent or guardian's account), the content to be
   your own, and the site to follow its program policies.
2. Put the site live first, then sign up at adsense.google.com with
   `pheasantcouch.com`.
3. **Verify the site** with the ads.txt method: make a plain text file named
   `ads.txt` in the `site` folder containing exactly this line, with your own
   publisher number, then upload the site again:
   ```
   google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
   ```
   (If Google gives you a meta tag instead, paste it where the comment says in
   `index.html`'s `<head>`.)
4. Wait for approval. Brand-new sites with only a few pages are often turned down
   for "low value content" the first time. A few months of dev-log posts helps.
5. Once approved: **Ads → By ad unit → Display ads**. Make two, named "home" and
   "game". Copy each one's `data-ad-slot` number.
6. In `content.js`: `ads.adsense.client` = your `ca-pub-…` ID, the two slot
   numbers into `slots.home` and `slots.game`, then `mode: "adsense"`.
7. **Privacy & messaging** in AdSense: create and publish a **European regulations**
   message. Google requires a certified consent message for visitors from the EEA,
   the UK and Switzerland; without one, those visitors don't get personalized ads.
8. Leave **Auto ads** off, so Google doesn't scatter extra ads across the pages.

**Honest expectations.** Display ads pay per thousand views, so at a small studio's
traffic the money is pocket change for a long while, and Google only pays out once
your balance passes the payment threshold (US$100 in the US). Content Google
treats as tobacco or recreational-drug related gets fewer advertisers, and the
review looks at the whole site. Until traffic grows, a house ad sending people to
your Steam wishlist is probably worth more than AdSense.

---

## Store listings: which addresses to paste

| Where | Field | Address |
| --- | --- | --- |
| App Store Connect | Privacy Policy URL | `https://pheasantcouch.com/privacy` |
| App Store Connect | Support URL | `https://pheasantcouch.com/support` |
| App Store Connect | Marketing URL | `https://pheasantcouch.com/pew-pew-pest-control` |
| Google Play Console | Privacy policy | `https://pheasantcouch.com/privacy` |
| Google Play Console | Website / email | `https://pheasantcouch.com` · `hello@pheasantcouch.com` |
| Steamworks | Website | `https://pheasantcouch.com/pew-pew-pest-control` |

These short addresses work on Cloudflare (Workers or Pages), GitHub Pages and
`serve.py`. On a host that doesn't drop `.html`, add it: `…/privacy.html`.

---

## Launch checklist

- [ ] DNS on Cloudflare, repository on GitHub, Cloudflare publishing from it,
      pheasantcouch.com and www both connected
- [ ] hello@pheasantcouch.com forwards to your inbox (tested from another account)
- [ ] Decide about the **Play version 8** button (see note below)
- [ ] Store links filled in as each store page goes live
- [ ] More screenshots: two are in, four to eight is a good gallery
- [ ] Share pheasantcouch.com in a Discord DM to yourself and check the preview card
- [ ] Ads: house promos are on; AdSense only after approval (see "Ads")

**About the Play version 8 button.** It sends visitors to the free browser build.
That's a great demo, but if you're selling the full game on Steam, think about
whether you want the whole thing free one click from your homepage. Clearing that
button's `url` hides it.

The privacy policy is written for games and a site that collect nothing, which is
true today. Update it before any game adds analytics, ads, accounts or crash
reporting. It's a solid template, not legal advice.
