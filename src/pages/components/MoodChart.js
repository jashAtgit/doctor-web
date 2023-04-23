import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"
import { getPatientMoods } from "../services/patient";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function MoodChart({patientId}) {
    const [moodList, setMoodList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getMoodList(patientId){
            const moodList = await getPatientMoods(patientId);
            setMoodList(moodList);
            setIsLoading(false);
        }

        getMoodList(patientId);
    }, [])

    const emotions = ["Depressed",
    "Anxious",
    "Sad",
    "Confused",
    "Happy",
    "Joyful"]
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "History of Patient Mood"
          }
        },
        scales: {
            y:
              {
                ticks: {
                  callback: function(value, index, values) {
                    return emotions[value-1];
                  },
                  min: 0,
                  max: 6,
                  stepSize: 1,
                },
              }
            
        }
    }

    const data = {
    labels: moodList.map((mood) => mood.timeStamp),
    datasets: [
        {
        label: "Mood Values",
        data: moodList.map((mood) => mood.moodValue),
        borderColor: "rgba(113, 145, 247, 1)",
        backgroundColor: "rgba(113, 145, 247, 0.5)",
        pointRadius: 6,
        },
    ]
    }

    if(isLoading){
        return <h1>Loading...</h1>
    }

    return <Line options={options} data={data} />
}
