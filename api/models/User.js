var _ = require('lodash');
var crypto = require('crypto');

/** @module User */
module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true,
      index: true,
      notNull: true
    },
    email: {
      type: 'email',
      notNull: true,
      unique: true,
      index: true
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },

    getGravatarUrl: function () {
      var md5 = crypto.createHash('md5');
      md5.update(this.email);
      return 'https://gravatar.com/avatar/'+ md5.digest('hex');
    },

    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      user.gravatarUrl = this.getGravatarUrl();
      return user;
    }
  }
};
