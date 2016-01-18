Package.describe({
  name: 'daishi:planisphere-core',
  version: '0.1.0',
  summary: 'Web application generator using Meteor',
  git: 'https://github.com/dai-shi/planisphere-core',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom(['1.2.1']);
  api.use(['ecmascript', 'mongo', 'templating', 'check']);
  api.use(['reactive-var', 'reactive-dict']);
  api.use('adelevie:meteor-lodash@3.10.1');
  api.use('aldeed:simple-schema@1.1.0');
  api.use('aldeed:autoform@5.8.1');
  api.use('peerlibrary:fs@0.1.7');
  api.addFiles(['src/planisphere-common.js']);
  api.addFiles([
    'src/planisphere-client.html',
    'src/planisphere-client.js'
  ], 'client');
  api.export('Planisphere');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'mongo', 'templating', 'check']);
  api.use(['reactive-var', 'reactive-dict']);
  api.use('tinytest');
  api.use('aldeed:simple-schema@1.1.0');
  api.use('daishi:planisphere-core');
  api.addFiles(['tests/planisphere-common-tests.js']);
  api.addFiles(['tests/planisphere-client-tests.js'], 'client');
});
