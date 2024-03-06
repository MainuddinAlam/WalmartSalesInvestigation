/**
 * Author: Mainuddin Alam Irteja
 * A#: A00446752
 *
 * The Javascript file for Assignment 5.
 *
 * https://d3-graph-gallery.com/graph/barplot_basic.html
 * The link helped making the bar charts with d3. Specifically it helped
 * making the axis of the bar charts and plotting the bars on top
 * of the axis. The functions, displayChart1(data) and displayChart3(data)
 * required helps from the link.
 */

//global variables for Assignment 5
let globalData;
let pieChartData;

//Activating jQuery
$("body").ready(function () {
  // Reading the walmart-sales-dataset-of-45stores.csv file and displaying the information
  d3.csv("walmart-sales-dataset-of-45stores.csv").then(function (data) {
    //set globalData and pieChartData to data
    globalData = data;
    pieChartData = data;
    //display chart selector
    displayChartSelector();
    //display the weekly dates dropdown
    displayWeeklyDatesDropdown(data);
    //display the sort radio buttons
    displaySorts();
    //initially filter the data with only information from Store 1
    let filteredData = filteredDate(data, "05-02-2010");
    //display the chart
    displayChart1(filteredData);
    //set the global data to the filteredData
    globalData = filteredData;
  });
});

/**
 * Function to display radio buttons for the different Charts.
 */
function displayChartSelector() {
  //Making a fieldset for our chart radio buttons
  let chart = d3.select("#chartField").append("fieldset");
  //Making the legend of the radio buttons
  chart.append("legend").html("Charts");
  //Making the Chart 1 radio button
  chart
    .append("input")
    .attr("type", "radio")
    .attr("name", "chart")
    .attr("value", "chart1Radio")
    .attr("checked", true)
    .attr("id", "chart1Radio");
  chart.append("label").attr("for", "chart1Radio").html("Chart 1");
  //Making the Chart 2 radio button
  chart
    .append("input")
    .attr("type", "radio")
    .attr("name", "chart")
    .attr("value", "chart2Radio")
    .attr("id", "chart2Radio");
  chart.append("label").attr("for", "chart2Radio").html("Chart 2");
  //Making the Chart 3 radio button
  chart
    .append("input")
    .attr("type", "radio")
    .attr("name", "chart")
    .attr("value", "chart3Radio")
    .attr("id", "chart3Radio");
  chart.append("label").attr("for", "chart3Radio").html("Chart 3");

  // detects if radio button is changed
  // if radio button is checked, checkChart() is called
  $("input:radio[name=chart]").change(() => {
    checkChart();
  });
}

/**
 * Function to check which Chart radio button was checked.
 */
function checkChart() {
  //display the chart based on the radio button being checked.
  if ($("#chart1Radio").is(":checked")) {
    displayChart1(globalData);
  } else if ($("#chart2Radio").is(":checked")) {
    displayChart2();
  } else {
    displayChart3(globalData);
  }
}

/**
 * Function to make the radio buttons for Sorting the data
 */
function displaySorts() {
  //Making the fieldset for the chart sorts
  let chartSort = d3.select("#sortCharts").append("fieldset");
  //Making the radio button to sort Store numbers in ascending order
  chartSort
    .append("input")
    .attr("type", "radio")
    .attr("name", "Sorting")
    .attr("value", "sortStore")
    .attr("id", "sortStore")
    .attr("checked", true);
  chartSort.append("label").attr("for", "sortStore").html("Store Number");
  //Making the radio button to sort sales in ascending order
  chartSort
    .append("input")
    .attr("type", "radio")
    .attr("name", "Sorting")
    .attr("value", "sortSales")
    .attr("id", "sortSales");
  chartSort.append("label").attr("for", "sortSales").html("Sales");
  //Making the radio button to sort by CPI in ascending order
  chartSort
    .append("input")
    .attr("type", "radio")
    .attr("name", "Sorting")
    .attr("value", "sortCPI")
    .attr("id", "sortCPI");
  chartSort.append("label").attr("for", "sortCPI").html("Consumer Price Index");
  //Making the radio button to sort by Temperature in ascending order
  chartSort
    .append("input")
    .attr("type", "radio")
    .attr("name", "Sorting")
    .attr("value", "sortTemperature")
    .attr("id", "sortTemperature");
  chartSort.append("label").attr("for", "sortTemperature").html("Temperature");

  // detects if radio button is changed
  // if radio is checked, checkChart() is called
  $("input:radio[name=Sorting]").change(() => {
    checkChart();
  });
}

/**
 * Function to sort the data based on the sort being checked.
 *
 * @param {*} data the data to be sorted
 * @returns the sorted data based on the sort radio button being checked
 */
