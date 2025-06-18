const Resume = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2">/resume</h1>

    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700 rounded-lg p-6 hover:border-fuchsia-500 hover:shadow-[0_0_12px_#D946EF] transition duration-300 max-w-xl">
      <p className="text-zinc-300 mb-4 text-sm">
        You can download my latest resume below. It's seen more recruiter screens than my GitHub profile.
      </p>

      <a
        href="/Samrat-Mukherjee-Resume-2025.pdf"
        target="_blank"
        download
        className="inline-block px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition text-sm"
      >
        ⬇ Download Resume (PDF)
      </a>
    </div>

    <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500">
      📜 Did you know? This resume has survived more screening rounds than my first job.
    </div>
  </div>
);

export default Resume;