import React, { useState, useEffect } from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {Row,Col,Card,Input, Typography} from 'antd'
import {useGetCryptosQuery} from '../services/cryptoApi'
import {Spin} from 'antd'
import {UpOutlined, DownOutlined} from '@ant-design/icons'

const Cryptocurrencies = (props) => {

    const count=props.simplified?10:100
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
    const [cryptos,setCryptos] = useState([])
    console.log(cryptos)
    const [searchTerm,setSearchTerm] = useState('')

    useEffect(()=>{
        const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    },[cryptosList,searchTerm])

    if(isFetching) return <div className="loader" style={{textAlign: 'center'}}><Spin /></div>
    return (
        <div style={{padding:"20px"}}>

            {!props.simplified && <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={(e)=>{setSearchTerm(e.target.value)}} />
            </div>}
            <Typography.Title level={3}>{props.heading}</Typography.Title>
           <Row gutter={[32,32]} className="crypto-card-container">
               {cryptos?.map((currency)=>(
                   <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                       <Link to={`crypto/${currency.id}`}>
                           <Card title={`${currency.rank}. ${currency.name}`} hoverable extra={<img alt="" src={`${currency.iconUrl}`} className="crypto-image" />}>
                                <p>
                                    Price: 
                                    <strong>
                                        <span style={{color:currency.change<0?"red":"green",marginLeft:"7px",fontSize:"1rem"}}>${millify(currency.price)}
                                        </span>
                                    </strong>
                                    <span style={currency.change<0?{color:"red",marginLeft:"10px"}:{color:"green",marginLeft:"10px"}}>
                                        {millify(currency.change)<0? <DownOutlined />:<UpOutlined />}
                                       <span style={{marginLeft:"5px"}}>{millify(currency.change)}%</span> 
                                    </span>
                                </p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                {/* <p>Daily Change: {millify(currency.change)}%</p>     */}
                           </Card>
                       </Link>
                   </Col>
               ))}
           </Row>
        </div>
    )
}

export default Cryptocurrencies
