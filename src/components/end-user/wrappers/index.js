import { Heading, Box, Flex, Container } from '@chakra-ui/react'


export const ContentLg = ({ props, children }) => {
  return (
    <Flex
      className='content-lg'
      w={{ base: '90%', xl: 'container.lg' }}
      maxW="container.lg"
      direction="column"
      gap={{ base: '24px', lg: '48px' }}
      justifyContent={'center'}
      alignItems="center"
      h="100%"
      {...props}
    >{children}</Flex>
  )
}