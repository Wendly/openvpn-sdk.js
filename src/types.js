/* @flow */

import * as validators from 'flow-runtime-validators';
import Moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import fs from 'fs';
import validator from 'validator';
//import faker from 'faker'; // TODO

// TODO more fancy error message
export type Email = string;
Email.addConstraint(
  validators.length({max: 250}),
  it => {
    if (!validator.isEmail(it)) {
      return "must be valid Email";
    }
  }
);
//Email.prototype.faker = (it: string): Email => { faker.internet.email(); };

export type UUID = string;
UUID.addConstraint(it => {
  if (!validator.isUUID(it, 4)) {
    return "must be valid UUID v4";
  }
});
//UUID.prototype.faker = (it: string): UUID => { faker.random.uuid(); };

export type Phone = string;
Phone.addConstraint(
  it => {
    if (!validator.isMobilePhone(it, "any")) {
      return "must be valid phone number";
    }
  }
);
//Phone.prototype.faker = (it: string): Phone => { faker.phone.phoneNumber(); };

export type unsigned_number = number;
unsigned_number.addConstraint(
  validators.number({gt: -1})
);

export type TimeZone = string;
TimeZone.addConstraint(
  it => {
    if (!!MomentTimeZone.tz.zone(it)) {
      // ok
    } else {
      return "must be valid time zone";
    }
  }
);

export type PostalCode = string;
PostalCode.addConstraint(
  it => {
    if (!validator.isPostalCode(it, "any")) {
      return "must be valid postal code";
    }
  }
);
//PostalCode.prototype.faker = (it: string): PostalCode => { faker.address.zipCode(); };

export type Country = string;
Country.addConstraint(
  it => {
    if (!validator.isISO31661Alpha2(it, "any") || !validator.isUppercase(it)) {
      return "must be valid country code";
    }
  }
);
//Country.prototype.faker = (it: string): Country => { faker.address.countryCode(); };

export type File = string;
File.addConstraint(
  it => {
    if (!fs.existsSync(it)) {
      return "not found";
    }
  }
);

export type Time = string;

export type URL = string;
URL.addConstraint(
  it => {
    if (!validator.isURL(it)) {
      return "must be valid URL";
    }
  }
);

export type Enabled = "on" | "off" | "true" | "false" | "yes" | "no";


export type LoginPayloadParams = {
  token: string
};

/**
 *  {
 *    "jsonrpc": "2.0",
 *    "result": true,
 *    "id": 1
 *  }
 */

export type JsonProp = string;
JsonProp.addConstraint(
  it => {
    if (/[^a-zA-Z_]/.test(it)) {
      return "must be valid Json property name of /[a-zA-Z_]/";
    }
  }
);

export const isDomainNameSocketLike = (it: string): boolean => {
  return (/^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}:[0-9]+$/.test(it));
};

export const isDomainNameSocket = (it: string): boolean => {
  if (isDomainNameSocketLike(it)) {
    return validator.isPort(it.split(":")[1]);
  }
  return false;
};

export const isDomainName = (it: string): boolean => {
  return (/^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(it));
};

export const isIpSocketLike = (it: string): boolean => {
  return (/^[0-9]+(.[0-9]{1,3}){1,3}:[0-9]+$/.test(it));
};

export const isIpSocket = (it: string): boolean => {
  if (isIpSocketLike(it)) {
    const ipSocket = it.split(":");
    return validator.isIP(ipSocket[0]) && validator.isPort(ipSocket[1]);
  }
  return false;
};

export const isSocket = (it: string): boolean => {
  return isIpSocket(it) || isDomainNameSocket(it);
};

export type Socket = string;
Socket.addConstraint(
  it => {
    if (isSocket(it)) {
      return "must be valid socket";
    }
  }
);

export type IP = string;
IP.addConstraint(
  it => {
    if (!validator.isIP(it, 4)) {
      return "must be valid IP";
    }
  }
);


export type User = {
  name: string,
  realAddress: Socket,
  vpnAddress: IP,
};
