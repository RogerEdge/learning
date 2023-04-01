const html=`
<slot></slot>
<header>
		<h1>Roger Edge III - Aspiring Programmer</h1>
	</header>
  <div class='menu'>
  <small><a href="mailto:lilroger316@gmail.com">lilroger316@gmail.com</a></small>
  ·
  <a href="**basePath**index.html">Home</a>
  </div>
	<style>
  .menu {
    background-color:#e0e111;padding: 0.5rem;
  }
	header {
		background-color: #333;
		color: #fff;
		padding: 20px;
		text-align: center;
	}
	</style>
	`

class HelloWorld extends HTMLElement {
	constructor() {
	  super();
	  //const x=document.getElementById('main-header')
	 // console.log(x)
	}

	connectedCallback() {
		//this.innerHTML = html;
		const shadow=this.attachShadow({mode:'open'})
    const basePath=this.getAttribute('basePath')
    const endBasePath= basePath ? basePath : ''
    const htmlReplaced=html.replace(/\*\*basePath\*\*/g, endBasePath);
    console.log(basePath,this,htmlReplaced)
    //shadow.activeElement.getAttribute('')
    shadow.innerHTML=htmlReplaced
  }
}
customElements.define('main-header', HelloWorld);