import React from "react";
import { Line } from "react-chartjs-2";
import { RFtoDateFormatter, DateFormatter } from "./date.js";

const LineChart = (props) => {
  //chart implementation
  const chartData = props.chartData;
  const datesData = [];
  const closeData = [];
  chartData.map((item) => {
    datesData.push(DateFormatter(RFtoDateFormatter(item.timestamp)));
    closeData.push(item.close);
  });

  const state = {
    labels: datesData,
    datasets: [
      {
        label: "Closing Price",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        data: closeData,
      },
    ],
  };
  return (
    <div>
      {datesData.length && closeData.length ? (
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: "Closing Value",
              fontSize: 18,
            },
            legend: {
              display: false,
              position: "right",
            },
            layout: {
              padding: {
                top: 50,
                bottom: 50,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return "$" + value;
                    },
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "($)",
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Day",
                  },
                },
              ],
            },
          }}
        />
      ) : null}
    </div>
  );
};

export default LineChart;
