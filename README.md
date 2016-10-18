# Highcharts Navigator Handles

This is a plugin that allows for custom handles in the navigator. The navigator requires that you are using Highstock.

If you are using `sliderImg` it effectively overrides the scrollbar, so all of those options will be ignored.

## Prerequisites

* [Gulp](http://gulpjs.com/)
* [Sass](http://sass-lang.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Installation

`npm install highcharts`  
`npm install highcharts-navigator-handles`

## Watch

`gulp watch:all`

## Building

`gulp build:all`

## Example

```html
<script src="path_to_node_modules/highstock.js"></script>
<script src="path_to_node_modules/dist/navigator-handles.js"></script>

<div id="container" style="height: 400px; min-width: 310px"></div> 
```

```javascript
$('#container').highcharts('StockChart', {

  rangeSelector : {
      selected : 1
  },

  title : {
      text : 'AAPL Stock Price'
  },
  
  navigator: {
      handleImg: {
          height: 40.5,
          src: '/assets/images/slider.svg',
          width: 20,
          x: -10,
          y: -12
      },
      sliderImg: {
          height: 20,
          src: '/assets/images/range-slider.svg',
          width: 20,
          x: 0,
          y: 0
      }
  },

  series : [{
      name : 'AAPL',
      data : [
          /* May 2009 */
          [1242864000000,17.74],
          [1242950400000,17.50],
          [1243296000000,18.68],
          [1243382400000,19.01],
          [1243468800000,19.30],
          [1243555200000,19.40]
      ],
      tooltip: {
          valueDecimals: 2
      }
  }]
});
```
