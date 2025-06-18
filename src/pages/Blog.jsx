const Blog = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2">/blog</h1>

    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700 rounded-lg p-6 hover:border-fuchsia-500 hover:shadow-[0_0_12px_#D946EF] transition duration-300 max-w-2xl">
      <h2 className="text-xl font-semibold text-white mb-2">
        Mastering Workflow Automation with Temporal and Spring Boot
      </h2>
      <p className="text-zinc-300 text-sm mb-4">
        A hands-on walkthrough for backend engineers looking to simplify complex asynchronous flows using Temporal and Spring Boot. From design to deployment — this article covers how to think in workflows, not just services.
      </p>
      <a
        href="https://medium.com/@mukherjeesamrat47/mastering-workflow-automation-with-temporal-and-spring-boot-a-practical-demo-be5c1c5d8859"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition text-sm"
      >
        📖 Read on Medium →
      </a>
    </div>

    <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500">
      ✍️ Did you know? If writing code is thinking out loud, blogging is proof I actually thought about it.
    </div>
  </div>
);

export default Blog;