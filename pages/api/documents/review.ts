import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const session = await getSession({ req });
    if (!session || !["MANAGER", "STANDARISASI"].includes(session.user?.role)) return res.status(401).end();

    const { id, action } = req.body;

    let newStatus: string;
    if (action === "REJECT") {
        newStatus = "REJECTED";
    } else if (action === "APPROVE") {
        // perbaikan typo disini: session.user.role === "Manager" -> "MANAGER"
        newStatus = session.user.role === "MANAGER" ? "PENDING" : "APPROVED";
    } else {
        return res.status(400).end();
    }

    const document = await prisma.document.update({
        where: { id },
        data: { status: newStatus }
    });

    res.json(document);
}
