---
id: Triggering GitHub Actions externally
date: "22 July, 2025"
---

# Triggering GitHub Actions externally

For external triggers, there's a GitHub actions event called `repository_dispatch`.

It looks like this:
```yaml
on:
    repository_dispatch:
        types: [an_event_type]
```

This trigger will only happen on, and using the YAML files for, the default
branch of the repository.

[See the repository_dispatch event documentation](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#repository_dispatch)

## Triggering the workflow

To trigger a workflow, you make a POST request to the
`api.github.com/repos/<OWNER>/<REPO>/dispatches` endpoint.

This POST request must have a body which looks like this:
```json
{
  "event_type": "en_event_type",
  "client_payload": {
    "fruit": "pomegranate",
    "name": "steven"
  }
}
```

`event_type` is the only mandatory parameter, and is limited to 100 characters.

The `event_type` needs to line up with the `types` defined in your workflow YAML.
That is how you control whether or not a workflow is triggered for a given
`event_type`.

Anything passed into `client_payload` is available in the workflow as a
variable like:
```yaml
on:
  repository_dispatch:
    types: [an_event_type]

jobs:
  do_stuff:
    runs-on: ubuntu-latest
    steps:
      - env:
          FRUIT: ${{ github.event.client_payload.fruit }}
          NAME: ${{ github.event.client_payload.name }}
        run: echo Hello $NAME! Would you like a $FRUIT?
```

:::tip
The maximum number of top-level properties in `client_payload` is 10.
The maximum length of the payload in total is 65,535 characters.
:::

[See the repository dispatch REST API documentation](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event)

### Triggering the workflow with Octokit

You can trigger this workflow using the [[Node]] library [Octokit core](https://github.com/octokit/core.js#readme).

Which you can install with:
```bash
npm install @octokit/core
```

And then call like:
```js
const octokit = new Octokit({
  auth: 'YOUR-TOKEN'
});

await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
  owner: 'OWNER',
  repo: 'REPO',
  event_type: 'an_event_type',
  client_payload: {
    fruit: "pomegranate",
    name: "steven",
  },
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
});
```

### Triggering the workflow with `gh`

You can trigger this workflow using [the GitHub CLI](https://cli.github.com/).

A request looks like:
```bash
# GitHub CLI api
# https://cli.github.com/manual/gh_api

gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/OWNER/REPO/dispatches \
   -f 'event_type=an_event_type' -F "client_payload[fruit]=pomegranate" -F "client_payload[name]=steven"
```



