# Functional testing with cypress by ThisDot

## Prerequisites

1. NodeJS v14.x.x installed
2. run `npm install` to install dependencies
3. run `npm run cypress:setup` to make sure cypress is verified on your machine
4. check out the starting point with the following command
    ```
      git checkout tags/start -b code-along
    ```

## Project structure

The project uses [nx worspace](https://nx.dev/). This is a monorepo style development environment. You can find the application source codes under the `/apps` folder.

During this training we are focusing on the `/aps/customer` and the `/aps/backoffice` front-end applications. For these two applications, cypress is already set up for you in the corresponding folders: `/apps/customer-functional` and `/apps/backoffice-functional`.


## Exercises

### Exercise files

You can find the exercise test base files at the following locations:
```text
/apps/customer-functional/integration/1-pizza-list.spec.ts
/apps/customer-functional/integration/2-cart-button.spec.ts
/apps/customer-functional/integration/3-cart-page.spec.ts
/apps/backoffice-functional/integration/4-login.spec.ts
/apps/backoffice-functional/integration/5-orders.spec.ts
```

During the training you might need to modify the source code of the demo applications. You _only_ need to change `html` template files.

### Cypress test runner commands

Use the Cypress test runner. For exercises 1-4, run `npm run functional:customer:debug`. For exercises 5-6, run `npm run functional:backoffice:debug`.

### If you get lost

Anything can go wrong during a training, it might happen that you cannot finish a task in time. The repository has an existing solution backup system.

If you need to catch up with the instructor, run the following command:
```
git checkout tags/task{task number} -b {new_branch_name}
```

- Replace `{task number}` with the task number you _could not finish_.
- Replace `{new_branch_name}` with a unique branch name

For example if you could not finish `Task 3`, the following command would
create a branch named `got-stuck-1` at the beginning of `Task 4` (task 3 would be finished)

```
git checkout tags/task3 -b got-stuck-1
```

## JS Marathon instructions end here

---

## Dummy API

In order to properly work with the Front-Ends, we developed a very simple, in-memory storage based back-end service.

If you would like to run the service in dev mode, run the following:

```
npm run start:api
```

This will serve the API at `localhost:3333`. You can check the Swagger documentation at `localhost:3333/swagger/#/`

## Customer front-end

The customer front-end facing front-end communicates with the dummy API. Please make sure that you start the API first.

You can start the app in dev mode, by the following command:

```
npm run start:customer
```

This is going to start the front-end application at `localhost:4200`

## Backoffice front-end

The backoffice front-end facing front-end communicates with the dummy API. Please make sure that you start the API first.

You can start the app in dev mode, by the following command:

```
npm run start:backoffice
```

This is going to start the front-end application at `localhost:4300`

---

## Running functional tests

During the training session, running the cypress _functional_ tests in the Cypress test runner can be done with the following commands:

```
npm run functional:customer:debug
npm run functional:backoffice:debug
```

You can run the same tests in `headless` mode with the following commands:

```
npm run functional:customer
npm run functional:backoffice
```

---

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@cat/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
