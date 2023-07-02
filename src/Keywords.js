import { useState } from 'react'
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
    codeHref: "",
    description: "As a full stack developer, I have leveraged my expertise to seamlessly integrate the front-end and back-end components of my website. With proficiency in both client-side and server-side technologies, I have taken a holistic approach to develop a cohesive and feature-rich platform. On the front-end, I have implemented captivating user interfaces using HTML, CSS, and JavaScript, ensuring a responsive and intuitive design. Leveraging modern frameworks like React, I have created dynamic and interactive elements. On the back-end, I have built a robust server infrastructure using technologies like Node.js, or Java, enabling efficient data handling and server-side operations. By integrating databases, implementing secure APIs, and ensuring proper authentication and authorization mechanisms, I have established a seamless flow of data between the front-end and back-end. Through my full stack development skills, I have delivered a comprehensive solution that encompasses both the user-facing experience and the underlying infrastructure, resulting in a powerful and integrated website."
  },
  {
    imgSrc: "https://img.icons8.com/emoji/2x/brain-emoji.png",
    imgAlt: "Back End Programming Logo",
    title: "Back end programming - The server-side programming of a web application, dealing with databases, servers, applications, and APIs",
    label: "Back end programming",
    rating: "⭐️ ⭐️ ⭐️",
    codeHref: "",
    description: "I have established a robust infrastructure to support a seamless user experience. Leveraging server-side technologies like Node.js, or Java, I have created a secure and scalable foundation for data management and server operations. By implementing efficient database systems, such as MongoDB, I ensure fast and accurate data access. Secure and efficient APIs enable seamless client-server communication. Robust authentication and authorization mechanisms protect user data, and caching techniques minimize database queries and enhance performance.  Overall, my back-end coding establishes a robust and efficient infrastructure that supports a seamless user experience, ensuring secure data management, reliable APIs, optimized performance, and scalability."
  },
  {
    imgSrc: "https://img.icons8.com/external-filled-outline-02-chattapat-/2x/external-artist-lifestyle-filled-outline-02-chattapat-.png",
    imgAlt: "Front End Coding Logo",
    title: "Front end coding - The client-side programming of a web application, dealing with design, layout, and user interaction",
    label: "Front end coding",
    rating: "⭐️ ⭐️ ⭐️ ⭐️",
    codeHref: "",
    description: "I have meticulously implemented the best elements of front-end coding to ensure a seamless user experience. With a responsive design that adapts effortlessly to diverse devices and screen sizes, the layout remains intuitive and visually appealing. I prioritized clean and well-structured HTML, using semantic elements to accurately represent the content. The CSS stylesheets are both stylish and efficient, optimized through careful selector usage and adherence to best practices. Performance optimization techniques, including minifying and compressing files, optimizing images, and implementing caching and lazy loading, contribute to lightning-fast loading times. Accessibility is a paramount consideration, with proper HTML tags, alternative text for images, and thoughtful color contrast choices. Rigorous cross-browser testing guarantees consistent performance and appearance across major browsers. Leveraging JavaScript frameworks like React, I crafted dynamic and interactive elements. My code follows a modular approach, ensuring reusability and ease of maintenance. Git enables seamless collaboration and version control, while browser developer tools facilitate effective debugging and optimization. Through these practices, my website delivers an impactful user experience, blending visually stunning design with optimal performance and accessibility."
  },
  {
    imgSrc: "https://cdn-icons-png.flaticon.com/128/10435/10435145.png",
    imgAlt: "Unit Testing Logo",
    title: "Unit testing - a software testing technique that focuses on testing individual units or components of a software system in isolation. A unit refers to the smallest testable part of an application, typically a function, method, or class.",
    label: "Unit Testing",
    rating: "⭐️ ⭐️ ⭐️",
    codeHref: "https://github.com/RogerEdge/learning/blob/src/src/connect-4/Connect4.test.js",
  },
  ]
  const [dataState, setData] = useState(data)
  const handleClick = (item) => {
    item.show = !item.show;
    updateDisplay()
    console.log(item, dataState)

  }

  const updateDisplay = () => {
    //console.log(22)
    setData(dataState.map(data => data))
  }


  return (
    <div>
      <h1>Coding Experience</h1>
      <p>This is a list of technologies that I have learned and how proficient I am with them</p>
      <p>Tap an item below for more info</p>
      <div className="container">
        {dataState.map(item => {
          return (
            <div id="list-top" key={item.label} style={{ width: item.show ? "100%" : "auto", backgroundColor: item.show ? "#aaa" : "" }}
              className={'pad gap ' + (item.show ? "flex flex-wrap" : "center")}
            >
              <div className="pointer">
                <div onClick={() => handleClick(item)}
                >
                  <img src={item.imgSrc} alt={item.imgAlt}
                    className="logo"
                    title={item.title} />
                </div>
                <span>
                  <div>{item.rating}</div>
                </span>
              </div>
              {item.show &&
                <div className="flex1 code-ref">
                  <button style={{ float: 'right', fontSize: "1em" }} myItem={item} type='button' onClick={() => { item.show = false; updateDisplay() }}>🅧</button>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
                  {(item.codeHref &&
                    <div className='vertical-center'>
                      <img src="https://img.icons8.com/fluency/2x/github.png" alt="GitHub Logo" class="logo" title="GitHub - a web-based platform for version control and collaborative software development that allows users to store and manage their code repositories, as well as to contribute to other projects and collaborate with other developers." />
                      <a href={item.codeHref} target="_blank" className="link" rel="noreferrer" >Examples of my code</a>
                    </div>
                  ) || <br />}
                </div>
              }
              {!item.show && (
                <div className="flex1 code-ref"  style={{fontSize: "0.75em"}} >
                  <h3>{item.label}</h3>
                </div>
              )}


            </div>
          )
        })}
      </div>
      <div className='description'>
        <p className='centered-text'>
          I am proficient in various programming technologies, such as API development, GitHub, React, TypeScript, JavaScript, Node.js, Unit testing, and MongoDB. Moreover, I constantly strive to improve my abilities in these areas to ensure the best possible outcomes for my work. I have a growth mindset and a proactive approach to expanding my knowledge and skills, which enables me to maintain a strong foundation in multiple programming areas.
        </p>
      </div>
    </div>

  )
}