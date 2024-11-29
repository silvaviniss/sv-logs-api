import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
    	return res.status(401).json({ status: "erro", error: "Acesso negado" });
    }

	try {
		const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

		req.userId = decoded.id;
		req.userName = decoded.name;
		
		next();
	} catch (error) {
		res.status(401).json({ status: "erro", error: "Token inválido" });
	}
}

export default auth;