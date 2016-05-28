# Conoha-cli

```
Usage
  $ conoha <command> <options...>

Commands
  ready              Prepare necessary data
  flavors
  servers            Show servers list
  serversDetail      Show detailed servers list
  serverInfo         Show the Server infomations
  addServer          Add Server
  deleteServer       Delete Server
  images
  isoImages
  objectStorageInfo  Show Object-Storage data
  containerInfo      Show the Container infomations
  addContainer       Add Container
  deleteContainer    Delete Container

Options
  -h --help       Show help
  -i --inquire    Inquire mode
  -c --config     ...
  -d --dirname    Specify a target property (lodash.get)
  -p --props      Pick object keys (lodash.pick)
  -f --form       Set \`application/x-www-form-urlencoded\`
  -j --json       Read .json
     --server-id  Set serverID
     --container  Set container
     --object     Set object

Examples
  $ conoha ready

  Created \`~/.conoha/data.json\`
  {...}
```
