# Preparation

`~/.conoha/endpoint.js`

```js
const TENANT_ID = 'xxx';

module.exports = {
  account: `https://account.tyo1.conoha.io/v1/${TENANT_ID}`,
  compute: `https://compute.tyo1.conoha.io/v2/${TENANT_ID}`,
  volume: `https://block-storage.tyo1.conoha.io/v2/${TENANT_ID}`,
  database: `https://database-hosting.tyo1.conoha.io/v1`,
  image: `https://image-service.tyo1.conoha.io`,
  dns: `https://dns-service.tyo1.conoha.io`,
  objectStorage: `https://object-storage.tyo1.conoha.io/v1/nc_${TENANT_ID}`,
  mail: `https://mail-hosting.tyo1.conoha.io/v1	`,
  identity: `https://identity.tyo1.conoha.io/v2.0`,
  network: `https://networking.tyo1.conoha.io`
};

```
