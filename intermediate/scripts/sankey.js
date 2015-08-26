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
    link.append('title')
        .text(function(d){ return d.source.name + ' -> ' +
                                  d.target.name + '\n' + format(d.value); });

    //TODO: Add in nodes
    var node = svg.append('g').selectAll('.node')
        .data(graph.nodes)
      .enter().append('g')
        .attr({
          'class': 'node',
          'transform': function(d){ return 'translate(' + d.x + ',' + d.y + ')'; }
        })
        .call(d3.behavior.drag()
          .origin(function(d){ return d; })
          .on('dragstart', function(){
            this.parentNode.appendChild(this);
          })
          .on('drag', dragmove));

    node.append('rect')
        .attr({
          'height': function(d){ return d.dy; },
          'width': sankey.nodeWidth()
        })
        .style({
          'fill': function(d){ return d.color = color(d.name.replace(/ .*/, "")) },
          'stroke': function(d){ return d3.rgb(d.color).darker(2); }
        })
        .append('title')
          .text(function(d){ return d.name + '\n' + format(d.value); });

    node.append('text')
        .attr({
          'x': -6,
          'y': function(d){ return d.dy / 2; },
          'dy': '0.35em',
          'text-anchor': 'end',
          'transform': null
        })
        .text(function(d){ return d.name; })
        .filter(function(d){ return d.x < width / 2; })
          .attr({
            'x': 6 + sankey.nodeWidth(),
            'text-anchor': 'start'
          });

    function dragmove(d) {
      d3.select(this).attr("transform",
          "translate(" + d.x + "," + (
                  d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
              ) + ")");
      sankey.relayout();
      link.attr("d", path);
    }
});
















