import servers from './servers';
import flavors from './flavors';
import images from './images';
// import backup from './backup';

export default function compute(user) {
  return {
    servers(serverId) {
      return servers(user, serverId);
    },

    flavors(query) {
      return flavors(user, query);
    },

    images(query) {
      return images(user, query);
    }
    //
    // get backup() {
    //   return backup(user);
    // }
  };
};
