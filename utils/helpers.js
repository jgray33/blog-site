const moment = require('moment')

module.exports = {
  format_date: (date) => {
    return moment(date).format('Do MMMM YYYY');
  },
};