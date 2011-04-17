cjs.ready(function () {

  cjs.ns('com.components.html.pubsub', com.components.html.base.extend({
    _pubsub: com.components.events.pubsub,
    className: 'HTMLPubSubComponent',
    afterInit: function () {
      this.subscribe('/onData', cjs.utils.bind(this, 'innerHTML'));
    },
    subscribe: function (topic, callback) {
      this._pubsub.subscribe(this._elementId+topic, callback);
    },
    publish: function (topic, args) {
      this._pubsub.publish(this._elementId+topic, args);
    }
  }));

})
