import "./Contact.css";

const Contact = () => (
  <section className="contact-section section-shell" id="contact">
    <div className="section-heading">
      <span className="section-number">04</span>
      <h2>
        Let&apos;s make
        <br />
        <em>something good.</em>
      </h2>
    </div>
    <div className="contact-links">
      <p className="eyebrow contact-availability">
        <span className="status-dot" /> Available for projects
      </p>
      <a className="contact-email" href="mailto:dev.jvalmores@gmail.com">
        Email <span aria-hidden="true">↗</span>
      </a>
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/justine-francis-valmores-57079a137"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com/jfvalmores"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
