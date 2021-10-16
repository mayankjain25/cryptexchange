import React,{useState} from 'react'
import {Card,Row,Col,Avatar,Select,Typography,Spin} from 'antd'
import moment from 'moment'
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi'
import {useGetCryptosQuery} from '../services/cryptoApi'

const {Title,Text} = Typography
const {Option} = Select

const News = ({simplified}) => {

    
    
    
    const [newsCategory,setNewsCategory] = useState("All cryptocurrencies")
    const {data:cryptoNews} = useGetCryptoNewsQuery({newsCategory,count:simplified?"6":"12"})
    const {data}=useGetCryptosQuery(100)

    const demoImage="https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2FBitcointradingbuysellBTC&psig=AOvVaw2tsVNEb_Nx9KXW7-WOEIjH&ust=1634396995480000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDt0rfZzPMCFQAAAAAdAAAAABAD"

    console.log(cryptoNews)

    if(!cryptoNews?.value) return <div className="loader" style={{textAlign:'center'}}><Spin /></div>
    return (
        <div>
            <Row gutter={[24,24]}>
                {
                    !simplified && (
                        <Col span={24}>
                            <Select
                                showSearch
                                className="show-news"
                                placeholder="Select a Crypto category"
                                optionFilterProp="children"
                                onChange={(value)=>setNewsCategory(value)}
                                filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}

                            >
                                <Option value='All cryptocurrencies'>All cryptocurrencies</Option>
                                {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
                            </Select>
                        </Col>
                    )
                }
                {cryptoNews.value.map((news,i)=>(
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title style={{padding:"10px"}} level={4} className="news-title">
                                        {news.name}
                                    </Title>
                                    
                                       <img style={{maxWidth:"200px",maxHeight:"100px",padding:"10px",borderRadius:"5px"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    
                                    
                                    
                                </div>

                                <p>
                                    {
                                        news.description>100?news.description.substr(0,100)+"...":news.description
                                    }
                                </p>

                                <div className="provider-container" style={{marginTop:"50px"}}>
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                                        <Text>{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default News
