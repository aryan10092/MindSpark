import { NextResponse } from "next/server";
import db from "@/configs/db";
import USER_TABLE from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { user } = await req.json();
        const email = user?.primaryEmailAddress?.emailAddress;

        if (!email) {
            return NextResponse.json({ error: "Missing user email" }, { status: 400 });
        }

        const existing = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, email));

        let dbUser = existing[0];

        if (!dbUser) {
            const inserted = await db
                .insert(USER_TABLE)
                .values({
                    name: user?.username || user?.firstName || "User",
                    email,
                })
                .returning();

            dbUser = inserted[0];
        }

        return NextResponse.json({ user: dbUser, created: !existing[0] });
    } catch (error) {
        console.error("create-user route error:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}