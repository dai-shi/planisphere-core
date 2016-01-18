/* global Tinytest, Planisphere, SimpleSchema */

Tinytest.add('pluginConfig basic', () => {
  Planisphere.pluginConfig({
    name: 'foo',
    description: 'bar',
    configMethod: 'foo.config',
    configSchema: new SimpleSchema({
      name: {
        type: String
      }
    })
  });
});

Tinytest.add('pluginConfig missing schema', (test) => {
  test.throws(() => {
    Planisphere.pluginConfig({
      name: 'foo',
      description: 'bar',
      configMethod: 'foo.config'
    });
  }, 'Missing');
});

Tinytest.add('pluginConfig invalid schema', (test) => {
  test.throws(() => {
    Planisphere.pluginConfig({
      name: 'foo',
      description: 'bar',
      configMethod: 'foo.config',
      configSchema: new SimpleSchema({
        name: {
          oops: String
        }
      })
    });
  }, 'Invalid');
});
