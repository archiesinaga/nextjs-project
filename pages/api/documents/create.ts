import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const session = await getSession({ req });
    if (!session || session.user?.role !== "SUPERVISOR") return res.status(401).end();

    const { title, content } = req.body;
    const document = await prisma.document.create({
        data: { title, content, status: "DRAFTED", createdById: session.user.id }
    });
    res.json(document);
}
