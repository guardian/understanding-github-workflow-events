# Understanding GitHub Workflow Events

A minimal repository to understand GitHub Workflow behaviour.
In particular GitHub SHA values.

See also https://github.com/orgs/community/discussions/26325.

## How to use
1. Raise a PR to `main` (PR A) to make a small change to the app. For example update the `H1` in [index.html](./src/index.html). Do not merge this PR.
2. Preview the deployed site in the browser.
3. Raise a second PR to `main` (PR B) making a different change to the app. For example updating the `background` in [main.css](./src/main.css).
4. Merge PR B to `main`.
5. Add a new commit to PR A. Do not rebase against `main`.
6. Preview the deployed site for PR A in the browser again and observe the changes from PR B being included (even though they're not in the revision history for the branch 😱).

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
for dir in */; do [ "${dir%/}" != "main" ] && git rm -rf "$dir"; done
git commit -m 'fix: Reset content of gh-pages branch'
git push
```
