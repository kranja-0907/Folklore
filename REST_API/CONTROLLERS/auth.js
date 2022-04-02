const dbOperations = require('../DAL/userOperations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = (req, res) => {

    const { username, email, password, passwordConfirm } = req.body;
    // if (username === null || email === null || password === null || passwordConfirm === null) {
    //     return;
    // }
    dbOperations.checkUsernameAndEmail(username, email).then(async result => {
        if (result !== null) {
            return res.status(400).send('Username or email exists');
        } else if (password !== passwordConfirm) {
            return res.status(400).send('Passwords do not match');
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        await dbOperations.createUser(username, email, hashedPassword);
        res.status(200).send('User created');
    })
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Please provide an email and password')
        }

        dbOperations.checkEmail(email).then(async result => {
            if (result === null || !(await bcrypt.compare(password, result[0].Password))) {
                res.status(401).send('Username or Password is incorrect')
            } else {
                const id = result[0].IDUserAccount;

                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                res.header('auth-token', token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    withCredentials: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.send("login successful");
            }
        })
    } catch (error) {
        console.log(error);
    }
}

