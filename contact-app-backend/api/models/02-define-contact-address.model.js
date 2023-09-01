'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactAddressDetails extends Model {
    static associate(models) {
      ContactAddressDetails.belongsTo(models.Contact, {
        foreignKey: 'contactId',
        as: 'contact',
        onDelete: 'CASCADE',
      });
    }
  }
  ContactAddressDetails.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      contactId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Contact',
          key: 'id',
          as: 'contactId',
        },
      },
      addressLineOne: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLineTwo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date().toISOString(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date().toISOString(),
      },
    },
    {
      sequelize,
      modelName: 'ContactAddressDetails',
      timestamps: true,
    },
  );
  return ContactAddressDetails;
};
