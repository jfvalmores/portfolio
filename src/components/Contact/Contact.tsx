import "./Contact.css";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/justine-francis-valmores-57079a137",
  },
  {
    name: "GitHub",
    url: "https://github.com/jfvalmores",
  },
];

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
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.name} ↗
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
