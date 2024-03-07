import React, { useEffect, useState } from 'react'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'
import axios from 'axios'
import {server} from '../index'
import { Text, HStack, Stack, Heading, Image, VStack, Radio, RadioGroup, Button } from '@chakra-ui/react'
import {Link} from 'react-router-dom'

const Coins = () => {
  const [coins,setCoins] = useState([])
  const [currency , setCurrency] = useState('inr');
  const [page , setPage] = useState(1);
  const [isError , setIsError] = useState(false);
  const [loading , setLoading ] = useState(true);
  const currencySymbol = currency === 'usd' ? '$' : currency === 'eur' ? '€' : '₹'
  let arr = new Array(128);
  arr.fill('1')
  useEffect(()=>{
    const fetchCoins = async ()=>{
      try {
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);        
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setLoading(false);
        setIsError(true);
      }
    }
    fetchCoins();
  },[currency,page]);

    if(isError) return <ErrorComponent message={'error while Fetching Coins'} />

  return (
    <>
      <Stack direction={"row"} justifyContent={'center'}>
        <HStack overflowX={'auto'}>
          {
            arr.map((i,idx)=>{
              return <Button onClick={function(){setPage(idx+1)}} colorScheme='blue' variant={'outline'}>{idx+1}</Button>
            })  
          }
        </HStack>  
      </Stack> 

        <Stack mt={4} direction={'row'} justifyContent={'center'} >
          <RadioGroup onChange={setCurrency} value={currency}>
            <Stack direction='row'>
              <Radio value='inr'>INR</Radio>
              <Radio value='usd'>USD</Radio>
              <Radio value='eur'>EUR</Radio>
            </Stack>
          </RadioGroup>
        </Stack>
        
        {loading ? <Loader /> : <HStack alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} gap={20} p={[5,20]}>
            {coins.map((i)=>{                
                return <CoinComponent key={i.id} id={i.id} name={i.name} img={i.image} symbol={i.symbol} current_price={i.current_price} currencySymbol={currencySymbol}/>
                }
                )
            }
        </HStack>  }
    </>    
  )
}

const CoinComponent = ({id,name,img,symbol,current_price,currencySymbol}) => {
  
  return <Link to={`/coin/${id}`} target='blank'>
      <VStack shadow={'lg'} minW={['30vw','10vw']} maxW={['30vw','10vw']} transition={'all 0.3s'} css={{"&:hover":{
          transform:"scale(1.3)"
      }}}>
          <Image alignSelf={'center'} src={img} alt='coinsExchange' h={20} w={20}/>
          <Text fontWeight={'bold'} noOfLines={'1'} textAlign={'center'}>{name}</Text>
          <Text noOfLines={'1'} textAlign={'center'}>{symbol}</Text>
          <Text noOfLines={'1'} textAlign={'center'}>{currencySymbol}{current_price}</Text>
      </VStack>
  </Link>
}

export default Coins