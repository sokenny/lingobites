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
