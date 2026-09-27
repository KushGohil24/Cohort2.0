import React from "react"
import MacWindow from "./MacWindow"
import "./github.scss"
import githubData from "../../assets/github.json"

const GithubCard = ({data}) => {
    return (
        <div className="card">
            <img src={data.thumbnail} alt="thumbnail" className="thumbnail" />
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <div className="tags">
                {
                    data.stack.map((tag,i) => {
                        return <p key={i} className="tag">{tag}</p>
                    })
                }
            </div>
            <div className="links">
                <a href={data.github} target="_blank"><img src="./doc-icons/github.svg" alt="github" /> <span>Repository</span></a>
                {data.link && <a href={data.link} target="_blank" className="demo">View Project</a>}
            </div>
        </div>
    )
}
const Github = () => {
    return (
        <MacWindow>
            <div className="cards">
                {
                    githubData.map((project,i) => {
                        return <GithubCard key={i} data={project}/>
                    })
                }
            </div>
        </MacWindow>
    )
}

export default Github