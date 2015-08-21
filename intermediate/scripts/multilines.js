(function(){

  var margin = { top : 30, bottom : 40, right : 40, left : 40 };
  var width = 700 - margin.left - margin.right;
  var height =  370 - margin.top - margin.bottom;

  var parseDate = d3.time.format('%d-%b-%y').parse;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);
  var yRight = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(5);
  var yAxis = d3.svg.axis().scale(y)
      .orient('left').ticks(5);
  var yAxisRight = d3.svg.axis().scale(yRight)
      .orient('right').ticks(5);

  var valueline = d3.svg.line()
      .x(function(d){ return x(d.date); })
      .y(function(d){ return y(d.close); });

  //TODO: Add the second line (x,y) reflection function
  var valueline2 = d3.svg.line()
      .x(function(d){ return x(d.date); })
      .y(function(d){ return yRight(d.open); });


  var svg = d3.select('body').append('svg')
      .attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
      }).
      append('g')
        .attr({
          transform: 'translate(' + margin.left + ',' + margin.top + ')'
        });

  d3.csv('/public/testdata/data2.csv', function(err, data){
    data.forEach(function(d){
      d.date = parseDate(d.date);
      d.close = +d.close;
      d.open = +d.open;
    });

    x.domain(d3.extent(data, function(d){ return d.date;} ));
    y.domain([0, d3.max(data, function(d){ return d.close; }) ]);
    yRight.domain([0, d3.max(data, function(d){ return d.open;}) ]);

    svg.append('path')
        .attr({
          'class': 'line',
          'd': valueline(data)
        });
    //TODO: Add the text at the end of line which can outline what line is
    svg.append('text')
        .attr({
          'transform': 'translate(' + (width + 3) + ', ' + y(data[0].open) + ')',
          'dy': '0.35em',
          'text-anchor': 'start'
        })
        .style('fill', 'red')
        .text('Open');

    //TODO: Add second line to graph
    svg.append('path')
        .attr({
          'class': 'line',
          'd': valueline2(data)
        }).
        style('stroke', 'red');
    svg.append('text')
        .attr({
          'transform': 'translate(' + (width + 3) + ', ' + y(data[0].close) + ')',
          'dy': '0.35em',
          'text-anchor': 'start'
        })
        .style('fill', 'steelblue')
        .text('Close');

    svg.append('g')
        .attr({
          'class': 'x axis',
          'transform': 'translate(0, ' + height + ')'
        })
        .call(xAxis);


    svg.append('g')
        .attr({
          'class': 'y axis'
        })
        .call(yAxis);

  });
})();

