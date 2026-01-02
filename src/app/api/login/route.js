import { dbConnect } from "@/lib/dbConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {

        await dbConnect();
        const { email, password } = await req.json();

        console.log("api email", email, password)
        console.log("User", User)
        const user = await User.findOne({ email });
        console.log("user", user)
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return Response.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const res = NextResponse.json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
        res.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}