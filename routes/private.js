import express from 'express';
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/users.js';
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../controllers/suppliers.js';

const router = express.Router();

router.get("/usuarios", getUsers);
router.post("/usuarios", addUser);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

router.get("/fornecedores", getSuppliers);
router.post("/fornecedores", addSupplier);
router.put("/fornecedores/:id", updateSupplier);
router.delete("/fornecedores/:id", deleteSupplier);

export default router;