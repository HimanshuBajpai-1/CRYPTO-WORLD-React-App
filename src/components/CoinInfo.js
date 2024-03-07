import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {server} from '../index';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import ChartComponent from './ChartComponent';
import { Badge, Box, Button, HStack, Heading, Image, Radio, RadioGroup, Stack, Stat, StatArrow, StatHelpText, Text, VStack } from '@chakra-ui/react';

 
const CoinInfo = () => {

    const params = useParams();
    const id = params.id

    const [coinData , setCoinData] = useState({});
    const [chartData , setChartData] = useState([]);
    const [isError,setIsError]  = useState(false);
    const [loading,setLoading] = useState(true);
    const [currency , setCurrency] = useState('inr');
    const currencySymbol = currency === 'usd' ? '$' : currency === 'eur' ? '€' : '₹'
    const [days,setDays] = useState('1')
    const darr = ['1','7','15','30','180','365','max'];


    useEffect(()=>{
        const fetchCoinDetails = async ()=>{
            try {
                const cdata = await axios.get(`${server}/coins/${id}`);
                const {data} = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
                setCoinData(cdata.data)
                setChartData(data.prices)        
                setLoading(false)
            } catch (error) {
                setIsError(true)
                setLoading(false)
            }
        }
        fetchCoinDetails();
    },[id,currency,days])
    if(isError) return <ErrorComponent message={'error while Fetchin Coin Details'}/>

    return (
        <>        
        {            
            loading ? <Loader /> : 
            <VStack maxW={'container.xl'} >
                <Stack mt={4} direction={'row'} justifyContent={'center'} >
                    <RadioGroup onChange={setCurrency} value={currency}>
                        <Stack direction='row'>
                        <Radio value='inr'>INR</Radio>
                        <Radio value='usd'>USD</Radio>
                        <Radio value='eur'>EUR</Radio>
                        </Stack>
                    </RadioGroup>
                </Stack>
                <Text  mt={5}>Last updated on : {new Date(coinData.last_updated).toLocaleString()}</Text>
                <Stack w={'full'} direction={['column','row']} alignItems={'center'} justifyContent={'space-around'} mt='5'>
                    <VStack w={['full','40%']}>
                        <Image src={coinData.image.large} w={["10vh","15vh"]}/>
                        <Text>{coinData.symbol}</Text>
                        <Heading pt={0}>{coinData.name}</Heading>
                        <Badge fontWeight={'bold'} bg={'rgba(0,0,0,0.7)'} fontSize={['md','x-large']} color={'white'}>#{coinData.market_cap_rank}</Badge>
                    </VStack>
                    <VStack w={['80%','40%']}>
                        <Text fontWeight={'bold'}>price: {currencySymbol}{coinData.market_data.current_price[currency]}</Text>
                        <Box>
                            <Stat fontWeight={'bold'}>
                                <StatHelpText>
                                <StatArrow type={coinData.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
                                {coinData.market_data.price_change_percentage_24h}%
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Box bg={'green'} h={'10px'} w={'full'}></Box>
                        <HStack justifyContent={'space-between'} w={'full'}>
                            <Badge>{currencySymbol}{coinData.market_data.low_24h[currency]}</Badge>
                            <Text>in 24 Hours</Text>
                            <Badge>{currencySymbol}{coinData.market_data.high_24h[currency]}</Badge>
                        </HStack>
                    </VStack>
                </Stack>
                <ChartComponent chartdata={chartData} days={days} currency={currencySymbol}/>
                <HStack flexWrap={'wrap'} justifyContent={'center'}>
                    {darr.map((i,idx)=>{
                        return <Button key={idx} onClick={function(){setDays(i)}}>{`${i} D`}</Button>
                    })}
                </HStack>
                <VStack mt={5} mb={5} w={'full'}>
                    <HStack w={'80%'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>Maximum Supply:</Text>
                        <Text>{coinData.market_data.max_supply}</Text>
                    </HStack>
                    <HStack w={'80%'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>Circulating Supply:</Text>
                        <Text>{coinData.market_data.circulating_supply}</Text>
                    </HStack>
                    <HStack w={'80%'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>All Time High:</Text>
                        <Text>{currencySymbol}{coinData.market_data.ath[currency]}</Text>
                    </HStack>
                    <HStack w={'80%'} justifyContent={'space-between'}>
                        <Text fontWeight={'bold'}>All Time Low:</Text>
                        <Text>{currencySymbol}{coinData.market_data.atl[currency]}</Text>
                    </HStack>
                </VStack>
            </VStack>
        }

        </>
    )
}

export default CoinInfo