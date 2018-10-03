'use strict';

var _openvpn = require('./openvpn');

var _openvpn2 = _interopRequireDefault(_openvpn);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _http = require('axios/lib/adapters/http');

var _http2 = _interopRequireDefault(_http);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.adapter = _http2.default;


var baseUrl = process.env.OPENVPN_BASE_URL || "";
var username = process.env.OPENVPN_USER_NAME || "";
var password = process.env.OPENVPN_PASSWORD || "";
var openVpn = new _openvpn2.default(baseUrl);

it('should login with username/password and response cookie', function (done) {
    openVpn.login(username, password).subscribe(function (cookie) {
        console.log(cookie);
        done();
    }, function (err) {
        console.error(err);
        done.fail(err);
    });
});

it('should get current users', function (done) {
    openVpn.login(username, password).flatMap(function (cookie) {
        return openVpn.getCurrentUsers(cookie);
    }).subscribe(function (users) {
        console.log(users);
        done();
    }, function (err) {
        console.error(err);
        done.fail(err);
    });
});