import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const newsApiHeaders={
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '709878c485mshce3e3f50be2b3abp198cddjsn6071ce2a9f2c'
}

const baseUrl="https://bing-news-search1.p.rapidapi.com"

const createRequest = (url)=>({url,headers:newsApiHeaders})

export const cryptoNewsApi=createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptoNews: builder.query({
            query: ({newsCategory,count})=>createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi