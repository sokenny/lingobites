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
      <GoogleTagManager gtmId="GTM-PJJR59HR" />

      <Script>
        {`
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    stellarApiKey: 'bfac3bf15e4685330ffbd032acc80d48:68044bbbf6f4a906958e2899c67a2b96f33f0a8641426f1c36c976d7eff85671',
  });
`}
      </Script>
      <link rel="preconnect" href="https://d3niuqph2rteir.cloudfront.net" />
      <link rel="dns-prefetch" href="https://d3niuqph2rteir.cloudfront.net" />
      <script
        async
        src="https://d3niuqph2rteir.cloudfront.net/client_js/stellar.js"
      />
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
