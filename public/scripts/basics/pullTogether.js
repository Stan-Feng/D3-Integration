(function(){

  //TODO: Set the dimensions of the canvas/graph
  var margin = { top : 30, bottom : 20, right : 20, left : 30 };
  var width = 600 - margin.left - margin.right;
  var height = 270 - margin.top - margin.bottom;

  //TODO: Parse date / time
  var parseDate = d3.time.format('%d-%m-%y').parse;

  //TODO: Set the ranges
  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  //TODO: Define the axes
  var xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(5);
  var yAxis = d3.svg.axis().scale(y)
      .orient('left').ticks(5);

  //TODO: Define the line
  var valueline = d3.svg.line()
      .x(function(d){ return x(d.dates); })
      .y(function(d){ return y(d.close); });

  //TODO: Add svg canvas
  var svg = d3.select('body').append('svg')
      .attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
      }).
      append('g')
        .attr({
          transform: 'translate(' + margin.left + ',' + margin.top + ')'
        });


})();