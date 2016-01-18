/* global Tinytest, SimpleSchema */

const Planisphere = Package['daishi:planisphere-core'].Planisphere;

Tinytest.add('registerPlugin basic', () => {
  Planisphere.registerPlugin({
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

Tinytest.add('registerPlugin missing schema', (test) => {
  test.throws(() => {
    Planisphere.registerPlugin({
      name: 'foo',
      description: 'bar',
      configMethod: 'foo.config'
    });
  }, 'Missing');
});

Tinytest.add('registerPlugin invalid schema', (test) => {
  test.throws(() => {
    Planisphere.registerPlugin({
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
