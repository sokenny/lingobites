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
        {/* <GoogleTagManager gtmId="GTM-PJJR59HR" /> */}
        <script
          type="text/javascript"
          async
          src="https://cdn.mida.so/js/optimize.js?key=EmLKDWG7dPmGgYVNgpZrxw"
        ></script>

        <link rel="preconnect" href="https://d3niuqph2rteir.cloudfront.net" />
        <link rel="dns-prefetch" href="https://d3niuqph2rteir.cloudfront.net" />
        <script
          async
          src="http://localhost:3001/public/clientjs?apiKey=834f4f0ca1a5ee512b1a6167a145d85c:2dce45c57d1f6931c80348d4048ff1d9e57e8d167b66b5a676bc2ba289e61c2d"
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
