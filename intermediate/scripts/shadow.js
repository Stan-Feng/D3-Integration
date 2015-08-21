(function(){

  var margin = { top : 30, bottom : 40, right : 20, left : 40 };
  var width = 700 - margin.left - margin.right;
  var height =  370 - margin.top - margin.bottom;

  var parseDate = d3.time.format('%d-%b-%y').parse;
  /**
   * If we want to parse different formats time
   * All we need TODO:
   * combina a String "%Y-%m-%d....." from d3 wiki time format
   * Then invoke it as a function to parse input data then reuturn a Date objetc
   */

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(5);
  var yAxis = d3.svg.axis().scale(y)
      .orient('left').ticks(5);

  //TODO: define the area function
  var area = d3.svg.area()
      .x(function(d){ return x(d.date); })
      .y0(height)
      .y1(function(d){ return y(d.close); });

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

  //TODO: Define grid line functions
  function make_x_grid(){
    return d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(5);
  }

  function make_y_grid(){
    return d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(5)
  }

  d3.csv('/public/testdata/data.csv', function(err, data){
    data.forEach(function(d){
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d){ return d.date;} ));
    y.domain([0, d3.max(data, function(d){ return d.close;} )]);

    //TODO: draw shadow
    svg.append('path')
        .datum(data)
        .attr({
          class: 'area',
          d: area
        });

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
    svg.append('text')
        .attr({
          'x': width / 2,
          'y': height + margin.bottom,
        })
        .style('text-anchor', 'center')
        .text('Date');


    svg.append('g')
        .attr({
          class: 'y axis',
          'stroke-dasharray': ('3', '3')
        })
        .call(yAxis);
    svg.append('text')
        .attr({
          'transform': 'rotate(-90)',
          'y': margin.left / 2,
          'x': 0 - (height / 2),
          'dy': '.5em'
        })
        .style('text-anchor', 'middle')
        .text('Value');

    //TODO: draw grid lines
    svg.append('g')
        .attr({
          class: 'grid',
          transform: 'translate(0, '+ height + ')'
        }).
        call(make_x_grid()
          .tickSize(-height, 0, 0)
          .tickFormat('')
        );
      svg.append('g')
          .attr({
            class: 'grid'
          }).
          call(make_y_grid()
            .tickSize(-width, 0, 0)
            .tickFormat('')
          );


  });


























})();