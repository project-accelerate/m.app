# Quickstart

## Prerequisites

* NodeJS (version 10)
  * Recommended: Install using [nvm](https://github.com/creationix/nvm). Nvm will automatically use the correct node version when running locally.
  * Alternative: Install from https://nodejs.org/en/

* Yarn
  * https://yarnpkg.com

* Docker
  * https://www.docker.com/get-docker

* Expo client (optional - for running mobile app on device in development)
  * https://expo.io/tools#client

* Android/iOS developer tools (optional - for running mobile app on emulator in development)
  * https://developer.apple.com/xcode/
  * https://developer.android.com/studio/

## Installation

```bash
git clone https://github.com/project-accelerate/m.app.git
cd m.app
yarn

# At present, the native mobile app is a separate yarn project and dependencies must be installed separately
(cd frontend/native && yarn)
```

## Development workflow

* Running a local backend server
  * `yarn develop:backend`

* Running a local frontend (admin site) development server
  * `yarn develop:frontend:web`

* Running a local frontend (native app) development server
  * `yarn develop:frontend:native`
  * One of:
    * `yarn emulator ios` (requires iOS developer tools to be installed)
    * `yarn emulator android` (requires Android developer tools to be installed and a virtual device to be running)
    * Open the [Expo client app](https://expo.io/tools#client) on a device running on the same LAN and scan the QR code from the terminal

* Running a storybook for UI component development (admin ui)
  * `yarn storybook:web`

* Running a storybook for UI component development (native app)
  * `yarn storybook:native`
  * One of:
    * `yarn emulator ios` (requires iOS developer tools to be installed)
    * `yarn emulator android` (requires Android developer tools to be installed and a virtual device to be running)
    * Open the [Expo client app](https://expo.io/tools#client) on a device running on the same LAN and scan the QR code from the terminal

* Running a full test cycle
  * `yarn test`

* Running partial test cycle
  * `yarn test:unit frontend/common`
  * `yarn test:unit frontend/web`
  * `yarn test:unit frontend/native`
  * `yarn test:unit common`
  * `yarn test:unit backend`
  * `yarn test:integration:backend`
