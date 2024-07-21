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
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          ></link> */}
        </head>
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
                    {children}
                  </SocketProvider>
                </ThemeProvider>
              </body>
            </EmojiProvider>
          </MessageProvider>
        </GlobalProvider>
      </html>
    </SessionProvider>
  );
}
