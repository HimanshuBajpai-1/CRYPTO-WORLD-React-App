import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
} from '@chakra-ui/react'

const ErrorComponent = ({message}) => {
  return (
    <Container display={'flex'} h={['90vh','80vh']} flexDirection={'column'} justifyContent={['center','flex-end']} >
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>{message}</AlertTitle>
          <AlertDescription>Try Again Later</AlertDescription>
        </Alert>
    </Container>
    
  )
}

export default ErrorComponent