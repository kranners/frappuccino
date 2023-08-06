---
tags: github, actions, gha, cicd, ci, cd
---

# GitHub Actions

[GitHub Actions](https://docs.github.com/en/actions) is a CI/CD platform made by Microsoft for [GitHub](https://github.com/).

## Billing

Actions use is [free for public repositories](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration#about-billing-for-github-actions).

For free accounts, Actions has a set limit of [2000 runner minutes per month](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#included-storage-and-minutes).
Beyond this, GitHub will charge a per-minute rate of $0.016USD to $0.256USD depending on the size of the runner being used.

## Overview

GHA is about defining [Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows), which contain [Jobs](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow), which are triggered from [Events](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow).

Workflows are defined in [[YAML]] files underneath `.github/workflows` in a [[Git]] repository.

**NOTE: You won't be able to copy/paste code from here, as actions files do not allow for tab-based indentation.**

### Examples and usage

```yaml
name: My Cool Action # The name of the action
on: [push, fork] # Any events defined here will trigger the workflow
permissions: # Modifies the permissions accessible by the runner's token
	contents: read
jobs: ...
```

### Jobs

A *job* is a set of instructions that gets run on a runner (like a container), and is contained within a Workflow.

```yaml
jobs:
	build: # This is the job-id, and must be unique.
		name: Build my code # Display name
		runs-on: ubuntu-latest # See below for more info
		steps:
			# https://github.com/actions/checkout
			- uses: actions/checkout@v3
			# https://github.com/actions/setup-node
			- uses: actions/setup-node@v1
			  with:
				  # Examples: 'lts', 'latest', '12.x', '12.15.0'
				  node-version: lts
			  # Names the step in the GitHub UI
			- name: Install dependencies
			  run: yarn --frozen-lockfile
			  # Names are optional.
			- run: yarn build
	deploy:
		needs: build # Defines dependencies
```

#### `runs-on`

`runs-on` defines the type of runner to use.

GitHub-hosted runners are:
- `ubuntu-latest`
- `windows-latest`
- `macOS-latest`

To run a specific [[Docker]] image, use the `container` tag instead, like:
```yaml
custom_job:
	container:
		image: node:10.16-jessie
		env: {...}
		ports: [...]
		volumes: [...]
```

#### Artifacts

[Workflow artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts#about-workflow-artifacts) are the results of builds, test results, or log files which are needed in multiple jobs.

An example might be from a `build` job, outputting the completed build into a `deploy` job.

Artifacts are saved with the `actions/upload-artifact` step, and are pulled with the `actions/download-artifact` step.

#### Environment variables and secrets

[Variables](https://docs.github.com/en/actions/learn-github-actions/variables#about-variables) are values for reuse between or within workflows, and are usually either publicly defined strings or secrets.

They're used within a [job](#Jobs) like the following:
```yaml
steps:
	- shell: bash
	  env:
		BIG_SECRET: ${{ secrets.MyBigFatSecret }}
		USER_NAME: ${{ var.UserName }}
	  run: do-something-with "$BIG_SECRET" --as "$USER_NAME"
```

Or, to insert them directly into the command:
```yaml
steps:
	- run: |
		do-something-with "${{ secrets.MyBigFatSecret }}"
```

GitHub maintains a [list of default environment variables](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables).

For more information see the [API reference for variables](https://docs.github.com/en/rest/actions/variables?apiVersion=2022-11-28).

#### Installing packages

Linux and MacOS runners are password-less, so packages can be installed without interaction.

```yaml
stuff:
	runs-on: ubuntu-latest
	steps:
		- name: Install lftp
		  run: sudo apt-get install -y lftp
```

### Events

Events define when a Workflow will run.

*A workflow with one event*, this will trigger on any push.
```yaml
name: Any Push
on: push
```

*A workflow with two events*, this will trigger on any push or any fork.
```yaml
name: Push or Fork
on: [ push, fork ]
```

*A workflow with two partially configured events*, this will trigger on:
- Any update or creation of a pull request
- Any push *to the branch 'main'*
```yaml
name: Updates
on:
	pull_request: # No value needed here
	push:
		branches: # This could be an inline YAML array
		- main
		- $default-branch # The $ denotes this as a variable
jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v3 # The actions/checkout builtin
```
