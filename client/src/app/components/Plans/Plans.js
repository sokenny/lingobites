import styles from "./Plans.module.css";

const Plans = ({ onSelectPlan }) => {
  return (
    <div className={styles.plans}>
      <div className={styles.plan} onClick={onSelectPlan && onSelectPlan}>
        <div className={styles.period}>1 mes</div>
        <div className={styles.price}>£19</div>
      </div>
      <div className={styles.plan} onClick={onSelectPlan && onSelectPlan}>
        <div className={styles.period}>6 meses</div>
        <div className={styles.price}>£49</div>
        <div className={styles.prefered}>Opción preferida!</div>
      </div>
      <div className={styles.plan} onClick={onSelectPlan && onSelectPlan}>
        <div className={styles.period}>12 meses</div>
        <div className={styles.price}>£69</div>
      </div>
    </div>
  );
};

export default Plans;
