---
id: Semantic Release
date: "19 April, 2025"
---

# Semantic Release

[semantic-release](https://github.com/semantic-release/semantic-release) is a set of tools for automating versioning and releasing [[Node]] projects.


## Installation

Install as a dev dependency:
```shell
npm install -D semantic-release

# Plugins need to be installed seperately 
npm install -D @semantic-release/changelog @semantic-release/exec @semantic-release/git @semantic-release/github

# Altogether
npm install -D semantic-release @semantic-release/changelog @semantic-release/exec @semantic-release/git @semantic-release/github
```


Then in your package.json, configure the steps:
```json
{
  ...,
  "release": {
    "branches": [
      "main"
    ],
    "plugins": [
        [
            "@semantic-release/commit-analyzer",
            {
                "releaseRules": [
                    {
                        "breaking": true,
                        "release": "major"
                    },
                    {
                        "revert": true,
                        "release": "patch"
                    },
                    {
                        "type": "feat",
                        "release": "minor"
                    },
                    {
                        "type": "*",
                        "release": "patch"
                    }
                ]
            }
        ],
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        {
            "path": "@semantic-release/exec",
            "prepareCmd": "npm run compile"
        },
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                "assets": [
                    "CHANGELOG.md",
                    "package.json"
                ],
                "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            }
        ],
        "@semantic-release/github"
    ]
  }
}
```

Whenever you would want to release then run the `semantic-release` executable.
