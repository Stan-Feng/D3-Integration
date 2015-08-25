var units = 'Widtgets';

var margin = { top: 10, right: 10, bottom: 10, left: 10};
var width = 700 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"); //Zero Decimal Places
var format = function(d){ return formatNumber(d) + ' ' + units; };
var color = d3.scale.category20();

var svg = d3.select('#chart').append('svg')
      .attr({
        'width': width + margin.right + margin.left,
        'height': height + margin.top + margin.bottom
      })
    .append('g')
      .attr({
        'transform': 'translate('+ margin.left +' ,' + margin.top +')'
      });

var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);

var path = sankey.link();

d3.json('/public/testdata/sankey-formatted.json', function(err, graph){
    if(err) throw err;

    sankey.nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

    //TODO: Add all links
    var link = svg.append('g').selectAll('.link')
        .data(graph.links)
      .enter().append('path')
        .attr({
          'class': 'link',
          'd': path
        })
        .style({
          'stroke-width': function(d){ return Math.max(1, d.dy); }
        })
        .sort(function(a, b){ return b.dy - a.dy; });

    //TODO: Add Links Titles
    // link.append('title')
    //     .text(function(d){ return d.source.name + ' -> ' + d.target.name + '\n' + format(d.value); });

    //TODO: Add in nodes

});
















