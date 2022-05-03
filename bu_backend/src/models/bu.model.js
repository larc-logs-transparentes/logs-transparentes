module.exports = (sequelize, Sequelize) => {
  const BU = sequelize.define("bu", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    turno: {
      type: Sequelize.STRING
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
    },
    merkletree_leaf: {
      type: Sequelize.STRING
    },
    votos: {
      // type: Sequelize.DataTypes.JSON
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON)
    }
  });
  return BU;
};