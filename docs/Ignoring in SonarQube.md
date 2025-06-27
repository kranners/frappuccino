---
id: Ignoring in SonarQube
date: "20 June, 2025"
---

# Ignoring in SonarQube

All the rules have a given ID like `java:s4351` or `css:s4622`.
Good fun names like that.

To ignore in SonarQube you need:
- the rule key ID (the thing above)
- a glob pattern for files to ignore eg `**/*.css`

See [the SonarQube documentation](https://docs.sonarsource.com/sonarqube-community-build/project-administration/setting-analysis-scope/advanced-exclusions/)
