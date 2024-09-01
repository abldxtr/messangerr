// "use client"

// import getConversationById from "@/app/actions/getConversationById";
// import getMessages from "@/app/actions/getMessages";
// import EmptyState from "@/app/components/EmptyState";
// import Header from "./components/Header";
// import Body from "./components/Body";
// import Form from "./components/Form";
import { auth } from "@/auth";
import Header from "@/components/messenger/header";
import Main from "@/components/messenger/main";
import { redirect } from "next/navigation";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  // const conversation = await getConversationById(params.conversationId);
  // const messages = await getMessages(params.conversationId);
  const ChatId = params.conversationId //23

  // const router = useRouter();
  // const currentUser = auth()
  // console.log("authccc", currentUser)

  // // let conversation = false;

  // if (!currentUser) {
  //   // router.push("/")
  //   redirect("/login")
  // }

  return (
    <>
      <div className=" overflow-auto  h-full scrl hidden sm:block  ">
        <Header />
      </div>

      <Main />
    </>
  );
};

export default ConversationId;
