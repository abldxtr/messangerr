import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/provider/ThemeProvider ";
import { GlobalProvider } from "@/context/globalContext";
import classNames from "classnames";
import { MessageProvider } from "@/context/MessageContext";
import { EmojiProvider } from "@/context/EmojiContext";
import { SocketProvider } from "@/provider/socket-provider";
import Header from "@/components/messenger/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "messenger app",
  description: "chat app with auth function",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en"  
    suppressHydrationWarning={true}
    
    >
        <SessionProvider session={session}>

        <GlobalProvider>
          <MessageProvider>
            <EmojiProvider>
              <body
                className={classNames(
                  inter.className,
                  "h-full w-full bg-white",
                )}
              >
                <ThemeProvider
                  attribute="class"
                  defaultTheme="light"
                  enableSystem
                  disableTransitionOnChange
                >
                  <SocketProvider>
                    <Toaster />
                    <main className="container isolate mx-auto flex h-screen  overflow-hidden">
                      {/* new line for twitter like chat */}
                      {/* <div className=" overflow-auto  h-full scrl hidden sm:block  ">
                        <Header />
                      </div> */}
                      {/* <ChatBox /> */}
                      {children}
                    </main>


                  </SocketProvider>
                </ThemeProvider>
              </body>
            </EmojiProvider>
          </MessageProvider>
        </GlobalProvider>
    </SessionProvider>
      </html>
  );
}
