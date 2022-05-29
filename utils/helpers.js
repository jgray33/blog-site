const moment = require('moment')

module.exports = {
  format_date: (date) => {
    return moment(date).format('Do MMMM YYYY');
  },

  user_match: (id, id2) => {
    if (id === id2) {
      return true;
    }
  }
};