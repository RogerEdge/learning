import { getSession } from "./shared-game-code"

function load() {
	const session = getSession()
	if (session.code) {
		startRefetch()
		console.log('existing session restored')
	}
}

const html = `
<slot></slot>
<header>
		<h1>Roger Edge III - Aspiring Programmer</h1>
	</header>
  <div class='menu'>
  <nav>
  <small><a href="mailto:lilroger316@gmail.com">lilroger316@gmail.com</a></small>
  ·
  <a href="**basePath**home">Home</a>
  ·
  <a href="**basePath**keywords">Program Experience</a>
  ·
  <a href="**basePath**Mentorship">Mentorship</a>
  ·
  <a href="**basePath**nsync">NSYNC</a>
  <span id='follow-user-display' style='display:none'>
  ·
  <a id='follow-user-link'>Follow User</a>
  </nav>
  </span>
  </div>
	<style>
  .menu {
    background-color:#fff;padding: 0.5rem;text-align:center;
  }

 /* button {
	background-color: #4f8cb5;
	color: #fff;
	padding: 10px 20px;
	border: none;
	border-radius: 20px;
	margin-top: 50px;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
}

.button-animate {
	transform: scale(1.2);
	box-shadow: 0px 0px 10px #000;
}*/

  nav {
	background-color: #2f3a4f;
	padding: 10px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
nav a {
	color: #fff;
	text-decoration: none;
	padding: 10px;
	border-radius: 20px;
	transition: all 0.3s ease-in-out;
}
nav a:hover {
	background-color: #4f8cb5;
}
nav a.active {
	background-color: #4f8cb5;
}

	header {
		background-color: #2f3a4f;
		color: #fff;
		padding: 20px;
		text-align: center;
	}
	</style>
	`

class HelloWorld extends HTMLElement {
	connectedCallback() {
		//this.innerHTML = html;
		const shadow = this.attachShadow({ mode: 'open' })
		const basePath = this.getAttribute('basePath')
		const endBasePath = basePath ? basePath : ''
		const htmlReplaced = html.replace(/\*\*basePath\*\*/g, endBasePath);
		//shadow.activeElement.getAttribute('')
		shadow.innerHTML = htmlReplaced
	}


}
customElements.define('main-header', HelloWorld);

function sendAdminLoginCode(code) {
	fetch('http://localhost:8080/submit-form', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ code: code })
	}).then(response => response.json())
		.then(data => {
			saveAdminCode(data.code)
			document.getElementById('share-code').innerHTML = data.code
			document.getElementById('share-state').style.display = ''
		})
		.catch(error => console.error(error));
}

export function sendAdminLoginForm(form, event) {
	const values = getValuesFromFormEvent(form, event)
	sendAdminLoginCode(values.code)
}

export function sendNsyncCodeForm(form, event) {
	const values = getValuesFromFormEvent(form, event)
	sendNsyncCode(values.code)
}

function sendNsyncCode(code) {
	fetch('http://' + window.location.hostname + ':8080/submit-nsync', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ code: code })
	})
		.then(response => response.text())
		.then(data => {
			document.getElementById('nsync-status').style.display = ''
			if (data === 'ok') {
				document.getElementById('nsync-status-text').innerHTML = '✅ you are now connected ✅'
				saveNsyncCode(code)
				return
			}
			document.getElementById('nsync-status-text').innerHTML = '❌ invalid code'
		})
		.catch(error => console.error(error));
}



export function saveSession(session) {
	if (!session) {
		const message = '🟠 prevented saving bad session'
		console.warn(message, session)
		throw message
	}
	localStorage.session = JSON.stringify(session)
}

function saveNsyncCode(code) {
	const session = getSession()
	session.code = code
	session.userType = 'user'
	saveSession(session)
	startRefetch()
}

function saveAdminCode(code) {
	const session = getSession()
	session.code = code
	session.isAdmin = 1
	session.userType = 'admin'
	saveSession(session)
}

function getValuesFromFormEvent(form, event) {
	event.preventDefault()

	const formData = new FormData(form);
	const values = {}
	for (const [name, value] of formData) {
		values[name] = value
	}
	return values
}

export function checkUserStatus() {
	fetch('http://localhost:8080/check-user-status')
		.then(response => response.text())
		.then(data => {
			if (data === 'ok') {
				startRefetch()
				document.getElementById('user-status').innerHTML = 'ok'
			} else {
				document.getElementById('user-status').innerHTML = 'not ok'

			}
		})
		.catch(error => console.error(error));
}

export let refetchHook=refetchUserHook
export function setUserHook(hook) {
	refetchHook=hook
}

//this function is meant to be overwritten,it is called every refetch
export function refetchUserHook(data) {
	console.warn('no hook callback')
}

let refetchInterval
function startRefetch() {
	console.info('refetch started')
	refetchInterval = setInterval(() => {
		refetch()
	}, 2000)
}

function refetch() {
	const session = getSession()
	session.path = window.location.pathname;
	saveSession(session)
	fetch('http://' + window.location.hostname + ':8080/repost', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		//TODO: only the code is needed to be sent
		body: JSON.stringify(session)
	})
		.then(async response => {
			let data = {}
			try {
				data = await response.json()
			} catch (error) {
				console.warn('🟠 invalid refetch response')
				clearInterval(refetchInterval)
				return
			}

			const isAdmin = session.isAdmin && data.path
			if (isAdmin) {
				const header = document.getElementsByTagName('main-header')[0]
				const shadow = header.shadowRoot
				shadow.getElementById('follow-user-display').style.display = ''
				const link = shadow.getElementById('follow-user-link')

				session.userSession = session.userSession || {}
				session.userSession = mergeObjects(session.userSession, data)
				
				refetchUserHook(session.userSession)
				saveSession(session)

				link.setAttribute('title', data.path)
				link.setAttribute('href', data.path)
				return
			}

			//below is user
			const mergedSession = mergeObjects(session, data)
			Object.assign(session, mergedSession)
			refetchUserHook(session)
			saveSession(session)
		})
		.catch(error => console.error('xxx', error));
}

export function getUserSession() {
	const session = getSession()
	if(session.isAdmin){
		return session.userSession
	}
	return session
}

export function pushUserSession(userSession) {
	// push all of my data
	let session = getSession()

	if ( !session.code ) {
		console.warn('🟠 Not connected. Data not pushed')
		return
	}

	if (session.isAdmin) {
		session.userSession = session.userSession || {}
		session.userSession = mergeObjects(session.userSession, userSession)
		session.userSession.lastUpdatedAt = Date.now()
	}else{
		session = mergeObjects(session, userSession)
		session.lastUpdatedAt=Date.now()
	}

	console.info('pushing data', session)

	//console.log('222222session.userSession', session.userSession)
	fetch('http://' + window.location.hostname + ':8080/push-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(session)
	})
}

function mergeObjects(obj1, obj2) {
	const result = {};

	for (let key in obj1) {
		if (Array.isArray(obj1[key])) {
			result[key] = obj1[key];
			if (Array.isArray(obj2[key])) {
				result[key] = obj2[key];

			}
		} else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
			result[key] = mergeObjects(obj1[key], obj2[key]);
		} else {
			result[key] = obj1[key];
		}
	}

	for (let key in obj2) {
		//if (!result.hasOwnProperty(key)) {
		result[key] = obj2[key];
		//}
	}

	return result;
}

// !! always the last thing in this file !!
load()