(function(){

  //TODO: Set the dimensions of the canvas/graph
  var margin = { top : 30, bottom : 40, right : 20, left : 40 };
  var width = 600 - margin.left - margin.right;
  var height = 270 - margin.top - margin.bottom;

  //TODO: Parse date / time
  var parseDate = d3.time.format('%d-%b-%y').parse;

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
      .x(function(d){ return x(d.date); })
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

  //TODO: Add dataset
  d3.csv('/public/testdata/data.csv', function(err, data){
    data.forEach(function(d){
      d.date = parseDate(d.date);
      d.close = +d.close;
    });
    console.log(data);

    //Scale the range
    x.domain(d3.extent(data, function(d){ return d.date;} ));
    y.domain([0, d3.max(data, function(d){ return d.close;} )]);

    //Append the valueline path
    svg.append('path')
        .attr({
          'class': 'line',
          'd': valueline(data)
        });

    //Add xAxis
    svg.append('g')
        .attr({
          attr: 'x axis',
          transform: 'translate(0, ' + height + ')'
        })
        .call(xAxis);

    //Add yAxis
    svg.append('g')
        .attr({
          attr: 'y axis'
        })
        .call(yAxis);


  });


























})();