function sortData(data) {
  let sortedData = data.sort((a, b) => {
    //sort bar charts based on the radio button being checked
    if ($("#sortStore").is(":checked")) {
      return a.Store - b.Store;
    } else if ($("#sortSales").is(":checked")) {
      return a.Weekly_Sales - b.Weekly_Sales;
    } else if ($("#sortCPI").is(":checked")) {
      return a.CPI - b.CPI;
    } else if ($("#sortTemperature").is(":checked")) {
      return a.Temperature - b.Temperature;
    } else {
      return null;
    }
  });
  //set the globalData data to sortedData
  globalData = sortedData;
  return sortedData;
}

/**
 * Function to display the weekly dates dropdown to filter the dates.
 *
 * @param {*} data the data with the dates
 */
function displayWeeklyDatesDropdown(data) {
  //label the weekly dates selection
  $("#selectDates").append("<label>Weekly dates: </label>");
  //create the weekly dates selection
  let datesDropdown = $("<select>")
    .attr("id", "datesDropDown")
    .change(() => {
      let filterDate = filteredDate(
        data,
        $("#datesDropDown option:selected").val()
      );
      //set the globalData variable to filterDate
      globalData = filterDate;
      //check which chart is checked
      checkChart();
    });

  //get all the data from the dates column
  let datesColumn = data.map(function (d) {
    return d.Date;
  });
  //get the unique dates
  let uniqueDate = getUniqueDatas(datesColumn);

  //show the weekly dates dropdown
  $("#selectDates").append(datesDropdown);

  //add the date options to the weekly dates dropdown
  uniqueDate.forEach((v) => {
    datesDropdown.append("<option value = '" + v + "'>" + v + "</option>");
  });
}

/**
 * Function to get unique datas from a data set.
 *
 * @param {*} data The original data set
 * @returns Returns the unique data set
 */
function getUniqueDatas(data) {
  //returns true when datas are unique
  let unique = data.filter((v, i) => {
    return data.indexOf(v) == i;
  });
  return unique;
}

/**
 * Function to filter store numbers.
 *
 * @param {*} data The dataset to be filtered
 * @param {*} key The store to be filtered
 * @returns Returns the datas based on the store number
 */
function filterStores(data, key) {
  //filter the data based on the store number and return it
  let filtered = data.filter((v) => {
    return v.Store == key;
  });
  return filtered;
}

/**
 * Function to filter the weekly dates.
 *
 * @param {*} data The dataset to be filtered
 * @param {*} key The date to be filtered
 * @returns Returns the datas based on the date
 */
function filteredDate(data, key) {
  //filter the data based on the date and return it
  let filtered = data.filter((v) => {
    return v.Date == key;
  });
  return filtered;
}

/**
 * Function to filter the Holiday Flag. Holiday Flags
 * can be 1 or 0.
 *
 * @param {*} data The dataset to be filtered
 * @param {*} key The Holiday Flag being filtered
 * @returns Returns the datas based on the Holiday Flag
 */
function filterHolidayFlag(data, key) {
  //filter based on the holiday flag and return it
  let filtered = data.filter((v) => {
    return v.Holiday_Flag == key;
  });
  return filtered;
}

/**
 * Function to display Chart 1. Chart 1 is a bar graph with
 * Sales on the y-axis and Store number on the x-axis.
 *
 * https://d3-graph-gallery.com/graph/barplot_basic.html
 * The link helped making the bar charts with d3. Specifically it helped
 * making the axis of the bar charts and plotting the bars on top
 * of the axis.
 *
 *
 * @param {*} data The data needed to make Chart 1.
 */
