const contactCntrls = require('../controllers').contact;
const validators = require('../middlewares/validators');
const sanitizers = require('../middlewares/sanitizers');
const existingDetails = require('../middlewares/existing-details');
const contactRouter = require('express').Router();

contactRouter
  .route('/contacts/:contactId')
  .get(
    validators.validationChainBuilder('param', {
      name: 'contactId',
    }, 'uuid-v4', true),

    validators.validationResultChecker,

    contactCntrls.getAnContactByIdCntrl,
  )
  .put(
    validators.validationChainBuilder('param', {
      name: 'contactId',
    }, 'uuid-v4', true),

    validators.contact('updateAnContact'),

    validators.validationResultChecker,

    sanitizers.contact('updateAnContact'),

    existingDetails.contact,

    contactCntrls.updateAnContactByIdCntrl,
  )
  .delete(
    validators.validationChainBuilder('param', {
      name: 'contactId',
    }, 'uuid-v4', true),

    validators.validationResultChecker,

    contactCntrls.deleteAnContactByIdCntrl,
  );

contactRouter
  .route('/contacts')
  .get(
    validators.contact('getAllContacts'),

    validators.validationResultChecker,

    sanitizers.contact('getAllContacts'),

    contactCntrls.getAllContactsCntrl,
  )
  .post(
    validators.contact('createAnContact'),

    validators.validationResultChecker,

    sanitizers.contact('createAnContact'),

    existingDetails.contact,

    contactCntrls.createAnContactCntrl,
  );

module.exports = contactRouter;
