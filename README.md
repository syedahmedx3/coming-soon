# Coming Soon

This is a reusable Coming Soon page designed for quick deployment on custom domains. The layout features a clean limestone background alongside an animated tower crane that continuously lifts blocks and stacks them into a building before restarting. The bottom bar displays the coming soon notice and domain details.

- **Lightweight structure:** Markup, styles and animation live in separate files; the brand logo and favicon are loaded from `assets/`. The custom font is embedded in `style.css`.
- **Responsive design:** The layout adapts to any screen height and width, down to small and landscape phones, with no horizontal scrolling and no layout shift while loading.
- **Social previews:** Open Graph and Twitter Card tags show the logo, title and description when the link is shared on WhatsApp, LinkedIn or X.
- **Accessibility:** Reduced-motion preferences are supported, displaying a static, half-built scene for visitors who have motion disabled.

| File                          | Purpose                                                   |
| ----------------------------- | --------------------------------------------------------- |
| `index.html`                  | Page markup, meta tags and social preview tags            |
| `style.css`                   | Layout, typography and embedded font                      |
| `script.js`                   | Crane animation                                           |
| `assets/ather-logo.svg`       | Main brand logo                                           |
| `assets/ather-favicon.svg`    | Browser tab icon                                          |
| `assets/ather-og.png`         | 1200×630 preview image for social shares                  |
| `assets/apple-touch-icon.png` | Home-screen icon for iPhone and iPad                      |
| `CNAME`                       | Connects GitHub Pages to your custom domain               |

## Publish on GitHub Pages

1. On GitHub, click **New repository**. Name it (for example `coming-soon`), set it to **Public**, and click **Create repository**.
2. Click **uploading an existing file**. Drag in all the files above, including the `assets` folder, then click **Commit changes**.
3. Go to **Settings → Pages**. Set **Source** to _Deploy from a branch_, choose **main** and **/ (root)**, then click **Save**.
4. Under **Custom domain**, enter your custom domain and click **Save**.
5. At your domain registrar, add the DNS records below. **Leave existing MX (email) records unchanged.**

   | Type  | Name | Value                            |
   | ----- | ---- | -------------------------------- |
   | A     | @    | 185.199.108.153                  |
   | A     | @    | 185.199.109.153                  |
   | A     | @    | 185.199.110.153                  |
   | A     | @    | 185.199.111.153                  |
   | CNAME | www  | `YOUR-GITHUB-USERNAME.github.io` |

6. When DNS has updated (usually within an hour, up to 24 hours), go back to **Settings → Pages** and tick **Enforce HTTPS**.
7. To check the share preview, paste `https://ather.com.sa/` into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (WhatsApp uses the same tags). Run it again after any change to refresh their cache.

When the final website is ready, point your DNS records to your new production host and remove the custom domain from this repository.
