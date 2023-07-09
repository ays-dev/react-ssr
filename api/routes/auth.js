import { Router } from 'express';
import cookie from 'cookie';

import User from '../models/User';

const router = Router();

function validateRegister(values) {
  const errors = {};
  if (!values.password) {
    errors.password = 'Please choose a password.';
  }
  if (!values.username) {
    errors.username = 'Please choose a username.';
  } else if (values.username.length > 45) {
    errors.username = 'This username is too long (max: 45).';
  }
  if (values.firstName && values.firstName.length > 45) {
    errors.firstName = 'This first name is too long (max: 45).';
  }
  if (values.lastName && values.lastName.length > 45) {
    errors.lastName = 'This last name is too long (max: 45).';
  }
  if (values.email && values.email.length > 255) {
    errors.email = 'This email is too long (max: 255).';
  } else if (values.email !== values.emailConfirmation) {
    errors.email = 'Confirmation email does not match.';
  }
  if (!['male', 'female'].includes(values.gender)) {
    errors.gender = 'Please choose your gender.';
  }
  if (!values.birthDay || !values.birthMonth || !values.birthYear) {
    errors.birthday = 'Please enter a valid birth date.';
  } else if (values.birthDay && values.birthMonth && values.birthYear
    && Number.isNaN(new Date(values.birthYear, values.birthMonth, values.birthDay).getTime())) {
    errors.birthday = 'Your birth date is not valid.';
  }
  return errors;
}

function logout(req, res, next) {
  if (req.context.user) {
    const serializedCookie = cookie.serialize('token', '', {
      path: '/',
      expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT')
    });

    return User.query()
      .update({
        token: null
      })
      .where({
        id: req.context.user.id
      })
      .then(() => res.setHeader('Set-Cookie', serializedCookie))
      .then(() => res.redirect('/'))
      .catch(next);
  }
  return res.redirect('/');
}

function signin(req, res, next) {
  if (req.body.username && req.body.password) {
    // User.query().getSalt(req.body.username).then(salt => ...);
    return User.query()
      .where({
        username: req.body.username
      })
      .first()
      .then(user => {
        if (!user) { return null; }

        return User.query()
          .where({
            username: user.username,
            passwordHash: User.hashPassword(req.body.password, user.passwordSalt)// should be async
          })
          .first();
      })
      .then(user => {
        if (user) {
          if (user.token && user.token.length) {
            const serializedCookie = cookie.serialize('token', user.token, {
              path: '/',
              expires: new Date('Wed, 19 Jan 2038 03:14:07 GMT')
            });
            res.setHeader('Set-Cookie', serializedCookie);

            return res.json(user);
          }
          const token = User.generateToken();
          const serializedCookie = cookie.serialize('token', token, {
            path: '/',
            expires: new Date('Wed, 19 Jan 2038 03:14:07 GMT')
          });

          return User.query()
            .update({
              token
            })
            .where({
              id: user.id
            })
            .then(() => {
              res.setHeader('Set-Cookie', serializedCookie);
              return res.json(user);
              })
            .catch(next);
        }
        return res.status(401).json({
          _error: 'Bad credentials'
        });
      })
      .catch(next);
  }
  return res.status(401).json({
    _error: 'Missing credentials'
  });
}

function register(req, res, next) {
  const errors = validateRegister(req.body);

  if (!Object.keys(errors).length) {
    const userJSON = User.makeUserJSON(req.body);
    return User.query()
      .insertAndFetch(userJSON)
      .then(user => res.json(user))
      .catch(err => next(err));
  }
  return res.status(422)
    .json(errors);
}

router.route('/logout').get(logout);
router.route('/signin').post(signin);
router.route('/register').post(register);

export default router;
