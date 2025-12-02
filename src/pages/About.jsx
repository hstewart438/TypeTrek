import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] px-6 py-12">
      <div className="w-full max-w-3xl bg-[var(--bg-elevated)] rounded-lg shadow p-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
          About TypeTrek
        </h1>

        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          TypeTrek is a modern typing practice platform designed to help you 
          improve your speed, accuracy, and confidence. Whether you're preparing 
          for coding interviews, improving productivity, or just building a new skill, 
          TypeTrek adapts to your pace and progress.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3" style={{ color: "var(--text)" }}>
          What You’ll Find Here
        </h2>

        <ul className="list-disc pl-6 space-y-2" style={{ color: "var(--muted)" }}>
          <li>Clean and distraction-free typing environment</li>
          <li>Accurate WPM and accuracy tracking</li>
          <li>Randomized word generation for fresh practice every time</li>
          <li>Dark & light mode for comfortable long sessions</li>
          <li>Profile stats and progress tracking (coming soon)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3" style={{ color: "var(--text)" }}>
          How To Use
        </h2>

        <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          TypeTrek is as simple as starting - just open the webpage and type. Typing in bursts teaches the skills necessary for a speedy workflow. Also learn keyboard shortcuts, taking your APM through the roof!
        </p>

        <div className="mt-10">
          <Link
            to="/"
            className="underline text-lg"
            style={{ color: "var(--text)" }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
