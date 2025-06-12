import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session) return res.status(401).end();

    let docs;
    switch (session.user?.role) {
        case "SUPERVISOR":
            docs = await prisma.document.findMany({ where: { createdById: session.user.id } });
            break;
        case "MANAGER":
            docs = await prisma.document.findMany({ where: { status: "SUBMITTED" } });
            break;
        case "STANDARISASI":
            docs = await prisma.document.findMany({ where: { status: "PENDING" } });
            break;
        default:
            docs = []; // handle unknown role
    }
    res.json(docs);
}
