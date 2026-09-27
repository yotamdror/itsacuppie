# It's A Cuppie — website

Plain static HTML/CSS/JS. No build step, no framework, no dependencies —
what you see in this repo is exactly what's served. Recreates the original
itsacuppie.com WordPress site (same nav, copy, photos, flavor pages) after
that WordPress install broke permanently.

- **Live site:** https://itsacuppie.com
- **Hosting:** GitHub Pages (this repo, `main` branch)
- **DNS:** Cloudflare (free plan) — dash.cloudflare.com, logged in as you
- **Domain registrar:** GreenGeeks (unchanged, just not used for DNS)

## Preview locally before pushing

```
cd ~/Projects/itsacuppie
python3 -m http.server 8420
open http://localhost:8420/
```

## Making a content edit (fix a typo, change a price, edit a description)

Every page is a plain `.html` file — find it and edit the text directly:

- `index.html` — Home
- `about.html`, `contact-us.html`, `ordering.html`, `gallery.html`
- `flavors.html` — the flavor grid/index
- `flavors/<slug>.html` — one file per flavor (28 of them)

Then:
```
git add -A
git commit -m "describe the change"
git push
```
GitHub Pages rebuilds automatically, usually live within 1–2 minutes.

## Adding a new flavor

There's no templating — copy the pattern from an existing page:

1. Add the photo to `images/uploads/` (see Images below for sizing)
2. Copy an existing file in `flavors/`, e.g. `flavors/kyle.html`, rename it
   to the new flavor's slug, and edit the title/description/image path and
   the prev/next links at the bottom
3. Add a matching card to `flavors.html` in the `.services-wrapper` grid
   (copy one `<div class="services-box col">...</div>` block)
4. Commit and push

## Editing things that repeat on every page (nav, footer, phone number)

Header/nav/footer HTML is duplicated across all ~34 pages (kept intentionally
dependency-free, no include mechanism). For a global text change, search and
replace across all files rather than editing one at a time, e.g.:

```
grep -rl "917-524-8025" *.html flavors/*.html
# then edit each, or use sed carefully:
sed -i '' 's/917-524-8025/NEW-NUMBER/g' *.html flavors/*.html
```

**Colors and fonts are NOT duplicated** — they live in one place,
`css/style.css` (`:root` variables at the top: `--red`, `--gold`, etc.), so
theme-wide style changes only need one edit.

## Images

Live under `images/uploads/YYYY/MM/...`, mirroring the original WordPress
upload paths. To add/replace an image at a reasonable web size without
installing anything (uses macOS's built-in `sips`):

```
sips -Z 800 -s formatOptions 80 /path/to/original.jpg --out images/uploads/2026/09/new-photo.jpg
```
`-Z 800` caps the longest edge at 800px; `formatOptions 80` is JPEG quality.
Use `-Z 1600` for the homepage hero slider images specifically (displayed
larger). The logo (`images/logo.jpg`) is capped at 400px.

## Domain / DNS reference

DNS is managed in Cloudflare (dash.cloudflare.com → itsacuppie.com → DNS →
Records), not GreenGeeks — GreenGeeks only handles registration and currently
delegates nameservers to Cloudflare. Records currently set:

| Type | Name | Value |
|---|---|---|
| A ×4 | `@` | `185.199.108.153` / `.109.153` / `.110.153` / `.111.153` (GitHub Pages) |
| CNAME | `www` | `yotamdror.github.io` |
| MX | `@` | `mx.itsacuppie.com` (priority 30) |
| TXT | `@` | SPF record for the above mail server |

The MX/TXT rows exist only to keep any `@itsacuppie.com` email working
through Network Solutions' mail servers — remove them if/when that hosting
is fully retired and email (if any) is migrated elsewhere.

Custom domain + HTTPS is configured in this repo's **Settings → Pages**.

## Background: where the content came from

The original WordPress database export and `wp-content/uploads` backup were
processed in `~/Projects/cuppies` (a separate, non-git working folder — kept
out of any repo since the SQL export contains password hashes and user
emails). That was a one-time migration; this repo is now the source of
truth going forward. No need to touch that folder again unless recovering
something from the old WordPress content.

## Known open item

Network Solutions hosting (the old broken WordPress install) has **not**
been canceled yet — keep it until HTTPS is fully confirmed working on
itsacuppie.com and everything's been double-checked live.
