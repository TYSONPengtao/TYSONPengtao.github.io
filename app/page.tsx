const projects = [
  {
    number: "01",
    title: "OSINT",
    subtitle: "OPEN SOURCE INTELLIGENCE",
    description:
      "Tools for collecting, verifying and visualizing publicly available information.",
    tags: ["Python", "Data", "Research"],
    href: "/osint/",
  },
  {
    number: "02",
    title: "DIGITAL TWIN",
    subtitle: "PHYSICAL  DIGITAL",
    description:
      "Interactive 3D environments driven by real-time data, simulation and spatial intelligence.",
    tags: ["Three.js", "3D", "FastAPI"],
    href: "#digital-twin",
  },
  {
    number: "03",
    title: "LAB",
    subtitle: "TOOLS & EXPERIMENTS",
    description:
      "Small tools, prototypes and experiments across AI, engineering, mathematics and automation.",
    tags: ["AI", "Engineering", "Web"],
    href: "#lab",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a className="logo" href="#">
          TAO<span>.</span>
        </a>

        <div className="navLinks">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a
            href="https://github.com/TYSONPengtao"
            target="_blank"
            rel="noreferrer"
          >
            GitHub 
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          OSINT  DIGITAL TWIN  AI  ENGINEERING
        </div>

        <h1>
          Understanding the
          <br />
          <span>digital</span> and physical world.
        </h1>

        <p className="heroDescription">
          I build tools, simulations and experiments at the intersection of
          information intelligence, spatial computing and engineering.
        </p>

        <div className="heroActions">
          <a className="primaryButton" href="#projects">
            Explore Projects
          </a>

          <a
            className="secondaryButton"
            href="https://github.com/TYSONPengtao"
            target="_blank"
            rel="noreferrer"
          >
            View GitHub 
          </a>
        </div>

        <div className="scrollHint">SCROLL </div>
      </section>

      <section className="projectsSection" id="projects">
        <div className="sectionHeader">
          <span>SELECTED WORK</span>
          <span>2026 </span>
        </div>

        <div className="projectGrid">
          {projects.map((project) => (
            <a
              href={project.href}
              className="projectCard"
              key={project.title}
              id={project.href.substring(1)}
            >
              <div className="projectTop">
                <span className="projectNumber">{project.number}</span>
                <span className="arrow"></span>
              </div>

              <div>
                <p className="projectSubtitle">{project.subtitle}</p>
                <h2>{project.title}</h2>
                <p className="projectDescription">{project.description}</p>
              </div>

              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="aboutSection" id="about">
        <div className="aboutLabel">ABOUT</div>

        <div className="aboutContent">
          <h2>
            Build.
            <br />
            Explore.
            <br />
            <span>Understand.</span>
          </h2>

          <p>
            TAO is my personal technology lab. I explore open-source
            intelligence, digital twins, artificial intelligence,
            visualization and engineering tools  turning ideas into working
            systems.
          </p>
        </div>
      </section>

      <footer>
        <a className="logo" href="#">
          TAO<span>.</span>
        </a>

        <div>
          <p>TYSON PENGTAO</p>
          <p>© 2026</p>
        </div>

        <a
          href="https://github.com/TYSONPengtao"
          target="_blank"
          rel="noreferrer"
        >
          GitHub 
        </a>
      </footer>
    </main>
  );
}