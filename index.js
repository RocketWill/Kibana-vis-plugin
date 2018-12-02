import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'echarts_test_2',
    uiExports: {
      app: {
        title: 'Echarts Test 2',
        description: 'An awesome Kibana plugin',
        main: 'plugins/echarts_test_2/app',
        styleSheetPath: require('path').resolve(__dirname, 'public/app.scss'),
      },
      hacks: [
        'plugins/echarts_test_2/hack'
      ]
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
    }
  });
}
