const { getUser, setUser } = require('../services/auth');
const jwt = require('jsonwebtoken'); // <-- Add this

function restrictedToLoggedIn(req, res, next) {
    const token = req.cookies.uid;
    console.log('Token:', token);
    if (!token) return res.redirect('/login');
    try {
        const user = getUser(token);
        console.log('Decoded user:', user);
        req.user = user;
        next();
    } catch (err) {
        console.error('JWT error:', err);
        return res.redirect('/login');
    }
}

module.exports = {
    restrictedToLoggedIn
}