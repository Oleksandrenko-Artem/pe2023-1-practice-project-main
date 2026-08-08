module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transactions',
    {
      operationType: {
        type: DataTypes.ENUM('INCOME', 'EXPENCE'),
        allowNull: false,
      },
      summ: {
        type: DataTypes.DECIMAL,
        validate: {
          min: 0,
        },
      },
    },
  );

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Users, {
      foreignKey: { name: 'userId', allowNull: false },
    });
  };

  return Transaction;
};
