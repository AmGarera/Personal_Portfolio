var PieChartModule = (function () {

//Declare global variables
var chartAreaWidth,
    chartArea_Height;

var colorScalingFunction;

function loadThePieChart() {
    console.log("%cloadThePieChart function called!", "color:DarkGreen; font-weight: bold");

    //====================================================================
    // DATA LOADING ASYNCH FUNCTION:  START
    //====================================================================
    d3.csv("data.csv", function (error, retrievedData) {
        console.log("%ccsv function called!", "color: green; font-weight: bold")

        //Read csv file and convert properties to numeric as needed
        fillDataArrays(retrievedData);

        //Setup color scaling to be used in the Donut Chart
        buildColorScalingFunction();

        //Setup drawing area
        buildSVGAndChartArea();

        //Build and display PieChart
        displayDonutChart(retrievedData);

    });

    //====================================================================
    // DATA LOADING ASYNCH FUNCTION:  END
    //====================================================================

    function fillDataArrays(retrievedData) {
        console.log("%cfillDataArrays function called!", "color:DarkGreen; font-weight: bold");
        console.log("retrievedData array:");
        console.table(retrievedData);

        //Note that we are not creating a new data array here, 
        //  just modifying the retrievedData array!!
        retrievedData.forEach(function (d, i) {
            d.population = +d.population;
        });

        console.log("Modified retrievedData array: ")
        console.table(retrievedData);
        console.log(" ");
    }

    function buildColorScalingFunction() {
        console.log("%cbuildColorScaling function called!", "color:DarkGreen; font-weight: bold");

        //Note:  when using the color scaling function with a Donut Chart,
        //       we don't need to (and should not) set the domain for the color scaling function!

        //Here's how to build a color scaling function with a custom color set
        //colorScalingFunction = d3.scale.ordinal()
        //                        .range(["#ffc87c", "#ffeba8", "#f3b080", "#916800", "#dda66b"]);

        //Here's how to build a color scaling function using a d3 categorical color scale
        colorScalingFunction = d3.scale.category20b();

        console.log("colorScalingFunction.range() = ", colorScalingFunction.range());

    }

    function buildSVGAndChartArea() {
        console.log("%cbuildSVGAndChartArea function called!", "color: green; font-weight: bold");

        //Set dimensions of svg
        svg_width = 500;
        svg_height = 400;

        var margin = {
            top: 70,
            bottom: 30,
            right: 20,
            left: 20
        };

        //Set dimensions of chart area inside the svg
        chartAreaWidth = svg_width - margin.left - margin.right;
        chartArea_Height = svg_height - margin.top - margin.bottom;

        //Set translate values for g that will contain the Donut Chart
        // so that the Donut Chart will be in the middle of the chart area
        var xTranslate = (chartAreaWidth / 2) + margin.left;
        var yTranslate = (chartArea_Height / 2) + margin.top;

        //Add svg element and translated g to hold centered Donut Chart
        svg = d3.select("#divPieChart").append("svg")
                   .attr("width", svg_width)
                   .attr("height", svg_height)
                   .append("g")
                   .attr("transform", "translate(" + xTranslate + "," + yTranslate + ")");

        console.log("svg_width = " + svg_width);
        console.log("svg_height = " + svg_height);
        console.log("chartAreaWidth = " + chartAreaWidth);
        console.log("chartArea_Height = " + chartArea_Height);
        console.log("xTranslate = " + xTranslate);
        console.log("yTranslate = " + yTranslate);
        console.log(" ");

    }

    function displayDonutChart(data) {
        console.log("%cdisplayDonutChart function called!", "color: green; font-weight: bold");

        var populationFormatter = d3.format(".2s");

        //Want the radius to be half of whichever is smaller - the height or
        //width of the chart drawing area
        var radius = Math.min(chartAreaWidth, chartArea_Height) / 2;
        console.log("radius = " + radius);

        //Build arc drawing function for country labels outside of the pie
        var donutSegment = d3.svg.arc()
                                .outerRadius(0.7 * radius)
                                .innerRadius(0.4 * radius);

        //Build arc drawing function for pie 
        var arcForPie = d3.svg.arc()
                            .outerRadius(radius)
                            .innerRadius(0.9 * radius);

        //Setup pie layout function
        var pie = d3.layout.pie()
             .sort(null)
             .value(function (d) {
                 return d.population;
             });

        //Create empyt g's for the donut segments
        var g = svg.selectAll(".donutSegment")
                      .data(pie(data))
                      .enter().append("g")
                      .attr("class", "donutSegment");

        //Build and display the donut segments for each g
        g.append("path")
            .attr("d", donutSegment)
            .style("fill", function (d) {
                return colorScalingFunction(d.data.age);
            });

        //Inner Labels:  Value labels inside the donut segments
        g.append("text")
                .attr("class", "pie_InnerLabel")
                .attr("transform", function (d) {
                    return "translate(" + donutSegment.centroid(d) + ")";
                })
                .attr("dy", ".35em")
                //.style("text-anchor", "middle")
                .text(function (d) {
                    return populationFormatter(d.data.population);
                });
        //.style("fill", "white");

        //Outer Labels: Outside the Donut
        g.append("text")
                        .attr("class", "pie_OuterLabel")
                        .attr("transform", function (d) {
                            return "translate(" + arcForPie.centroid(d) + ")";
                        })
                        .style("text-anchor", "middle")
                        //.style('fill', '#393B79')
                        //.style('font-size', '20')
                        .text(function (d) {
                            return d.data.age;
                        });

    }
}    //===============================================
    // END PRIVATE FUNCTIONS
    //================================================


return {

    drawPieChart: loadThePieChart
}


})(); //End of Module