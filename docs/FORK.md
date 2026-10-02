# Bridge fork

Bridge is a thin, user-facing rebrand of [T3 Code](https://github.com/pingdotgg/t3code).
The fork preserves the upstream MIT license, copyright notices, third-party notices, and Git
history. The original upstream commit for this branch is `54084ae1e6c32809db040e4fa571c80fdf2d8ae4`.

## Remotes and synchronization

The checkout keeps the upstream repository as `upstream`:

```sh
git remote add upstream https://github.com/pingdotgg/t3code.git
git fetch upstream
git switch rebrand/bridge-initial
git rebase upstream/main
```

When the GitHub fork is available, configure it as `origin`:

```sh
git remote add origin https://github.com/stemcloudmedia/bridge.git
git push -u origin rebrand/bridge-initial
```

Resolve rebase conflicts in the small fork-owned branding/configuration surfaces first. Do not
rename internal `@t3tools/*` package names solely for appearance; they are intentionally retained
to reduce upstream merge conflicts.

## Branding boundary

The provisional product identity is centralized in
[`packages/shared/src/productBrand.ts`](../packages/shared/src/productBrand.ts). Change `name`,
`slug`, and the owned identifiers there first. Desktop packaging, web branding, mobile Expo
configuration, app data names, and application identifiers consume that configuration. The
remaining visible copy changes are limited to the client surfaces that currently contain product
copy directly; search for `Bridge` after a future rename to review those literals.

The temporary icon sources are the three Icon Composer projects under `assets/*/app-icon.icon`.
Run `vp run icons:export`, then follow `assets/README.md` for the macOS pre-Tahoe export step.
Run `vp run icons:check` before committing generated assets.

## Services and updates

Fresh Bridge builds do not use T3 Connect, Clerk, T3-hosted associated domains, or the upstream
Expo update project unless explicitly configured through the existing environment variables. Desktop
updater configuration is opt-in through `T3CODE_DESKTOP_UPDATE_REPOSITORY`; it no longer falls
back to `GITHUB_REPOSITORY`. Mobile OTA updates are disabled unless both
`T3CODE_MOBILE_UPDATES_ENABLED=1` and `T3CODE_MOBILE_UPDATES_URL` are provided.

The inherited publishing/deployment workflows are gated by the repository variable
`BRIDGE_ENABLE_UPSTREAM_RELEASES == true`. Do not set that variable until Bridge-owned release
infrastructure exists. `.github/workflows/bridge-windows-artifacts.yml` is the safe manual,
artifact-only Windows path; it uploads unsigned NSIS installers and never publishes a release,
npm package, updater manifest, or signing payload.

## Local builds

Use the repository-pinned Node `^24.13.1`, pnpm `11.10.0`, and Vite+ `vp` command. The documented
commands are:

```sh
vp i
vp run icons:export
vp run typecheck
vp run lint
vp run dist:desktop:dmg:arm64
```

For local iOS/iPadOS builds, use the documented Personal Team path in `apps/mobile/README.md`:

```sh
T3CODE_IOS_PERSONAL_TEAM=1 \
T3CODE_IOS_PERSONAL_TEAM_BUNDLE_ID=com.bridgeapp.bridge \
vp run ios:release
```

The Personal Team path intentionally omits capabilities that require the upstream production
team. A development client still requires a native build; Expo Go is not supported.

## Legal material

`LICENSE`, generated third-party notices, vendored licenses, and source attribution are retained.
The original T3 Tools copyright line in the MIT license is intentional and must remain in copies of
the derived work. The user-facing open-source licenses screens should describe the product as
Bridge while continuing to show the complete notices.
