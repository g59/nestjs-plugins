// Minimal test stub for @as-integrations/fastify used by @nestjs/apollo Fastify driver
// Exports the functions that the driver expects so app.init() can succeed in tests.

function fastifyApolloDrainPlugin() {
  // Apollo Server plugin API shape
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          // no-op for tests
        },
      };
    },
  };
}

function fastifyApolloHandler() {
  // Return a Fastify route handler; no-op for tests
  return async function handler(_req, reply) {
    // For safety, respond with empty JSON if accidentally invoked in tests
    try {
      if (
        reply &&
        typeof reply.code === "function" &&
        typeof reply.send === "function"
      ) {
        reply.code(200).send({});
      }
    } catch (_) {
      // ignore
    }
  };
}

module.exports = {
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
};
