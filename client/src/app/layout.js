import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Nav from "./components/Nav";
import styles from "./layout.module.css";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LingoBites",
  description: "Get daily lingo bites to improve your language skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://d3niuqph2rteir.cloudfront.net" />
        <link rel="preconnect" href="https://d3niuqph2rteir.cloudfront.net" />
        <link rel="dns-prefetch" href="https://d3niuqph2rteir.cloudfront.net" />
        <link
          rel="preload"
          href="https://d3niuqph2rteir.cloudfront.net/client_js/stellar.js"
          as="script"
        />
        <script
          async
          src="https://d3niuqph2rteir.cloudfront.net/client_js/stellar.js"
          data-stellar-api-key="0534bae40a7a6cf0e979da95a291260c:2e1aef0f8b499ee2fc317858d52e60b7ce69213ddf71655ad949b1449b39a3e5"
        />
      </head>
      <body
        className={
          // inter.className
          // back tick
          `${styles.page} ${inter.className}`
        }
      >
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
