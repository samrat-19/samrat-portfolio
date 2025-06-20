const AGENT_README = `
🧠 Welcome to the Dungeon Guardian Simulator — where symbolic AI meets cognitive reasoning.

This interactive agent simulates an intelligent NPC (Non-Player Character) making decisions in a dynamic environment using:

• 🧩 Symbolic AI (GOAP): Goal-Oriented Action Planning to choose optimal actions  
• 🧠 Cognitive AI (Gemini): LLM-driven goal selection and natural language reasoning

What happens behind the scenes:
1. The agent observes the world state — health, stamina, threats, etc.
2. Gemini chooses the most contextually relevant goal from a predefined list
3. A BFS-based GOAP planner generates a sequence of actions to achieve the goal
4. The simulator executes the plan and presents the reasoning in human-readable form

This demo showcases how autonomous agents can blend classic planning algorithms with modern LLMs to simulate **adaptive, 
human-like decision-making.

Inspired by game AI systems (like Hitman’s NPC logic) and real-world agent architectures, it offers a glimpse into how symbolic + GenAI can work together — in games, simulations, or intelligent automation systems.

💡 Tip: Adjust the inputs and see how the agent shifts its strategy. Every decision has a reason.
`;

export default AGENT_README;