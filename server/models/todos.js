'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    title: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    relId: DataTypes.INTEGER,
    endDt: DataTypes.DATE,
    strtDt: DataTypes.DATE
  }, {});
  Todos.associate = function(models) {
    // associations can be defined here
  };
  return Todos;
};