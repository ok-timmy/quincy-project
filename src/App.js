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

  const dates = [
    "10/31/2016",
    "1/31/2017",
    "4/30/2017",
    "7/31/2017",
    "10/31/2017",
    "1/31/2018",
    "4/30/2018",
    "7/31/2018",
    "10/31/2018",
    "1/31/2019",
    "4/30/2019",
    "7/31/2019",
    "10/31/2019",
    "1/31/2020",
    "4/30/2020",
    "7/31/2020",
    "10/31/2020",
    "1/31/2021",
    "4/30/2021",
    "7/31/2021",
    "10/31/2021",
    "1/31/2022",
    "4/30/2022",
    "7/31/2022",
    "10/31/2022",
    "1/31/2023",
    "4/30/2023",
    "7/31/2023",
    "10/31/2023",
    "1/31/2024",
    "4/30/2024",
  ];

  const formNewArray = () => {
    const newOrchardArray = [];
    const newSproutArray = [];
    const newSaplingArray = [];

    for (let i = 0; i < dates.length; i++) {
      const dateArrayDate = dates[i];

      // console.log(dateArrayDate)
      //Orchard Data
      for (let j = 0; j < orchard.length; j++) {
        const orchardDate = orchard[j];
        if (
          new Date(dateArrayDate).getTime() ===
          new Date(orchardDate.close).getTime()
        ) {
          newOrchardArray.push(orchardDate);
        }
      }
      if (newOrchardArray[i] === undefined) {
        newOrchardArray.push({ supply: 0, close: dates[i] });
      }

      //Sprout Data
      for (let k = 0; k < sprout.length; k++) {
        const sproutDate = sprout[k];
        if (
          new Date(dateArrayDate).getTime() ===
          new Date(sproutDate.close).getTime()
        ) {
          newSproutArray.push(sproutDate);
        }
      }
      if (newSproutArray[i] === undefined) {
        newSproutArray.push({ supply: 0, close: dates[i] });
      }

      // Sapling Data
      for (let l = 0; l < sapling.length; l++) {
        const saplingDate = sapling[l];
        if (
          new Date(dateArrayDate).getTime() ===
          new Date(saplingDate.close).getTime()
        ) {
          newSaplingArray.push(saplingDate);
        }
      }
      if (newSaplingArray[i] === undefined) {
        newSaplingArray.push({ supply: 0, close: dates[i] });
      }


      //Fine tune each array
      //Orchard Array
      for (let p = 0; p < newOrchardArray.length; p++) {
        const element = newOrchardArray[p];

        if(p===0){
          p++;
        } else if(element.supply === 0) {
          if(newOrchardArray[p-1].supply !== 0){
            //Loop over the orchard array again and grab the next available date and update the date at that position
            for (let j = 0; j < orchard.length; j++) {
              const orchardDate = orchard[j];
              if (
                (new Date(newOrchardArray[p].close).getTime()+86400000) ===
                new Date(orchardDate.close).getTime()
              ) {
                newOrchardArray[p] = {supply: orchardDate.supply, close: newOrchardArray[p].close}
              }
            }
          }
        }
        
      }

      //Sprout Array
      for (let p = 0; p < newSproutArray.length; p++) {
        const element = newSproutArray[p];

        if(p===0){
          p++;
        } else if(element.supply === 0) {
          if(newSproutArray[p-1].supply !== 0){
            //Loop over the sapling array again and grab the next available date and update the date at that position
            for (let j = 0; j < sprout.length; j++) {
              const sproutDate = sprout[j];
              if (
                (new Date(newSproutArray[p].close).getTime()+86400000) ===
                new Date(sproutDate.close).getTime()
              ) {
                newSproutArray[p] = {supply: sproutDate.supply, close: newSproutArray[p].close}
              }
            }
          }
        }
        
      }

      //Sapling Array
      for (let p = 0; p < newSaplingArray.length; p++) {
        const element = newSaplingArray[p];

        if(p===0){
          p++;
        } else if(element.supply === 0) {
          if(newSaplingArray[p-1].supply !== 0){
            //Loop over the sapling array again and grab the next available date and update the date at that position
            for (let j = 0; j < sapling.length; j++) {
              const saplingDate = sapling[j];
              if (
                (new Date(newSaplingArray[p].close).getTime()+86400000) ===
                new Date(saplingDate.close).getTime()
              ) {
                newSaplingArray[p] = {supply: saplingDate.supply, close: newSaplingArray[p].close}
              }
            }
          }
        }
        
      }
    }

    return [
      { name: "orchard", data: newOrchardArray },
      { name: "sprout", data: newSproutArray },
      { name: "sapling", data: newSaplingArray },
    ];
  };

  const newArray = formNewArray();

  console.log(newArray);

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
              min: 0,
              max: 1500000,
              beginAtZero: true,
              ticks: {
                stepSize: 3
              }
            },
          }, elements: {
            point:{
              radius: 0
            }
          }
        }}
        data={{
          labels: dates,
          datasets: [
            {
              data: newArray[0].data.map((value) => value.supply),
              label: "orchard",
              borderColor: "rgba(255, 92, 130)",
              borderWidth: 1,
              fill: false,
              lineTension: 0.4,
            },
            {
              data: newArray[2].data.map((value) => value.supply),
              label: "sapling",
              fill: false,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0)",
              lineTension: 0.4,
            },
            {
              data: newArray[1].data.map((value) => value.supply),
              label: "sprout",
              fill: false,
              borderColor: "green",
              borderWidth: 1,
              lineTension: 0.4,
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
