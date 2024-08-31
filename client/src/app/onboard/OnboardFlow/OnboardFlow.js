"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Spinner } from "@nextui-org/react";
import Plans from "../../components/Plans";
import languages from "../../constants/languages";
import levels from "../../constants/levels";
import targetLevels from "../../constants/targetLevels";
import styles from "./OnboardFlow.module.css";

const OnboardFlow = () => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  function getStep() {
    if (submitting) return;
    if (!formData.native_language) return 1;
    if (!formData.learning_language) return 2;
    if (!formData.current_level) return 3;
    if (!formData.target_level) return 4;
    return 5;
  }

  async function handleSubmit() {
    setSubmitting(true);
    // POST to /onboard/:userEmail with formData
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STELLAR_API}/onboard/${session.user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log("Onboard response: ", data);
    } catch (error) {
      console.error("Error onboarding user: ", error);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className={styles.OnboardFlow}>
      <div className={styles.inner}>
        {submitting && (
          <div className={styles.loading}>
            <Spinner size="lg" />
          </div>
        )}
        {getStep() === 1 && (
          <div className={`${styles.step} ${styles.step1}`}>
            <h2 className={styles.title}>¿Cuál es tu idioma nativo?</h2>
            <div className={styles.languages}>
              {languages.map((language) => (
                <div
                  className={styles.lang}
                  key={language.name}
                  onClick={() =>
                    setFormData({ ...formData, native_language: language.name })
                  }
                >
                  <div>{language.flag}</div>
                  <div>{language.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {getStep() === 2 && (
          <div className={`${styles.step} ${styles.step2}`}>
            <h2 className={styles.title}>¿Qué idioma buscas aprender?</h2>
            <div className={styles.languages}>
              {languages.map((language) => (
                <div
                  className={styles.lang}
                  key={language.name}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      learning_language: language.name,
                    })
                  }
                >
                  <div>{language.flag}</div>
                  <div>{language.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {getStep() === 3 && (
          <div className={`${styles.step} ${styles.step3}`}>
            <h2 className={styles.title}>
              ¿Cual es tu nivel actual con el{" "}
              <span>{formData.learning_language}</span>?
            </h2>
            <div className={styles.levels}>
              {levels.map((level) => (
                <div
                  className={styles.level}
                  key={level.value}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      current_level: level.value,
                    })
                  }
                >
                  <div>{level.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {getStep() === 4 && (
          <div className={`${styles.step} ${styles.step4}`}>
            <h2 className={styles.title}>¿Como te ves en 6 meses? 😎</h2>
            <p className={styles.subTitle}>
              Vamos a adaptar la cantidad de ejercicios para ayudarte a lograr
              tu objetivo.
            </p>
            <div className={styles.levels}>
              {targetLevels.map((level) => (
                <div
                  className={styles.level}
                  key={level.value}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      target_level: level.value,
                    })
                  }
                >
                  <div>{level.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {getStep() === 5 && (
          <div className={`${styles.step} ${styles.step5}`}>
            <h2 className={styles.title}>
              ¡Excelente! 🎉 Selecciona una suscripción para continuar
            </h2>
            <p className={styles.subTitle}>
              Tranqui :), los primeros 14 días son gratis y tendrás la chance de
              cancelar antes.
            </p>
            <div className={styles.plans}>
              <Plans onSelectPlan={handleSubmit} />
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        {getStep() !== 1 && !submitting && (
          <Button
            className={styles.back}
            onClick={() => {
              setFormData({});
            }}
          >
            Atrás
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardFlow;
