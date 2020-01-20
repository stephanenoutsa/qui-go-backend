module.exports = {
  dev: {
    username: process.env.QUI_GO_USERNAME,
    password: process.env.QUI_GO_PASSWORD,
    database: process.env.QUI_GO_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
  prod: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: 'mysql',
    jwt: {
      secret: '',
    },
  },
};
