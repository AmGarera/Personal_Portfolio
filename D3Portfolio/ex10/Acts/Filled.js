var BarChartModule = (function () {

    //Declare global data arrays
    var data = [],
       ax = [],
       ay = [];

    //Declare global SVG variables
    var svg_Width,                         //Width of SVG element
        svg_Height;                         //Height of SVG element

    //Declare variables to desired min and max for x and y scales
    var chosenMinimum_X_Value,
        chosenMaximum_X_Value,
        chosenMinimum_Y_Value,
        chosenMaximum_Y_Value;

    //Declare X and Y scaling functions
    var x,
        y;

    function loadTheBarChart() {
        console.log("%cloadTheBaChart function called!", "color:DarkGreen; font-weight: bold");

        //Load the data into arrays
        loadData();

        //Create the SVG and group inside it
        buildSVG();

        //Create X and Y Scaling functions
        build_X_ScalingFunction();
        build_Y_ScalingFunction();

        //Display grid lines
        displayHorizontalGridLines();

        //Draw the X and Y axes
        display_X_Axis();
        display_Y_Axis();

        //Draw the line of data points
        displayLine();

    }

    //===============================================
    // END OF STARTING CODE. BEGINNING OF FUNCTIONS
    //================================================

    function loadData() {
        console.log("%cloadData function called!", "color:DarkGreen; font-weight: bold");


        //Fill data array
        data = [
               { x: 0, y: 100 },
              { x: 10, y: 110 },
              { x: 20, y: 140 },
              { x: 30, y: 130 },
              { x: 40, y: 80 },
              { x: 50, y: 75 },
              { x: 60, y: 120 },
              { x: 70, y: 130 },
              { x: 80, y: 100 }
        ];

        //Split out x and y values into separate arrays
        data.forEach(function (d, i) {
            ax[i] = d.x;
            ay[i] = d.y;
        });

        console.table(data);
        console.log("ax", ax);
        console.log("The Minimum value of x in ax[] is " + d3.min(ax));
        console.log("The Maximum value of x in ax[] is " + d3.max(ax));
        console.log("ay", ay);
        console.log("The Minimum value of y in ay[]= " + d3.min(ay));
        console.log("The Maximum value of y in ay[] = " + d3.max(ay));
        console.log(" ");

    }

    function buildSVG() {
        console.log("%cbuildSVG function called!", "color:DarkGreen; font-weight: bold");

        svg_Width = 500;                         //Width of SVG element
        svg_Height = 400;                        //Height of SVG element

        //Add svg element
        svg = d3.select('body')
                    .append('svg')
                    .attr('width', svg_Width)
                    .attr('height', svg_Height);

        //NO g Translate used!!!!!!!!!!!

        //Add group for shapes
        //gData = svg.append('g')
        //        .attr("transform", "translate(0, " + svg_Height + ")");

        console.log("svg_Width = " + svg_Width);
        console.log("svg_Height = " + svg_Height);
        console.log("No g translate!!!!  ");

    }

    function build_X_ScalingFunction() {
        console.log("%cbuild_X_ScalingFunction function called!", "color:DarkGreen; font-weight: bold");

        var leftMargin = 80;
        var rightMargin = 60;

        //Set actual min and max for x values we will use (may be different from the data!)
        chosenMinimum_X_Value = d3.min(ax);
        chosenMaximum_X_Value = d3.max(ax);

        //Build the x scaling function
        x = d3.scale.linear()
             .domain([chosenMinimum_X_Value, chosenMaximum_X_Value])
             .range([leftMargin, svg_Width - rightMargin]);

        console.log("chosenMinimum_X_Value = " + chosenMinimum_X_Value);
        console.log("chosenMaximum_X_Value = " + chosenMaximum_X_Value);
        //console.log("xLowLim = " + xLowLim);
        //console.log("xUpLim = " + xUpLim);
        console.log("%cx.domain() = " + x.domain(), 'color:red; font-weight: bold');
        console.log("svg_Width = ", svg_Width);
        console.log("leftMargin = " + leftMargin);
        console.log("rightMargin = " + rightMargin);
        console.log("%cx.range() = " + x.range(), 'color:red; font-weight: bold');
        console.log("  ");
    }

    function build_Y_ScalingFunction() {
        console.log("%cbuild_Y_ScalingFunction function called!", "color:DarkGreen; font-weight: bold");

        var bottomMargin = 80;
        var topMargin = 50;

        //Set actual min and max for y values we will use (may be different from the data!)
        chosenMinimum_Y_Value = 60;
        chosenMaximum_Y_Value = 160;
        //chosenMinimum_Y_Value = d3.min(ay);
        //chosenMaximum_Y_Value = d3.max(ay);

        //----------------------------------------------
        //NOTE:  Reversed range min and max values!!!!
        //----------------------------------------------
        y = d3.scale.linear()
                .domain([chosenMinimum_Y_Value, chosenMaximum_Y_Value])
                .range([svg_Height - bottomMargin, 0 + topMargin]); //REVERSED!!


        //y = d3.scale.linear()
        //        .domain([chosenMinimum_Y_Value, chosenMaximum_Y_Value])
        //        .range([0 + bottomMargin, svg_Height - topMargin]);

        //console.log('%cdata', 'color:blue;', data);
        console.log("ay: ", ay);
        console.log("chosenMinimum_Y_Value = " + chosenMinimum_Y_Value);
        console.log("chosenMaximum_Y_Value = " + chosenMaximum_Y_Value);
        console.log("%cy.domain() = " + y.domain(), 'color:red; font-weight: bold');
        console.log("svg_Height = ", svg_Height);
        console.log("bottomMargin = " + bottomMargin);
        console.log("topMargin = " + topMargin);
        console.log("%cy.range() = " + y.range() + "    NOTE:  REVERSED RANGE VALUES!!!", 'color:red; font-weight: bold');
        console.log("  ");
    }

    function display_X_Axis() {
        console.log("%cdisplay_X_Axis function called!", "color:DarkGreen; font-weight: bold");


        //Build X axis with .axis()
        var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")  //"top"
                    .ticks(10);

        //Display X axis
        //var translateFromBottom = 350;
        var y_PositionOf_X_Axis = y(chosenMinimum_Y_Value);

        svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0, " + y_PositionOf_X_Axis + ")")
            .call(xAxis);

        console.log("svg_Height = ", svg_Height);
        console.log("y(chosenMinimum_Y_Value) = " + y(chosenMinimum_Y_Value));
        console.log("y_PositionOf_X_Axis = " + y_PositionOf_X_Axis);
        console.log("  ");

    }

    function display_Y_Axis() {
        console.log("%cdisplay_Y_Axis function called!", "color:DarkGreen; font-weight: bold");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);

        var x_PositionOf_Y_Axis = x(chosenMinimum_X_Value);

        //Display Y axis
        svg.append("g")
         .attr("class", "yAxis")
         .attr("transform", "translate(" + x_PositionOf_Y_Axis + ",0)")
         .call(yAxis);

        console.log("svg_Width = ", svg_Width);
        console.log("x(chosenMinimum_X_Value) = " + x(chosenMinimum_X_Value));
        console.log("x_PositionOf_Y_Axis = " + x_PositionOf_Y_Axis);
        console.log(" ");
    }

    function displayLine() {
        console.log("%cdisplayLine function called!", "color:DarkGreen; font-weight: bold");

        var svg = d3.select("svg");

        //-------------------------------------------
        //NEW STUFF for Filled Area!!
        //Function for drawing area
        var area = d3.svg.area()
                     .x(function (d, i) {
                         return x(ax[i]);
                     })
                    .y0(y(chosenMinimum_Y_Value))
                     .y1(function (d, i) {
                         return y(ay[i]);
                     });
        //g.append("path").attr("d", area(data));
        svg.append("path")
                .datum(data)                            //Why datum and not data????
                .attr("class", "filledArea")
                .attr("d", area);
        //-------------------------------------------

        var line = d3.svg.line()
                     .x(function (d, i) {

                         console.log("i=" + i + "   ax[i]=" + ax[i] + "   x(ax[i])=" + x(ax[i]));
                         return x(ax[i]);
                     })
                     .y(function (d, i) {
                         return y(ay[i]);          //NO NEGATIVE VALUE!!
                     });


        // draw the line of data points
        //var g = d3.select("g");
        svg.append("path").attr("d", line(data))
                            .attr("class", "dataLine");

        //Display dots at data points on line
        svg.selectAll(".dot")
           .data(data)
           .enter().append("circle")
           .attr("class", "dot")
           .attr("r", 5)
           .attr("cx", function (d, i) {
               return x(ax[i]);
               //return x(i);
           })
           .attr("cy", function (d, i) {
               return y(ay[i]);            //NO NEGATIVE VALUE!!
               //return -y(ay[i]);
           });

    }

    function displayHorizontalGridLines() {
        console.log("%cdisplayHorizontalGridLines function called!", "color:DarkGreen; font-weight: bold");

        var startOfHorizontalGridLines = x(chosenMinimum_X_Value);
        var endOfHorizontalGridLines = x(chosenMaximum_X_Value);
        var lengthOfHorizontalGridLines = endOfHorizontalGridLines - startOfHorizontalGridLines;

        //Display horizontal y grid lines
        var yGrid = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(20)
                        .tickSize(-lengthOfHorizontalGridLines, 0, 0)
                        .tickFormat("");

        svg.append("g")
              .attr("class", "horizontalGridLines")
            .attr("transform", "translate(" + startOfHorizontalGridLines + ", 0)")
                  .call(yGrid);

        console.log("x(chosenMinimum_X_Value) = " + x(chosenMinimum_X_Value));
        console.log("startOfHorizontalGridLines = " + startOfHorizontalGridLines);
        console.log("chosenMaximum_X_Value = " + chosenMaximum_X_Value);
        console.log("x(chosenMaximum_X_Value) = " + x(chosenMaximum_X_Value));
        console.log("lengthOfHorizontalGridLines = " + lengthOfHorizontalGridLines);
        console.log("  ");
    }
    //===============================================
    // END PRIVATE FUNCTIONS
    //================================================


    return {

        drawBarChart: loadTheBarChart
    }


    })(); //End of Module