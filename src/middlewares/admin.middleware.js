const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }

  next();
};

module.exports = adminOnly;