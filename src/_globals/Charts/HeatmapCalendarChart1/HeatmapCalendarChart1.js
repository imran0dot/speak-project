import React from 'react';
import * as d3 from 'd3';
import './HeatmapCalendarChart1.scss';

class HeatmapCalendarChart extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		this.state = {
			data: this.props.data? this.props.data: [],
			currentTime: this.props.currentTime,
      selectedDate: this.props.selectedDate,
			theme: this.props.theme ? this.props.theme : ['#bde0fe', '#2698f9', '#71bcfd', '#f1f8fe']
		};
	}

	componentWillReceiveProps(nextProps) {
      // You don't have to do this check first, but it can help prevent an unneeded render
      //console.log("OBJ - nextProps.data", nextProps.data);
      //console.log("OBJ - this.state.data", this.state.data);
      //console.log("STRN - nextProps.data", JSON.stringify(nextProps.data));
      //console.log("STRN - this.state.data", JSON.stringify(this.state.data));

			//console.log("OBJ - nextProps.currentTime", nextProps.currentTime);
			//console.log("OBJ - this.state.currentTime", this.state.currentTime);
			
			let that = this;


      if (
        JSON.stringify(nextProps.data) !== JSON.stringify(this.state.data) ||
      	JSON.stringify(nextProps.selectedDate) !== JSON.stringify(this.state.selectedDate) ||
        JSON.stringify(nextProps.currentTime) !== JSON.stringify(this.state.currentTime)) {
      //if (nextProps.data !== this.state.data) {
        //console.log("PROPS HAVE CHANGED FOR CHART");        
        this.setState({ data: nextProps.data, currentTime: nextProps.currentTime, selectedDate: nextProps.selectedDate });
        
				setTimeout(function(){
					that.buildChart();
				}, 1);
        
      }
    }

	componentDidMount() {
		this.buildChart();
	}

	buildChart(){
		var $this = this.myRef.current;

    var selectedColor = "#f4ede7";
    var hoverColor = "blue";
    var heatColor = "orange";

		d3.select($this)
			.selectAll('svg')
			.remove();

		var data = this.state.data;

    var selectedDate = this.state.selectedDate;
    console.log("selectedDate", selectedDate)

		/*
    var data = [{
        "date": "2023-07-10",
        "value": "211"
      },{
        "date": "2023-07-20",
        "value": "2"
      },
      {
        "date": "2023-07-21",
        "value": "5"
      },
      {
        "date": "2023-07-22",
        "value": "5"
      },
      {
        "date": "2023-07-23",
        "value": "0"
      },
      {
        "date": "2023-07-24",
        "value": "8"
      },
      {
        "date": "2023-07-25",
        "value": "3"
      },
      {
        "date": "2023-07-26",
        "value": "1"
      }
    ]
    */

    var currentTime = this.state.currentTime;
    //console.log("currentTime", currentTime)
    var currentTimeDate = new Date(currentTime);
    //console.log("currentTimeDate", currentTimeDate)

        
		var w = parseInt(this.props.width, 10),
			h = parseInt(this.props.height, 10);

		var color = d3.scaleOrdinal().range(this.state.theme);


		var margin = {top: 20, right: 15, bottom: 30, left: 20},
		    width = w - margin.left - margin.right,
		    height = h - margin.top - margin.bottom;				


		var svg = d3.select($this)
			.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
			.attr('class', 'heatmapcalendarholder')
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var cellSize = 35; // cell size
      var week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      var day = d3.timeFormat("%w"),
        week = d3.timeFormat("%U"),
        format = d3.timeFormat("%Y%m%d");
      var parseDate = d3.timeFormat("%Y%m%d").parse;

      //console.log("week", week(new Date("01-01-2023")))
      //console.log("week", week(new Date("07-01-2023")))

      //console.log("week", weekOfTheMonth(new Date("01-01-2023")))
      //console.log("week", weekOfTheMonth(new Date("07-01-2023")))
     

      //var color = d3.scaleLinear().range(["white", '#002b53'])
      //  .domain([0, 1])

        /*
      var svg = d3.select("body").append("svg")
        .attr("height", height)
        .attr("width", width)
        .attr("class", "calendar")
        .append("g")
        .attr("transform", "translate(10, 10)");
        */

      var leg = svg.append("g")
        .attr("class", "leg")
        .attr("transform", "translate(10, 10)");

      var chart = svg.append("g")
        .attr("class", "chart")
        .attr("transform", "translate(20, 20)");
      //
      const d = new Date();
      let name = month[d.getMonth()];
      //console.log("name", name);

      const daysInMonth = (year, month) => new Date(year, month, 0).getDate();


      let pickedYear = currentTimeDate.getFullYear().toString();//"2023";
      let pickedMonth = (currentTimeDate.getMonth()+1).toString()//"07"; //July
      //console.log("pickedYear", pickedYear)
			//console.log("pickedMonth", pickedMonth)

      let startDate = pickedYear+"-0"+pickedMonth+"-1";
      let endDate = pickedYear+"-0"+pickedMonth+"-"+daysInMonth(pickedYear, pickedMonth);

      //console.log("endDate", endDate);

     	//console.log("daysInMonth", daysInMonth(pickedYear, pickedMonth));

      //let dz = 1;
      //console.log("xx", d3.timeDays(new Date(pickedYear+"-"+pickedMonth+"-1"), new Date(pickedYear+"-"+pickedMonth+"-31")) )

      //console.log("ccccc",  new Date(pickedYear+"-"+pickedMonth+"-"+daysInMonth)  )

		 function weekOfTheMonth(date) {
			  //let weekN = week(date);
			  //console.log("date--", date)
			  //console.log("weekN", weekN)

			  const startWeekDayIndex = 0; // 1 MonthDay 0 Sundays
			  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
			  const firstDay = firstDate.getDay();

			  let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
			  //console.log("weekNumber", weekNumber)

			  if (startWeekDayIndex === 1) {
			    if (date.getDay() === 0 && date.getDate() > 1) {
			      weekNumber -= 1;
			    }

			    if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
			      weekNumber += 1;
			    }
			  }
			  return weekNumber;
		}


      function formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        return [year, month, day].join('-');
      }

      function opacityCal(val) {
        var opacity = 0.1;

        opacity = opacity * val;

        //if val is 0 - consider it a spare day no change in opacity
        if (val === 0 || val >= 10) {
          opacity = 1;
        }

        return opacity;
      }

      //
      let that = this;
      //var padding = 5;
      //console.log("TIMEINDAYS", d3.timeDays(new Date(startDate), new Date(endDate)))


      var selectedColor = "#d9e3a6";//green
      var hoverColor = "#f4ede7";//apple
      var heatColor = "#ef7e60";//apricot
      var defaultColor = "#f2f2f2";//light grey


      var rect = chart.selectAll(".day")
        .data(function(d) {
          return d3.timeDays(new Date(startDate), new Date(endDate));
        })
        .enter()
        .append("rect")
        .attr("class", function(d) {
          return "day " + "date" + formatDate(d);
        })
        .attr("data-date", function(d) {
          return formatDate(d);
        })
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) {
        	//console.log("d", d)
          return day(d) * cellSize;
        })
        .attr("y", function(d) {
        	//console.log("d", d)
          return weekOfTheMonth(d) * cellSize;
        })
        .attr("fill", defaultColor)
        .attr("stroke", 'white')
        .attr("stroke-width", '7')
        .on("mouseover", function(event) {
          d3.select(event.currentTarget)
            .style("fill", hoverColor);
        })
        .on("mouseout", function(event) {
          d3.select(event.currentTarget)
            .style("fill", defaultColor);
        })
        .on("click", function(event){
            let date = d3.select(event.currentTarget).attr("data-date");
            //console.log("date", date)
            //return date;
            that.props.pickedDate(date);
        })
        .datum(format);

      var legend = leg.selectAll(".legend")
        .data(week_days)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
          return "translate(" + (((i + 1) * 35) + 5) + ",0)";
        });

      legend.append("text")
        .attr("class", function(d, i) {
          return week_days[i]
        })
        .style("text-anchor", "end")
        .attr("dy", "-.25em")
        .text(function(d, i) {
          return week_days[i]
        });


      for (let i = 0; i < data.length; i++) {
        chart.selectAll(".date" + formatDate(data[i].date))
          .attr("fill", heatColor)
          .attr("opacity", opacityCal(parseInt(data[i].value)))
          .on("mouseover", function(event) {
            d3.select(event.currentTarget)
              .style("fill", hoverColor)
              .attr("opacity", 1)
          })
          .on("mouseout", function(event) {
            d3.select(event.currentTarget)
              .style("fill", heatColor)
              .attr("opacity", opacityCal(parseInt(data[i].value)))
          })
      }

        chart.selectAll(".date" + formatDate(selectedDate))
          .attr("fill", selectedColor)
          .attr("opacity", 1)
          .on("mouseover", function(event) {
            d3.select(event.currentTarget)
              .style("fill", selectedColor)
              .attr("opacity", 1)
          })
          .on("mouseout", function(event) {
            d3.select(event.currentTarget)
              .style("fill", selectedColor)
              .attr("opacity", 1)
          })


	}

	render() {
		return <div ref={this.myRef} className="HeatmapCalendarChart" />;
	}
}
export default HeatmapCalendarChart;
