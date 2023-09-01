const validators = {
  validationChainBuilder: require('../../services/generic.validator.service')
    .validationChainBuilder,
  validationResultChecker: require('../../services/generic.validator.service')
    .validationResultChecker,

  contact: require('./contact.validator'),
};

module.exports = validators;
