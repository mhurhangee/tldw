# TLDW (Too Long; Didn't Watch) 📺

[TLDW](https://tldw-yt.vercel.app) is a web application that uses AI to quickly summarize YouTube videos, providing key points and insights without watching the entire content.

## Features

- 🎯 Instant YouTube video summaries
- 🤖 AI-powered analysis using GPT-4
- 📝 Comprehensive breakdown including:
  - Executive Summary
  - Key Points
  - Conclusion
- 💫 Modern, responsive UI with animations
- ⚡ Built with Next.js and OpenAI

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI GPT-4
- Vercel AI SDK
- Zod for schema validation
- Sonner for toast notifications

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tldw.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Copy a YouTube video URL
2. Paste it into the input field
3. Click "TLDW" to get an AI-generated summary
4. View the comprehensive breakdown of the video content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.
