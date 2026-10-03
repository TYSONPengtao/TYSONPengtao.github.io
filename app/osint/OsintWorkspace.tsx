"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./osint.module.css";

type SourceType =
  | "Primary"
  | "Official"
  | "News"
  | "Academic"
  | "Archive"
  | "Social"
  | "Other";

type EvidenceStatus = "Verified" | "Supported" | "Unverified" | "Contradicted";

type SourceRecord = {
  id: number;
  title: string;
  url: string;
  eventDate: string;
  sourceType: SourceType;
  claim: string;
  reliability: number;
  corroboration: number;
  status: EvidenceStatus;
  notes: string;
};

const demoSources: SourceRecord[] = [
  {
    id: 1,
    title: "Example official release",
    url: "https://example.com/official-source",
    eventDate: "2026-10-01",
    sourceType: "Official",
    claim: "Example claim used to demonstrate the evidence workflow.",
    reliability: 4,
    corroboration: 2,
    status: "Supported",
    notes: "Replace this demonstration record with a real public source.",
  },
];

function qualityScore(source: SourceRecord) {
  const reliability = source.reliability * 14;
  const corroboration = Math.min(source.corroboration, 3) * 10;
  const status =
    source.status === "Verified"
      ? 20
      : source.status === "Supported"
        ? 12
        : source.status === "Contradicted"
          ? 2
          : 5;

  return Math.min(100, reliability + corroboration + status);
}

export default function OsintWorkspace() {
  const [sources, setSources] = useState<SourceRecord[]>(demoSources);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [sourceType, setSourceType] = useState<SourceType>("Primary");
  const [claim, setClaim] = useState("");
  const [reliability, setReliability] = useState(3);
  const [corroboration, setCorroboration] = useState(0);
  const [status, setStatus] = useState<EvidenceStatus>("Unverified");
  const [notes, setNotes] = useState("");

  const timeline = useMemo(
    () =>
      [...sources].sort((a, b) => {
        if (!a.eventDate) return 1;
        if (!b.eventDate) return -1;
        return a.eventDate.localeCompare(b.eventDate);
      }),
    [sources],
  );

  const verifiedCount = sources.filter(
    (source) => source.status === "Verified" || source.status === "Supported",
  ).length;

  const averageQuality = sources.length
    ? Math.round(
        sources.reduce((sum, source) => sum + qualityScore(source), 0) /
          sources.length,
      )
    : 0;

  function addSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !url.trim() || !claim.trim()) return;

    const record: SourceRecord = {
      id: Date.now(),
      title: title.trim(),
      url: url.trim(),
      eventDate,
      sourceType,
      claim: claim.trim(),
      reliability,
      corroboration,
      status,
      notes: notes.trim(),
    };

    setSources((current) => [record, ...current]);
    setTitle("");
    setUrl("");
    setEventDate("");
    setClaim("");
    setReliability(3);
    setCorroboration(0);
    setStatus("Unverified");
    setNotes("");
  }

  function removeSource(id: number) {
    setSources((current) => current.filter((source) => source.id !== id));
  }

  function exportResearch() {
    const payload = {
      exportedAt: new Date().toISOString(),
      project: "TAO OSINT Workbench",
      version: "0.1",
      sourceCount: sources.length,
      sources,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `tao-osint-research-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className={styles.workbench}>
      <div className={styles.metrics}>
        <div>
          <span>SOURCES</span>
          <strong>{sources.length}</strong>
        </div>
        <div>
          <span>SUPPORTED+</span>
          <strong>{verifiedCount}</strong>
        </div>
        <div>
          <span>AVG QUALITY</span>
          <strong>{averageQuality}%</strong>
        </div>
        <button type="button" onClick={exportResearch} disabled={!sources.length}>
          Export JSON
        </button>
      </div>

      <div className={styles.workspaceGrid}>
        <form className={styles.form} onSubmit={addSource}>
          <div className={styles.formHeader}>
            <span>NEW SOURCE</span>
            <strong>Evidence record</strong>
          </div>

          <label>
            Source title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Official release, report, article..."
              required
            />
          </label>

          <label>
            Public URL
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://..."
              required
            />
          </label>

          <div className={styles.twoColumns}>
            <label>
              Event date
              <input
                type="date"
                value={eventDate}
                onChange={(event) => setEventDate(event.target.value)}
              />
            </label>

            <label>
              Source type
              <select
                value={sourceType}
                onChange={(event) =>
                  setSourceType(event.target.value as SourceType)
                }
              >
                <option>Primary</option>
                <option>Official</option>
                <option>News</option>
                <option>Academic</option>
                <option>Archive</option>
                <option>Social</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          <label>
            Claim / evidence
            <textarea
              value={claim}
              onChange={(event) => setClaim(event.target.value)}
              placeholder="What does this source actually support?"
              required
            />
          </label>

          <div className={styles.twoColumns}>
            <label>
              Reliability: {reliability}/5
              <input
                type="range"
                min="1"
                max="5"
                value={reliability}
                onChange={(event) => setReliability(Number(event.target.value))}
              />
            </label>

            <label>
              Independent corroboration
              <select
                value={corroboration}
                onChange={(event) =>
                  setCorroboration(Number(event.target.value))
                }
              >
                <option value={0}>0 sources</option>
                <option value={1}>1 source</option>
                <option value={2}>2 sources</option>
                <option value={3}>3+ sources</option>
              </select>
            </label>
          </div>

          <label>
            Evidence status
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as EvidenceStatus)
              }
            >
              <option>Unverified</option>
              <option>Supported</option>
              <option>Verified</option>
              <option>Contradicted</option>
            </select>
          </label>

          <label>
            Analyst notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Context, caveats, alternative explanations..."
            />
          </label>

          <button className={styles.addButton} type="submit">
            Add source
          </button>
        </form>

        <div className={styles.sourcePanel}>
          <div className={styles.formHeader}>
            <span>EVIDENCE LEDGER</span>
            <strong>{sources.length} records</strong>
          </div>

          <div className={styles.sourceList}>
            {sources.map((source) => (
              <article className={styles.sourceCard} key={source.id}>
                <div className={styles.sourceTop}>
                  <div>
                    <span>{source.sourceType}</span>
                    <h3>{source.title}</h3>
                  </div>
                  <strong>{qualityScore(source)}%</strong>
                </div>

                <p>{source.claim}</p>

                <div className={styles.sourceMeta}>
                  <span>{source.eventDate || "DATE UNKNOWN"}</span>
                  <span>{source.status.toUpperCase()}</span>
                  <span>R {source.reliability}/5</span>
                  <span>C {source.corroboration}</span>
                </div>

                {source.notes && <small>{source.notes}</small>}

                <div className={styles.sourceActions}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    Open source ↗
                  </a>
                  <button type="button" onClick={() => removeSource(source.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}

            {!sources.length && (
              <div className={styles.emptyState}>
                No sources yet. Add a public source to start the evidence ledger.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.formHeader}>
          <span>TIMELINE</span>
          <strong>Ordered by event date</strong>
        </div>

        <div className={styles.timelineList}>
          {timeline.map((source) => (
            <div className={styles.timelineItem} key={source.id}>
              <time>{source.eventDate || "—"}</time>
              <span />
              <div>
                <strong>{source.title}</strong>
                <p>{source.claim}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
