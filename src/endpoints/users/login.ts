import { Request, Response } from "express";
import connection from "../../connection";
import { generateToken } from "../../services/authenticator";
import { compareHash } from "../../services/hashManager";
import { userTableName } from "../../types";



export default async function login(
    req: Request,
    res: Response
): Promise<void> {
    try {

        const { email, password } = req.body

        if(!email || !password){
            res.statusCode = 422
            throw new Error("Email and password required")
        }

        const [user] = await connection(userTableName)
            .where({ email })

        const passwordIsCorrect: boolean = compareHash(password, user?.password || '')



        if (!passwordIsCorrect) {
            res.statusCode = 401
            throw new Error("invalid credentials")
        }


        const token = generateToken({ id: user.id })

        res.send({ token })

    } catch (error: any) {
        console.log(error.message)

        if (res.statusCode === 200) {
            res.status(500).send("internal server error")
        } else {
            res.send(error.message)
        }
    }
}