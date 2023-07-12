import { Link } from 'react-router-dom';


export function Menu() {


	return (
		<div>
			<slot></slot>
			<header>
				<h1>Roger Edge III - Aspiring Programmer</h1>
			</header>
			<div className='menu'>
				<nav style={{flexWrap:"wrap"}}>
						<Link to="/learning/home">🏠 Home</Link>
						·
						<Link to="/learning/keywords">🧑‍💻 Coding Experience</Link>
						·
						<Link to="/learning/mentorship">🤝 Mentorship</Link>
						·
						<Link to="/learning/coded-projects">🔨 Coded Projects</Link>
						·
						<a href="/assets/CurrentResume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">📄 View Resume</a>
						·
						<small><a href="mailto:me@roger-edge.com">📧 me@roger-edge.com</a></small>
						·
						<span id='follow-user-display' style={{display:'none'}}>
							·
							{/*<a id='follow-user-link'>Follow User</a>*/}
						</span>
				</nav>
			</div>
		</div>
	);
}

export default Menu;

