const { UserDAO } = require("../../DAO");
const {
  verifyPassword,
  generatePassword,
} = require("../../lib/authentication");

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
    if (!user || !(await verifyPassword(password, user.password)))
      throw new Error("UNAUTHORIZED");
    req.session.user = { username, ...user };
    return res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const signUpForm = async (req, res, next) => {
  try {
    const { user } = req.session;
    return res.render("auth/sign-up.pug", { user });
  } catch (err) {
    return next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { username, password, displayName } = req.body;
    if (username?.length <= 16 && password && displayName?.length <= 32) {
      const hashedPassword = await generatePassword(password);
      await UserDAO.create(username, hashedPassword, displayName);
      return res.redirect("/auth/sign_in");
    } else throw new Error("BAD_REQUEST");
  } catch (err) {
    return next(err);
  }
};

const signOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) throw err;
      else return res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { signInForm, signIn, signUpForm, signUp, signOut };
