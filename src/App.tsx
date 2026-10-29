import { motion } from "framer-motion";
import useTheme from "./hooks/use-theme";
import Topbar from "./components/Topbar/Topbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Stack from "./components/Stack/Stack";
import Experience from "./components/Experience/Experience";
import Project from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./global.css";

const easeCurve = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeCurve },
  },
};

function App() {
  const { isLight, setIsLight } = useTheme();

  return (
    <div className={isLight ? "app light" : "app"}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Topbar isLight={isLight} setIsLight={setIsLight} />
      </motion.div>

      <main id="top">
        {[Hero, About, Stack, Experience, Project, Contact].map((Section, index) => (
          <motion.div
            key={Section.name || index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            transition={{ duration: 0.55, delay: index * 0.05 }}
          >
            <Section />
          </motion.div>
        ))}
      </main>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
      <ScrollToTop />
    </div>
  );
}

export default App;
