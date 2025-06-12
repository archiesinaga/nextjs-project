import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const session = await getSession({ req });
    if (!session || session.user?.role !== "SUPERVISOR") return res.status(401).end();

    const { id } = req.body;

    const dokument = await prisma.document.update({
        where: { id },
        data: { status: "SUBMITTED" }
    });

    res.json(dokument);
}
