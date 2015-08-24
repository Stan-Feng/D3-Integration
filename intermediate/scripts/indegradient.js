
  var margin = { top : 30, bottom : 40, right : 20, left : 40 };
  var width = 700 - margin.left - margin.right;
  var height =  370 - margin.top - margin.bottom;

  var parseDate = d3.time.format('%d-%b-%y').parse;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(5);
  var yAxis = d3.svg.axis().scale(y)
      .orient('left').ticks(5);

  var valueline = d3.svg.line()
      .x(function(d){ return x(d.date); })
      .y(function(d){ return y(d.close); });

  var svg = d3.select('body').append('svg')
      .attr({
        width: width + margin.left + margin.right,
        height: height + margin.top + margin.bottom
      }).
      append('g')
        .attr({
          transform: 'translate(' + margin.left + ',' + margin.top + ')'
        });

  d3.csv('/public/testdata/data.csv', function(err, data){
    data.forEach(function(d){
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d){ return d.date;} ));
    y.domain([0, d3.max(data, function(d){ return d.close;} )]);

    svg.append('path')
        .attr({
          'class': 'line',
          'd': valueline(data)
        });

    svg.append('g')
        .attr({
          class: 'x axis',
          transform: 'translate(0, ' + height + ')'
        })
        .call(xAxis);


    svg.append('g')
        .attr({
          class: 'y axis'
        })
        .call(yAxis);

    svg.append('linearGradient')
        .attr({
          'id': 'line-gradient',
          'gradientUnits': 'userSpaceOnUse',
          'x1': 0,
          'y1': y(0),
          'x2': 0,
          'y2': y(1000)
        })
        .selectAll('stop')
          .data([
            {offset : '0%', color: 'red'},
            {offset : '30%', color: 'red'},
            {offset : '45%', color: 'skyblue'},
            {offset : '55%', color: 'skyblue'},
            {offset : '70%', color: 'lightgreen'},
            {offset : '100%', color: 'lightgreen'}
        ])
        .enter().append('stop')
          .attr({
            'offset': function(d){ return d.offset; },
            'stop-color': function(d){ return d.color; }
          });


  });

