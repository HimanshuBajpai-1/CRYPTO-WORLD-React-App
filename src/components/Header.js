import { Button, Container, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Container maxW={'container.xl'} bg={'black'} minH={'10vh'}>
        <HStack minH={'inherit'} alignItems={'center'} justifyContent={['center','flex-start']} gap={10}>
            <Button variant={'link'} colorScheme='yellow'><Link to={'/'}>Home</Link></Button>
            <Button variant={'link'} colorScheme='yellow'><Link to={'/exchanges'}>Exchanges</Link></Button>
            <Button variant={'link'} colorScheme='yellow'><Link to={'/coins'}>Coins</Link></Button>
        </HStack>
    </Container>
  )
}

export default Header