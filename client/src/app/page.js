import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@nextui-org/react";
import SignUpCTA from "./components/SignUpCTA";
import Plans from "./components/Plans";

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
  {
    name: "Español",
    flag: "🇪🇸",
  },
];

// TODO-p1-1: Adaptar a mobile

// TODO-p1-1: Crear el onboarding con las preguntas y eso.

<span>
  Vamos con esta otra: <b>"Me encanta comer pizza los fines de semana."</b>
</span>;

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <div className={styles.left}>
          <h1 className={styles.title}>Mejorá tus habilidades lingüísticas</h1>
          <h2 className={styles.description}>
            Traduce pequeñas oraciones a diario desde WhatsApp y obtén
            correcciones en tiempo real. Guardaremos tu respuestas, y te
            brindaremos un reporte de tu progreso!
          </h2>
          <SignUpCTA className={styles.cta}>
            Comenzar a aprender ahora
          </SignUpCTA>
          <div className={styles.whatsapp}>
            <img src="/whatsapp.svg" className={styles.wppIcon} />{" "}
            <span>Disponible en Whatsapp!</span>
          </div>
        </div>
        {/* TODO-p1-1: Copiar animacion de lingobites aca (user framer motion (?))  */}
        {/* O sino, inspectear la img de ellos y editar todos los textos. Y que mi animacion sea simplemente un slideup del celu! */}
        <div className={styles.right}>
          <img
            src="/lingobites-phone.png"
            alt="Lingo bites whatsapp conversation"
          />
        </div>
      </section>

      <section className={styles.languagesStripe}>
        {/* <h3>Qué idioma querés aprender?</h3> */}
        <div className={styles.langsContainer}>
          {languages.map((lang) => (
            <div className={styles.lang} key={lang.name}>
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
            {/* TODO-p2: Poner un vid testimonio mio (?) */}
            <span className={styles.qm}>"</span>Tuve un cambio abrupto. Me
            desbloqueó la capacidad de empezar a hablar el italiano. Antes me
            quedaba en blanco. Yo creo que esto de tener un compañero con quien
            dialogar que te corrige en tiempo real es muy poderoso. Siento que
            aprendo 3 veces más rápido.
            <span className={styles.qm}>"</span>
          </h3>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" id="marijuana">
            <div className={styles.person}>Malena Girod, 26, Buenos Aires.</div>
          </a>
        </div>
      </section>

      <section className={styles.features} id="features">
        <div className={`${styles.feature} ${styles.feature1}`}>
          <div className={styles.copy}>
            <div className={styles.mCopy}>📝 Corrección en tiempo real</div>
            <div className={styles.sCopy}>
              Conforme se desarrolla la conversación, te señalaremos los
              errores. Equivocarse es parte del proceso!
            </div>
          </div>
          <div className={styles.asset}>
            <img
              src="/realtime-corrections.png"
              alt="Lingo bites whatsapp conversation"
              className={styles.correctionImg}
            />
          </div>
        </div>
        <div className={`${styles.feature} ${styles.feature2}`}>
          <div className={styles.copy}>
            <div className={styles.mCopy}>🦻 ¡Entrena tu oído al idioma!</div>
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
            <div className={styles.mCopy}>⚙️ Configuración personalizable</div>
            <div className={styles.sCopy}>
              Personaliza tu LangBuddy según tus necesidades. Puedes seleccionar
              diferentes niveles de corrección, cómo se deben explicar tus
              errores e incluso obtener una traducción completa de lo que se
              dice en tus idiomas nativos.
            </div>
          </div>
          <div className={styles.asset}>
            <img src="/config.png" alt="Configuración personalizable" />
          </div>
        </div>
      </section>

      <section className={styles.pricing} id="pricing">
        <h3>
          ¡LingoBites es <span>30 veces</span> más barato que un tutor!
        </h3>
        <Plans />
        <div className={styles.disclaimer}>
          Vas a tener 14 días de prueba gratuita!
        </div>
        <div className={styles.includes}>
          <div>Todos los planes incluyen:</div>
          ✅ Chat y práctica 24/7 <br />✅ Mensajes ilimitados al día <br />✅
          Corrección ilimitada de errores <br />✅ Respuestas rápidas <br />✅
          Notas de voz
          <br />✅ Conversación iniciada por IA <br />✅ Informes de aprendizaje
          por email.
        </div>
        <SignUpCTA className={styles.cta}>Comenzar a aprender ahora</SignUpCTA>
      </section>

      {/* TODO: Stats de lo mas rapido que se aprende */}
    </main>
  );
}

{
  /* <section>
        <div style={{ fontWeight: "bold", fontSize: 24, marginBottom: 16 }}>
          Tu configuración de LingoBites
        </div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "12px" }}>Nivel de correcciones</div>
          <div>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #d6d6d6",
              }}
            >
              Leve
            </Button>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
              }}
              color="primary"
            >
              Normal
            </Button>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #d6d6d6",
              }}
            >
              Estricto
            </Button>
          </div>
          <div
            style={{
              opacity: "0.5",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Corregirá errores de vocabulario, gramática y conjugación.
          </div>
        </div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "12px" }}>Explicación de errores</div>
          <div>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #d6d6d6",
              }}
            >
              Ninguna
            </Button>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
              }}
              color="primary"
            >
              Corta
            </Button>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #d6d6d6",
              }}
            >
              Completa
            </Button>
          </div>
          <div
            style={{
              opacity: "0.5",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Tus errores se explicarán lo más brevemente posible.
          </div>
        </div>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "12px" }}>
            Traducir cada mensaje nuevo en tu idioma nativo
          </div>
          <div>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #d6d6d6",
              }}
            >
              No
            </Button>
            <Button
              style={{
                borderRadius: "4px",
                marginRight: "10px",
              }}
              color="primary"
            >
              Si
            </Button>
          </div>
          <div
            style={{
              opacity: "0.5",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            Los mensajes que recibas de la IA serán traducidos.
          </div>
        </div>
      </section> */
}
