import "./App.css";
import orchard from "./Json/orchard.json";
import sapling from "./Json/sapling.json";
import sprout from "./Json/sprout.json";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function App() {
  // console.log(orchard, sapling, sprout)
  return (
    <div className="App">
      <Line
        options={{
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
        data={{
          labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
          datasets: [
            {
              data: orchard.slice(0, 9).map((value) => value.supply),
              label: "orchard",
              borderColor: "rgba(255, 92, 130)",
              fill: false,
              lineTension: 0.4,
            },
            {
              data: sapling.slice(0, 9).map((value) => value.supply),
              label: "sapling",
              fill: false,
              borderColor: "rgba(0, 0, 0)",
              lineTension: 0.4,
            },
            {
              data: sprout.slice(0, 9).map((value) => value.supply),
              label: "sprout",
              fill: false,
              borderColor: "green",
              lineTension: 0.4,
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
