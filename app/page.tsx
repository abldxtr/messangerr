import MainContent from "@/components/messenger/MainContent";
import Sidebar from "@/components/messenger/Sidebar";
import Header from "@/components/messenger/header";
import Main from "@/components/messenger/main";
import { useSocket } from "@/provider/socket-provider";
import Image from "next/image";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const Session = await auth();
  console.log("Session", Session);

  // if (!Session) {
  //   redirect("/login");
  // }
  return (

    <>
      <div className=" overflow-auto  h-full scrl hidden sm:block  ">
        <Header />
      </div>

      <Main />
    </>
  );
}

