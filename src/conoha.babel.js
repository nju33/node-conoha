import _ from 'lodash';
import identity from './identity';
import compute from './compute';
import os from './os';

export default class Conoha {
  constructor(user) {
    this.user = user;
  }

  get identity() {
    return identity(this.user);
  }

  get compute() {
    return compute(this.user);
  }

  get os() {
    return os(this.user);
  }

  get objectStorage() {
    return os(this.user);
  }
}
