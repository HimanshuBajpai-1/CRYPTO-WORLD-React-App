import { Box, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import bgimg from '../assets/bitcoin.jpg'

const Home = () => {

  
  return (
    <>
      <Box width={'100%'} h={['90vh','100vh']}>
        <Image objectFit={'cover'} src={bgimg} h={['90vh','100vh']} width={'100%'}/>
        
      </Box>
      <Box position={'absolute'} top={'15vh'} display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
          <Heading fontSize={['2rem','3rem']} letterSpacing={'3px'} color={'white'}>Crypto World</Heading>
          <Text fontSize={['1rem','1.3rem']} letterSpacing={'2px'} color={'white'}>Explore the world of digital currencies</Text>
        </Box>
    </>
  )
}

export default Home