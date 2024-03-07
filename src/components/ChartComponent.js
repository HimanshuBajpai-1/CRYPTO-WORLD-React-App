import React from 'react'
import {Line} from 'react-chartjs-2'
import { Chart,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend } from "chart.js";
import { Container } from '@chakra-ui/react';


Chart.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const ChartComponent = ({chartdata,days,currency}) => {
    const prices = [];
    const dates = []
    for(let i=0;i<chartdata.length;i++){
        if(days=='1') dates.push(new Date(chartdata[i][0]).toLocaleTimeString());
        else dates.push(new Date(chartdata[i][0]).toLocaleDateString());
        prices.push(chartdata[i][1]);
    }

    const data = {
        labels:dates,
        datasets:[{
            label:`in ${currency}`,
            data : prices,
            borderColor : "rgb(255,99,132)",
            backgroundColor : "rgb(255,99,132,0.5)"
        }]
    }
    
  return (
    <Container maxW={'container.lg'}>
        <Line options={{responsive:true}} data={data}/>
    </Container>
    
  )
}

export default ChartComponent