import {useAuthStore} from "../store/UseAuthStore";

function ChatPage()
{
    const {logout}=useAuthStore();
    const { authUser } = useAuthStore();
    console.log("authUser:", authUser);
    return(
        <div>
          <button 
  onClick={logout}
  style={{
    cursor: "pointer", 
    padding: "10px 20px",
    position: "relative",  // 👈 add this
  }}
>
  Logout
</button>
        </div>
    )
}

export default ChatPage;