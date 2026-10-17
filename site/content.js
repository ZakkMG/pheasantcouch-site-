/* =====================================================================
   PHEASANTCOUCH.COM: THE WORDS, LINKS AND PICTURES FOR EVERY PAGE
   =====================================================================
   This is the file you edit. The pages read everything from here.

   How:
     1. Open this file in Notepad (right-click > Open with > Notepad).
     2. Change the words between the quotes "like this".
     3. Save, then refresh the page in your browser.

   Rules that keep it working:
     - Keep the quotes around text, and the commas between items.
     - Each "string" inside [ square brackets ] is its own paragraph.
     - Leave a link as "" (empty quotes) and its button disappears.
     - Need a quote mark inside text? Use the curly ones: “ ” ’
     - Lines starting with // and text inside the slash-star markers
       are notes for you. The site ignores them.

   If a page goes blank or shows a red bar after an edit, a quote or a
   comma went missing. Undo (Ctrl+Z), save, refresh, and try again.
   ===================================================================== */

window.SITE = {

  /* The address the site lives at. Used for share previews and the sitemap. */
  domain: "https://pheasantcouch.com",

  /* One inbox for everything: contact, press, support, the privacy page.
     Set up forwarding before you go live (README, "Email"). */
  email: "hello@pheasantcouch.com",


  /* =================================================================
     THE STUDIO  (the homepage)
     ================================================================= */
  studio: {
    name: "Pheasant Couch Productions",
    shortName: "Pheasant Couch",
    founder: "Zakk M.G.",
    year: "2026",

    /* The line under the big logo. */
    tagline: "We take ridiculous ideas very seriously.",

    /* "On the couch" section. One string per paragraph. */
    about: [
      "Pheasant Couch Productions is the game studio of Zakk M.G.",
      "The house rule is simple: take a ridiculous premise and play it completely straight. Shrink the exterminator. Give the rat a wizard hat and a loaner wand. Then build it properly, with a real upgrade tree, real boss phases, a radio dispatcher with opinions, and an original soundtrack made in-house.",
      "The first release is Pew Pew Pest Control, headed for Steam, iOS and Android. More is warming up on the couch."
    ],

    /* The credits card next to "On the couch". Each line is [label, value]. */
    credits: [
      ["Founder", "Zakk M.G."],
      ["First game", "Pew Pew Pest Control"],
      ["House band", "Zakk M.G.’s Automaton Drafting Band"]
    ],

    /* Social links for the Contact section. Remove the two slashes in
       front of a line to switch it on, then put your real link in. */
    social: [
      // { label: "YouTube", url: "https://www.youtube.com/@yourname" },
      // { label: "Discord", url: "https://discord.gg/yourinvite" },
      // { label: "Bluesky", url: "https://bsky.app/profile/yourname" },
      // { label: "Steam", url: "https://store.steampowered.com/developer/yourpage" },
    ]
  },


  /* =================================================================
     GAMES
     The first game in this list is the one featured on the homepage.
     Each game also has its own page file (for this one,
     pew-pew-pest-control.html). README, "Adding your next game",
     shows how to add another.
     ================================================================= */
  games: [
    {
      slug: "pew-pew-pest-control",        /* ties this entry to its page; leave it alone */
      page: "pew-pew-pest-control.html",
      name: "Pew Pew Pest Control",
      titleLines: ["Pew Pew", "Pest Control"],   /* how the big title breaks */

      tagline: "You came to shrink one rat. It shrank you first.",

      /* Short version, used on the homepage. */
      pitch: "A first-person arcade shooter where the exterminator is two centimeters tall, the finger guns fire for real, and the rat wears a wizard hat.",

      /* Long version, used at the top of the game's own page. */
      lede: "Mildew Falls has a rat problem, and the rats have a sludge problem: something green is leaking out of the storm drains, and the rats that drink it come back wearing wizard hats. Now you’re two centimeters tall, your finger guns fire for real, and the kitchen floor is a war zone. Shoot the trash, squash the roaches, find the rat.",

      status: "Version 8 is playable in your browser. Steam, iOS and Android builds are being packaged.",
      platforms: ["Windows", "macOS", "Linux", "iOS", "Android", "Browser"],

      /* Store buttons. Fill in each url as its store page goes live.
         An empty url hides that button everywhere. */
      buttons: {
        playBrowser: { label: "Play version 8 in your browser", url: "https://claude.ai/artifact/CSCQXFU8akTL4C5qpxc1FJ" },
        steam:       { label: "Wishlist on Steam", url: "" },
        appStore:    { label: "App Store", url: "" },
        googlePlay:  { label: "Google Play", url: "" }
      },

      /* Pictures. Paths start from the site folder. */
      heroImage: "assets/games/pew-pew-pest-control/hero.jpg",
      cardImage: "assets/games/pew-pew-pest-control/screens/kitchen-floor.jpg",
      cardCaption: "Eye level at two centimeters",

      /* The work-order card on the game page. Each line is [label, value]. */
      workOrder: {
        number: "0427",
        room: "Kitchen",
        lines: [
          ["Problem", "1 rat, hiding spot unknown, possibly magic"],
          ["Also", "Roaches. Many roaches."],
          ["Mess", "Breakfast, all over the floor"],
          ["Tools", "Index fingers (loaded)"],
          ["Note", "Client says it “looked at her funny.” Dark by 7."]
        ],
        stamp: "Approved"
      },

      about: [
        "Pew Pew Pest Control is a first-person arcade shooter where the exterminator is the small one. A routine call in Mildew Falls goes wrong, you get hit with the shrink, and the client’s kitchen becomes a level: takeout boxes are cover, the fridge is a cliff, and the roach you were sent to squash is now something you can ride.",
        "Every job starts the same way: a work order, a mess, a timer, and a rat somewhere in the walls. Clean the floor, bank crumbs, buy upgrades between jobs, and push deeper into the house. The rat talks. The dispatcher on your radio would like you to stop climbing into appliances. Neither of them is on your side.",
        "When the job goes sideways, it goes big: there is a breakout, there is a town, and there is a president who would rather not be involved."
      ],

      /* Feature cards: a tape label, a title, a sentence or two. */
      features: [
        { tag: "Guns",    title: "Finger guns that fire for real", text: "Point, hold, pew. Pick your shooting hand, flick bugs off your boots, and learn which roaches dodge." },
        { tag: "Loot",    title: "Crumbs are currency",            text: "Clear the floor, bank crumbs, and spend them on a tiered upgrade tree between jobs. Damage, fire rate, health, and a few you won’t see coming." },
        { tag: "Mounts",  title: "Ride the roach",                 text: "Break one, climb on, and the kitchen gets a lot faster. The roach has its own health bar, so don’t crash it into the stove." },
        { tag: "Boss",    title: "The rat has a hat and a wand",   text: "A three-phase fight with a talking rat in a loaner wizard hat. Knock the hat off. Take the wand. Watch what happens when it splits." },
        { tag: "Rampage", title: "Mildew Falls, flattened",        text: "When the sludge gets to you, the game leaves the kitchen. Twenty-six buildings, trillions of hit points each. You will manage." },
        { tag: "Extras",  title: "110 achievements",               text: "A wall clock you can shoot, fridge pictures you can burn, wardrobe pieces to find, and a few residents of the kitchen who aren’t supposed to be there." }
      ],

      /* Screenshot gallery. Put the image in the game's screens folder,
         then add a line here. 16:9 images look best. */
      screens: [
        { file: "assets/games/pew-pew-pest-control/screens/title-screen.jpg",  caption: "The title screen: your work order and the controls." },
        { file: "assets/games/pew-pew-pest-control/screens/kitchen-floor.jpg", caption: "Eye level at two centimeters: the client’s kitchen." }
      ],

      soundtrack: {
        artist: "Zakk M.G.’s Automaton Drafting Band",
        blurb: "Six original tracks, made for the game. Two of them have to be earned.",
        /* "plays" says where each track turns up. Add a url if a track
           goes up on a store, and it gets a Listen button. */
        tracks: [
          { title: "Izing Remina",            plays: "Title and end screens", url: "" },
          { title: "Hypnotic Mind",           plays: "The kitchen",           url: "" },
          { title: "Oasis",                   plays: "The rat fight",         url: "" },
          { title: "Dancing in Moonlight",    plays: "The victory dance",     url: "" },
          { title: "Nosedive (Instrumental)", plays: "The opening drive · unlocks with Pest Control", url: "" },
          { title: "Crawling in my Crawl",    plays: "The town · unlocks with Rat Catcher",           url: "" }
        ],
        /* Other places to hear the band. */
        more: [
          { label: "EMP on Beatport", url: "https://www.beatport.com/track/emp/22825684" },
          { label: "Behold! on Amazon Music", url: "https://www.amazon.com/Behold-Zakk-M-G-s-Automaton-Drafting/dp/B0G2JGTVWH" }
        ]
      },

      press: {
        facts: [
          ["Developer", "Zakk M.G."],
          ["Publisher", "Pheasant Couch Productions (self-published)"],
          ["Genre", "First-person arcade shooter"],
          ["Engine", "Phaser 4 + three.js, Electron on desktop"],
          ["Platforms", "Windows, macOS, Linux, iOS, Android, browser"],
          ["Release", "TBA"],
          ["Price", "TBA"]
        ]
      }
    }

    /* Your next game goes here: put a comma after the } above, then paste
       a copy of the whole { ... } block and change the words. */
  ],


  /* =================================================================
     NEWS / DEV LOG   (newest first)
     game: "pew-pew-pest-control" also shows the post on that game's page.
     game: "" keeps it on the homepage only.
     ================================================================= */
  news: [
    { date: "Oct 2026", game: "",                     title: "The studio has a front door", text: "Pheasant Couch Productions now lives at pheasantcouch.com." },
    { date: "Oct 2026", game: "pew-pew-pest-control", title: "The soundtrack is in", text: "Six tracks by Zakk M.G.’s Automaton Drafting Band now score the game, from the title screen to the town." },
    { date: "Oct 2026", game: "pew-pew-pest-control", title: "Store packaging underway", text: "Steam hookup (achievements, SteamPipe) and the mobile wrapper are in. Next up: store pages, ratings, and a release date." },
    { date: "Oct 2026", game: "pew-pew-pest-control", title: "Ported to Phaser 4 + three.js", text: "The game now runs on Phaser 4 with three.js doing the 3D, wrapped in Electron for desktop." },
    { date: "Oct 2026", game: "pew-pew-pest-control", title: "Version 8 is out", text: "The browser build is public. New in 8: a full error and stress pass, faster loading, and fewer ways for the rat to cheat." }
  ],


  /* =================================================================
     ADS
     mode: "off"      no ads anywhere
           "house"    your own promos (below). No ad network, no tracking.
           "adsense"  Google AdSense. An ad spot with no ad unit ID yet
                      shows your own promo instead, so nothing sits empty
                      while Google reviews the site.
     The privacy page switches its wording to match. Turning AdSense off
     later also means deleting the AdSense line at the top of each page
     (README, "Ads").
     ================================================================= */
  ads: {
    mode: "adsense",

    adsense: {
      client: "ca-pub-5125837010207079",
      /* After Google approves the site, make two display ad units named
         "home" and "game" and paste their ad unit IDs here, like "1234567890". */
      slots: { home: "", game: "" }
    },

    /* Your own promos. One spot on the homepage, one on the game page.
       A promo with an empty url stays hidden. */
    house: {
      home: { text: "The soundtrack is out there: EMP by Zakk M.G.’s Automaton Drafting Band.", button: "Listen on Beatport", url: "https://www.beatport.com/track/emp/22825684" },
      game: { text: "Pew Pew Pest Control is coming to Steam. Wishlist it and Steam tells you the day it lands.", button: "Wishlist on Steam", url: "" }
    }
  },


  /* The small print at the bottom of every page. */
  footer: {
    line: "Zakk M.G. is not Zakk Wylde."
  }
};
