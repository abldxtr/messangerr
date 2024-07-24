import MainContent from "@/components/messenger/MainContent";
import Sidebar from "@/components/messenger/Sidebar";
import Header from "@/components/messenger/header";
import Main from "@/components/messenger/main";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container isolate mx-auto flex h-screen  overflow-hidden">
      {/* new line for twitter like chat */}
      <div className=" overflow-auto  h-full scrl  ">
        <Header />
      </div>
      {/* <ChatBox /> */}
      <Main />
    </main>
  );
}

// <div className="relative px-[10rem] py-10 h-screen w-full">
//   <main
//     className="h-full flex backdrop-blur-sm rounded-3xl bg-white/65 dark:bg-[#262626]/90 border-2 border-white
//     dark:border-[#3C3C3C]/65 shadow-sm overflow-hidden"
//   >
//     <Sidebar />
//     <div className="flex-1 flex">
//       <div className="relative flex-1 border-r-2 border-white dark:border-[#3C3C3C]/60">
//         {/* Default Content */}
//         <MainContent />
//         {/* <Header /> */}
//         {/* <Body /> */}
//         {/* <TextArea /> */}
//       </div>
//     </div>
//   </main>
// </div>
