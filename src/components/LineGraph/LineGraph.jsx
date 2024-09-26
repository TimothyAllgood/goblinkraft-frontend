import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

import "./LineGraph.css";
function LineGraph({ data, options }) {
  const processedData = useMemo(() => {
    const sortedData = [...data].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const uniqueDates = Array.from(
      new Set(sortedData.map((item) => item.createdAt.split("T")[0]))
    );

    const generators = Array.from(
      new Set(sortedData.map((item) => item.generator))
    );

    const total = uniqueDates.map((date) =>
      sortedData.filter(
        (item) =>
          item.createdAt.startsWith(date) && item.generator === "NPC Generator"
      )
    );
    console.log(total);

    return {
      labels: uniqueDates,
      datasets: generators.map((generator) => ({
        label: generator,
        data: uniqueDates.map((date) => {
          const filteredData = sortedData.filter(
            (item) =>
              item.createdAt.startsWith(date) && item.generator === generator
          );
          if (filteredData.length > 0) {
            return filteredData.length;
          } else {
            return 0;
          }
        }),
        fill: false,
        borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`,
        tension: 0.1,
      })),
    };
  }, [data]);

  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Generator Usage Over Time",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM d",
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Usage Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="line-graph">
      <Line data={processedData} options={options || defaultOptions} />
    </div>
  );
}

export default LineGraph;
