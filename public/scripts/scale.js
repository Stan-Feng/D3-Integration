(function(){
    //Scales are function that map from an input domain to an output range
    var h = 200;
    var w = 400;
    var padding = 20;


    function showHeader(ds){

        d3.select("body").append("h1")
            .text(ds.category + " Sales (2013)");

    }

    function buildLine(ds) {

              var xScale = d3.scale.linear()
                    .domain([
                      d3.min(ds.monthlySales, function(d){ return d.month; }),
                      d3.max(ds.monthlySales, function(d){ return d.month; })
                    ])
                    .range([padding, w - padding])
                    .nice();

              var yScale = d3.scale.linear()
                    .domain([
                      0, d3.max(ds.monthlySales, function(d){ return d.sales; })])
                    .range([h - padding, 10])
                    .nice();

              var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(6);
              //var x

              var lineFun = d3.svg.line()
                .x(function (d) { return xScale(d.month); })
                .y(function (d) { return yScale(d.sales); })
                .interpolate("linear");

              var svg = d3.select("body").append("svg").attr({ width:w, height: h});

              var axis = svg.append('g').call(yAxis)
                              .attr({
                                'class': 'axis',
                                'transform': 'translate(' + padding + ', 0)'
                              });

              var viz = svg.append("path")
                .attr({
                  d: lineFun(ds.monthlySales), //we have to refernce the sales data array
                  "stroke": "purple",
                  "stroke-width": 2,
                  "fill": "none"
              });

    }


    //call to load data and then build our viz
          d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function(error, data) {

              //check the file loaded properly
              if (error) {
                  console.log(error);
              } else {
                  console.log(data);  //raw data
              }

              //decode our base64 data
              //and convert it into an array
              var decodedData = JSON.parse(window.atob(data.content));

               //see what we've got
               //should be [Object, Object]
              console.log(decodedData.contents);


              decodedData.contents.forEach(function(ds){
                  console.log(ds);
                  showHeader(ds); //give our chart a title
                  buildLine(ds); //draw our line
              });




          });

})();