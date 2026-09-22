import useScrollToTop from "../../hooks/use-scroll-to-top";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const showBackToTop = useScrollToTop();

  return (
    <button
      className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={showBackToTop ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
      <span>Top</span>
    </button>
  );
};

export default ScrollToTop;
