
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
     'x-rapidapi-key': '709878c485mshce3e3f50be2b3abp198cddjsn6071ce2a9f2c'
}

const baseUrl='https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({url,headers:cryptoApiHeaders})
export const cryptoApi=createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query: (limit)=>createRequest(`/coins?limit=${limit}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId)=>createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId,timePeriod})=>createRequest(`/coin/${coinId}/history/${timePeriod}`)
        })
    })
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery,useGetCryptoHistoryQuery
}=cryptoApi


