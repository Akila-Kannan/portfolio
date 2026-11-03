import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`portfolio-section ${mobileTop ? "justify-center" : "justify-center"}`}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection, section } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection focused={section === 2} />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section mobileTop>
      <span className="eyebrow">Game developer · 7+ years</span>
      <h1 className="display-title">
        Worlds built<br />to <em>play.</em>
      </h1>
      <motion.p
        className="body-copy"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
     I'm Akila Kannan, a game developer creating playful, immersive experiences across Unity, Three.js, Phaser, and LibGDX. From AR/VR/MR worlds to mobile and web games, I bring ideas to life through thoughtful gameplay and polished performance.
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className="primary-button"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Let’s make something <span aria-hidden="true">↗</span>
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 90,
  },
  {
    title: "Unity/C#",
    level: 90,
  },
  {
    title: "Phaser js",
    level: 90,
  },
  {
    title: "Typescript/React js",
    level: 60,
  },
  {
    title: "Libgdx/Java",
    level: 90,
  },
];
const languages = [
  {
    title: "tn Tamil",
    level: 100,
  },
  {
    title: "🇺🇸 English",
    level: 80,
  },
 
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <span className="eyebrow">A versatile toolkit</span>
        <h2 className="section-title">Skills &amp; craft</h2>
        <div className="skill-list">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <motion.h3
                className="skill-item"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="skill-track">
                <motion.div
                  className="skill-fill"
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="eyebrow">Languages</h3>
          <div className="language-list">
            {languages.map((lng, index) => (
              <span className="language-chip" key={index}>{lng.title.replace(/^tn /, "")}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = ({ focused }) => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="project-nav">
        <div className={`project-heading ${focused ? "is-focused" : ""}`} aria-hidden={!focused}>
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">Made to play.</h2>
        </div>
        <button
          className="nav-arrow"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <button
          className="nav-arrow ml-auto"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, handleSubmit] = useForm("mwpkondp");
  return (
    <Section>
      <span className="eyebrow">Have a good one in mind?</span>
      <h2 className="section-title">Let’s build<br />something <em>fun.</em></h2>
      <div className="contact-card">
        {state.succeeded ? (
          <p className="text-gray-900 text-center">Thanks for your message !</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="field-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              className="field-input"
            />
            <label
              htmlFor="email"
              className="field-label"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="field-input"
            />
            <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label
              htmlFor="message"
              className="field-label"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Tell me a little about your idea…"
              className="field-input min-h-28 resize-y"
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />
            <button
              disabled={state.submitting}
              className="primary-button disabled:opacity-50"
            >
              {state.submitting ? "Sending…" : "Send a message ↗"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
