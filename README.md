# Ionic App
## Develop

1. Install/Use node version

        $ nvm use

2. Install project packages

        $ npm install

3. Run dev's project by:

        $ npm run ionic:serve

4. Run ionic commands:
        $ npm run ionic -- generate page login

## Build

To build the project simply run:

    $ npm run ionic:build

## Clean Build

In case of errors at building time, follow these steps:

    $ rm -rf ./node-modules ./plugins ./platforms

    $ npm run ionic:build

## Edit platform-specific config

Edit config.xml preferences:

    $ npm run ionic -- cordova prepare