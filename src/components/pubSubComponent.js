$com.ns('$com.components.pubSubComponent');
$com.require('$com.components.base');

$com.components.pubSubComponent = $com.base.extend({
  className: 'PubSubComponent',
  cache: {},

  publish: function(topic, args){
    if(!this.cache[topic]){return;}
    var i = 0,
        ii = this.cache[topic].length;
    for(i; i < ii; i++){
      var fn = this.cache[topic][i];
      fn.apply(fn, args || []);
    }
  },

  subscribe: function(topic, callback){
    if(!this.cache[topic]){this.cache[topic] = [];}
    this.cache[topic].push(callback);    
    return [topic, callback];
  },

  unsubscribe: function(handle){
    var t = handle;
    if(!this.cache[t]){return;}
    for(var id in this.cache[t]){
      if(id === handle[1]){
        this.cache[t].splice(id, 1);
      }
    }
  }
});

