import './Mentorship.css'

export function Mentorship() {
  const opacity60 = { opacity: '60%' }

  const text2x = {
    fontSize: '2rem'
  }

  const buttonLink = {
    textDecoration: 'none', color: '#000'
  }

  return (
    <div>
      <div className="center">
        <h2>Mentorship by Acker Apple until 2029</h2>
        <div class="centeredContent">
          <img src="assets/profile_photo_low.jpg" alt="Roger img" className="img profileImage" />
            <span className="largePlus">+</span>
            <img src="https://media.licdn.com/dms/image/C4E03AQGexv4peFAy9Q/profile-displayphoto-shrink_800_800/0/1560199522202?e=1686182400&amp;v=beta&amp;t=xyCzv59XdeSMTg57f4kKbw7szs4trgetn1ncemVSElc" alt="Acker img" className="img profileImage" />
          </div>
        </div>

        <p>
          Roger Edge III, is being mentored by the esteemed Acker Dawn Apple, an accomplished software engineer and expert in full-stack development. With their extensive experience and mastery of NodeJs, TypeScript, MongoDB, Jira, Slack, React, HTML, CSS, JavaScript, and other front-end and back-end technologies, Acker has a proven track record of successfully guiding individuals in achieving their professional goals. This partnership, which will extend until 2029, is designed to ensure that Roger attains a thriving career in full-stack development.
        </p>
        <p>
          Acker Apple recognizes Roger's immense potential, which is why he has committed to providing personalized guidance and support throughout the mentorship. By sharing their extensive knowledge and insights gained from years of experience in the field, Acker is equipping Roger with the necessary tools to navigate the ever-evolving world of software development.
        </p>
        <p>
          Under Acker's tutelage, Roger is not only learning the most in-demand technologies, but also mastering essential soft skills, such as effective communication, teamwork, and time management.
        </p>
        <p>
          The mentorship program is structured to provide Roger with comprehensive exposure to the different aspects of full-stack development. From concept creation to the final deployment of a project, Acker ensures that Roger is well-versed in every stage of the development process. In addition, Acker has designed a curriculum that caters to Roger's learning style and aptitude, allowing them to make steady progress and consistently refine their skillset.
        </p>
        <hr style={opacity60} />
        <br />
        <button style={text2x}>
          <a style={buttonLink} href="https://ackerapple.com">Mentor website</a>
        </button>
        ·
        <button style={text2x}>
          <a style={buttonLink} href="https://www.linkedin.com/in/acker-apple/.">Mentor Linkedin</a>
        </button>
      </div>
      ) 
}

