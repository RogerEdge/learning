import { Projects } from "./Projects";
import './document.css';
import { Link } from 'react-router-dom';

export function Home() {
	const handleClick = () => {
		window.location = 'admin'
	}

	return (
		<div className="screen-width">
			<div className="centeredContent center" style={{ position: "relative", height: "14vw", maxHeight: "125px" }}>
				<div style={{ position: "absolute" }}>
					<img src="/assets/profile_photo_low.jpg" alt="Roger img" className="img profileImage" />
				</div>
			</div>
			<div>
				<h2 onClick={handleClick}>About Me</h2>
			</div>
			<p>Hello, my name is Roger Edge III and I am a passionate learner who is currently focused on learning to code. I am seeking a job as a programmer and I am excited to take my first steps into the tech industry.</p>
			<p>I have always been fascinated by the power of technology and how it can change the world. As a result, I have spent countless hours teaching myself how to code in order to make a meaningful impact in this field.</p>
			<br />
			<br />
			<div className="video-wrapper">
			<iframe title='roger edge yt'
				src="https://www.youtube.com/embed/1MxDX2zwDqw" frameborder="0" allowfullscreen></iframe>
			</div>
			<br />
			<br />
			<h2>Skills</h2>
			<ul>
				<li>Proficient in HTML, CSS, and JavaScript</li>
				<li>Experience with Git and GitHub</li>
				<li>Strong problem-solving skills</li>
				<li>Excellent attention to detail</li>
				<li>
					<Link to="/learning/keywords">Click here to read more</Link>
				</li>
			</ul>
			<br />
			<Projects></Projects>
			<br />
			<h2>My Resume</h2>
			<a href="/assets/CurrentResume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">Click here to view Resume</a>
			<br />
			<h2>Contact Me</h2>
			<p>If you would like to get in touch with me regarding job opportunities or collaboration on projects, please feel free to email me at <a href="mailto:me@roger-edge.com">me@roger-edge.com</a>.</p>
		</div>
	);
}

export default Home;