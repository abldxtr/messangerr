"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificiation-token";

export const newVerification = async (token: string) => {
  console.log("tokenn", token);
  const existingToken = await getVerificationTokenByToken(token);
  console.log("existingToken", existingToken);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.identifier);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { email: existingUser.identifier },
    data: {
      emailVerified: new Date(),
      // email: existingToken.identifier,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
