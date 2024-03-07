import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Text, HStack, Heading, Image, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {
    const [coinExchange , setCoinExchange] = useState([])
    const [loading , setLoading] = useState(true)
    const [isError , setIsError] = useState(false)
    useEffect(()=>{
        const fetchExchanges =async () =>{
            try {
                const {data} = await axios.get(`${server}/exchanges`);
                setCoinExchange(data)
                setLoading(false)
            } catch (error) {
                setIsError(true);
                setLoading(false)
            }
        }
        fetchExchanges();
    },[])

    if(isError){
         return <ErrorComponent message={'error while fetching exchanges'}/>
    }
  return (
    <>
        {loading ? <Loader /> : <HStack alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} gap={20} p={[5,20]}>
            {coinExchange.map((i)=>{                
                return <ExchangesComponent key={i.id} name={i.name} url={i.url} rank={i.trust_score_rank} img={i.image}/>
                }
                )
            }
        </HStack>        
        }
    </>
  )
}

const ExchangesComponent = ({name,url,rank,img}) => {
    return <a href={url} target='blank'>
        <VStack shadow={'lg'} minW={['30vw','10vw']} maxW={['30vw','10vw']} transition={'all 0.3s'} css={{"&:hover":{
            transform:"scale(1.3)"
        }}}>
            <Image alignSelf={'center'} src={img} alt='coinsExchange' h={20} w={20}/>
            <Heading noOfLines={'1'} textAlign={'center'}>{rank}</Heading>
            <Text noOfLines={'1'} textAlign={'center'}>{name}</Text>
        </VStack>
    </a>
}

export default Exchanges