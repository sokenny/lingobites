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
          data-stellar-api-key="da0237b534744428bebf5a5a158f8059:455b4609acb3566bf34272e176fe8e774d35aa189c2c0a42a7db34646c8c0ed4"
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
