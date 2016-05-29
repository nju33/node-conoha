# Conoha-cli

Create `~/.conoha/config.json` in advance

```
{
  "username": "...",
  "password": "...",
  "tenantId": "..."
}
```

```
Usage
  $ conoha <command> <options...>

Commands
  ready              Prepare necessary data

  flavors            Show Flavors
  images             Show Images
  isoImages          Show Iso-Images
  servers            Show servers list
  serversDetail      Show detailed servers list
  serverInfo         Show the Server
  addServer          Add Server
  deleteServer       Delete Server

  objectStorageInfo  Show Object-Storage data
  containerInfo      Show the Container info
  addContainer       Add Container
  deleteContainer    Delete Container
  containerUpload    Upload to the Container
  containerDownload  Download form the Container
  containerDelete    Delete to item in Container
  containerPublish   Publish to item in Container

Options
  -h --help       Show help
  -i --inquire    Inquire mode
  -c --config     ...
  -d --dirname    Specify a target property (lodash.get)
  -p --props      Pick object keys (lodash.pick)
  -f --form       Set \`application/x-www-form-urlencoded\`
  -j --json       Read .json
     --upload     Set upload file
     --server-id  Set serverID
     --container  Set container
     --object     Set object

Examples
  $ conoha ready

  Created \`~/.conoha/data.json\`
  {...}
```
