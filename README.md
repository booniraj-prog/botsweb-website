# BotsWeb Solutions website

Plain HTML, CSS and JavaScript. You don't need a build step or to install anything.

## Run it locally

```powershell
npm start
```

Then open http://localhost:5173. Save a file and refresh the browser to see your change.

## Where things live

| File | What to edit there |
| --- | --- |
| `index.html`, `services.html`, `resources.html`, `contact.html` | Page copy and structure. The header and footer are repeated in each page. |
| `css/tokens.css` | **Design tokens:** colours (OKLCH), font, corner radius, spacing and type sizes. Change a value here to restyle the whole site. |
| `css/site.css` | Component styles: navy hero card with the CSS glass chip, cobalt panels, white cards, service rail, outlined numbers, floating tags, insight cards, giant-wordmark CTA, navy footer, services tabs, forms. |
| `css/base.css` | Shared resets. Rarely needs changes. |
| `js/site.js` | Scroll reveal, the services tab switcher, form validation, contact goal to service sync, and the floating WhatsApp button (change `WHATSAPP_NUMBER` and `WHATSAPP_MESSAGE` near the end of the file). |

## Before going live

- **Forms:** the contact and newsletter forms aren't connected yet. Add your form or CRM endpoint URL to `data-endpoint=""` on each `<form>`. Until you do, they say "Nothing was sent" and don't pretend to succeed.
- **Contact details:** the email (info@botsweb.in) is in. Replace the dashed "To be added" placeholders for address and phone (footer cards on every page, and the contact page).
- **Social links:** the LinkedIn, Facebook, Instagram and YouTube links in the footer point to `#`.
- **Articles and downloads:** the article titles on Resources aren't linked yet, and "Request a copy" goes to the contact page.

`.hallmark/` holds design-check screenshots and can be deleted.
