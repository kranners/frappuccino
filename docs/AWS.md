---
tags: amazon, web, services, aws, cloud, devops
---

# AWS

[AWS (Amazon Web Services)](https://aws.amazon.com/) is a ubiquitous cloud service provider. It's used by everyone, ever.

## Configuring

### Authenticating

Authentication is done using their [IAM tokens](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/keys-profiles-credentials.html).

#### `credentials` file

It's generally best practice to manage your local machine credentials [under a profile in a `credentials` file](https://docs.aws.amazon.com/sdkref/latest/guide/file-format.html).

*`~/.aws/credentials`*
```
[personal]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

[professional]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```
*You'll want your profiles to be named something better.*

**After configuring this, use:**
```shell
aws --profile <your-profile>
```
to authenticate with the given profile.

**If there's a build tool which needs it, the variable is:**
```shell
export AWS_PROFILE=<your-profile>
```