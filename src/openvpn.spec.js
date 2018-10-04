/* @flow */

axios.defaults.adapter = httpAdapter;
import OpenVpn from './openvpn';
import Rx from 'rxjs';
import axios from 'axios';
import faker from 'faker';
import httpAdapter from 'axios/lib/adapters/http'

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
