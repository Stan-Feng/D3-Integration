(function(){
  var width = 400;
  var height = 120;
  var padding = 3;
  var dataset = [30,40,50,80,100];
  var svg = d3.select('#basicBarChar').append('svg')
                .attr('width', width)
                .attr('height',height);
  var colorPicker = function(dataValue){
    return 'rgb(' + dataValue * 2 + ', 140, 120)';
  };


  svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
        .attr({ //Set Attributes using JSON
          x : function(d, i){ return i * (width/dataset.length); }, //To make all rects fill with svg container dynamically
          y : function(d){ return height - d; }, //Up sidedown the svg shape
          width: width / dataset.length - padding, //Scale the width dynamically depends on svg container width
          height: function(d){ return d; }, //Return the value of dataset
          fill: colorPicker // Fill color according to dataset
        });

  //Add tags to svg
  svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d){ return d; })
        .attr({
          'text-anchor' : 'middle',
          x: function(d, i){ return i * (width / dataset.length) + (width / dataset.length / 2); },
          y: function(d){ return height - d + 14; },
          'font-size' : '12px',
          'font-family' : 'Monaco',
          'fill' : '#ffffff'
        });

})()