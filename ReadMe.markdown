# 👾 Samrat Mukherjee – Developer Portfolio

Welcome to my personal portfolio — built in one night with vibe coding™, config-driven UI, and a lot of coffee.

Live Demo: [https://samrat-portfolio-eta.vercel.app](https://samrat-portfolio-eta.vercel.app)

---

## ✨ Features

- ⚡️ **React + Vite + Tailwind CSS v4**
- 🎨 Modern terminal-inspired UI (dark theme)
- 🧠 AI-Powered Voicebot (**/samBot**) using Gemini 2.5
- 📜 Experience, Skills, Resume, Projects — all interactive
- 👾 Emoji favicon, status bar logs, typing animations
- 🚀 Deployed on Vercel

---

## 🗂️ Pages

| Route         | What it does                                     |
|---------------|--------------------------------------------------|
| `/about`      | Bio, contact info, fun footer                    |
| `/experience` | Work history with subtle animations              |
| `/projects`   | Project cards with click-to-reveal terminal logs |
| `/skills`     | Skill bars with category + humor                 |
| `/resume`     | Resume download + viewer                         |
| `/blog`       | Medium article linked                            |
| `/tools`      | JSON beautifier (ugly → pretty)                  |
| `/samBot`  | AI chatbot powered by Gemini & voice APIs           |

---

## 🤖 /samBot Page

A voice-driven AI version of myself (Sambot) powered by:
- 🧠 Gemini 2.5 Flash
- 🎙️ Web Speech API (mic input)
- 📢 SpeechSynthesis (voice output)
- ⏱️ Cooldown to protect API quota
- 💬 Typing-style responses
- 🚫 Short input rejection
- 🧹 Auto cleanup on exit

---

## 🛠️ Stack

- React + Vite
- Tailwind CSS v4
- Framer Motion
- Google GenAI SDK
- Web Speech API
- Vercel (hosting)

---

## 🧠 Philosophy

> In the AI era, writing code won’t be the hard part — knowing what to build, how to orchestrate it, and where to intervene will.

Software is shifting. Engineers will spend less time typing and more time designing, debugging, and directing AI systems. The future belongs to those who can think in systems, orchestrate agents, and apply just enough human touch where machines fall short.

This portfolio reflects that mindset — and is proudly **70% AI-coded**, 100% human-curated.

---

## 📦 Setup

```bash
git clone https://github.com/samrat-19/portfolio
cd portfolio
npm install
cp .env.example .env # Add your Gemini API key
npm run dev