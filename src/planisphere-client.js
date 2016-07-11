/* eslint-env meteor */
/* eslint prefer-template: 0 */

/* global PlanispherePlugins, PlanisphereConfigs, PlanisphereRefreshing */

const editorVisible = new ReactiveVar(false);
const editorPosition = new ReactiveVar('right');

Template.planisphere.onRendered(() => {
  const template = Template.instance();
  template.autorun(() => {
    if (PlanisphereRefreshing.get()) {
      // this is very hacky. any other better way?
      template.$('div:nth-of-type(2)')[0].scrollTop = 0;
    }
  });
});

Template.planisphere.helpers({
  buttonAttributes() {
    return {
      style: [
        'position: absolute',
        'top: 0',
        '' + editorPosition.get() + ': 40px',
        'z-index: 250',
      ].join(';') + ';',
    };
  },
  editorAttributes() {
    return {
      style: [
        'display: ' + (editorVisible.get() ? 'block' : 'none'),
        'position: absolute',
        'top: 0',
        '' + editorPosition.get() + ': 40px',
        'z-index: 251',
        'padding: 10px',
        'background-color: skyblue',
        'border: 3px dotted darkblue',
        'width: 50%',
        'height: 100%',
        'overflow: scroll',
      ].join(';') + ';',
    };
  },
  plugins() {
    return PlanispherePlugins.get();
  },
  getMethodName(plugin) {
    return `/planisphere/plugin/${plugin.name}/config`;
  },
  getConfig(plugin) {
    return PlanisphereConfigs.get(plugin.name);
  },
  refreshing() {
    return PlanisphereRefreshing.get();
  },
});

Template.planisphere.events({
  'click button[name="show"]'(event) {
    event.preventDefault();
    editorVisible.set(true);
  },
  'click button[name="close"]'(event) {
    event.preventDefault();
    editorVisible.set(false);
  },
  'click button[name="left"]'(event) {
    event.preventDefault();
    editorPosition.set('left');
  },
  'click button[name="right"]'(event) {
    event.preventDefault();
    editorPosition.set('right');
  },
});
