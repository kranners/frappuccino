---
id: Export files like environment files from 1Password
date: "18 November, 2025"
---

# Export files like environment files from 1Password

Using the 1Password CLI.

[Start by following instructions to install the 1Password CLI.](https://developer.1password.com/docs/cli/get-started/).

[Then follow instructions to set up integration between your desktop app and the CLI.](https://developer.1password.com/docs/cli/app-integration/#step-1-turn-on-the-app-integration)

If on MacOS, you'll likely want to enable Touch ID in the settings too.

Use any command from the CLI to log in from here:
```shell
op vault list
```

From here you can list items in a vault:
```shell
op item list --vault Employee
```

:::info
Following steps assume you are exporting a Secure Note.
:::

Once you've found the item, you can get details for the item you want to export:
```shell
op item get secret-env-file-note --format json --fields notesPlain
```

Which will output something like:
```json
{
  "id": "notesPlain",
  "type": "STRING",
  "purpose": "NOTES",
  "label": "notesPlain",
  "value": "DB_PASSWORD=asdf123\nDB_USER=superadmin",
  "reference": "op://Employee/secret-env-file-note/notesPlain"
}
```

Take that `reference` and `op read` it to get the content plain:
```shell
op read "op://Employee/secret-env-file-note/notesPlain"
```

Then redirect to a file to save it as a .env:
```shell
op read "op://Employee/secret-env-file-note/notesPlain" > .env
```
```
```

[See `op item get` reference](https://developer.1password.com/docs/cli/reference/management-commands/item/#item-get)

[See `op read` reference](https://developer.1password.com/docs/cli/reference/commands/read/)

