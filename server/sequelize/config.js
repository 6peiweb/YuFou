const DBConfig = {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
  pool: {
    max: 20,
    idle: 20000
  }
};

module.exports = DBConfig;