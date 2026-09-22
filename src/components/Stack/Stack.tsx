import "./Stack.css";

const groups = [
  [
    "Frontend",
    "React",
    "Next",
    "TypeScript",
    "JavaScript",
    "jQuery",
    "Vue",
    "Nuxt",
    "Sass",
    "CSS",
    "TailwindCSS",
  ],
  ["Backend", "NodeJS", "Laravel", "TypeScript", "JavaScript", "Python"],
  [
    "Cloud & data",
    "AWS",
    "Kubernetes",
    "Docker",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Memcached",
  ],
];
const Stack = () => (
  <section className="section-shell content-section stack-section">
    <div className="section-heading">
      <span className="section-number">01</span>
      <h2>Toolkit</h2>
    </div>
    <div className="stack-grid">
      {groups.map(([title, ...items]) => (
        <div className="stack-group" key={title}>
          <h3>{title}</h3>
          <div className="tag-list">
            {items.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Stack;