function displayChart1(data) {
  //empty the svg
  $("#svgTag").empty();
  //get the sorted data
  let sortedData = sortData(data);
  //set globalData to the sortedData
  globalData = sortedData;
  //get the weekly date
  let storeDate = sortedData[0].Date;
  //change the title based on the weekly date
  d3.select("#title").html(
    `Weekly Sales of 45 Walmart Stores during ${storeDate}`
  );
  //set properties to the svg
  let svg = d3
    .select("#svgTag")
    .attr("width", 1600)
    .attr("height", 1000)
    .append("g")
    .attr("transform", "translate(200,50)");

  // display the x-axis
  let scaleX = d3
    .scaleBand()
    .range([0, 1100])
    .domain(
      sortedData.map(function (d) {
        return d.Store;
      })
    )
    .padding(0.15);
  svg
    .append("g")
    .attr("transform", "translate(0,650)")
    .call(d3.axisBottom(scaleX))
    .selectAll("text")
    .attr("transform", "translate(3,0)")
    .style("text-anchor", "end");
  // label the x-axis
  d3.select("#svgTag")
    .append("text")
    .attr(
      "transform",
      `translate(${$(window).width() * 0.5},${$(window).height() * 1.07})`
    )
    .attr("fill", "black")
    .text("Store Number")
    .style("font-size", "20px");
  // get the highest sale value
  let maxY = d3.max(sortedData, function (d) {
    return d.Weekly_Sales;
  });
  // display the y-axis
  let scaleY = d3
    .scaleLinear()
    .domain([0, maxY * 3])
    .range([650, 0]);
  svg.append("g").call(
    d3.axisLeft(scaleY).tickFormat(function (d) {
      return "$ " + d;
    })
  );
  // label the y-axis
  d3.select("#svgTag")
    .append("text")
    .attr(
      "transform",
      `translate(${$(window).width() * 0.07},${
        $(window).height() * 0.5
      }) rotate(-90)`
    )
    .attr("fill", "black")
    .text("Sales")
    .style("font-size", "20px");
  // Add the bars to the bar chart
  svg
    .selectAll("rect")
    .data(sortedData)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return scaleX(d.Store);
    })
    .attr("y", function (d) {
      return scaleY(d.Weekly_Sales);
    })
    .attr("width", scaleX.bandwidth())
    .attr("height", function (d) {
      return 650 - scaleY(d.Weekly_Sales);
    })
    .style("opacity", 1)
    .attr("fill", "brown")
    .on("mouseover", (event, sortedData) => {
      //display the floater box during mouseover
      appearBox(event, sortedData);
      //change the opacity of the bar being hovered to 0.5 during mouseover
      d3.select(event.target).style("opacity", 0.5);
    })
    .on("mouseout", (event, sortedData) => {
      //hide the floater box during mouseout
      d3.select("#floatBox").html("");
      //reset the opacity of the bar being hovered to 1 during mouseout
      d3.select(event.target).style("opacity", 1);
    });
}

/**
 * Function to display Chart 2. Chart 2 shows the mean weekly sales
 * between weeks which had holidays compared to weeks which did not have
 * holidays. The whole Walmart dataset is used to make this pie chart.
 */
function displayChart2() {
  //empty the svg
  $("#svgTag").empty();
  //get the data of the weeks which did not have holidays
  let regularSalesData = filterHolidayFlag(pieChartData, "0");
  //get the data of the weeks which did have holidays
  let holidaySalesData = filterHolidayFlag(pieChartData, "1");
  //intialize counter to track regularSales
  let regularSales = 0;
  //get the total sales of weeks which did not have holidays
  regularSalesData.forEach((value, index) => {
    regularSales += Number(value.Weekly_Sales);
  });
  //calculate the mean weekly sales of weeks which did not have holidays
  let meanRegularSales = regularSales / regularSalesData.length;
  //initialize counter to track holidaySales
  let holidaySales = 0;
  //get the total sales of weeks which had holidays
  holidaySalesData.forEach((value, index) => {
    holidaySales += Number(value.Weekly_Sales);
  });
  //calculate the mean weekly sales of weeks which had holidays
  let meanHolidaySales = holidaySales / holidaySalesData.length;
  //save the mean weekly sales in a JSON format
  let salesData = [
    { salesType: "Mean Regular Sales", amount: meanRegularSales },
    { salesType: "Mean Holiday Sales", amount: meanHolidaySales },
  ];
  //set the title of the Pie chart
  d3.select("#title").html(
    "Mean weekly sales of Holiday weeks and Regular weeks"
  );
  //properties of the svg
  let svg = d3.select("#svgTag").attr("width", "1500").attr("height", "1000");

  //making a pie chart variable
  let pie = d3
    .pie()
    .value((d) => {
      return d.amount;
    })
    .sort((a, b) => {
      return null;
    });
  //making the arc of the pie chart
  let arc = d3.arc().innerRadius(100).outerRadius(300);
  //making groups for the arcs of the pie chart
  let group = svg
    .selectAll("g")
    .data(pie(salesData))
    .enter()
    .append("g")
    .attr("transform", "translate(600,300)")
    .on("mouseover", (event, d) => {
      //change the properties of the arc of the pie chart during mouseover
      d3.select(event.target)
        .style("opacity", 0.5)
        .style("stroke-width", "1px")
        .style("stroke", "black");
      //display the label during mouseover
      d3.select("#label_" + d.index).style("opacity", 1.0);
    })
    .on("mouseout", (event, d) => {
      //reset the properties of the arc of the pie chart during mouseout
      d3.select(event.target).style("opacity", 1.0).style("stroke", "none");
      //hide the label during mouseout
      d3.select("#label_" + d.index).style("opacity", 0);
    });

  //array of colors for the pie chart
  let color = ["blue", "green"];

  //display the paths for the arcs of the pie chart
  group
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => {
      return color[i];
    });

  //labels for the pie chart
  group
    .append("text")
    .style("pointer-events", "none")
    .text((d) => {
      return d.data.salesType + ": " + d.data.amount.toFixed(2);
    })
    .attr("transform", (d) => {
      return "translate(" + arc.centroid(d) + ")";
    })
    .style("font-size", "20px")
    .attr("id", (d, i) => {
      console.log("label_" + d.index);
      return "label_" + d.index;
    })
    .style("opacity", 0);
}

