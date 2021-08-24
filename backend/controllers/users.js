const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');
const DefaultError = require('../errors/default-err');
const AllreadyExsistError = require('../errors/allready-exsist-err');
const {
  incorrectDataMessage,
  defaultMessageError,
  userNotFoundMessage,
  VALIDATION_ERROR_CODE,
  CASTERROR_CODE,
} = require('../utils/constant');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send({ data: user.toJSON() }))
    .catch((e) => {
      if (e.name === 'MongoError' && e.code === 11000) {
        const err = new AllreadyExsistError('Пользователь уже существует');
        next(err);
      }
      if (e.name === VALIDATION_ERROR_CODE) {
        const err = new IncorrectDataError(incorrectDataMessage);
        next(err);
      } else {
        const err = new DefaultError(defaultMessageError);
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        const err = new NotFoundError('Нет пользователя с таким id');
        next(err);
      }
      res.status(200).send({ data: user });
    })
    .catch((e) => {
      if (e.name === CASTERROR_CODE) {
        const err = new IncorrectDataError(incorrectDataMessage);
        next(err);
      } else {
        const err = new DefaultError(defaultMessageError);
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((e) => {
      if (e.name === VALIDATION_ERROR_CODE) {
        const err = new IncorrectDataError(incorrectDataMessage);
        next(err);
      } else {
        const err = new DefaultError(defaultMessageError);
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        const err = new NotFoundError(userNotFoundMessage);
        next(err);
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((e) => {
      if (e.name === VALIDATION_ERROR_CODE || e.name === CASTERROR_CODE) {
        const err = new IncorrectDataError(incorrectDataMessage);
        next(err);
      } else {
        const err = new DefaultError(defaultMessageError);
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        const err = new NotFoundError(userNotFoundMessage);
        next(err);
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((e) => {
      if (e.name === VALIDATION_ERROR_CODE || e.name === CASTERROR_CODE) {
        const err = new IncorrectDataError(incorrectDataMessage);
        next(err);
      } else {
        const err = new DefaultError(defaultMessageError);
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.getMeUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      const err = new DefaultError(defaultMessageError);
      next(err);
    });
};
