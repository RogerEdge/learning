export function Home() {
	const handleClick = () => {
		window.location = 'admin'
	}

	return (
		<div>
			<div className="centeredContent center" style={{ position: "relative", height: "14vw", "max-height": "125px" }}>
				<div style={{ position: "absolute" }}>
					<img src="/assets/profile_photo_low.jpg" alt="Roger img" className="img profileImage" />
					<div>Roger Edge</div>
				</div>
			</div>
			<div>
				<h2 onClick={handleClick}>About Me</h2>
			</div>
			<p>Hello, my name is Roger Edge III and I am a passionate learner who is currently focused on learning to code. I am seeking a job as a programmer and I am excited to take my first steps into the tech industry.</p>
			<p>I have always been fascinated by the power of technology and how it can change the world. As a result, I have spent countless hours teaching myself how to code in order to make a meaningful impact in this field.</p>
			<br />
			<h2>Skills</h2>
			<ul>
				<li>Proficient in HTML, CSS, and JavaScript</li>
				<li>Experience with Git and GitHub</li>
				<li>Strong problem-solving skills</li>
				<li>Excellent attention to detail</li>
			</ul>
			<br />
			<h2>Projects</h2>
			<p>Functional code demonstrating my capabilities</p>
			<div>
				<div class="flex flex-wrap center">
					<div class="flex1">
						<a href="/learning/tictactoe">
							<div>
								<img src="https://static.thenounproject.com/png/4035212-200.png" width="200" alt="" border="0" />
							</div>
							Play Tic Tac Toe
						</a>
					</div>
					<div class="flex1">
						<a href="/learning/fib">
							<div>
								<img src="https://static.thenounproject.com/png/1751844-200.png" width="200" alt="" border="0" />
							</div>
							fibonacci sequence code
						</a>
					</div>
					<div class="flex1">
						<a href="/learning/connect-4">
							<div>
								<img src="https://static.thenounproject.com/png/5132387-200.png" width="200" alt="" border="0" />
							</div>
							connect-4
						</a>
					</div>
				</div>
			</div>
			<br />
			<h2>Contact Me</h2>
			<p>If you would like to get in touch with me regarding job opportunities or collaboration on projects, please feel free to email me at <a href="mailto:lilroger316@gmail.com">lilroger316@gmail.com</a>.</p>
		</div>
	);
}