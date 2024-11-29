import { PrismaClient } from '@prisma/client';
import { sendError } from '../errors/send_error.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getUsers = async (_, res) => {
	try {
		const users = await prisma.user.findMany();

		res.status(200).json({ status: "ok", data: users });
	} catch (error) {
		sendError(error, "getUsers", "users.js");
		res.status(500).json({ status: "erro", error: error.message });
	}
};

export const addUser = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const user = await prisma.user.create({
			data: {
				email: req.body.email,
				password: hashPassword,
				name: req.body.name,
				birth_date: req.body.birth_date
			}
		});

		res.status(201).json({ status: "ok", message: "Usuário cadastrado com sucesso.", data: user });
	} catch (error) {
		sendError(error, "addUser", "users.js");
		res.status(500).json({ status: "erro", error: error.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: req.params.id
			},
			data: {
				email: req.body.email,
				name: req.body.name,
				birth_date: req.body.birth_date
			}
		});

		res.status(200).json({ status: "ok", message: "Usuário atualizado com sucesso.", data: user });
	} catch (error) {
		sendError(error, "updateUser", "users.js");
		res.status(500).json({ status: "erro", error: error.message });
	}
}

export const deleteUser = async (req, res) => {
	try {
		await prisma.user.delete({
			where: {
				id: req.params.id
			}
		});

		res.status(200).json({ status: "ok", message: "Usuário deletado com sucesso." });
	} catch (error) {
		sendError(error, "deleteUser", "users.js");
		res.status(500).json({ status: "erro", error: error.message });
	}
}
