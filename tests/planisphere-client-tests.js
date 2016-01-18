/* global Tinytest */

Tinytest.add('Template helpers', (test) => {
  test.isNotUndefined(Template.planisphere);
  test.isNotUndefined(Template.planisphere.__helpers[' buttonAttributes']);
  test.isNotUndefined(Template.planisphere.__helpers[' editorAttributes']);
});
