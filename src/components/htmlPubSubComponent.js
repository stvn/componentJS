$com.ns('$com.components.htmlPubSubComponent');
$com.require('$com.components.htmlBaseComponent', '$com.components.pubSubComponent');

$com.components.htmlPubSubComponent = $com.components.htmlBaseComponent.extend({
  _pubsub: $com.components.pubSubComponent,
  className: 'HTMLPubSubComponent',
  afterInit: function () {
    this.subscribe('/onData', $com.utils.bind(this, 'innerHTML'));
  },
  subscribe: function (topic, callback) {
    this._pubsub.subscribe(this._elementId+topic, callback);
  },
  publish: function (topic, args) {
    this._pubsub.publish(this._elementId+topic, args);
  }
});

