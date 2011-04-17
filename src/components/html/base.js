cjs.ready(function () {

  cjs.ns('com.components.html.base', cjs.base.extend({
    _isRendered: false,
    _innerHTML: null,
    _elementId: null,
    _parentElement: null,
    className: 'ComponentHTMLBase',
    
    init: function () {
      this._elementId = this.className + '_' + this.id;
    },
  
    innerHTML: function (html) {
    //FIXME: this should be using document fragment
      if (html) { this._innerHTML = html; this.update(); }
      //FIXME:  this is going to prevent chaining.
      return this._innerHTML;
    },
  
    render: function () {
      if (this._isRendered) { return; }
  
      if (!this._parentElement) {
        this.parentElement(document.createElement('div'));
        this.parentElement().setAttribute('id', this._elementId);
        document.body.appendChild(this.parentElement());
      }
  
      this.parentElement().innerHTML = this.innerHTML();
      this._isRendered = true;
      this.hide();
    },
  
    update: function () {
      if (!this._isRendered) { return; }
      this.parentElement().innerHTML = this.innerHTML();
    },
  
    renderAndShow: function () {
      this.render();
      this.show();
    },
  
    parentElement: function (element) {
      if (element) { this._parentElement = element; }
      return this._parentElement;
    },
  
    hide: function () {
      this.parentElement().style.display = 'none';
    },
  
    show: function () {
      this.parentElement().style.display = '';
    },
  
    onDestroy: function () {
      var attachedTo = this.parentElement().parentElement;
      attachedTo.removeChild(this.parentElement());
    },
  
    beforeRender: function () {},
    afterRender: function () {}  
  }));

})
