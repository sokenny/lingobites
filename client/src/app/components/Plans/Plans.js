"use client";

import { signIn } from "next-auth/react";
import styles from "./Plans.module.css";

const Plans = ({ onSelectPlan }) => {
  function handleClick() {
    onSelectPlan
      ? onSelectPlan()
      : signIn("google", {
          callbackUrl: "/onboard",
        });
  }
  return (
    <div className={styles.plans}>
      <div className={styles.plan} onClick={handleClick}>
        <div className={styles.period}>1 mes</div>
        <div className={styles.price}>£19</div>
      </div>
      <div className={styles.plan} onClick={handleClick}>
        <div className={styles.period}>6 meses</div>
        <div className={styles.price}>£49</div>
        <div className={styles.prefered}>Opción preferida!</div>
      </div>
      <div className={styles.plan} onClick={handleClick}>
        <div className={styles.period}>12 meses</div>
        <div className={styles.price}>£69</div>
      </div>
    </div>
  );
};

export default Plans;
