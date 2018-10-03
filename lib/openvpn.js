'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _types = require('./types');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Email = _flowRuntime2.default.tdz(function () {
  return _types.Email;
});

var File = _flowRuntime2.default.tdz(function () {
  return _types.File;
});

var URL = _flowRuntime2.default.tdz(function () {
  return _types.URL;
});

var UUID = _flowRuntime2.default.tdz(function () {
  return _types.UUID;
});

var IP = _flowRuntime2.default.tdz(function () {
  return _types.IP;
});

var User = _flowRuntime2.default.tdz(function () {
  return _types.User;
});

var https = require('https');

var OpenVpn = function () {
  function OpenVpn(url) {
    _classCallCheck(this, OpenVpn);

    var _urlType = _flowRuntime2.default.ref(URL);

    _flowRuntime2.default.param('url', _urlType).assert(url);

    this.axios = _axios2.default.create({
      baseURL: url,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      maxRedirects: 0,
      withCredentials: true
    });
  }

  _createClass(OpenVpn, [{
    key: 'login',
    value: function login(username, password) {
      var _this = this;

      var _usernameType = _flowRuntime2.default.string();

      var _passwordType = _flowRuntime2.default.string();

      var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(_rxjs2.default.Observable, _flowRuntime2.default.string()));

      _flowRuntime2.default.param('username', _usernameType).assert(username);

      _flowRuntime2.default.param('password', _passwordType).assert(password);

      return _returnType.assert(_rxjs2.default.Observable.fromPromise(this.axios.get("/")).map(function (res) {
        return "";
      }).catch(function (err) {
        if (err.response.headers["location"] == _this.axios.defaults.baseURL + '__session_start__/') {
          var cookie = err.response.headers["set-cookie"][0].split(";")[0];
          return _rxjs2.default.Observable.fromPromise(_this.axios.get("/__session_start__", {
            headers: {
              Cookie: cookie
            }
          })).catch(function (err) {
            return _rxjs2.default.Observable.fromPromise(_this.axios.get("/", { headers: { Cookie: cookie } }));
          }).map(function (res) {
            return cookie;
          });
        }
        return _rxjs2.default.Observable.throw(err);
      }).flatMap(function (cookie) {
        return _rxjs2.default.Observable.fromPromise(_this.axios.post("/__login__", _qs2.default.stringify({
          username: username,
          password: password }), {
          headers: {
            Cookie: cookie,
            "Content-Type": "application/x-www-form-urlencoded"
          } }));
      }).catch(function (err) {
        return _rxjs2.default.Observable.of(err.response);
      }).map(function (res) {
        return res.headers["set-cookie"][0].split(";")[0];
      }));
    }
  }, {
    key: 'getCurrentUsers',
    value: function getCurrentUsers(cookie) {
      var _cookieType = _flowRuntime2.default.string();

      var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.ref(_rxjs2.default.Observable, _flowRuntime2.default.array(_flowRuntime2.default.ref(User))));

      _flowRuntime2.default.param('cookie', _cookieType).assert(cookie);

      return _returnType2.assert(_rxjs2.default.Observable.fromPromise(this.axios.get("/current_users", { headers: { Cookie: cookie } })).map(function (res) {
        var _usersType = _flowRuntime2.default.array(_flowRuntime2.default.ref(User)),
            users = _usersType.assert([]);
        var $ = _cheerio2.default.load(res.data);
        $('table[id="box-current-users-table"] tbody tr').each(function (i, elem) {
          if (i > 0) {
            var user = _flowRuntime2.default.ref(User).assert({
              name: $(elem).children().eq(0).text(),
              realAddress: $(elem).children().eq(1).text(),
              vpnAddress: $(elem).children().eq(2).text()
            });
            users.push(user);
          }
        });
        return users;
      }));
    }
  }]);

  return OpenVpn;
}();

exports.default = OpenVpn;