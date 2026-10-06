# Ather Al-Emarah — Coming Soon

This is the Coming Soon page for **ather.com.sa**. The big logo sits on the light limestone background, with a tower crane that is always working: it lifts blocks from its supply pile and stacks them into a building. When the building is finished, it clears and the crane starts again. The dark band at the bottom says **قريباً · COMING SOON · ATHER.COM.SA**.

- **Modular structure:** Separated into `index.html`, `style.css`, and `script.js` for cleaner maintenance, complete with the IBM Plex Sans Arabic font, custom styles, and animation logic.
- **Fits every screen:** the crane's tower stretches to fill the height of each screen, so tall phones show no empty gap. The building also grows taller on taller screens.
- **Light theme only:** visitors who have turned off motion on their device see a still, half-built scene.

| File         | Purpose                                  |
| ------------ | ---------------------------------------- |
| `index.html` | The main webpage structure               |
| `style.css`  | Stylesheet and layout rules              |
| `script.js`  | Tower crane and building animation logic |
| `CNAME`      | Connects GitHub Pages to `ather.com.sa`  |

## Publish on GitHub Pages

1. On GitHub, click **New repository**. Name it (for example `coming-soon`), set it to **Public**, and click **Create repository**.
2. Click **uploading an existing file**. Drag in `index.html`, `style.css`, `script.js`, `CNAME` and `README.md`, then click **Commit changes**.
3. Go to **Settings → Pages**. Set **Source** to _Deploy from a branch_, choose **main** and **/ (root)**, then click **Save**.
4. Under **Custom domain**, enter `ather.com.sa` and click **Save**.
5. At your domain registrar, add the DNS records below. **Leave the MX (email) records unchanged.**

   | Type  | Name | Value                            |
   | ----- | ---- | -------------------------------- |
   | A     | @    | 185.199.108.153                  |
   | A     | @    | 185.199.109.153                  |
   | A     | @    | 185.199.110.153                  |
   | A     | @    | 185.199.111.153                  |
   | CNAME | www  | `YOUR-GITHUB-USERNAME.github.io` |

6. When DNS has updated (usually within an hour, at most about 24 hours), go back to **Settings → Pages** and tick **Enforce HTTPS**.

When the full website is ready, point the DNS records at your new host and remove the custom domain from this repository.