/**
 * Function to display Chart 3. Chart 3 is a bar graph with Consumer
 * Price Index (CPI) on the y-axis and Store number on the x-axis.
 *
 * https://d3-graph-gallery.com/graph/barplot_basic.html
 * The link helped making the bar charts with d3. Specifically it helped
 * making the axis of the bar charts and plotting the bars on top
 * of the axis.
 *
 * @param {*} data The data needed to make Chart 3.
 */
function displayChart3(data) {
  //empty the svg
  $("#svgTag").empty();
  //get the sorted data
  let sortedData = sortData(data);
  //set globalData to the sortedData
  globalData = sortedData;
  //get the weekly date
  let storeDate = sortedData[0].Date;
  //change the title based on the weekly date
  d3.select("#title").html(
    `Weekly Consumer Price Index (CPI) of Walmart Store ${storeDate}`
  );
  //set properties to the svg
  let svg = d3
    .select("#svgTag")
    .attr("width", 1600)
    .attr("height", 1000)
    .append("g")
    .attr("transform", "translate(200,50)");
  //display the x-axis
  let scaleX = d3
    .scaleBand()
    .range([0, 1100])
    .domain(
      sortedData.map(function (d) {
        return d.Store;
      })
    )
    .padding(0.15);
  svg
    .append("g")
    .attr("transform", "translate(0,650)")
    .call(d3.axisBottom(scaleX))
    .selectAll("text")
    .attr("transform", "translate(3,0)")
    .style("text-anchor", "end");
  // label the x-axis
  d3.select("#svgTag")
    .append("text")
    .attr(
      "transform",
      `translate(${$(window).width() * 0.5},${$(window).height() * 1.07})`
    )
    .attr("fill", "black")
    .text("Store Number")
    .style("font-size", "20px");
  //get max value of Consumer Price Index (CPI)
  let maxY = d3.max(sortedData, function (d) {
    return d.CPI;
  });
  // display the y-axis
  let scaleY = d3
    .scaleLinear()
    .domain([0, maxY * 1.3])
    .range([650, 0]);
  svg.append("g").call(
    d3.axisLeft(scaleY).tickFormat(function (d) {
      return d;
    })
  );

  // label the y-axis
  d3.select("#svgTag")
    .append("text")
    .attr(
      "transform",
      `translate(${$(window).width() * 0.08},${
        $(window).height() * 0.6
      }) rotate(-90)`
    )
    .attr("fill", "black")
    .text("Consumer Price Index (CPI)")
    .style("font-size", "20px");
  // Add the bars to the bar chart
  svg
    .selectAll("rect")
    .data(sortedData)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return scaleX(d.Store);
    })
    .attr("y", function (d) {
      return scaleY(d.CPI);
    })
    .attr("width", scaleX.bandwidth())
    .attr("height", function (d) {
      return 650 - scaleY(d.CPI);
    })
    .style("opacity", 1)
    .attr("fill", "brown")
    .on("mouseover", (event, sortedData) => {
      //display the floater box during mouseover
      appearBox(event, sortedData);
      //change the opacity of the bar being hovered to 0.5 during mouseover
      d3.select(event.target).style("opacity", 0.5);
    })
    .on("mouseout", (event, sortedData) => {
      //hide the floater box during mouseout
      d3.select("#floatBox").html("");
      //reset the opacity of the bar being hovered to 1 during mouseout
      d3.select(event.target).style("opacity", 1);
    });
}

/**
 * Function to display the floater for the bar graphs
 *
 * @param {*} event the rectangle being hovered
 * @param {*} data the datas of the rectangle being hovered
 */
function appearBox(event, data) {
  d3.select("#floatBox")
    .style("left", event.clientX + "px")
    .style("top", event.clientY + "px")
    .style("pointer-events", "none")
    .html(
      `Sales:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${
        data.Weekly_Sales
      } <br>Store Number:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${
        data.Store
      }
       <br> Consumer Price Index:&nbsp&nbsp${Number(data.CPI).toFixed(
         2
       )}<br>Temperature:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${
        data.Temperature
      }<br>Date:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${
        data.Date
      }`
    );
}
