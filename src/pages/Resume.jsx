const Resume = () => (
  <div>
    <h1 className="text-3xl font-bold mb-4">Resume</h1>
    <p className="mb-4">You can download my full resume as a PDF below:</p>
    <a
      href="/Samrat-Mukherjee-Resume-2025.pdf"
      target="_blank"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      download
    >
      Download Resume
    </a>
  </div>
);

export default Resume;