import JWT from "jsonwebtoken";


export const verificaToken = function (req, res, next) {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			status: true,
			message: 'Usuario no autorizado',
		});
	}

	token = token.replace('Bearer ', '');

	JWT.verify(token, process.env.TOKEN_SECRET, (err) => {
		if (err) {
			return res.status(401).json({
				status: true,
				message: 'Usuario no autorizado',
			});
		}
		next();
	});
};
