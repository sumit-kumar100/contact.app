const { StatusCodes } = require('http-status-codes');
const { APIError } = require('../../error');
const contactHelpers = require('../../helpers').contact;

module.exports = async (req, res, next) => {
  try {
    const exclude = req.params.contactId
      ? { id: { [db.Sequelize.Op.ne]: req.params.contactId } }
      : {};

    const contacts = await contactHelpers.getAllContacts({
      where: {
        ...exclude,
        [db.Sequelize.Op.or]: [
          {
            [db.Sequelize.Op.and]: [
              { email: req.body.contactDetails.email },
              { phone: req.body.contactDetails.phone },
            ],
          },
        ],
      },
    });

    if (contacts.error) {
      return next(contacts.error);
    }

    if (contacts.data.length > 0) {
      return next(new APIError('0002', StatusCodes.CONFLICT));
    }

    next();
  } catch (error) {
    next(error);
  }
};
