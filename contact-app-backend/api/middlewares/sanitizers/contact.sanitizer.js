const {
  setPaginationParams,
  generateQuery,
} = require('../../services/generic-query.service');

module.exports = method => {
  return (req, res, next) => {
    switch (method) {
      case 'getAllContacts': {
        req.pagination = setPaginationParams(req.query);

        req.query = generateQuery(req.query);

        next();
        break;
      }

      case 'createAnContact': {
        const {
          firstName,
          lastName,
          phone,
          email,
          gender,
          dateOfBirth,
          active,
          addressLineOne,
          addressLineTwo,
          city,
          country,
          zipcode,
        } = { ...req.body };

        req.body = {
          contactDetails: {
            firstName,
            lastName,
            phone,
            email,
            gender,
            dateOfBirth,
            active,
          },
          addressDetails: {
            addressLineOne,
            addressLineTwo,
            city,
            country,
            zipcode,
          },
        };

        next();
        break;
      }

      case 'updateAnContact': {
        const {
          firstName,
          lastName,
          phone,
          email,
          gender,
          dateOfBirth,
          active,
          addressLineOne,
          addressLineTwo,
          city,
          country,
          zipcode,
        } = { ...req.body };

        req.body = {
          contactDetails: {
            firstName,
            lastName,
            phone,
            email,
            gender,
            dateOfBirth,
            active,
          },
          addressDetails: {
            addressLineOne,
            addressLineTwo,
            city,
            country,
            zipcode,
          },
        };

        req.params.contactId = req.params.contactId ? req.params.contactId : '';

        next();
        break;
      }

      default: {
        next();
      }
    }
  };
};
