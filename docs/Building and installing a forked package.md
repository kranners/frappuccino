---
id: Building and installing a forked package
date: "25 November, 2025"
---

# Building and installing a forked package

First, try to install it directly from your repository. That is:
```shell
npm install <your-username>/<repository-name>

# So
npm install kranners/forked-npm-package
```

Assuming that doesn't work, you may need to manually build and pack, something like:
```shell
# In the forked repository, build locally and create a forked-npm-package-0.0.0.tgz
npm run build
npm pack

mv ./forked-npm-package-0.0.0.tgz ../../../path/to/your/target/repository

# In the target repository, install the tarfile
npm install ./forked-npm-package-0.0.0.tgz
```

