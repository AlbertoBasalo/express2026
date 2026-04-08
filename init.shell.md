git init
npm init
npm i -D @types/node
npm i express@latest
npm i -D @types/express@latest
npm i -D -E @biomejs/biome
npm i -D typescript tsx @types/node @types/express
npx tsc --init

npm run check
npm run dev
npm run build
npm start

npm install -D vitest
npm run test:dev
npm test

// To do; install playwright and add a test for the home route.
// npm run test:e2e
npm init playwright@latest
npx playwright install


