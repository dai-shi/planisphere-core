PlanisphereJS
=============

PlanisphereJS (or simply planisphere) is a web application generator based on [Meteor](http://www.meteor.com/).  You can generate an application by configuring components provided by various plugins.  The configutation is mostly in JSON format and can be edit by GUI.

This is a core package of PlanisphereJS.  This package is `debugOnly` and the editor won't show up in production.

How to use
----------

```bash
meteor create planisphere-example
cd planisphere-example
meteor add daishi:planisphere-core
meteor add daishi:planisphere-plugin-main-layout
meteor add daishi:planisphere-plugin-login-page
meteor add daishi:planisphere-plugin-welcome-page
meteor add daishi:planisphere-plugin-tabular-page
meteor add daishi:planisphere-plugin-submit-page
meteor add accounts-password
meteor run
```

Then, open <http://localhost:3000/> in your browser.

Demo
----

<https://planisphere-demo.herokuapp.com/>

Note: this demo above is in production mode and there's no editor shown.

You can try the editor by:

```
git clone https://github.com/dai-shi/planisphere-demo.git
cd planisphere-demo
meteor run
```

Then, open <http://localhost:3000/> in your browser.

TODO
----

- add packages by GUI
- search plugins at [Atomosphere](https://atmospherejs.com)
- improve the GUI editor
