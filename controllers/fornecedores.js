import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSuppliers = async (_, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();

        res.status(200).json({ status: "ok", data: suppliers });
    } catch (error) {
        res.status(500).json({ status: "ok", error: error.message })
    }
}

export const addSupplier = async (req, res) => {
    try {
        const supplier = await prisma.supplier.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                description: req.body.description,
                user_register: req.userId
            }
        });

        res.status(201).json({ status: "ok", message: "Fornecedor cadastrado com sucesso", data: supplier})
    } catch (error) {
        res.status(500).json({ status: "erro", error: error.message });
    }
}

export const deleteSupplier = async (req, res) => {
	try {
		await prisma.supplier.delete({
			where: {
				id: req.params.id
			}
		});

		res.status(200).json({ status: "ok", message: "Fornecedor deletado com sucesso." });
	} catch (error) {
		res.status(500).json({ status: "erro", error: error.message });
	}
}