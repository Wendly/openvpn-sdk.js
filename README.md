# Openvpn SDK for JavaScript

[![CircleCI](https://circleci.com/gh/FloTechnologies/openvpn-sdk.js.svg?style=svg&circle-token=ac1313be2c50d5ccd45d66ac6b3135ab45443d51)](https://circleci.com/gh/FloTechnologies/openvpn-sdk.js)

## Usage


```js
import OpenVpn from 'openvpn';

const openVpn = new OpenVpn(baseUrl);
openVpn.login(username, password)
    .flatMap(cookie => openVpn.getCurrentUsers(cookie)).subscribe(users => {
        console.log(users);
    }, err => {
        console.error(err);
    });
```

## Installation

```
yarn add git+ssh://git@github.com/Wendly/openvpn-sdk.js.git#dist
```

and also you can install specific commit of dist:

```
yarn add git+ssh://git@github.com/Wendly/openvpn-sdk.js.git#<commit-id>
```

or

```sh
yarn add openvpn-sdk # in progress
```

## Development

* Please deploy after implemented feature

## Deployment

* git checkout dist && git merge master
* yarn deploy

### Testing and coverage

```
export OPENVPN_BASE_URL=""
export OPENVPN_USER_NAME=""
export OPENVPN_PASSWORD=""
yarn build && yarn test && yarn coverage
```

You can open flow-coverage/ and coverage/lcov-report to see

### Requirements

* node
* yarn

```
brew install node yarn
```

### Build

p.s. We used babel as default compiler before, you can also use flow-remove-types

```sh
yarn install && yarn build && yarn test
```

### Type checking with flow

```sh
yarn run flow
```

You should install a flow plugin on your IDE instead.

### API Documentation

```sh
yarn docs
```

You can open docs/ to see

## Stack

* ES6
* Functional
* Promise and Rx

* Type-safety
* Null-safety
* Generic
* Unit testable / coverage report

* package manager: yarn (~~npm~~)
* http client: axios (~~request~~, ~~node-fetch~~)
* axios wrapped rx
* static type checking: facebook/flow (~~Microsoft/TypeScript~~, ~~Google/Dart~~, ~~kotlin2javascript~~)
* runtime type checking: codemix/flow-runtime (~~tcomb~~)
* testing frameworks: jest (~~mocha~~, ~~karma~~, ~~jasmine~~)
* mock web: nock

## Why JavaScript+Flow

I considered that Python, KotlinScript, GoLang, JavaScript, Dart, TypeScript, JavaScript+Flow, Rust, Ruby, OCaml, ReasonML.
I choose JavaScript+Flow, because it's type-safety, null-safety, supports generics and functional.

* Flow: facebook/flow compile-time type checking system
* +flow-runtime (relacement of ~~tcomb~~)

Python has PEP 484 decorator/annotation feature that could be able to do type checking
But I realized that there is nobody care about that too much in the Python community.
There is not too much activity.

And it shouldn't be as decorator for type checking, it should be real type/class for type checking with Generic and Null-Safety.
Actually I really want to write KotlinScript, but it's not ready for our teammates.

