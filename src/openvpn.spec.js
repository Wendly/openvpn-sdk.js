/* @flow */

axios.defaults.adapter = httpAdapter;
import OpenVpn from './openvpn';
import Rx from 'rxjs';
import axios from 'axios';
import faker from 'faker';
import httpAdapter from 'axios/lib/adapters/http'
import validator from 'validator';
import {
  isDomainNameSocket,
  isIpSocket
} from './types';

const baseUrl = process.env.OPENVPN_BASE_URL || "";
const username = process.env.OPENVPN_USER_NAME || "";
const password = process.env.OPENVPN_PASSWORD || "";
const openVpn = new OpenVpn(baseUrl);

it('should login with username/password and response cookie successfully', done => {
  openVpn.login(username, password)
  .subscribe(cookie => {
    console.log(cookie);
    expect(cookie).not.toBeNull();
    done();
  }, err => {
    console.error(err);
    done.fail(err);
  });
});

it('should get current users', done => {
  openVpn.login(username, password)
  .flatMap(cookie => openVpn.getCurrentUsers(cookie))
  .subscribe(users => {
    console.log(users);
    done();
  }, err => {
    console.error(err);
    done.fail(err);
  });
});

it('should validate sockets', done => {
  expect(isDomainNameSocket("172.27.243.60")).toBe(false);
  expect(isDomainNameSocket("example.com")).toBe(false);
  expect(isDomainNameSocket("example.com:333")).toBe(true);
  expect(isDomainNameSocket("172.27.243.60:333")).toBe(false);
  expect(isDomainNameSocket("example:333")).toBe(false);

  expect(isIpSocket("172.27.243.60")).toBe(false);
  expect(isIpSocket("example.com")).toBe(false);
  expect(isIpSocket("example.com:333")).toBe(false);
  expect(isIpSocket("172.27.243.60:333")).toBe(true);
  expect(isIpSocket("172.27.243:333")).toBe(false);
  done();
});
