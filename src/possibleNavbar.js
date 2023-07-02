<nav style='flex-wrap:wrap' class="navbar">
  <div class="brand-title">Roger Edge III</div>
  <a href="#" class="toggle-button">
  	<span class="bar"></span>
  	<span class="bar"></span>
 	<span class="bar"></span>
  <div class="navbar-links">
  <ul>
  <li><a href="**basePath**home">Home</a></li>
  <li><a href="**basePath**keywords">Coding Experience</a></li> 
  <li><a href="**basePath**Mentorship">Mentorship</a></li> 
  <li><a href="**basePath**Coded-Projects">Coded-Projects</a></li> 
  </ul>
  </div>
  
<style>
  .navbar{
		display:flex;
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		color:white;
	}

	.brand-title{
		font-size:1.5rem;
		margin:0.5rem;
	}

	.navbar-links ul {
		margin:0;
		padding:0;
		display:flex;
	}

	.navbar-links li {
		list-style:none;	
	}

	.navbar-links li a {
		text-decoration:none;
		color:white;
		padding: 1rem;
		display:block;
	}

	.toggle-button{
		position: absolute;
		top:.75rem;
		right:1rem;
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		width:30px;
		height:21px;
	}

	.toggle-button .bar {
		height:3px;
		width:100%;
		background-color:white;
		border-radius:10px
	}

	@media (max-width:600px) {
		.toggle-button {
			display:flex;
		}

		.navbar-links {
			display:none;
			width:100%;
		}

		.navbar {
			flex-direction:column;
			align-items:flex-start;
		}
		.navbar-links ul{
			width:100%;
			flex-direction: column;
		}

		.navbar-links li {
			text-align:center;
		}
		
		.navbar-links.active {
			display:flex;
		}

	}
	</style>

const toggleButton = document.getElementsByClassName("toggle-button")[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
	navbarLinks.classList.toggle('active')
})


</a>
</nav>



//maybe a function to limit the scroll
function checkScrollbar() {
	const container = document.querySelector('.container');
	const hasScrollbar = container.scrollWidth > container.clientWidth;
  
	if (hasScrollbar) {
	  container.classList.remove('hide-scrollbar');
	} else {
	  container.classList.add('hide-scrollbar');
	}
  }
  
  window.addEventListener('resize', checkScrollbar);



  //took out large menu and **basePath**
  <>
	//took out large menu and **basePath**
	<div className="large-menu"></div>
	<div>
		<a href="**basePath**home">🏠 Home</a>
		·
		<a href="**basePath**keywords">🧑‍💻 Coding Experience</a>
		·
		<a href="**basePath**Mentorship">🤝 Mentorship</a>
		·
		<a href="**basePath**coded-projects">🔨 Coded Projects</a>
		·
	</div></>