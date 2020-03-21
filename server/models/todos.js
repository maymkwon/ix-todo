'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    title: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    relId: DataTypes.BIGINT
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};