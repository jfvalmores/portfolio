import profileImage from "../../assets/hero-profile.png";

const Hero = () => (
  <section className="hero section-shell">
    <div className="hero-copy">
      <h1>
        Justine <em>Valmores</em>
      </h1>
      <p className="hero-role">Full-Stack Developer</p>
      <p className="hero-lede">
        Hi, I'm Justine. I build modern digital experiences that are thoughtful,
        fast, and built to last.
      </p>
      <a className="text-link" href="#contact">
        Let&apos;s work together <span aria-hidden="true">↗</span>
      </a>
    </div>
    <div className="hero-art">
      <img src={profileImage} alt="Portrait of Justine Valmores" />
    </div>
  </section>
);

export default Hero;
