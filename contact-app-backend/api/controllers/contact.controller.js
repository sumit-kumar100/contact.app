const contactHelpers = require('../helpers').contact;
const contactAddressHelpers = require('../helpers').contactAddressDetails;
const { StatusCodes } = require('http-status-codes');
const {
  applyLimitAndOffsetParams,
} = require('../services/generic-query.service');

const getAllContactsCntrl = async (req, res, next) => {
  try {
    let contacts = await contactHelpers.getAllContacts({
      where: [req.query],
      include: [
        {
          model: db.ContactAddressDetails,
          as: 'address',
          attributes: {
            exclude: ['id', 'contactId', 'createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['updatedAt', 'DESC']]
    });

    if (contacts.error) {
      return next(contacts.error);
    }


    const resultLength = contacts.data.length;

    contacts.data = [
      ...applyLimitAndOffsetParams(
        contacts.data,
        req.pagination.limit,
        req.pagination.offset,
      ),
    ];

    res.status(StatusCodes.OK).json({
      error: null,
      count: resultLength,
      data: contacts.data,
    });
  } catch (error) {
    next(error);
  }
};

const getAnContactByIdCntrl = async (req, res, next) => {
  try {
    const contact = await contactHelpers.getAnContactById(
      req.params.contactId,
      {
        include: [
          {
            model: db.ContactAddressDetails,
            as: 'address',
            attributes: {
              exclude: ['id', 'contactId', 'createdAt', 'updatedAt'],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    );

    if (contact.error) {
      return next(contact.error);
    }

    res.status(StatusCodes.OK).json({
      error: null,
      data: contact.data,
    });
  } catch (error) {
    next(error);
  }
};

const createAnContactCntrl = async (req, res, next) => {
  try {
    const createAnContactTxn = await db.sequelize.transaction();

    const contact = await contactHelpers.createAnContact(
      req.body.contactDetails,
      {
        transaction: createAnContactTxn,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    );

    if (contact.error) {
      await createAnContactTxn.rollback();
      return next(contact.error);
    }

    const address = await contactAddressHelpers.createAnContactAddrDet(
      {
        ...req.body.addressDetails,
        contactId: contact.data.id,
      },
      {
        transaction: createAnContactTxn,
        attributes: {
          exclude: ['id', 'contactId', 'createdAt', 'updatedAt'],
        },
      },
    );

    if (address.error) {
      await createAnContactTxn.rollback();
      return next(contact.error);
    }

    await createAnContactTxn.commit();

    res.status(StatusCodes.OK).json({
      error: null,
      message: 'Contact added successfully.',
      data: {
        ...contact.data.dataValues,
        address: {
          ...address.data.dataValues,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAnContactByIdCntrl = async (req, res, next) => {
  try {
    const updateAnContactTxn = await db.sequelize.transaction();

    const updatedContact = await contactHelpers.updateAnContactById(
      req.params.contactId,
      req.body.contactDetails,
      {
        transaction: updateAnContactTxn,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    );

    if (updatedContact.error) {
      await updateAnContactTxn.rollback();
      return next(updatedContact.error);
    }

    const updatedAddress =
      await contactAddressHelpers.updateAnContactAddrDetycontactId(
        req.params.contactId,
        req.body.addressDetails,
        {
          transaction: updateAnContactTxn,
          attributes: {
            exclude: ['id', 'contactId', 'createdAt', 'updatedAt'],
          },
        },
      );

    if (updatedAddress.error) {
      await updateAnContactTxn.rollback();
      return next(updatedAddress.error);
    }

    await updateAnContactTxn.commit();

    res.status(StatusCodes.OK).json({
      error: null,
      message: 'Contact Details updated successfully.',
      data: {
        ...updatedContact.data.dataValues,
        address: {
          ...updatedAddress.data.dataValues,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAnContactByIdCntrl = async (req, res, next) => {
  try {
    const deletedContact = await contactHelpers.deleteAllContacts({
      where: {
        id: req.params.contactId,
      },
    });

    if (deletedContact.error) {
      return next(deletedContact.error);
    }

    res.status(StatusCodes.OK).json({
      error: null,
      message: 'Contact deleted successfully.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContactsCntrl,
  getAnContactByIdCntrl,
  createAnContactCntrl,
  updateAnContactByIdCntrl,
  deleteAnContactByIdCntrl,
};
