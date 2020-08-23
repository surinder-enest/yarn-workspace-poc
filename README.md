## How to start

## apps/core <- Plugin Playgroud for testing components before production use we are not using this to make build
1. cd apps/core
2. yarn start
3. http://localhost:1234

Note: above commands is used for testing the components with live changes no use in production build

## Run components in SSR mode with next-app
2. cd apps/shared
3. yarn build
4. new terminal
5. cd apps/next-app
6. yarn add path to shared (i.e D:\Projects\YarnWorkSpace\apps\shared)
7. yarn dev
8. goto http://localhost:3000


now when new change is made in shared then repeat step 6 to 8
NOTE: Trying to find solution for real time updates