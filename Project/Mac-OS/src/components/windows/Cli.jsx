import React from "react";
import MacWindow from "./MacWindow";
import TerminalModule from "react-console-emulator";
import "./cli.scss"
const Terminal = TerminalModule.default || TerminalModule;

const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: (...args) => args.join(' ')
  }
}

const Cli = () => {
    return (
        <MacWindow>
            <div className="cli-window">
                <Terminal 
                     commands={commands}
                    welcomeMessage={"Welcome to the React terminal!"}
                    promptLabel={'kushgohil:~$'}
                    promptLabelStyle={{color: "#4e58b0ff",fontWeight: "bold"}}
                />
            </div>
        </MacWindow>
    )
}

export default Cli