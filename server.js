/* WITH CLUSTER */

// const express = require("express");
// const port = 3000;
// const cluster = require("cluster");
// const totalCPUs = require("os").availableParallelism();

// if (cluster.isPrimary) {
//   console.log(`Number of CPUs is ${totalCPUs}`);
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < totalCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     console.log("Let's fork another worker!");
//     cluster.fork();
//   });
// } else {
//   const app = express();
//   console.log(`Worker ${process.pid} started`);

//   app.get("/", (req, res) => {
//     res.send(`Performance example: ${process.pid}`);
//   });

//   app.get("/api/:n", function (req, res) {
//     let n = parseInt(req.params.n);
//     let count = 0;

//     if (n > 5000000000) n = 5000000000;

//     for (let i = 0; i <= n; i++) {
//       count += i;
//     }

//     res.send(`Final count is ${count}`);
//   });

//   app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
//   });
// }

// http://localhost:3000/api/500000
// Check performance metrics with npm loadtest

/** END WITH CLUSTER */

/**
 * WITH PM2
 */

const express = require("express");
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get("/api/:n", function (req, res) {
  let n = parseInt(req.params.n);
  let count = 0;

  if (n > 5000000000) n = 5000000000;

  for (let i = 0; i <= n; i++) {
    count += i;
  }

  res.send(`Final count is ${count}`);
});

console.log("Running server.js...");
console.log("Worker process started.");
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Zero downtime restart: $pm2 reload server

/**
 * END WITH PM2
 */
