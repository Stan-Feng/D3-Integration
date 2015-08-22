
  var margin = { top : 20, bottom : 80, right : 40, left : 40 };
  var width = 700 - margin.left - margin.right;
  var height =  370 - margin.top - margin.bottom;

  var parseDate = d3.time.format('%d-%b-%y').parse;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);
  var yRight = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(10).tickFormat(d3.time.format('%Y-%m-%d'));
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
    svg.append('text')
        .attr({
          'transform': 'translate(' + x(data[data.length/2].date) + ', ' + (y(data[(data.length)/2].close) + 25) + ')',
          'dy': '0.35em',
          'text-anchor': 'start',
          'font-size': '16px'
        })
        .style('fill', 'steelblue')
        .text('Close');


    //TODO: Add second line to graph
    svg.append('path')
        .attr({
          'class': 'line',
          'd': valueline2(data)
        }).
        style('stroke', 'red');
    //TODO: Add the text at the end of line which can outline what line is
    svg.append('text')
        .attr({
          'transform': 'translate(' + x(data[data.length/2].date) + ', ' +  ( yRight(data[(data.length)/2].open) -25) + ')',
          'dy': '0.35em',
          'text-anchor': 'start',
          'font-size': '16px'
        })
        .style('fill', 'red')
        .text('Open');



    svg.append('g')
        .attr({
          'class': 'x axis',
          'transform': 'translate(0, ' + height + ')'
        })
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr({
          'dx': '-0.8em',
          'dy': '0.15em',
          'transform': 'rotate(-65)'
        });

    svg.append('g')
        .attr({
          'class': 'y axis'
        })
        .style({
          'fill': 'steelblue'
        })
        .call(yAxis);

    svg.append('g')
        .attr({
          'class': 'y axis',
          'transform': 'translate(' + width + ', 0)'
        })
        .style({
          'fill': 'red'
        })
        .call(yAxisRight);
  });






//TODO: Add onclick event to update data of D3
function updateData(){
  d3.csv('/public/testdata/data-alt.csv', function(err, data){
    if(err) throw err;

    data.forEach(function(d){
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    //TODO: Scale the range of data again
    x.domain(d3.extent(data, function(d){ return d.date; } ));
    y.domain([0, d3.max(data, function(d){ return d.close; } )]);

    //TODO: Select the sections will be apllied changes to
    var svg = d3.select('body').transition();

    //TODO: Make the changes
    svg.select('.line')
        .duration(750)
        .attr('d', valueline(data));
    svg.select('.x.axis')
        .duration(750)
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr({
          'dx': '-0.8em',
          'dy': '0.15em',
          'transform': 'rotate(-65)'
        });
    svg.select('.y.axis')
        .duration(750)
        .call(yAxis);

  });

}



















