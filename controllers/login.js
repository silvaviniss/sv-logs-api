import { PrismaClient } from '@prisma/client';
import { sendError, sendLog } from '../errors/send_error.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
	try {
		const userInfo = req.body;

		const user = await prisma.user.findUnique({
			where: { email: userInfo.email },
		});

		if (!user) {
			return res.status(200).json({ status: "erro", error: "Usuário não encontrado" });
		}

		const isMatch = await bcrypt.compare(userInfo.password, user.password);

		if (!isMatch) {
			return res.status(400).json({ status: "erro", error: "Senha inválida" });
		}

		const token = jwt.sign(
			{ id: user.id, name: user.name },
			JWT_SECRET,
			{ expiresIn: "1d" }
		);

		sendLog("Usuário " + user.name + " logou no sistema!");
		res.status(200).json(token);
	} catch (error) {
		sendError(error, "login", "login.js");
		res.status(500).json({ status: "erro", error: error.message });
	}
};
