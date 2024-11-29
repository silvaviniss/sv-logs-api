import express from "express";
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/users.js";
import { getSuppliers, addSupplier } from '../controllers/fornecedores.js';

const router = express.Router();

router.get("/usuarios", getUsers);
router.post("/usuarios", addUser);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

router.get("/fornecedores", getSuppliers);
router.post("/fornecedores", addSupplier);

export default router;