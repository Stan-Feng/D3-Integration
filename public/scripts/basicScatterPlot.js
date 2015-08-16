(function(){

  var width = 500;
  var height = 350;

  var monthlySales = [
     {"month":10, "sales":100},
     {"month":20, "sales":130},
     {"month":30, "sales":250},
     {"month":40, "sales":300},
     {"month":50, "sales":265},
     {"month":60, "sales":225},
     {"month":70, "sales":180},
     {"month":80, "sales":120},
     {"month":90, "sales":145},
     {"month":100, "sales":130}
   ];

  //Basic Scatter Plot
  var svg = d3.select('#basicScatterPlot')
        .append('svg')
        .attr({
          width: width,
          height: height
        });

  var colorKPI = function(sales){
    if(sales > 180){
      return '#33CC66';
    } else{
      return '#666666';
    }
  };

  var dots = svg.selectAll('circle')
      .data(monthlySales)
      .enter()
      .append('circle')
        .attr({
          cx: function(d){ return d.month * 4; },
          cy: function(d){ return height - d.sales; },
          r: 5,
          fill: function(d){ return colorKPI(d.sales); }
        });

})();
