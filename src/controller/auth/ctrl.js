const { UserDAO } = require("../../DAO");
const { verifyPassword } = require("../../lib/authentication");

const signInForm = async (req, res, next) => {
  try {
    const { user } = req.session;
    if (user) res.redirect("/");
    return res.render("auth/sign-in.pug", { user });
  } catch (err) {
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("BAD_REQUEST");
    const user = await UserDAO.getByUsername(username);
    if (!user) throw new Error("UNAUTHORIZED");
    const success = await verifyPassword(password, user.password);
    if (!success) throw new Error("UNAUTHORIZED");
    user.password = undefined;
    req.session.user = {
      username,
      ...user,
    };
  } catch (err) {
    return next(err);
  }
};

const signUpForm = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

const signOut = async (req, res, next) => {
  try {
  } catch (err) {
    return next(err);
  }
};

module.exports = { signInForm, signIn, signUpForm, signUp, signOut };
