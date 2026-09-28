import React from "react";
import MacWindow from "./MacWindow";
import TerminalModule from "react-console-emulator";
import "./cli.scss"
const Terminal = TerminalModule.default || TerminalModule;

const commands = {
  about: {
    description: 'Learn more about me.',
    usage: 'about',
    fn: () => `\n  👤 KUSH GOHIL\n  --------------------------------------------------\n  B.Tech Information Technology student & Full-Stack MERN Developer.\n  Education: Birla Vishvakarma Mahavidyalaya\n  Experience: Developer Head at UDAAN'26 TechFest\n`
  },
  projects: {
    description: 'View my recent projects.',
    usage: 'projects',
    fn: () => `\n  🚀 FEATURED PROJECTS\n  --------------------------------------------------\n  1. SmartFix – Home Services Platform\n     [React, Node.js, Express.js, MongoDB, Tailwind CSS]\n     Built a full-stack MERN application connecting customers with local home service professionals.\n\n  2. AskBVM – AI College Assistant\n     [JavaScript, LangChain, Ollama, FAISS]\n     AI-powered college assistant chatbot with responsive UI and vector search capabilities.\n`
  },
  skills: {
    description: 'List of my technical skills.',
    usage: 'skills',
    fn: () => `\n  🛠️  TECHNICAL SKILLS\n  --------------------------------------------------\n  Frontend : React.js, JavaScript, Tailwind CSS, HTML, CSS, GSAP\n  Backend  : Node.js, Express.js\n  Database : MongoDB, MySQL\n  Tools    : Git, GitHub, VS Code, Postman, MongoDB Compass\n`
  },
  contact: {
    description: 'Get in touch with me.',
    usage: 'contact',
    fn: () => `\n  📬 CONTACT INFORMATION\n  --------------------------------------------------\n  Email    : gohilkush761@gmail.com\n  Phone    : 951-039-5457\n  LinkedIn : linkedin.com/in/kush\n  GitHub   : github.com/kush\n`
  },
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: (...args) => args.join(' ')
  }
}

const welcomeText = [
  "==========================================================",
  "                                                          ",
  "       Welcome to Kush Gohil's Interactive Terminal       ",
  "                                                          ",
  "==========================================================",
  "",
  "Type 'help' to see all available commands.",
  "",
  "Available commands:",
  "  about    - Learn more about me",
  "  projects - View my recent projects",
  "  skills   - List of my technical skills",
  "  contact  - Get in touch with me",
  "  clear    - Clear the terminal screen",
  "  echo     - Echo a passed string"
];

const Cli = ({windowName, setWindowsState}) => {
    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
            <div className="cli-window">
                <Terminal 
                    commands={commands}
                    welcomeMessage={welcomeText}
                    promptLabel={'kushgohil@macbook:~$'}
                    promptLabelStyle={{ color: "#ff5f56", fontWeight: "bold" }}
                    styleEchoBack="fullInherit"
                    style={{
                        backgroundColor: "transparent",
                        minHeight: "100%",
                        padding: "15px",
                        boxShadow: "none"
                    }}
                    contentStyle={{
                        color: "#f8f8f2",
                        fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
                        fontSize: "15px",
                        lineHeight: "1.6",
                    }}
                    inputAreaStyle={{
                        display: "flex",
                        alignItems: "center"
                    }}
                    inputTextStyle={{
                        color: "#50fa7b",
                        fontWeight: "bold",
                        fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
                    }}
                    messageStyle={{
                        color: "#f8f8f2",
                        paddingBottom: "10px"
                    }}
                    autoFocus={true}
                    ignoreCommandCase={true}
                    disableOnProcess={true}
                />
            </div>
        </MacWindow>
    )
}

export default Cli