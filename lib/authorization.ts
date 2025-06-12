import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export async function withRole(
    req: NextApiRequest,
    res: NextApiResponse,
    allowedRoles: string[],
    next: () => Promise<void> | void
) {
    const session = await getSession({ req });
    if (!session || !allowedRoles.includes(session.user?.role)) {
        return res.status(403).json({ error: "Forbidden" });
    }
    return next();
}
