export default function (server) {

  server.route({
    path: '/api/echarts_test2/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

}
