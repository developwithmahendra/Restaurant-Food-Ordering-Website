# Saffron & Salt

A three-page website for a modern Indian restaurant. Guests can look through the menu, build an order, and request a table. It's plain HTML, CSS and JavaScript, so there's nothing to install and no build step.

**Live site:** https://developwithmahendra.github.io/Restaurant-Food-Ordering-Website/

> This is a front-end demo. Orders, reservations and messages are not sent anywhere. Each form shows a confirmation on screen and stops there.

## Screenshots

All images live in the `Screenshots/` folder. Drop your captures in with the file names below and they'll show up here.

| Home | Menu |
|---|---|
| ![Home page](Screenshots/home.png) | ![Menu page](Screenshots/menu.png) |

| Order drawer | Book a table |
|---|---|
| ![Order drawer](Screenshots/cart.png) | ![Booking form](Screenshots/booking.png) |

| Mobile |
|---|
| ![Mobile view](Screenshots/mobile.png) |

## What's in it

- **Home** (`index.html`): a hero slider with three featured dishes, a short intro, three "guest favourites", and a call to book.
- **Menu** (`menu.html`): all 11 dishes, filterable by Starters, Mains, Desserts and Drinks. A green dot means vegetarian, a red one means not.
- **Book & Contact** (`contact.html`): a reservation form (name, phone, date, time, guests) and a message form, plus address, phone and opening hours.
- **Order drawer**: slides in from the right on every page. Add dishes, change quantities, see the total, place the order.

## Features

- Hero slider that autoplays every 6 seconds, pauses on hover or focus, supports swipe on touch screens, and doesn't autoplay if the visitor prefers reduced motion.
- The cart is saved in `localStorage`, so it survives a page refresh and carries across pages.
- Form validation with inline error messages (name, 10-digit phone, email, date, time, message of at least 10 characters). The date picker blocks past dates.
- Guest counter limited to 1–12.
- Responsive layout with a collapsing mobile nav, and a tablet breakpoint for the menu grid.
- Automatic dark mode through `prefers-color-scheme`.
- Basic accessibility: ARIA labels, live regions for errors, `Esc` closes the cart, and focus moves into the cart when it opens.

## Project structure

```
.
├── index.html
├── menu.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/            # dish photos (see below)
└── Screenshots/       # images used in this README
```

## Running it locally

1. Download or clone the project.
2. Open `index.html` in a browser.

That's all. If you'd like a local server (handy for testing on your phone), either of these works from the project folder:

```bash
python3 -m http.server 8000
# or
npx serve
```

Then visit `http://localhost:8000`.

## How it works

Everything shared between pages lives in one script, `js/main.js`. Each page includes it, and the script checks which elements exist before doing anything, so the same file runs on all three pages.

- **Menu data** is a single `MENU` array at the top of `main.js`. Each item has an id, category (`c`), name (`n`), description (`d`), price in rupees (`p`), a veg flag (`v`) and an image path (`img`).
- **Cart** is an object of `{ itemId: quantity }`, written to `localStorage` under the key `cart`.
- **Guest favourites** on the home page are pulled from `MENU` by id (Butter Chicken, Paneer Tikka, Gulab Jamun Tart).
- **Forms** share one validator, `bindForm`, driven by a `rules` object keyed by field name.

### Changing things

| I want to... | Edit |
|---|---|
| Add or change a dish | the `MENU` array in `js/main.js` |
| Change the home page favourites | the `[4, 1, 8]` list in `js/main.js` |
| Change booking time slots | the time array inside the `#book` block in `js/main.js` |
| Change colours or fonts | the CSS variables at the top of `css/style.css` |
| Change hero slides | the three `.slide` blocks in `index.html` |
| Change address, phone, hours | `contact.html` and the footer in each page |

## Images

Menu photos are loaded from `images/` using the paths in the `MENU` array (for example `images/paneer-tikka.jpg`). If a file is missing, the image quietly hides itself and the card still looks fine.

The hero slider uses three images referenced directly in `index.html`:

- `images/Glossy Chilli Paneer Platter.png`
- `images/Butter Chicken in Ornate Copper Bowl.png`
- `images/Garnished Rasmalai in Elegant Bowl.png`

## Fonts

[Fraunces](https://fonts.google.com/specimen/Fraunces) for headings and [DM Sans](https://fonts.google.com/specimen/DM+Sans) for body text, loaded from Google Fonts. Georgia and system fonts are the fallbacks if they can't load.

## Known issues and small fixes to make

These are things I noticed while reading the code:

- **Opening hours don't match.** The footer says "Open daily 12:00–23:00", but the contact page lists 11:00–23:30 on weekends.
- **Cart close button on `index.html` is empty.** The `×` is missing from the button, so there's nothing visible to click (the other two pages have it).
- **Static menu list in `menu.html`** is replaced by JavaScript on load, and its dish names and image files differ from the `MENU` array. It's safe to delete, or keep it only as a no-JS fallback after updating it to match.
- **Slide 3 alt text** says "Gulab Jamun dessert" but the image is rasmalai.
- **Image file names with spaces** work, but renaming them to something like `chilli-paneer.png` avoids URL-encoding trouble on some hosts.
- **Phone field** accepts exactly 10 digits, so `+91` prefixes will be rejected.

## Possible next steps

- Connect the forms to a real backend or a service such as Formspree.
- Hook the order button up to a payment or ordering system.
- Add a favicon and Open Graph tags for sharing.

## License

Add a license here if you plan to share or reuse the project.
