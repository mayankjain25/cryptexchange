import React from 'react'
import {Line} from 'react-chartjs-2'
import {Col,Row,Typography} from 'antd'
import millify from 'millify'

const {Title} = Typography

const LineChart = (props) => {

    const coinPrice=[]
    const coinTimestamps=[]

    for(let i=0;i<props.coinHistory?.data?.history?.length;i+=1){
        coinPrice.push(props.coinHistory.data.history[i].price)
        coinTimestamps.push(new Date(props.coinHistory.data.history[i].timestamp).toLocaleDateString())
    }

    const data = {
        labels: coinTimestamps,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };    

    return (
        <div>
            <Row className="chart-header">

                <Title level={2} className="chart-title">{props.coinName} Price Chart</Title>

                <Col className="price-container">
                    <Title level={5} className="price-change">{props.coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current Price: $ {props.currentPrice}</Title>
                </Col>

            </Row>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart
