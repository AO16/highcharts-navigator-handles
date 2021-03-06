const { Highcharts: { Scroller, Chart, merge, wrap } } = window;

(function() {
  wrap(Scroller.prototype, 'render', function(proceed, min, max, pxMin, pxMax) {
    const [, ...args] = arguments;
    proceed.call(this, ...args);

    const { chart: { renderer } } = this;
    const { navigatorOptions: { handleImg, sliderImg } } = this;
    if (!this.handlesRendered) {
      if (handleImg) {
        const { x, y, src, width, height } = handleImg;
        this.handles.forEach((handle) => handle.attr({ width, height }));
        this.rightHandle = renderer.image(src, x, y, width, height).add(this.handles[0]);
        this.leftHandle = renderer.image(src, x, y, width, height).add(this.handles[1]);
      }

      if (sliderImg) {
        this.slider = renderer.image(
          sliderImg.src,
          sliderImg.x,
          sliderImg.y,
          sliderImg.width,
          sliderImg.height).add(this.navigatorGroup);
      }

      this.handlesRendered = true;
    }

    if (!this.slider) return;

    const { navigatorLeft, zoomedMin, zoomedMax, height, top } = this;
    const maskX = navigatorLeft + zoomedMin;
    const maskWidth = zoomedMax - zoomedMin;
    const sliderX = maskX + ((maskWidth - sliderImg.height) / 2);
    const sliderY = top + height;
    this.slider.attr({ x: sliderX, y: sliderY });
  });

  wrap(Chart.prototype, 'init', function(proceed, options) {
    const { navigator: { sliderImg } } = options;
    if (!sliderImg) return;

    options.navigator.outlineWidth = 0;
    options.scrollbar = merge({
      barBackgroundColor: 'white',
      barBorderWidth: 0,
      buttonBackgroundColor: 'white',
      buttonBorderWidth: 0,
      buttonArrowColor: null,
      enabled: true,
      height: sliderImg.height,
      rifleColor: 'white',
      trackBackgroundColor: 'white',
      trackBorderWidth: 0
    }, options.scrollbar);

    proceed.call(this, options);
  });

}());
