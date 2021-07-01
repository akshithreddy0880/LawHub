module.exports = {
    isClient: (req, res, next) => {
        if(req.session.client) 
            return next();
        res.redirect('/');
    },

    isLawyer: (req, res, next) => {
        if(req.session.lawyer) 
            return next();
        res.redirect('/');
    },

    isAdmin: (req, res, next) => {
        if(req.session.client.role === 'admin' || req.session.lawyer.role === 'admin') 
            return next();
        res.redirect('/');
    },

    isAuthenticated: (req, res, next) => {
        if(req.session.client || req.session.lawyer)
            return next();
        res.redirect('/');
    },

    isNotAuthenticated: (req, res, next) => {
        if(!req.session.client && !req.session.lawyer)
            return next();
        res.redirect('/');
    }
}