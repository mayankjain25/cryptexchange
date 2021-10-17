import React from 'react'
import millify from 'millify'
import {Typography,Row,Col,Statistic} from 'antd'
import {Link} from 'react-router-dom'
import { Spin } from 'antd'
import '../styles/Homepage.css'

import {useGetCryptosQuery} from '../services/cryptoApi'
import { Cryptocurrencies,News } from '.'
const {Title} = Typography;

const Homepage = () => {

    const {data,isFetching} = useGetCryptosQuery(10)
    console.log(data)

    const globalStats=data?.data?.stats

    if(isFetching) return <div className="loader" style={{textAlign: 'center'}}>
        <Spin />
        </div>

    return (
        <div style={{padding:"20px"}}>
            <Title level={2} className="heading">

                Global Crypto Stats

            </Title>

            <Row>
                <Col className="font-open-sans" span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}></Statistic></Col>
                <Col className="font-open-sans" span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}></Statistic></Col>
                <Col className="font-open-sans" span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}></Statistic></Col>
                <Col className="font-open-sans" span={12}><Statistic title="Total 24 hr Volume" value={millify(globalStats.total24hVolume)}></Statistic></Col>
                <Col className="font-open-sans" span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}></Statistic></Col>
            </Row>

            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptocurrencies</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified heading=""/>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified/>
        </div>
    )
}

export default Homepage
