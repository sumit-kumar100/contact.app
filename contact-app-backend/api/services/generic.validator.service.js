const { body, param, query, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../error');

/**
 * @function validationChainBuilder
 * @description Builds Validation Rule Chain for a given field.
 * @param {('body' | 'param' | 'query')} position Position of field.
 * @param {{
 *  name: string,
 *  pattern?: RegExp,
 *  values?: any[],
 *  uppercase?: boolean
 *  min?: number,
 *  max?: number
 * }} field Field details
 * @param {('regex' | 'uuid-v4' | 'numericString' | 'alphaNumericString' | 'enum' | 'ISO8601String' | 'mobileNo' | 'emailId' | 'int' | 'float')} validationType Type of validation.
 * @param {boolean} isRequired Specify whether the field is mandatory or not.
 */
const validationChainBuilder = (
  position,
  field,
  validationType,
  isRequired,
) => {
  let fieldPosition =
    position === 'body'
      ? body(field.name)
      : position === 'param'
      ? param(field.name)
      : position === 'query'
      ? query(field.name)
      : body(field.name);

  let validationRules = !isRequired
    ? fieldPosition.optional({ nullable: true, checkFalsy: true })
    : fieldPosition
        .exists({ checkNull: true })
        .withMessage(`'${field.name}' isn't present or has null value.`);

  switch (validationType) {
    case 'regex': {
      return regexValidator(validationRules, field);
    }

    case 'uuid-v4': {
      return uuidV4Validator(validationRules, field);
    }

    case 'numericString': {
      field.pattern = /^[-+]?([0-9]+\.[0-9]+|[0-9]+)$/;
      return regexValidator(validationRules, field);
    }

    case 'alphaNumericString': {
      field.pattern = /^[\w \.\'\-]+$/;
      return regexValidator(validationRules, field);
    }

    case 'alphaString': {
      return alphaStringValidator(validationRules, field);
    }

    case 'enum': {
      return enumValidator(validationRules, field);
    }

    case 'ISO8601String': {
      return ISO8601StringValidator(validationRules, field);
    }

    case 'mobileNo': {
      field.pattern = /^\+[0-9]{10,15}$/;
      return regexValidator(validationRules, field);
    }

    case 'emailId': {
      return emailIdValidator(validationRules, field);
    }

    case 'int': {
      field.min = field.min ? field.min : -Number.MAX_SAFE_INTEGER;
      field.max = field.max ? field.max : Number.MAX_SAFE_INTEGER;
      return intValidator(validationRules, field);
    }

    case 'float': {
      field.min = field.min ? field.min : -Number.MAX_SAFE_INTEGER;
      field.max = field.max ? field.max : Number.MAX_SAFE_INTEGER;
      return floatNumValidator(validationRules, field);
    }

    case 'array': {
      return ArrayValidator(validationRules, field);
    }

    case 'charString': {
      return charStringValidator(validationRules, field);
    }

    default: {
      return [];
    }
  }
};

const validationResultChecker = (req, res, next) => {
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      next();
    } else {
      return next(
        new APIError(
          '0069',
          StatusCodes.BAD_REQUEST,
          result.array({
            onlyFirstError: true,
          })[0].msg,
        ),
      );
    }
  } catch (error) {
    next(error);
  }
};

const regexValidator = (validationRules, field) => {
  try {
    return validationRules
      .isString()
      .withMessage(`'${field.name}' must be string.`)
      .matches(field.pattern)
      .withMessage(`${field.name} has invalid value.`)
      .isLength({ min: field.min })
      .withMessage(
        `'${field.name}' must be at least ${field.min} characters long.`,
      )
      .isLength({ max: field.max })
      .withMessage(
        `'${field.name}' must be at most ${field.max} characters long.`,
      );
  } catch (error) {
    return false;
  }
};

const alphaStringValidator = (validationRules, field) => {
  try {
    return validationRules
      .isString()
      .withMessage(`'${field.name}' must be string.`)
      .custom((value, { req }) => {
        if (!/^[a-zA-Z]+$/.test(value)) {
          throw new Error(
            `'${field.name}' must contain only alphabetic characters.`,
          );
        }
        return true;
      })
      .isLength({ min: field.min })
      .withMessage(
        `'${field.name}' must be at least ${field.min} characters long.`,
      )
      .isLength({ max: field.max })
      .withMessage(
        `'${field.name}' must be at most ${field.max} characters long.`,
      );
  } catch (error) {
    return false;
  }
};

const charStringValidator = (validationRules, field) => {
  try {
    return validationRules
      .isString()
      .withMessage(`'${field.name}' must be string.`)
      .isLength({ min: field.min })
      .withMessage(
        `'${field.name}' must be at least ${field.min} characters long.`,
      )
      .isLength({ max: field.max })
      .withMessage(
        `'${field.name}' must be at most ${field.max} characters long.`,
      )
      .custom((value, { req }) => {
        if (field.uppercase && !/^[A-Z0-9_!@#$%^&*() ]+$/g.test(value.trim())) {
          throw new Error(`'${field.name}' must be all capital letters.`);
        }
        return true;
      });
  } catch (error) {
    return false;
  }
};

const uuidV4Validator = (validationRules, field) => {
  try {
    return validationRules
      .isString()
      .withMessage(`'${field.name}' must be string.`)
      .isUUID(4)
      .withMessage(`'${field.name}' must be of UUID v4 format.`);
  } catch (error) {
    return false;
  }
};

const enumValidator = (validationChain, field) => {
  try {
    return validationChain
      .isIn(field.values)
      .withMessage(`'${field.name}' has invalid value.`);
  } catch (error) {
    return false;
  }
};

const ISO8601StringValidator = (validationChain, field) => {
  try {
    return validationChain
      .isString()
      .withMessage(`'${field.name}' must be string.`)
      .isISO8601()
      .withMessage(`'${field.name}' must be of ISO-8601 format.`);
  } catch (error) {
    return false;
  }
};

const emailIdValidator = (validationRules, field) => {
  try {
    return validationRules
      .isEmail()
      .withMessage(`'${field.name}' has invalid email ID.`);
  } catch (error) {
    return false;
  }
};

const intValidator = (validationRules, field) => {
  try {
    return validationRules
      .isInt({ min: field.min, max: field.max })
      .withMessage(`'${field.name}' has invalid value.`);
  } catch (error) {
    return false;
  }
};

const floatNumValidator = (validationRules, field) => {
  try {
    return validationRules
      .isFloat({ min: field.min, max: field.max })
      .withMessage(`'${field.name}' has invalid value.`);
  } catch (error) {
    return false;
  }
};

const ArrayValidator = (validationRules, field) => {
  try {
    return validationRules
      .isArray()
      .withMessage(`'${field.name}' has invalid value.`);
  } catch (error) {
    return false;
  }
};

module.exports = {
  validationChainBuilder,
  validationResultChecker,
};
