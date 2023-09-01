const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../error');
const {
  genericCreateOne,
  genericGetOne,
  genericGetAll,
  genericDeleteAll,
  genericUpdate,
  genericFunctionReturn,
} = require('../services/generic.service');

const getAllContactAddrDetls = async (options = {}) => {
  try {
    const ContactAddrDetls = await genericGetAll(
      'ContactAddressDetails',
      options,
    );

    if (ContactAddrDetls.error) {
      return genericFunctionReturn(
        null,
        new APIError('0015', StatusCodes.BAD_REQUEST),
      );
    }

    return ContactAddrDetls;
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0015', StatusCodes.BAD_REQUEST),
    );
  }
};

const getAnContactAddrDetyId = async (addressId, options = {}) => {
  try {
    const ContactAddrDet = await genericGetOne('ContactAddressDetails', {
      where: {
        id: addressId,
      },
      ...options,
    });

    if (ContactAddrDet.error) {
      return genericFunctionReturn(
        null,
        new APIError('0015', StatusCodes.NOT_FOUND),
      );
    }

    return ContactAddrDet;
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0015', StatusCodes.NOT_FOUND),
    );
  }
};

const createAnContactAddrDet = async (body, options = {}) => {
  try {
    const ContactAddrDet = await genericCreateOne(
      'ContactAddressDetails',
      body,
      options,
    );

    if (ContactAddrDet.error) {
      return genericFunctionReturn(
        null,
        new APIError('0014', StatusCodes.BAD_REQUEST),
      );
    }

    return getAnContactAddrDetyId(ContactAddrDet.data.id, options);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0014', StatusCodes.BAD_REQUEST),
    );
  }
};

const updateAnContactAddrDetycontactId = async (
  contactId,
  data,
  options = {},
) => {
  try {
    const updatedContactAddrDet = await genericUpdate(
      'ContactAddressDetails',
      data,
      {
        where: {
          contactId: contactId,
        },
        ...options,
      },
    );

    if (updatedContactAddrDet.error || updatedContactAddrDet.data[0] == 0) {
      return genericFunctionReturn(
        null,
        new APIError('0016', StatusCodes.BAD_REQUEST),
      );
    }

    return getAnContactAddrDetyId(updatedContactAddrDet.data[1][0].id, options);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0016', StatusCodes.BAD_REQUEST),
    );
  }
};

const updateAnContactAddrDetyId = async (addressId, data, options = {}) => {
  try {
    const updatedContactAddrDet = await genericUpdate(
      'ContactAddressDetails',
      data,
      {
        where: {
          id: addressId,
        },
        ...options,
      },
    );

    if (updatedContactAddrDet.error || updatedContactAddrDet.data[0] == 0) {
      return genericFunctionReturn(
        null,
        new APIError('0016', StatusCodes.BAD_REQUEST),
      );
    }

    return getAnContactAddrDetyId(updatedContactAddrDet.data[1][0].id, options);
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0016', StatusCodes.BAD_REQUEST),
    );
  }
};

const deleteAnContactAddrDetyId = async (addressId, options = {}) => {
  try {
    const deletedContactAddrDet = await genericDeleteAll(
      'ContactAddressDetails',
      {
        where: {
          id: addressId,
        },
        ...options,
      },
    );

    if (deletedContactAddrDet.error || deletedContactAddrDet.data == 0) {
      return genericFunctionReturn(
        null,
        new APIError('0017', StatusCodes.BAD_REQUEST),
      );
    }

    return deletedContactAddrDet;
  } catch (error) {
    return genericFunctionReturn(
      null,
      new APIError('0017', StatusCodes.BAD_REQUEST),
    );
  }
};

module.exports = {
  getAnContactAddrDetyId,
  getAllContactAddrDetls,
  createAnContactAddrDet,
  updateAnContactAddrDetycontactId,
  updateAnContactAddrDetyId,
  deleteAnContactAddrDetyId,
};
