module.exports = (tenantId) => {
  return {
    account: `https://account.tyo1.conoha.io/v1/${tenantId}`,
    compute: `https://compute.tyo1.conoha.io/v2/${tenantId}`,
    volume: `https://block-storage.tyo1.conoha.io/v2/${tenantId}`,
    database: `https://database-hosting.tyo1.conoha.io/v1`,
    image: `https://image-service.tyo1.conoha.io`,
    dns: `https://dns-service.tyo1.conoha.io`,
    objectStorage: `https://object-storage.tyo1.conoha.io/v1/nc_${tenantId}`,
    mail: `https://mail-hosting.tyo1.conoha.io/v1 `,
    identity: `https://identity.tyo1.conoha.io/v2.0`,
    network: `https://networking.tyo1.conoha.io`
  };
};
