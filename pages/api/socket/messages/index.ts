import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Socket } from "socket.io";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  // const currentprofile = auth()
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  // console.log("req.query", currentprofile);



  try {
    // const { message, senderId } = req.body;
    // const { id: receiverId } = req.query;
    // // const senderId = req.user.id;


    // const channelKey = `chat:${receiverId}:message`;


    // let conversation = await db.conversation.findFirst({
    //   where: {
    //     participantIds: {
    //       hasEvery: [senderId, receiverId],
    //     },
    //   },
    // });

    // // the very first message is being sent, that's why we need to create a new conversation
    // if (!conversation) {
    //   conversation = await db.conversation.create({
    //     data: {
    //       participantIds: {
    //         set: [senderId, receiverId],
    //       },
    //     },
    //   });
    // }

    // const newMessage = await db.message.create({
    //   data: {
    //     senderId,
    //     body: message,
    //     conversationId: conversation.id,
    //   },
    // });

    // if (newMessage) {
    //   conversation = await db.conversation.update({
    //     where: {
    //       id: conversation.id,
    //     },
    //     data: {
    //       messages: {
    //         connect: {
    //           id: newMessage.id,
    //         },
    //       },
    //     },
    //   });
    // }

    // Socket io will go here
    // const receiverSocketId = getReceiverSocketId(receiverId);

    // if (receiverSocketId) {
    // Socket.to(channelKey).emit("newMessage", newMessage);
    // res?.socket?.server?.io?.emit(channelKey, message)

    // }

    res.status(201).json("newMessage");
  } catch (error: any) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }


  // try {
  //   // message = [...message, req.body.tex];

  //   console.log("chatid", req.body.chatId);


  //   // const channelKey = `chat:${channelId}:message`
  //   const channelKey = `chat:${req.body.chatId}:message`;

  //   res?.socket?.server?.io?.emit(channelKey, req.body.text);

  //   return res.status(200).json({ message: "req.body.text" });
  // } catch (error) {
  //   console.log("Messages_post", error);
  //   return res.status(500).json({ message: "Internal Error" });
  // }

  // try {
  // 	const profile = await currentprofile() // for nextauth use auth()

  // 	const {content, fileUrl} = req.body;
  // 	const {serverId, channelId} = req.query

  // 	if(!profile){
  // 		return res.status(401).json({error : "Unauthorized"})
  // 	}
  // 	if(!serverId){
  // 		return res.status(401).json({error : "server ID missing"})
  // 	}
  // 	if(!channelId){
  // 		return res.status(401).json({error : "channel ID missing"})
  // 	}

  // 	if(!content){
  // 		return res.status(401).json({error : "Content missing"})
  // 	}

  // 	const server = await db.server.findFirst({
  // 		where : {
  // 			id: serverId as string,
  // 			member : {
  // 				some: {
  // 					profileId: profile.id
  // 				}
  // 			}

  // 		},
  // 		include: {
  // 			members: true
  // 		}
  // 	})

  // 	if(!server) {
  // 		return rs.status(404).json({message : "Server not found"})
  // 	}

  // 	const channel = await db.channel.findFirst({
  // 		where: {
  // 			id:channelId as string,
  // 			serverId: serverId as string
  // 		}
  // 	})

  // 	if(!channel) {
  // 		return res.status(404).json(message: "channel not found")
  // 	}

  // 	const member = server.member.find((member) => member.profileId === profile.id)

  // 	if(!member) {
  // 		return res.status(404).json({message: "Member not found"})
  // 	}

  // 	const message = await db.message.create({
  // 		data: {
  // 			content,
  // 			fileUrl,
  // 			channelId: channelId as string,
  // 			memberId: member.id
  // 		},
  // 		 include: {
  // 		 	member: {
  // 		 		include: {
  // 		 			profile: true,
  // 		 		}
  // 		 	}
  // 		 }
  // 	})

  // 	const channelKey = `chat:${channelId}:message`

  // 	res?.socket?.server?.io?.emit(channelKey, message)

  // } catch (error) {
  // 	console.log("Messages_post", error)
  // 	return res.status(500).json({message: "Internal Error"})
  // }
}
