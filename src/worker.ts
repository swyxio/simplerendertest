// @@@SNIPSTART typescript-hello-worker
import { Worker, Core } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  await Core.install({
    serverOptions: {
      address: 'temporal-j1w3.onrender.com:443', // defaults port to 7233 if not specified
      tls: true
    },
  });
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'tutorial',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/docs/typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `tutorial` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
