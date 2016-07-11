/* eslint-env meteor */
/* eslint prefer-template: 0 */

/* global Planisphere:true, PlanispherePlugins:true */
/* global PlanisphereConfigs:true, PlanisphereRefreshing:true */
/* global SimpleSchema, lodash, fs */

PlanispherePlugins = new ReactiveVar([]);
PlanisphereConfigs = new ReactiveDict();
PlanisphereRefreshing = new ReactiveVar(false);

const that = this;
const CONFIGS_DIR = 'planisphereConfigs';

// register meteor method on demand
const registerMeteorMethod = function registerMeteorMethod(pluginDoc) {
  const methodName = `/planisphere/plugin/${pluginDoc.name}/config`;
  Meteor.methods({
    [methodName]: function pluginConfig(config) {
      check(config, Object);
      // for latency compensation
      PlanisphereConfigs.set(pluginDoc.name, config);
      const configMethod = lodash.get(that, pluginDoc.configMethod);
      if (configMethod) configMethod(config, this.isSimulation);
      PlanisphereRefreshing.set(true);

      // save it to file
      if (Meteor.isServer) {
        const path = Npm.require('path');
        const dir = path.join(process.env.PWD, CONFIGS_DIR);
        try {
          fs.mkdirSync(dir);
        } catch (e) {
          // probably, the directory already exists
        }
        fs.writeFileSync(path.join(dir, `${pluginDoc.name}.js`),
          '' + pluginDoc.configMethod + '.data = \n' +
          JSON.stringify(config, null, 2) + ';\n' +
          pluginDoc.configMethod + '(' + pluginDoc.configMethod +
          '.data);\n',
          'utf-8');
      }
    },
  });
};

const registerPlugin = function registerPlugin(pluginDoc) {
  const plugins = PlanispherePlugins.get();
  plugins.push(pluginDoc);
  PlanispherePlugins.set(plugins);
  registerMeteorMethod(pluginDoc);
  Meteor.startup(() => {
    const configMethod = lodash.get(that, pluginDoc.configMethod);
    if (configMethod) {
      PlanisphereConfigs.set(pluginDoc.name, configMethod.data);
    }
  });
};

// This is the config api for planisphere plugins.
// For example:
// Planisphere.registerPlugin({
//   name: 'navbar-bootstrap3',
//   description: 'provides navbar by bootstrap3',
//   configMethod: 'PlanispherePluginNavbar.config',
//   configSchema: new SimpleSchema({
//     title: {
//       type: String,
//       min: 3,
//       max: 12
//     }
//   }),
//   conflicts: ['navbar-bootstrap4']
// });
Planisphere = Planisphere || {};
Planisphere.registerPlugin = function register(pluginDoc) {
  check(pluginDoc, {
    name: String,
    description: String,
    configMethod: String,
    configSchema: SimpleSchema,
    conflicts: Match.Optional([String]), // eslint-disable-line new-cap
  });
  registerPlugin(pluginDoc);
};
