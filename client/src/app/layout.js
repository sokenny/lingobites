import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Nav from "./components/Nav";
import { GoogleTagManager } from "@next/third-parties/google";
import styles from "./layout.module.css";

import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LingoBites",
  description: "Get daily lingo bites to improve your language skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-PJJR59HR" />
        <script
          type="text/javascript"
          async
          src="https://cdn.mida.so/js/optimize.js?key=EmLKDWG7dPmGgYVNgpZrxw"
        ></script>

        <link rel="preconnect" href="https://d3niuqph2rteir.cloudfront.net" />
        <link rel="dns-prefetch" href="https://d3niuqph2rteir.cloudfront.net" />
        <script
          async
          src="https://d3niuqph2rteir.cloudfront.net/client_js/stellar.js?apiKey=29760eb8d05b14779a48eb98a6b330dc:65f2a8bfd7395da4025368b1a026a9ce8642c0f0ffaa22110190297ba918105b"
        ></script>
      </head>

      <body
        className={
          // inter.className
          // back tick
          `${styles.page} ${inter.className}`
        }
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJJR59HR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Providers>
          <Nav />
          <div className={styles.stickyBar}>
            <div className={styles.sbItems}>
              <div>Aprendé 5x veces más rápido</div>
              <div>
                <img src="/stars.webp" />
                4.97 estrellas en nuestros 37 reviews
              </div>
              <div>14 días gratis</div>
            </div>
          </div>
          <div className={styles.pageContent}>{children}</div>
          <footer className={styles.footer}>hello@lingobites.com</footer>
        </Providers>
      </body>
    </html>
  );
}
