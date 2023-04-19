import { useState, useEffect } from 'react'
import './Keywords.css';

export function Keywords() {
  const data = [{
    title: "API - Application Programming Interface",
    imgSrc: "https://img.icons8.com/ios-filled/2x/api.png",
    imgAlt: "API Logo",
    label: "API",
    rating: "⭐️ ⭐️ ⭐️",
    codeHref: "https://github.com/RogerEdge/learning/blob/server/index.js"
  }, {
    title: "GitHub - a web-based platform for version control and collaborative software development that allows users to store and manage their code repositories, as well as to contribute to other projects and collaborate with other developers.",
    imgSrc: "https://img.icons8.com/fluency/2x/github.png",
    imgAlt: "GitHub Logo",
    label: "GitHub",
    rating: "⭐️ ⭐️ ⭐️ ⭐️",
    codeHref: "https://github.com/RogerEdge/learning"
  },
  {
    imgSrc: "https://img.icons8.com/office/2x/react.png",
    imgAlt: "React Logo",
    title: "React - a JavaScript library for building user interfaces that uses a declarative and component-based approach.",
    label: "React",
    rating: "⭐️ ⭐️ ⭐️",
    codeHref: "https://github.com/RogerEdge/learning/blob/src/src/App.js"
  },
  {
    imgSrc: "https://img.icons8.com/ios-filled/2x/typescript.png",
    imgAlt: "TypeScript Logo",
    title: "TypeScript - a superset of JavaScript that adds optional static typing and other features to enhance the development of large-scale applications.",
    label: "TypeScript",
    rating: "⭐️",
    codeHref: ""
  },
  {
    imgSrc: "https://img.icons8.com/fluency/2x/javascript.png",
    imgAlt: "JavaScript Logo",
    title: "JavaScript - a programming language used for creating interactive and dynamic effects on web pages and applications.",
    label: "JavaScript",
    rating: "⭐️ ⭐️ ⭐️",
    codeHref: "https://github.com/RogerEdge/learning/blob/gh-page2/components.js"
  },
  {
    imgSrc: "https://img.icons8.com/color/2x/nodejs.png",
    imgAlt: "Node.js Logo",
    title: "Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine",
    label: "Node.js",
    rating: "⭐️ ⭐️",
    codeHref: "https://github.com/RogerEdge/learning/blob/server/package.json"
  },
  {
    imgSrc: "https://img.icons8.com/color/2x/mongodb.png",
    imgAlt: "MongoDB Logo",
    title: "MongoDB - NoSQL database program",
    label: "Mongo DB",
    rating: "⭐️",
    codeHref: ""
  },
  {
    imgSrc: "https://img.icons8.com/external-flaticons-flat-flat-icons/2x/external-full-stack-computer-programming-flaticons-flat-flat-icons.png",
    imgAlt: "Full Stack Logo",
    title: "Full Stack - A web development term referring to both front-end (client-side) and back-end (server-side) portions of an application",
    label: "Full Stack",
    rating: "⭐️ ⭐️ ⭐️",
    codeHref: ""
  },
  {
    imgSrc: "https://img.icons8.com/emoji/2x/brain-emoji.png",
    imgAlt: "Back End Programming Logo",
    title: "Back end programming - The server-side programming of a web application, dealing with databases, servers, applications, and APIs",
    label: "Back end programming",
    rating: "⭐️ ⭐️ ⭐️",
    codeHref: ""
  },
  {
    imgSrc: "https://img.icons8.com/external-filled-outline-02-chattapat-/2x/external-artist-lifestyle-filled-outline-02-chattapat-.png",
    imgAlt: "Front End Coding Logo",
    title: "Front end coding - The client-side programming of a web application, dealing with design, layout, and user interaction",
    label: "Front end coding",
    rating: "⭐️ ⭐️ ⭐️ ⭐️",
    codeHref: ""
  },
  ]
  const [dataState, setData] = useState(data)
  const handleClick = (item) => {
    item.show = true;
    setData(dataState.map(data => data))
    console.log(item, dataState)
  }
  useEffect(() => {
    console.log(dataState, "datastate");
  }, [dataState]);
  return (
    <div>
      <h1>Familiar Programming Technologies</h1>
      <p>This is a list of technologies that I have learned and how proficient I am with them</p>
      <div className="container">
        {dataState.map(item => {
          return (
            <div key={item.label} style={{ width: item.show ? "100%" : "auto", "background-color": item.show ? "#aaa" : "" }}
              className={item.show ? "flex flex-wrap" : "center"}
            >
              <div>
                <div onClick={() => handleClick(item)}
                >
                  <img src={item.imgSrc} alt={item.imgAlt}
                    className="logo"
                    title={item.title} />
                </div>
                <span>
                  {item.label}
                  <div>{item.rating}</div>
                  
                </span>
              </div>
              {item.show && <div>{(item.codeHref && <a href={item.codeHref} className="link">Click Here{item.show} </a>) || <br />}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}