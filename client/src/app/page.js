import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@nextui-org/react";

// TODO-p1-1: Terminar landing page

const languages = [
  {
    name: "Inglés",
    flag: "🇺🇸",
  },
  {
    name: "Italiano",
    flag: "🇮🇹",
  },
  {
    name: "Francés",
    flag: "🇫🇷",
  },
  {
    name: "Alemán",
    flag: "🇩🇪",
  },
  {
    name: "Portugués",
    flag: "🇧🇷",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.title}>Mejora tus habilidades lingüísticas</h1>
          <h2 className={styles.description}>
            LangBuddy es un tutor de idiomas de IA nativo en más de 300 idiomas
            que te ayudará a mejorar chateando contigo.
          </h2>
          <Button color="primary" className={`button ${styles.cta}`}>
            Comenzar a aprender ahora
          </Button>
          <div className={styles.whatsapp}>
            <img src="/whatsapp.svg" className={styles.wppIcon} />{" "}
            <span>Disponible en Whatsapp</span>
          </div>
        </div>
        <div className={styles.right}>
          <img
            src="/lingobites-placeholder.png"
            alt="Lingo bites whatsapp conversation"
          />
        </div>
      </section>

      <section className={styles.languagesStripe}>
        {/* <h3>Qué idioma querés aprender?</h3> */}
        <div className={styles.langsContainer}>
          {languages.map((lang) => (
            <div className={styles.lang}>
              <div className={styles.flag}>{lang.flag}</div>
              <span>{lang.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.quotes}>
        <div className={styles.mainGuy}>
          <img
            src="/stars.webp"
            alt="5 stars"
            width={140}
            className={styles.stars}
          />
          <h3 className={styles.quote}>
            <span className={styles.qm}>"</span>Tuve un cambio abrupto. Me
            desbloqueó la capacidad de empezar a hablar el italiano. Antes me
            quedaba en blanco. Yo creo que esto de tener un compañero con quien
            dialogar que te corrige en tiempo real es muy poderoso. Siento que
            aprendo 3 veces más rápido.
            <span className={styles.qm}>"</span>
          </h3>
          <div className={styles.person}>Juan Chaher</div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={`${styles.feature} ${styles.feature1}`}>
          <div className={styles.copy}>
            <div className={styles.mCopy}>Corrección en tiempo real</div>
            <div className={styles.sCopy}>
              Conforme se desarrolla la conversación, te señalaremos los
              errores. Equivocarse es parte del proceso!
            </div>
          </div>
          <div className={styles.asset}>
            <img
              src="/correction.png"
              alt="Lingo bites whatsapp conversation"
              className={styles.correctionImg}
            />
          </div>
        </div>
        <div className={`${styles.feature} ${styles.feature2}`}>
          <div className={styles.copy}>
            <div className={styles.mCopy}>¡Entrena tu oído al idioma!</div>
            <div className={styles.sCopy}>
              Recibe audios que debes traducir. ¡Es una excelente forma de
              mejorar tu comprensión auditiva!
            </div>
          </div>
          <div className={styles.asset}>
            <img src="/audio.png" alt="Lingo bites whatsapp conversation" />
          </div>
        </div>
        <div className={`${styles.feature} ${styles.feature3}`}>
          <div className={styles.copy}>
            <div className={styles.mCopy}>Configuración personalizable</div>
            <div className={styles.sCopy}>
              Personaliza tu LangBuddy según tus necesidades. Puedes seleccionar
              diferentes niveles de corrección, cómo se deben explicar tus
              errores e incluso obtener una traducción completa de lo que se
              dice en tus idiomas nativos.
            </div>
          </div>
          <div className={styles.asset}>
            <img
              src="/custom-settings.png"
              alt="Configuración personalizable"
            />
          </div>
        </div>
      </section>

      {/* TODO: Features / Caracteristicas */}

      {/* TODO: Stats de lo mas rapido que se aprende */}
    </main>
  );
}
