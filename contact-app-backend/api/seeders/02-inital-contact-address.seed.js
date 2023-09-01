'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ContactAddressDetails',
      [
        {
          id: '83fa12e8-9722-493e-bac5-6c0520a2894e',
          contactId: '2994aba6-73de-4e53-a201-4f34cb7bf074',
          addressLineOne: '211, 1st Main Road',
          addressLineTwo: '7th block',
          city: 'Karnataka',
          country: 'INDIA',
          zipcode: '560030',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'da7382ab-9853-4fe0-928d-cb04151293ef',
          contactId: '2994aba6-73de-4e53-a201-4f34cb7bf079',
          addressLineOne: '415, 3rd Main Road',
          addressLineTwo: '9th block',
          city: 'Karnataka',
          country: 'INDIA',
          zipcode: '560030',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'da7382ab-9853-4fe0-928d-cb04151293ed',
          contactId: '82c3c22d-078b-4aeb-9ed4-84d1e2cf2b4e',
          addressLineOne: '415, 3rd Main Road',
          addressLineTwo: '9th block',
          city: 'Karnataka',
          country: 'INDIA',
          zipcode: '560030',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ContactAddressDetails', null, {});
  },
};
