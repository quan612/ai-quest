import { Box, Flex, Text, Heading, Button, Image } from '@chakra-ui/react'

const StarAnimation = () => {
  return (
    <Flex
      position="absolute"
      h="100%"
      minH="100vh"
      w="100%"
      className="mint-animation"
      bottom="0"
      direction="column"
      zIndex={0}
      pointerEvents="none"
    >
      <Flex
        w={{ base: '100%', xl: '100%' }}
        h="100%"
        position="relative"
        justify="center"
        align="center"
        // ml={{ base: '0%', xl: '-10%' }}
      >
        <Image src="/img/user/space v2 1.gif" w="100%" h="100%" opacity="0.7" objectFit={'cover'} />
      </Flex>
    </Flex>
  )
}

export default StarAnimation
