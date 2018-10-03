'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.IP = exports.JsonProp = exports.LoginPayloadParams = exports.Enabled = exports.URL = exports.Time = exports.File = exports.Country = exports.PostalCode = exports.TimeZone = exports.unsigned_number = exports.Phone = exports.UUID = exports.Email = undefined;

var _flowRuntimeValidators = require('flow-runtime-validators');

var validators = _interopRequireWildcard(_flowRuntimeValidators);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//import faker from 'faker'; // TODO

// TODO more fancy error message
var Email = exports.Email = _flowRuntime2.default.type('Email', _flowRuntime2.default.string());

Email.addConstraint(validators.length({ max: 250 }), function (it) {
  if (!_validator2.default.isEmail(it)) {
    return "must be valid Email";
  }
});
//Email.prototype.faker = (it: string): Email => { faker.internet.email(); };

var UUID = exports.UUID = _flowRuntime2.default.type('UUID', _flowRuntime2.default.string());

UUID.addConstraint(function (it) {
  if (!_validator2.default.isUUID(it, 4)) {
    return "must be valid UUID v4";
  }
});
//UUID.prototype.faker = (it: string): UUID => { faker.random.uuid(); };

var Phone = exports.Phone = _flowRuntime2.default.type('Phone', _flowRuntime2.default.string());

Phone.addConstraint(function (it) {
  if (!_validator2.default.isMobilePhone(it, "any")) {
    return "must be valid phone number";
  }
});
//Phone.prototype.faker = (it: string): Phone => { faker.phone.phoneNumber(); };

var unsigned_number = exports.unsigned_number = _flowRuntime2.default.type('unsigned_number', _flowRuntime2.default.number());

unsigned_number.addConstraint(validators.number({ gt: -1 }));

var TimeZone = exports.TimeZone = _flowRuntime2.default.type('TimeZone', _flowRuntime2.default.string());

TimeZone.addConstraint(function (it) {
  if (!!_momentTimezone2.default.tz.zone(it)) {
    // ok
  } else {
    return "must be valid time zone";
  }
});

var PostalCode = exports.PostalCode = _flowRuntime2.default.type('PostalCode', _flowRuntime2.default.string());

PostalCode.addConstraint(function (it) {
  if (!_validator2.default.isPostalCode(it, "any")) {
    return "must be valid postal code";
  }
});
//PostalCode.prototype.faker = (it: string): PostalCode => { faker.address.zipCode(); };

var Country = exports.Country = _flowRuntime2.default.type('Country', _flowRuntime2.default.string());

Country.addConstraint(function (it) {
  if (!_validator2.default.isISO31661Alpha2(it, "any") || !_validator2.default.isUppercase(it)) {
    return "must be valid country code";
  }
});
//Country.prototype.faker = (it: string): Country => { faker.address.countryCode(); };

var File = exports.File = _flowRuntime2.default.type('File', _flowRuntime2.default.string());

File.addConstraint(function (it) {
  if (!_fs2.default.existsSync(it)) {
    return "not found";
  }
});

var Time = exports.Time = _flowRuntime2.default.type('Time', _flowRuntime2.default.string());

var URL = exports.URL = _flowRuntime2.default.type('URL', _flowRuntime2.default.string());

URL.addConstraint(function (it) {
  if (!_validator2.default.isURL(it)) {
    return "must be valid URL";
  }
});

var Enabled = exports.Enabled = _flowRuntime2.default.type('Enabled', _flowRuntime2.default.union(_flowRuntime2.default.string('on'), _flowRuntime2.default.string('off'), _flowRuntime2.default.string('true'), _flowRuntime2.default.string('false'), _flowRuntime2.default.string('yes'), _flowRuntime2.default.string('no')));

var LoginPayloadParams = exports.LoginPayloadParams = _flowRuntime2.default.type('LoginPayloadParams', _flowRuntime2.default.object(_flowRuntime2.default.property('token', _flowRuntime2.default.string())));

/**
 *  {
 *    "jsonrpc": "2.0",
 *    "result": true,
 *    "id": 1
 *  }
 */

var JsonProp = exports.JsonProp = _flowRuntime2.default.type('JsonProp', _flowRuntime2.default.string());

JsonProp.addConstraint(function (it) {
  if (/[^a-zA-Z_]/.test(it)) {
    return "must be valid Json property name of /[a-zA-Z_]/";
  }
});

var IP = exports.IP = _flowRuntime2.default.type('IP', _flowRuntime2.default.string());

var User = exports.User = _flowRuntime2.default.type('User', _flowRuntime2.default.object(_flowRuntime2.default.property('name', _flowRuntime2.default.string()), _flowRuntime2.default.property('realAddress', IP), _flowRuntime2.default.property('vpnAddress', IP)));