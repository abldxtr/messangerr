import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  var message: string[] = [];

  console.log("req.body", req.body);
  console.log("messages1", message);

  try {
    message.push(req.body.text);
    // message = [...message, req.body.tex];
    console.log("messages", message);

    // const channelKey = `chat:${channelId}:message`
    const channelKey = `chat:message`;

    res?.socket?.server?.io?.emit(channelKey, req.body.text);

    return res.status(200).json({ message: "req.body.text" });
  } catch (error) {
    console.log("Messages_post", error);
    return res.status(500).json({ message: "Internal Error" });
  }

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
