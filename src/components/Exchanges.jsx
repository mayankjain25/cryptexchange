import React from 'react'
import {Row, Col,Spin,Collapse,Avatar} from 'antd'
import { useGetExchangesQuery } from '../services/cryptoApi'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import '../styles/Exchanges.css'

const {Panel} = Collapse

const Exchanges = () => {

    const {data,isFetching} = useGetExchangesQuery()
    if(isFetching) return <div className="loader"><Spin /></div>
    console.log(data)

    return (
        <div className="exchanges">
            {}
            <Row style={{marginBottom:"25px"}}>
                
                
                <Col style={{textAlign: 'center'}} className="col-heading" span={6}><strong>Exchanges</strong></Col>
                <Col style={{textAlign: 'center'}} className="col-heading" span={6}><strong>24 hr Traded Volume</strong></Col>
                <Col style={{textAlign: 'center'}} className="col-heading" span={6}><strong>Markets</strong></Col>
                <Col style={{textAlign: 'center'}} className="col-heading" span={6}><strong>Change (in %)</strong></Col>
                
            </Row>

            <Collapse bordered={false} defaultActiveKey={['1']}>

                {data?.data?.exchanges.map((exchange,index)=>(
                    <Panel 
                        
                        style={{padding:"5px"}}
                        showArrow={false} 
                        key={exchange.rank} 
                        header=
                        {   <Row>
                                {/* {console.log(`${exchange.iconUrl}`)}  */}
                                <Col span={6}>
                                {<strong>{index+1}</strong>}
                                <Avatar style={{height:"30px",marginLeft:"15px",marginRight:"15px"}} src={exchange.iconUrl} />
                                
                                {<strong>{exchange.name}</strong>}
                                </Col>
                                <Col style={{textAlign: 'center'}} span={6}><h3>{millify(exchange.volume)}</h3></Col>
                                <Col style={{textAlign: 'center'}} span={6}><h3>{millify(exchange.numberOfMarkets)}</h3></Col>
                                <Col style={{textAlign: 'center'}} span={6}><h3>{millify(exchange.marketShare)}</h3></Col>
                            </Row>
                            
                            

                        }>
                            {HTMLReactParser(exchange.description||'')}

                    </Panel>
                ))}
            </Collapse>

        </div>
    )
}

export default Exchanges



