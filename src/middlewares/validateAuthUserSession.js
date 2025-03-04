const { config } = require('../config');
const mongoose = require('mongoose');

const validateAuthUserSession = (role = 'user') => async (req, res, next) => {
    const cookies = req.cookies

    if (cookies) {
        const sessionID = req.sessionID

        try {

            const db = mongoose.connection;
            const Session = db.collection('sessions');
            const { session } = await Session.findOne({ auth });

            if (session) {
                if (role === session.auth.role) {
                    req.session = session.auth
                    // next()
                } else {
                    res.redirect('/')
                }
            } else {
                res.status(404).json({ message: 'Session not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            await client.close();
        }
    } else {
        res.locals.userAuth = null;
    }
    next();
}

module.exports = validateAuthUserSession

