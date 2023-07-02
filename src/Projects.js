export function Projects() {


	return (
		<div>
			<h2>Projects</h2>
			<p>Functional code demonstrating my capabilities</p>
			<div>
				<div className="flex flex-wrap center" style={{gap:'3em'}}>
					<div className="flex1">
						<a href="/learning/tictactoe">
							<div>
								<img src="https://static.thenounproject.com/png/4035212-200.png" width="200" alt="" border="0" />
							</div>
							Play Tic Tac Toe
						</a>
					</div>
					<div className="flex1">
						<a href="/learning/fib">
							<div>
								<img src="https://static.thenounproject.com/png/1751844-200.png" width="200" alt="" border="0" />
							</div>
							fibonacci sequence code
						</a>
					</div>
					<div className="flex1">
						<a href="/learning/connect-4">
							<div>
								<img src="https://static.thenounproject.com/png/5132387-200.png" width="200" alt="" border="0" />
							</div>
							connect-4
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
