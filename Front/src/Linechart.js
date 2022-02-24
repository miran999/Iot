import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {
  const [chart, setChart] = useState([])
  const [change, setChange] = useState(0);
  const [toggle, settoggle] = useState(false);
  const [text, setText] = useState("Show Humidty");
  const [title, setTitle] = useState("Temperature");
  var Url = "https://run.mocky.io/v3/49709e32-1be8-442e-b7ff-59f481de8638";

  const toggleButton = () =>
  {
    settoggle(!toggle);
    setText(toggle? "Show Humidty" : "Show Temperature")
    setTitle(toggle? "Temperature " : "Humidty")
    
  };

  // const ledButton = () => 
  // { return(
  //   <Text>Alarm</Text>
  // )
  // }

  var ampdata;

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch( Url, {
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.temp);
              ampdata = toggle? json.temp : json.pressure;
              setChart(ampdata)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [    setInterval(() => 
    {
        const state = () => 
        {
          setChange(change => change + 1)
        }
    }, 2000)])


  console.log("chart", chart);

  var data = {
    labels: [1,2,3,4,5,6],
    datasets: [{
      //label: `${chart?.coins?.length} Coins Available`,
      data: chart.map(x => x),
      
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    plugins:{legend:{display:false}},
    layout:{padding: {top:100}},
    maintainAspectRatio: false,
    scales: {
        y:{
            
            ticks : {
                beginAtzero : true,
            },
            title:{
                display:true,
                text:title,
                font:{
                size:25 
                }
         }},
        x:{
            ticks : {
                beginAtzero : true,
            },
            title:{
                display:true,
                text:'Time',
                font:{
                size:25
                  
                }
        }}

    },
    ticks : {
        beginAtzero : true,
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
        <button className='button1' onClick={toggleButton} >{text}</button>
        <button className='button2'  >Alarm</button>
      <div>
      <Line
        data={data}
        height={400}
        width = {2000}
        padding-top= {50}
        options={options}
      />
      </div>
    </div>
  )
}

export default LineChart