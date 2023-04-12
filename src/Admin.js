import { checkUserStatus, sendAdminLoginForm } from "./components";

export function Admin() {
  const styles = {
    display: 'none'
  }
  
  const handleClick=()=> {
    checkUserStatus()
  }
  
  const handleSubmit=(event)=> {
    const form = event.target;
    sendAdminLoginForm(form,event)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input name="code" id="adminCode" />
        <button type="submit">Send</button>
      </form>
      <br />
      <div id="share-state" style={styles}>
        <div id="share-code"></div>
        <button onClick={handleClick}>check status</button>
        <div id="user-status"></div>

      </div>
      <script>
        document.getElementById('adminCode').focus()
      </script>
    </div>
  );
}