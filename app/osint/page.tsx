import OsintWorkspace from "./OsintWorkspace";
import styles from "./osint.module.css";

const workflow = [
  ["01", "DISCOVER", "Collect relevant public sources without bypassing access controls."],
  ["02", "CAPTURE", "Record URL, date, source type, claim and notes before context is lost."],
  ["03", "VERIFY", "Separate direct evidence, secondary reporting and unverified claims."],
  ["04", "CORRELATE", "Look for independent corroboration instead of repeating one source."],
  ["05", "TIMELINE", "Order evidence by event date and distinguish publish time from event time."],
  ["06", "REPORT", "Preserve uncertainty, citations and alternative explanations."],
];

export const metadata = {
  title: "TAO OSINT Workbench",
  description:
    "A browser-based workspace for collecting, verifying and organizing publicly available information.",
};

export default function OsintPage() {
  return (
    <main className={styles.shell}>
      <nav className={styles.nav}>
        <a className={styles.brand} href="/">
          TAO<span>.</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#workflow">Workflow</a>
          <a href="#workspace">Workbench</a>
          <a href="https://github.com/TYSONPengtao" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </nav>

      <section className={styles.hero}>
        <p className={styles.kicker}>01 / OPEN SOURCE INTELLIGENCE</p>
        <h1>
          Collect less.
          <br />
          <span>Verify more.</span>
        </h1>
        <p className={styles.lead}>
          TAO OSINT is a research workspace for organizing publicly available
          information into traceable sources, claims, evidence and timelines.
        </p>

        <div className={styles.heroMeta}>
          <span>PUBLIC SOURCES</span>
          <span>LOCAL-FIRST</span>
          <span>EVIDENCE-CENTRIC</span>
          <span>v0.1</span>
        </div>
      </section>

      <section className={styles.statement}>
        <p>
          The goal is not to collect everything. The goal is to preserve
          provenance, compare independent sources and make uncertainty visible.
        </p>
      </section>

      <section className={styles.workflow} id="workflow">
        <div className={styles.sectionHeading}>
          <span>METHOD</span>
          <h2>Research workflow</h2>
        </div>

        <div className={styles.workflowGrid}>
          {workflow.map(([number, title, description]) => (
            <article className={styles.workflowCard} key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workspaceSection} id="workspace">
        <div className={styles.sectionHeading}>
          <span>MVP TOOL</span>
          <h2>Source workbench</h2>
          <p>
            Add public sources, score evidence quality, track corroboration and
            export your research notes as JSON.
          </p>
        </div>
        <OsintWorkspace />
      </section>

      <section className={styles.boundaries}>
        <div>
          <span>RESEARCH BOUNDARIES</span>
          <h2>Public information, documented responsibly.</h2>
        </div>
        <ul>
          <li>Use lawfully accessible public information.</li>
          <li>Do not bypass logins, paywalls, access controls or private systems.</li>
          <li>Do not use the workbench for stalking, doxxing or targeted harassment.</li>
          <li>Record uncertainty and distinguish fact from inference.</li>
          <li>Prefer primary sources and independent corroboration.</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <a className={styles.brand} href="/">
          TAO<span>.</span>
        </a>
        <p>OSINT WORKBENCH / 2026</p>
        <a href="/">Back to portfolio</a>
      </footer>
    </main>
  );
}
