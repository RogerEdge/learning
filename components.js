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
  <small><a href="mailto:lilroger316@gmail.com">lilroger316@gmail.com</a></small>
  ·
  <a href="**basePath**index.html">Home</a>
  ·
  <a href="**basePath**keywords.html">Program Experience</a>
  ·
  <a href="**basePath**Mentorship.html">Mentorship Program</a>
  ·
  <a href="**basePath**nsync.html">NSYNC</a>
  <span id='follow-user-display' style='display:none'>
  ·
  <a id='follow-user-link'>Follow User</a>
  </span>
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

function sendAdminLoginForm(form, event) {
	const values = getValuesFromFormEvent(form, event)
	sendAdminLoginCode(values.code)
}

function sendNsyncCodeForm(form, event) {
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

function getSession() {
	localStorage.session = localStorage.session || '{}'
	try {
		const session = JSON.parse(localStorage.session)
		// console.log('session', session)
		return session
	} catch (error) {
		console.warn('🟠 the session was lost and reset')
		localStorage.session = '{}'
		return JSON.parse(localStorage.session)
	}
}

function saveSession(session) {
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

function checkUserStatus() {
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

//this function is meant to be overwritten,it is called every refetch
function refetchUserHook(data) {
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

function getUserSession() {
	const session = getSession()
	if(session.isAdmin){
		return session.userSession
	}
	return session
}

function pushUserSession(userSession) {
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