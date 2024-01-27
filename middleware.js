export const checkSession = async (req, res, next) => {
  console.log(req.originalUrl);
  console.log({ session: req.session });
  if (
    req.session.user ||
    req.originalUrl === "/api/auth/login" ||
    req.originalUrl === "/api/auth/register" ||
    req.originalUrl === "/api/auth/logout"
  ) {
    next();
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
};
