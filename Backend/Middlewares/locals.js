module.exports ={
    locals: (req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.info_msg = req.flash('info_msg');
        next();
    }
}
