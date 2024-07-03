
import {auth, signOut} from "@/auth"

const Setting = async () => {
    const session = await auth()
    
  return ( 
    <div className=" w-full h-screen flex items-center justify-center ">
      <div className="flex flex-col">

{JSON.stringify(session)}
      </div>
      <div>
  <form action={async () => {
      "use server"
      await signOut({  redirect: true, redirectTo:"/login" })
    }
  }>
    <button type="submit">sign out</button>
  </form>
</div>



    
    </div>
  );
}
 
export default Setting;