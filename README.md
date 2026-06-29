# Understanding GitHub Workflow Behaviour

A minimal repository to understand GitHub Workflow behaviour when trigggered by [`pull_request`](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request).
See also https://github.com/orgs/community/discussions/26325.

## How to use
1. Raise a PR to `main` (PR A) to make a small change to the app. For example update the `H1` in [index.html](./src/index.html). Do not merge this PR.
2. Preview the deployed site in the browser.
3. Raise a second PR to `main` (PR B) making a different change to the app. For example updating the `background` in [main.css](./src/main.css).
4. Merge PR B to `main`.
5. Add a new commit to PR A. Do not rebase against `main`.
6. Preview the deployed site for PR A in the browser again and observe the changes from PR B being included (even though they're not in the revision history for the branch 😱).
7. Manually trigger the [gh-pages.yml](.github/workflows/gh-pages.yml) workflow and observe the changes from PR B are not included in the deployed site for PR A 😵‍💫.

## Well that's strange behaviour? How can I fix this?
### Set `ref` to the name of your branch
In your build, when checking out the code with [`actions/checkout`](https://github.com/actions/checkout), set `ref` to the name of your branch or the [HEAD commit on the branch](https://github.com/actions/checkout#checkout-pull-request-head-commit-instead-of-merge-commit).
Now the build artifact will be created exactly from your branch. Nothing more. Nothing less.

### Use a different trigger
Switch to a [`push` trigger](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request), which does not have this "merged with main" behaviour.

## Running locally
Start a web server to serve the [`src`](./src) directory:

```bash
python3 -m http.server 8000 -d src
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Resetting
To reset the contents of the `gh-pages` branch (i.e. delete all feature branch directories):

```bash
git checkout gh-pages
git pull
for dir in */; do [ "${dir%/}" != "main" ] && git rm -rf "$dir"; done
git commit -m 'fix: Reset content of gh-pages branch'
git push
```
