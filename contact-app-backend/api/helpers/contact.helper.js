const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../error');
const {
  genericFunctionReturn,
  genericCreateOne,
  genericGetAll,
  genericDeleteAll,
  genericGetOne,
  genericUpdate,
} = require('../services/generic.service');

const getAllContacts = async (options = {}) => {
  try {
    const contact = await genericGetAll('Contact', options);

    if (contact.error) {
      return genericFunctionReturn(
        null,
        new APIError('0011', StatusCodes.BAD_REQUEST),
      );
    }

    return contact;
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0011', StatusCodes.BAD_REQUEST),
    );
  }
};

const getAnContactById = async (contactId, options = {}) => {
  try {
    const contact = await genericGetOne('Contact', {
      where: {
        id: contactId,
      },
      ...options,
    });

    if (contact.error) {
      return genericFunctionReturn(
        null,
        new APIError('0011', StatusCodes.NOT_FOUND),
      );
    }

    return contact;
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0011', StatusCodes.NOT_FOUND),
    );
  }
};

const createAnContact = async (body, options = {}) => {
  try {
    const contact = await genericCreateOne('Contact', body, options);

    if (contact.error) {
      return genericFunctionReturn(
        null,
        new APIError('0010', StatusCodes.BAD_REQUEST),
      );
    }

    return getAnContactById(contact.data.id, options);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0010', StatusCodes.BAD_REQUEST),
    );
  }
};

const updateAnContactById = async (contactId, data, options = {}) => {
  try {
    const updatedContact = await genericUpdate('Contact', data, {
      where: {
        id: contactId,
      },
      ...options,
    });

    if (updatedContact.error || updatedContact.data[0] == 0) {
      return genericFunctionReturn(
        null,
        new APIError('0012', StatusCodes.BAD_REQUEST),
      );
    }

    return getAnContactById(updatedContact.data[1][0].id, options);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0012', StatusCodes.BAD_REQUEST),
    );
  }
};

const deleteAllContacts = async (options = {}) => {
  try {
    const deletedContact = await genericDeleteAll('Contact', options);

    if (deletedContact.error || deletedContact.data == 0) {
      return genericFunctionReturn(
        null,
        new APIError('0013', StatusCodes.BAD_REQUEST),
      );
    }

    return deletedContact;
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0013', StatusCodes.BAD_REQUEST),
    );
  }
};

module.exports = {
  createAnContact,
  getAnContactById,
  getAllContacts,
  updateAnContactById,
  deleteAllContacts,
};
