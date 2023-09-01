'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Contact',
      [
        {
          id: '2994aba6-73de-4e53-a201-4f34cb7bf074',
          firstName: 'John',
          lastName: 'doe',
          phone: '7967567654',
          email: 'john.doe@gmail.com',
          gender: 'MALE',
          dateOfBirth: '1990-01-01',
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2994aba6-73de-4e53-a201-4f34cb7bf079',
          firstName: 'Mark',
          lastName: 'doe',
          phone: '7865654567',
          email: 'mark.doe@gmail.com',
          gender: 'MALE',
          dateOfBirth: '1995-01-01',
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '82c3c22d-078b-4aeb-9ed4-84d1e2cf2b4e',
          firstName: 'Alice',
          lastName: 'Smith',
          phone: '9876543210',
          email: 'alice.smith@gmail.com',
          gender: 'FEMALE',
          dateOfBirth: '2001-01-01',
          active: true,
          createdAt: '2023-08-30T13:00:00Z',
          updatedAt: '2023-08-30T13:00:00Z',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Contact', null, {});
  },
};
