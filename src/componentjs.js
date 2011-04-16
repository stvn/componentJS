(function (global, undefined) {
  var componentJS = {
    version: "0.1",
    rootDir: 'src/',
    registry: {
        __counter: 0,
        __cache: {},
        set: function (key, value) {
          this.__cache[key] = value;
        },

        get: function (key) {
          return this.__cache[key];
        },

        destroy: function (key) {
          delete this.__cache[key];
        },
        flush: function () {
          this.__cache = {};
        }
    },

    base: function () {
      //component Implementation below
    },
   
    utils: {
      mixin: function (obj, source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
        return obj;
      },

      bind: function (scope, func) {
        var fn = typeof func == "string" ? scope[func] : func;
        return function () {
          return fn.apply(scope, arguments);
        };
      },

      ns: function (name, methods, container) {
        var ns = name.split('.'),
            o = container || window,
            i = 0, 
            ii = ns.length ;

        for(i; i < ii; i++){
          if(i === ii - 1) {
            o = o[ns[i]] = methods || {};
          } else {
            o = o[ns[i]] = o[ns[i]] || {};
          }
        }
        return o;
      },

      require: function (names) {
        names = Array.prototype.slice.call(arguments);
        for (var i=0, ii= names.length; i < ii; i ++) {
          var scriptName = 'loadedScript_' + names[i];
          
          if (this.registry.get(scriptName)) { return; }
          
          var script = document.createElement('script'),
              split = names[i].split('.'),
              source = componentJS.rootDir;
          
          for (var j=1, jj=split.length; j < jj; j++) {
            source += split[j];
            if (j == jj - 1) {
              source += '.js';
            } else {
              source += '/';
            }
          }
          script.setAttribute('src', source);
          script.setAttribute('type', 'text/javascript');
          document.head.appendChild(script);
          this.registry.set(scriptName, true);
        }
      }

    }
  };

  componentJS.base.prototype.className      = "ComponentJSBase";
  componentJS.base.prototype.id             = 1;
  componentJS.base.prototype.requires       = null;
  componentJS.base.prototype.beforeInit     = function () {};
  componentJS.base.prototype.init           = function () {};
  componentJS.base.prototype.afterInit      = function () {};
  componentJS.base.prototype.beforeDestroy  = function () {};
  componentJS.base.prototype.onDestroy      = function () {};
  componentJS.base.prototype.afterDestroy   = function () {};

  componentJS.base.prototype.__onInit = function () {
    this.beforeInit();
    this.init();
    this.id = ++componentJS.registry.__counter;
    componentJS.registry.set(this.id, this);
    this.afterInit();
  };

  componentJS.base.prototype.destroy        = function () {
    this.beforeDestroy();
    this.onDestroy();
    componentJS.registry.destroy(this.id);
    this.afterDestroy();
  };

  componentJS.base.prototype.toString = function () {
    return this.className;
  };
  
  componentJS.base.prototype.extend = function (source) {
    function ComponentJS(){};
    ComponentJS.prototype = this;
    source._super = this;
    var newObj = componentJS.utils.mixin(new ComponentJS(), source);
    newObj.__onInit(); 
    return newObj;
  };

  componentJS.base.prototype.create = function () {
    var newObj = this.extend({});
    newObj.init();
    return newObj;
  };

  //Add componentJS to global namespace
  global.$com = {
    base: new componentJS.base(),
    registry: componentJS.registry,
    utils: componentJS.utils,
    ns: componentJS.utils.ns,
    require: componentJS.utils.require
  }

  $com.registry.set('loadedScript_$com.components.base', 'true');
  console.info("Using componentJS version: " + componentJS.version);
}(window))
