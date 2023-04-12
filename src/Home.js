export function Home() {
  const handleClick=() => {
    window.location='admin'
  }

  return (
    <div>
      <h2 onClick={handleClick}>About Me</h2>
		<p>Hello, my name is Roger Edge III and I am a passionate learner who is currently focused on learning to code. I am seeking a job as a programmer and I am excited to take my first steps into the tech industry.</p>
		<p>I have always been fascinated by the power of technology and how it can change the world. As a result, I have spent countless hours teaching myself how to code in order to make a meaningful impact in this field.</p>
		<h2>Skills</h2>
		<ul>
			<li>Proficient in HTML, CSS, and JavaScript</li>
			<li>Experience with Git and GitHub</li>
			<li>Strong problem-solving skills</li>
			<li>Excellent attention to detail</li>
		</ul>
		<h2>Projects</h2>
		<ul>
			<li><a href="tictactoe">Play Tic Tac Toe</a></li>
			<li><a href="fib">fibonacci sequence code</a></li>
			<li><a href="connect-4">connect-4</a></li>
		</ul>
		<h2>Contact Me</h2>
		<p>If you would like to get in touch with me regarding job opportunities or collaboration on projects, please feel free to email me at <a href="mailto:lilroger316@gmail.com">lilroger316@gmail.com</a>.</p>
    </div>
  );
}