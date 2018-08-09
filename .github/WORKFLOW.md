# Workflow of rollup-plugin-rust

This is a documentation of workflow that rollup-plugin-rust use:

- [Release Procedure](#release)

### <a name="release"></a> Release Procedure
This project use tool called [`standard-version`][] to manage the release process. Run this command to generate [CHANGELOG.md][] and increment version:

```console
$ npm run release

> rollup-plugin-rust@0.0.0 release /home/wildan/Projects/OSS/rollup-plugin-rust
> standard-version --skip.commit --skip.tag

✔ bumping version in package.json from 0.0.0 to 0.0.1
✔ bumping version in package-lock.json from 0.0.0 to 0.0.1
✔ Running lifecycle script "postbump"
ℹ - execute command: "echo auto correct code-style for package.json and lock file"
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md
```

Review [CHANGELOG.md](./CHANGELOG.md) file and if it's ok then run this command to automatically commit the file and tag it:

```console
$ npm run release:ok

> rollup-plugin-rust@0.0.1 release:ok /home/wildan/Projects/OSS/rollup-plugin-rust
> standard-version --sign --commit-all --skip.bump --skip.changelog

✔ Running lifecycle script "precommit"
ℹ - execute command: "git add CHANGELOG.md package*.json"
✔ committing CHANGELOG.md
husky > pre-commit (node v8.11.3)
Running tasks for *.js [started]
Running tasks for *.js [skipped]
→ No staged files match *.js
husky > commit-msg (node v8.11.3)
⧗   input: chore(release): 0.0.1
✔   found 0 problems, 0 warnings

husky > post-commit (node v8.11.3)

✔ tagging release v0.0.1
ℹ Run `git push --follow-tags origin master && npm publish` to publish
```

To specify the release type manually (like npm version <`major`|`minor`|`patch`>, default is `patch`), run this command:

```console
$ npm run release:as -- minor

> rollup-plugin-rust@0.0.0 release:as /home/wildan/Projects/OSS/rollup-plugin-rust
> standard-version --skip.commit --skip.tag --release-as "minor"

✔ bumping version in package.json from 0.0.0 to 0.1.0
✔ bumping version in package-lock.json from 0.0.0 to 0.1.0
✔ Running lifecycle script "postbump"
ℹ - execute command: "auto correct code-style for package.json and it's lock file"
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md
```

--------------
[CHANGELOG.md]: ./CHANGELOG.md
[`standard-version`]: https://github.com/conventional-changelog/standard-version