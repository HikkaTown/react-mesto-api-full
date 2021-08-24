const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');
const DefaultError = require('../errors/default-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  incorrectDataMessage,
  defaultMessageError,
  cardNotFoundMessage,
  VALIDATION_ERROR_CODE,
  CASTERROR_CODE,
} = require('../utils/constant');

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link, _id = owner } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
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

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
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

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        const err = new NotFoundError(cardNotFoundMessage);
        next(err);
      }
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((removedCard) => res.status(200).send(removedCard))
          .catch((e) => {
            if (e.name === CASTERROR_CODE) {
              const err = new IncorrectDataError(incorrectDataMessage);
              next(err);
            } else {
              const err = new DefaultError(defaultMessageError);
              next(err);
            }
          });
      } else {
        const err = new ForbiddenError('Карточка принадлежит другому пользователю!');
        next(err);
      }
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

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true })
    .then((card) => {
      if (card === null) {
        const err = new NotFoundError(cardNotFoundMessage);
        next(err);
      } else {
        res.status(200).send({ data: card });
      }
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

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id },
  }, { new: true, runValidators: true })
    .then((card) => {
      if (card === null) {
        const err = new NotFoundError(cardNotFoundMessage);
        next(err);
      } else {
        res.status(200).send({ data: card });
      }
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
