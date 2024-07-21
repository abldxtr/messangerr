"use client";

import { useEmojiState } from "@/context/EmojiContext";
import { useMessage } from "@/context/MessageContext";
import { useSocket } from "@/provider/socket-provider";
import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";

export default function Messages() {
  const { socket } = useSocket();
  const { messages, setMessages } = useMessage();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const { open, setOpen } = useEmojiState();
  console.log("messages", messages);
  const channelKey = `chat:message`;

  const [msj, setMsj] = useState<string[]>([]);

  const deleteMessageById = (id: number) => {
    const filteredMessage = messages.filter((item, index) => item.id !== id);
    setMessages(filteredMessage);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(channelKey, (item: string) => {
      console.log("item", item);
      setMsj([...msj, item]);
    });
  }, [socket, setMsj, msj, channelKey]);

  useEffect(() => {
    setTimeout(() => {
      // if (messages.length > 5) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      // }
    }, 100);
  }, [msj]);
  return (
    <div
      className={classNames(
        // "w-full  p-2 flex-1 overflow-auto pb-[150px]  h-full scrl   transition-all duration-300   ",
        "w-full  p-2 flex-1 overflow-auto  h-full scrl   transition-all duration-300   ",

        // messages.length > 5
        //   ? "overflow-auto pt-[153px] "
        //   : " overflow-hidden pt-0  ",
        // open
        //   ? "h-full overflow-auto mt-[153px]"
        //   : " h-0 overflow-hidden hidden ",
        // "max-h-[340px] ",
        // "sticky top-10 ",
      )}
      ref={lastMessageRef}
    >
      {msj.map((it, index) => {
        const isP = index % 2 === 0;
        return (
          <>
            {isP ? (
              <div
                key={index}
                className="  pb-[5px]  p-2 flex items-center w-full group gap-2 justify-end "
              >
                {/* for delete messag */}
                <div className="  ">
                  <button
                    // onClick={() => deleteMessageById(it.id)}
                    className=" size-[34px] hover:bg-[#1d9bf01a] flex items-center justify-center transition-all duration-300
                 rounded-full opacity-0 group-hover:opacity-100  "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-[20px] shrink-0 fill-[#6b7f8e]  "
                    >
                      <g>
                        <path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <div className=" flex cursor-pointer items-center  bg-[rgb(29,155,240)] rounded-br-sm rounded-2xl py-[12px] px-[16px] text-right text-white leading-[20px] text-[15px] hover:bg-[#1a8cd8] transition-all duration-300    ">
                  <span>{it}</span>
                </div>
                {/* {it} */}
              </div>
            ) : (
              <div
                key={index}
                className="  pb-[5px]  p-2 flex  flex-row-reverse justify-end items-center w-full group gap-2  "
              >
                {/* for delete messag */}
                <div className="  ">
                  <button
                    // onClick={() => deleteMessageById(it.id)}
                    className=" size-[34px] hover:bg-[#1d9bf01a] flex items-center justify-center transition-all duration-300
                   rounded-full opacity-0 group-hover:opacity-100  "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-[20px] shrink-0 fill-[#6b7f8e]  "
                    >
                      <g>
                        <path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <div className=" flex cursor-pointer items-center text-[#0f1419] bg-[#eff3f4] rounded-bl-sm rounded-2xl py-[12px] px-[16px] text-right leading-[20px] text-[15px] transition-all duration-300    ">
                  <span>{it}</span>
                </div>
                {/* {it} */}
              </div>
            )}
          </>
        );
      })}

      {/* <!-- first message --> */}
    </div>
  );
}
