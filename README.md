# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Install dependencies

```bash
npm i
```

## Setting up Environment Variables

```bash
# Create a .env file in the root of the project and add the following
DATABLE_URL=db.sqlite
# You can change the value of DATABLE_URL if you want to use a different name for the database file
```

## Initialising Database

```bash
# To Generate the SQL Queries to create the tables
npm run db:generate

# To Migrate the Database (Applies the changes to the database)
npm run db:migrate
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
