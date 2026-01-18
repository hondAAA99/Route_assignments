import { Sequelize } from "sequelize";
const sequelize = new Sequelize("a6", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
const check_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (err) {
    if (err) console.log(err);
  }
};
const check_sync = async () => {
  try {
    await sequelize.sync({ force: false, alter: false });
    console.log("database synced");
  } catch (err) {
    if (err) console.log(err);
  }
};
export { check_connection, check_sync, sequelize };
