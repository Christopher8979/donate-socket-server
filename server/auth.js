var dotenv = require('dotenv').config();
var jwt = require('jsonwebtoken');
var _ = require('lodash');

function verifyJWTToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
			if (err || !decodedToken) {
				return reject(err)
			}

			resolve(decodedToken)
		});
	})
}


function createJWToken(toJWToken) {
	return jwt.sign({
		data: toJWToken.user
	}, process.env.SECRET_TOKEN, {
			expiresIn: parseInt(process.env.TOKEN_MAXAGE),
			algorithm: process.env.ALGO
		});
}

function Authenticate(req, res, next) {
	let token = req.get('Authorization') ? req.get('Authorization').replace('Bearer ', '') : '';

	verifyJWTToken(token)
		.then((decodedToken) => {
			req.user = decodedToken.data;
			// additional security check if the user exists in DB
			// if not kick them out!
			next()
		})
		.catch((err) => {
			res.status(403)
				.json({ message: 'Invalid auth token provided.' })
		});
}

module.exports = {
	createJWToken : createJWToken,
	Authenticate : Authenticate
};