const Sequelize = require('../models').Sequelize;

/**
 * Builds a query object as per the input object provided
 * @param {Object} input Input object to generate query object
 * @example { firstName: "John", lastName: "Doe" }
 * @returns Generated query object
 */
const generateQuery = input => {
  let query = {};

  const fields = {
    complete: ['id', 'contactId', 'gender', 'zipcode', 'active'],

    binary: [],

    int: [],

    float: [],

    date: ['dateOfBirth'],

    dateRange: ['createdAt'],
  };

  Object.keys(input).forEach(key => {
    switch (true) {
      // Complete fields
      case fields.complete.indexOf(key) >= 0: {
        query[key] = input[key];
        break;
      }

      // Binary fields
      case fields.binary.indexOf(key) >= 0: {
        query[key] = parseInt(input[key]) ? 1 : 0;
        break;
      }

      // Integer fields
      case fields.int.indexOf(key) >= 0: {
        query[key] = parseInt(input[key]);
        break;
      }

      // Float fields
      case fields.float.indexOf(key) >= 0: {
        query[key] = parseFloat(input[key]);
        break;
      }

      // Date fields
      case fields.date.indexOf(key) >= 0: {
        const startOfStartDate = new Date(input[key]);
        startOfStartDate.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

        const endOfEndDate = new Date(input[key]);
        endOfEndDate.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

        query[key] = {
          [db.Sequelize.Op.gte]: startOfStartDate,
          [db.Sequelize.Op.lte]: endOfEndDate,
        };
        break;
      }

      // Date Range fields
      case fields.dateRange.indexOf(key) >= 0: {
        let dates = decodeURIComponent(input[key]).split(',');
        let startDate = new Date(dates[0]);
        let endDate = new Date(dates[1]);

        endDate.setHours(23, 0, 0);

        query[key] = {
          [db.Sequelize.Op.gte]: startDate,
          [db.Sequelize.Op.lte]: endDate,
        };

        break;
      }

      // Default string matching
      default: {
        query[key] = { [db.Sequelize.Op.iLike]: `%${input[key]}%` };
        break;
      }
    }
  });

  return query;
};

/**
 * Renames query fields in-place to support nested column filtering
 * @param {Object} where Input query object
 * @example { firstName: "John", lastName: "Doe" }
 * @param {Object} fieldMapping Object mapping old field names to new field names
 * @example { entityName: "$buyerSellerLink.buyer.entityName$" }
 * @returns Generated query object
 */
const renameQueryFields = (where, fieldMapping) => {
  Object.keys(fieldMapping).forEach(key => {
    if (where[key]) {
      where[fieldMapping[key]] = where[key];
      delete where[key];
    }
  });

  return where;
};

/**
 * Set 'limit' & 'offset' parameter values for pagination.
 * @param {Object} query Input Query Parameters
 * @returns Pagination parameters (limit & offset)
 * @example { limit: 5, offset: 0 }
 */
const setPaginationParams = query => {
  const queryParams = {
    limit: query.limit ? parseInt(query.limit) : envConfig.PAGINATION_LIMIT,

    offset: query.offset ? parseInt(query.offset) : 0,
  };

  delete query.limit;
  delete query.offset;

  return queryParams;
};

/**
 * Apply 'limit' & 'offset' pagination parameters to data.
 * @param {Array} temp Input data array
 * @param {number} limit Limit
 * @param {number} offset Offset
 * @returns Modified data
 */
const applyLimitAndOffsetParams = (data, limit, offset) => {
  let temp = [...data];

  if (limit <= 0 || offset < 0 || offset >= temp.length) {
    temp = [];
  } else {
    if (offset > 0 && offset < temp.length) {
      temp = [...temp.slice(offset, temp.length)];
    }

    if (limit > 0 && limit <= temp.length) {
      temp = [...temp.slice(0, limit)];
    }
  }

  return temp;
};

module.exports = {
  generateQuery,
  renameQueryFields,
  setPaginationParams,
  applyLimitAndOffsetParams,
};
