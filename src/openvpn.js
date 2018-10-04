/* @flow */

import Rx from 'rxjs';
import axios from 'axios';
import {Axios} from 'axios';
import type {
  Email,
  File,
  URL,
  UUID,
  IP,
  User,
} from './types';
const https = require('https');
import qs from 'qs';
import cheerio from 'cheerio';

export default class OpenVpn {
  axios: Axios;

  constructor(url: URL) {
    this.axios = axios.create({
      baseURL: url,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      maxRedirects: 0,
      withCredentials: true
    });
  }

  login(username: string, password: string): Rx.Observable<string> {
    return Rx.Observable.fromPromise(this.axios.get("/"))
    .map(res => "")
    .catch(err => {
      if (err.response.headers["location"] != `${this.axios.defaults.baseURL}__session_start__/`) {
        return Rx.Observable.throw(err);
      }
      const cookie = err.response.headers["set-cookie"][0].split(";")[0];
      return Rx.Observable.fromPromise(this.axios.get("/__session_start__", { headers: { Cookie: cookie } }))
      .catch(err => Rx.Observable.fromPromise(this.axios.get("/", {headers: {Cookie: cookie}})))
      .map(res => cookie);
    })
    .flatMap(cookie => {
      return Rx.Observable.fromPromise(this.axios.post("/__login__", qs.stringify({
        username: username,
        password: password
      }), {
        headers: {
          Cookie: cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }));
    })
    .catch(err => Rx.Observable.of(err.response))
    .map(res => res.headers["set-cookie"][0].split(";")[0]);
  }

  getCurrentUsers(cookie: string): Rx.Observable<Array<User>> {
    return Rx.Observable.fromPromise(this.axios.get("/current_users", { headers: { Cookie: cookie } }))
    .map(res => {
      const users: Array<User> = [];
      const $ = cheerio.load(res.data);
      $(`table[id="box-current-users-table"] tbody tr`).each((i, elem) => {
        if (i > 0) {
          users.push({
            name: $(elem).children().eq(0).text(),
            realAddress: $(elem).children().eq(1).text(),
            vpnAddress: $(elem).children().eq(2).text()
          });
        }
      });
      return users;
    })
  }
}
