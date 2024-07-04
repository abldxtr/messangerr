import MainContent from "@/components/messenger/MainContent";
import Sidebar from "@/components/messenger/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative px-[10rem] py-10 h-screen w-full">
      <main
        className="h-full flex backdrop-blur-sm rounded-3xl bg-white/65 dark:bg-[#262626]/90 border-2 border-white
        dark:border-[#3C3C3C]/65 shadow-sm overflow-hidden"
      >
        <Sidebar />
        <div className="flex-1 flex">
          <div className="relative flex-1 border-r-2 border-white dark:border-[#3C3C3C]/60">
            {/* Default Content */}
            <MainContent />
            {/* <Header /> */}
            {/* <Body /> */}
            {/* <TextArea /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
