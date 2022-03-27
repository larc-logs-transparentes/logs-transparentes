module.exports = (sequelize, Sequelize) => {
  const BU = sequelize.define("bu", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    secao: {
      type: Sequelize.STRING
    },
    zona: {
      type: Sequelize.STRING
    },
    UF: {
      type: Sequelize.STRING
    },
    merkletree_leaf_id: {
      type: Sequelize.STRING
    }
  });
  return BU;
};