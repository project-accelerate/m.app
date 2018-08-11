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

# Development workflow

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

# Contributor workflow

* Ask in `#m-app` to be added to the github team
* Ask for login credentials for the staging site
* Find a task in the 'Ready' column of our [task board]( https://github.com/project-accelerate/m.app/projects/1)
  * Look for the topmost feature you feel able to do.
  * If it's your first time contributing, look out for the "good first issue" tag.
* Tell us on `#m-app` that you're going to pick this up
* Create a branch for the feature and implement the feature.
* When it's done, open a pull request and request a review in `#m-app`


# Getting help

In general, if you're stuck figuring out how something works, please ask in `#m-app` rathen than try to go it alone! Aside from being much nicer for you, this gives others something to refer to and helps the maintainers understand when something is too complicated or needs documenting better.


## FAQs

### When I run the admin UI, I get a "POST http://localhost:3000/graphql 404 (Not Found)" error

The frontend can't find a backend server. This is either because you haven't started it (using yarn:develop:backend) or you've overriden the BACKEND_URL config with a bad address.

### (Mac/Windows) When I start the backend, I get a "initdb: could not create directory "/var/lib/postgresql/data/pg_wal": No space left on device" error

Your docker VM has probably run out of disk space. Try deleting some old images.


### (Linux): When I start the backend, I get "ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?"

On Linux, Docker needs to run as a privilaged user. There are various approaches to doing this. We recommend the one detailed here: https://nickjanetakis.com/blog/docker-tip-20-running-docker-without-sudo-on-linux


## Useful reading

### Key frontend libraries:
* https://reactjs.org/
* https://www.apollographql.com/docs/react/
* https://facebook.github.io/react-native/ (native only)
* https://docs.expo.io/ (native only)
* https://reactnavigation.org/ (native only)
* https://auth0.com/docs/libraries/auth0js/v9 (web only)
* https://material-ui.com/ (web only)
* https://reacttraining.com/react-router/ (web only)
 
### Key backend libraries:
* https://knexjs.org/
* https://19majkel94.github.io/type-graphql/

## Useful contacts

* In the first instance, `#m-app` slack channel
* For detailed questions about features & requirements: `@John Colbourne`
* For detailed questions about technical design, help: `@chrisd` 
