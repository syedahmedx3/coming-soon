# Coming Soon

This is a reusable Coming Soon page designed for quick deployment on custom domains. The layout features a clean limestone background alongside an animated tower crane that continuously lifts blocks and stacks them into a building before restarting. The bottom bar displays the coming soon notice and domain details.

- **Single-file structure:** Everything is contained within `index.html`, bundling the assets, custom font, styles, and animation logic.
- **Responsive design:** The layout adapts dynamically to fit various screen heights and device form factors.
- **Accessibility:** Reduced-motion preferences are supported, displaying a static, half-built scene for visitors who have motion disabled.

| File          | Purpose                                  |
| ------------- | ---------------------------------------- |
| `index.html`  | The complete landing page                |
| `CNAME`       | Connects GitHub Pages to your custom domain |

## Publish on GitHub Pages

1. On GitHub, click **New repository**. Name it (for example `coming-soon`), set it to **Public**, and click **Create repository**.
2. Click **uploading an existing file**. Drag in `index.html`, `CNAME` and `README.md`, then click **Commit changes**.
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

When the final website is ready, point your DNS records to your new production host and remove the custom domain from this repository.
