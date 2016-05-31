'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _window = window;
var _window$Highcharts = _window.Highcharts;
var Scroller = _window$Highcharts.Scroller;
var Chart = _window$Highcharts.Chart;
var wrap = _window$Highcharts.wrap;


(function () {
  wrap(Scroller.prototype, 'render', function (proceed, min, max, pxMin, pxMax) {
    var _this = this;

    var _arguments = Array.prototype.slice.call(arguments);

    var args = _arguments.slice(1);

    proceed.call.apply(proceed, [this].concat(_toConsumableArray(args)));

    var renderer = this.chart.renderer;
    var _navigatorOptions = this.navigatorOptions;
    var handleImg = _navigatorOptions.handleImg;
    var sliderImg = _navigatorOptions.sliderImg;

    if (!this.handlesRendered) {
      if (handleImg) {
        (function () {
          var x = handleImg.x;
          var y = handleImg.y;
          var src = handleImg.src;
          var width = handleImg.width;
          var height = handleImg.height;

          _this.handles.forEach(function (handle) {
            return handle.attr({ width: width, height: height });
          });
          _this.rightHandle = renderer.image(src, x, y, width, height).add(_this.handles[0]);
          _this.leftHandle = renderer.image(src, x, y, width, height).add(_this.handles[1]);
        })();
      }

      if (sliderImg) {
        this.slider = renderer.image(sliderImg.src, sliderImg.x, sliderImg.y, sliderImg.width, sliderImg.height).add(this.navigatorGroup);
      }

      this.handlesRendered = true;
    }

    if (!this.slider) return;

    var navigatorLeft = this.navigatorLeft;
    var zoomedMin = this.zoomedMin;
    var zoomedMax = this.zoomedMax;
    var height = this.height;
    var top = this.top;

    var maskX = navigatorLeft + zoomedMin;
    var maskWidth = zoomedMax - zoomedMin;
    var sliderX = maskX + (maskWidth - sliderImg.height) / 2;
    var sliderY = top + height;
    this.slider.attr({ x: sliderX, y: sliderY });
  });

  wrap(Chart.prototype, 'init', function (proceed, options) {
    var sliderImg = options.navigator.sliderImg;

    if (!sliderImg) return;

    options.navigator.outlineWidth = 0;
    options.scrollbar = {
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
    };

    proceed.call(this, options);
  });
})();