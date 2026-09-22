const Topbar = ({
  isLight,
  setIsLight,
}: {
  isLight: boolean;
  setIsLight: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <header className="site-header">
    <a className="mark" href="#top" aria-label="Back to top">
      JV<span>.</span>
    </a>
    <nav className="site-nav" aria-label="Primary navigation">
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#contact">Contact</a>
    </nav>
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setIsLight((current) => !current)}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
    >
      <span aria-hidden="true">{isLight ? "☾" : "☀"}</span>
      <span>{isLight ? "Dark" : "Light"}</span>
    </button>
  </header>
);

export default Topbar;
