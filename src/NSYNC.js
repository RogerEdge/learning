import { sendNsyncCodeForm } from "./components"

export function NSYNC() {
  const widthFull={width: '100%'}
  const hidden = {display:'none'}
  const handleSubmit=(event)=>{
    sendNsyncCodeForm(event.target,event)
  }
  return (
    <div>
      <h2>NSYNC</h2>
      <p>Connect 2 users at one time</p>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          Enter code below
        </div>
        <input id="code" name='code' />
          <button type="submit">Send</button>
      </form>
      <br />
      <br />
      <div style={hidden} id="nsync-status">
        <div id="nsync-status-text">?</div>
      </div>
      <br />
      <br />
      <img src="https://media.npr.org/assets/img/2020/03/19/gettyimages-108001364_wide-80f3c3b037c6a3eec77818a624332d84dc1860d9-s1400-c100.jpg"
        style={widthFull} alt="band members"
       />
        <script>
          document.getElementById('code').focus()
        </script>

    </div>
  )
}