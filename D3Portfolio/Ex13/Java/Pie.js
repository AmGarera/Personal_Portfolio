var PieChartModule = (function () {

        //Declare global variables
        var chartAreaWidth,
            chartArea_Height;

        var colorScalingFunction;

        function loadThePieChart() {
            console.log("%cloadTheBaChart function called!", "color:DarkGreen; font-weight: bold");

            //====================================================================
            // DATA LOADING ASYNCH FUNCTION:  START
            //====================================================================
            d3.csv("data_04.csv", function (error, retrievedData) {
                console.log("%ccsv function called!", "color: green; font-weight: bold")

                //Read csv file and convert properties to numeric as needed
                fillDataArrays(retrievedData);

                //Setup color scaling to be used in the Donut Chart
                buildColorScalingFunction();

                //Setup drawing area
                //buildSVGAndChartArea();
                buildSVG();

                //Build and display PieChart
                displayPieChart(retrievedData);

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
                colorScalingFunction = d3.scale.ordinal()
                                        .range(["#241c77", "#e3b417", "#df900a", "#00912d", "#6bdd95", "#6876a2"]);

                //Here's how to build a color scaling function using a d3 categorical color scale
                //colorScalingFunction = d3.scale.category20b();

                console.log("colorScalingFunction.range() = ", colorScalingFunction.range());

            }

            //function buildSVGAndChartArea() {
            //    console.log("%cbuildSVGAndChartArea function called!", "color: green; font-weight: bold");

            //    //Set dimensions of svg
            //    svg_width = 500;
            //    svg_height = 400;

            //    var margin = {
            //        top: 70,
            //        bottom: 30,
            //        right: 20,
            //        left: 20
            //    }

            //    //Set dimensions of chart area inside the svg
            //    chartAreaWidth = svg_width - margin.left - margin.right;
            //    chartArea_Height = svg_height - margin.top - margin.bottom;

            //    //Set translate values for g that will contain the Donut Chart
            //    // so that the Donut Chart will be in the middle of the chart area
            //    var xTranslate = (chartAreaWidth / 2) + margin.left;
            //    var yTranslate = (chartArea_Height / 2) + margin.top;

            //    //Add svg element and translated g to hold centered Donut Chart
            //    svg = d3.select("#divPie").append("svg")
            //               .attr("width", svg_width)
            //               .attr("height", svg_height)
            //               .append("g")
            //               .attr("transform", "translate(" + xTranslate + "," + yTranslate + ")");

            //    console.log("svg_width = " + svg_width);
            //    console.log("svg_height = " + svg_height);
            //    console.log("chartAreaWidth = " + chartAreaWidth);
            //    console.log("chartArea_Height = " + chartArea_Height);
            //    console.log("xTranslate = " + xTranslate);
            //    console.log("yTranslate = " + yTranslate);
            //    console.log(" ");

            //}

            function buildSVG() {
                console.log("%cbuildSVG function called!", "color:DarkGreen; font-weight: bold");

                svg_width = 500;                         //Width of SVG element
                svg_height = 400;                        //Height of SVG element

                ////Add svg element
                //svg = d3.select('#divPie')
                //            .append('svg')
                //            .attr("class", "center-block")   //!!! Centers Chart with Bootstrap!!
                //            .attr('width', svg_width)
                //            .attr('height', svg_height);

                //NO g Translate used!!!!!!!!!!!

                var margin = {
                    top: 70,
                    bottom: 30,
                    right: 20,
                    left: 20
                }

                //Add group for shapes
                //gData = svg.append('g')
                //        .attr("transform", "translate(0, " + svg_Height + ")");

                //Set dimensions of chart area inside the svg
                chartAreaWidth = svg_width - margin.left - margin.right;
                chartArea_Height = svg_height - margin.top - margin.bottom;

                //Set translate values for g that will contain the Donut Chart
                // so that the Donut Chart will be in the middle of the chart area
                var xTranslate = (chartAreaWidth / 2) + margin.left;
                var yTranslate = (chartArea_Height / 2) + margin.top;

                //Add svg element and translated g to hold centered Donut Chart
                svg = d3.select("#divPie").append("svg")
                           .attr("width", svg_width)
                           .attr("height", svg_height)
                           .attr("class", "center-block")   //!!! Centers Chart with Bootstrap!!
                           .append("g")
                           .attr("transform", "translate(" + xTranslate + "," + yTranslate + ")");

                console.log("svg_Width = " + svg_width);
                console.log("svg_Height = " + svg_height);
                console.log("No g translate!!!!  ");

            }

            function displayPieChart(data) {
                console.log("%cdisplayPieChart function called!", "color: green; font-weight: bold");

                //Want the pie radius to be half of whichever is smaller - the height or
                //width of the chart drawing area
                var radius = Math.min(chartAreaWidth, chartArea_Height) / 2;
                console.log("radius = " + radius);

                //This is the function used to draw every pie segment
                var arc = d3.svg.arc()
                                .outerRadius(radius)
                                .innerRadius(0);

                //Setup the Donut Chart layout function
                var pie = d3.layout.pie()
                             .sort(null)
                             .value(function (d) {
                                 return d.population;
                             });

                //Do the selectAll magic - one g for each pie segment
                var g = svg.selectAll(".arc")
                              .data(pie(data))
                              .enter().append("g")
                              .attr("class", "arc");

                //Draw pie
                g.append("path")
                    .attr("d", arc)
                    .style("fill", function (d) {
                        return colorScalingFunction(d.data.age);
                    });

                //Add text to pie
                g.append("text")
                     .attr("transform", function (d) {
                         return "translate(" + arc.centroid(d) + ")";
                     })
                     .style("text-anchor", "middle")
                     .text(function (d) {
                         return d.data.age;
                     });
            }
        }

        return {

            drawPieChart: loadThePieChart
        }


})(); //End of Module
