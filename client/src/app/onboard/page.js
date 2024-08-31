import OnboardFlow from "./OnboardFlow";
import styles from "./page.module.css";

export default function Onboard() {
  return (
    <main className={styles.main}>
      <section>
        <OnboardFlow />
      </section>
    </main>
  );
}
