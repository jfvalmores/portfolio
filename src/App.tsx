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
import "./components/Topbar/Topbar.css";
import "./components/Hero/Hero.css";
import "./components/About/About.css";
import "./components/Stack/Stack.css";
import "./components/Experience/Experience.css";
import "./components/Projects/Projects.css";
import "./components/Contact/Contact.css";
import "./components/Footer/Footer.css";
import "./components/ScrollToTop/ScrollToTop.css";

function App() {
  const { isLight, setIsLight } = useTheme();

  return (
    <div className={isLight ? "app light" : "app"}>
      <Topbar isLight={isLight} setIsLight={setIsLight} />
      <main id="top">
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Project />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
