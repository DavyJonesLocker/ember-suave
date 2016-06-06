let Blah = Foo.extend({
  init() {
    this._super(...arguments); // normal usage

    // odd, but still needed in some cases
    let { _super } = this;
    // some async here
    _super.apply(this, arguments);
  }
});
