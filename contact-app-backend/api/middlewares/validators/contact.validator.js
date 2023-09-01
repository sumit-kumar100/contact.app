const { body } = require('express-validator');
const { validationChainBuilder } = require('../../services/generic.validator.service');

module.exports = method => {
  switch (method) {
    case 'getAllContacts': {
      return [
        validationChainBuilder('query', {
          name: 'limit',
        }, 'numericString', false),

        validationChainBuilder('query', {
          name: 'offset',
        }, 'numericString', false),

        validationChainBuilder('query', {
          name: 'firstName',
        }, 'alphaString', false),

        validationChainBuilder('query', {
          name: 'lastName',
        }, 'alphaString', false),

        validationChainBuilder('query', {
          name: 'phone'
        }, 'numericString', false),

        validationChainBuilder('query', {
          name: 'email',
        }, 'charString', false),

        validationChainBuilder('query', {
          name: 'gender',
          values: ['MALE', 'FEMALE', 'OTHERS'],
        }, 'enum', false),

        validationChainBuilder('query', {
          name: 'dateOfBirth',
          pattern: /^\d{4}-\d{2}-\d{2}/,
        }, 'regex', false),

        validationChainBuilder('query', {
          name: 'active',
          values: [true, false],
        }, 'enum', false),
      ];
    }

    case 'createAnContact': {
      return [
        validationChainBuilder('body', {
          name: 'firstName',
          min: 3,
        }, 'alphaString', true),

        validationChainBuilder('body', {
          name: 'lastName',
          min: 3,
        }, 'alphaString', true),

        validationChainBuilder('body', {
          name: 'phone',
          min: 10,
          max: 10,
        }, 'numericString', true),

        validationChainBuilder('body', {
          name: 'email',
        }, 'emailId', true),

        validationChainBuilder('body', {
          name: 'gender',
          values: ['MALE', 'FEMALE', 'OTHERS'],
        }, 'enum', true),

        validationChainBuilder('body', {
          name: 'dateOfBirth',
          pattern: /^\d{4}-\d{2}-\d{2}/,
        }, 'regex', true),

        validationChainBuilder('body', {
          name: 'active',
          values: [true, false],
        }, 'enum', true),

        validationChainBuilder('body', {
          name: 'addressLineOne',
          min: 8,
        }, 'charString', true),

        validationChainBuilder('body', {
          name: 'addressLineTwo',
        }, 'charString', false),

        validationChainBuilder('body', {
          name: 'city',
        }, 'charString', true),

        validationChainBuilder('body', {
          name: 'country',
          uppercase: true,
        }, 'charString', true),

        validationChainBuilder('body', {
          name: 'zipcode',
          max: 10,
        }, 'charString', true),
      ];
    }

    case 'updateAnContact': {
      return [
        validationChainBuilder('body', {
          name: 'firstName',
          min: 3,
        }, 'alphaString', false),

        validationChainBuilder('body', {
          name: 'lastName',
          min: 3,
        }, 'alphaString', false),

        validationChainBuilder('body', {
          name: 'phone',
          min: 10,
          max: 10,
        }, 'numericString', false),

        validationChainBuilder('body', {
          name: 'email',
        }, 'emailId', false),

        validationChainBuilder('body', {
          name: 'gender',
          values: ['MALE', 'FEMALE', 'OTHERS'],
        }, 'enum', false),

        validationChainBuilder('body', {
          name: 'dateOfBirth',
          pattern: /^\d{4}-\d{2}-\d{2}/,
        }, 'regex', false),

        validationChainBuilder('body', {
          name: 'active',
          values: [true, false],
        }, 'enum', false),

        validationChainBuilder('body', {
          name: 'addressLineOne',
          min: 8,
        }, 'charString', false),

        validationChainBuilder('body', {
          name: 'addressLineTwo',
        }, 'charString', false),

        validationChainBuilder('body', {
          name: 'city',
        }, 'charString', false),

        validationChainBuilder('body', {
          name: 'country',
          uppercase: true,
        }, 'charString', false),

        validationChainBuilder('body', {
          name: 'zipcode',
          max: 10,
        }, 'charString', false),
      ];
    }

    default: {
      return [];
    }
  }
};
