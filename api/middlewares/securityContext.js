import User from '../models/User';

async function securityContext(req, res, next) {
  try {
    req.context = req.context || {};
    if (req.cookies && 'token' in req.cookies) {
      const user = await User.query()
        .where({
          token: req.cookies.token
        })
        .first();
      if (user) {
        req.context.user = user;
      }
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export default securityContext;
