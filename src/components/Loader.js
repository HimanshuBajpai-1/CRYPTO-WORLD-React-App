import React from 'react'
import {Spinner, Stack} from '@chakra-ui/react'
const Loader = () => {
  return (
    <Stack h={['90vh','100vh']} w={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Spinner w={['20','40']} h={['20','40']} />
    </Stack>
    
  )
}

export default Loader