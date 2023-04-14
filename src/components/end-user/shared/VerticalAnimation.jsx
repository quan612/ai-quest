import { Box, Flex, Text, Heading, Button, Image } from '@chakra-ui/react'

const VerticalAnimation = () => {
  return (
    <Flex
      position="absolute"
      h="100%"
      minH="100vh"
      w="100%"
      className="mint-animation"
      bottom="0"
      justify={'flex-end'}
      direction="column"
      zIndex={0}
      pointerEvents="none"
    >
      <Flex
        w={{ base: '100vw', xl: '130%' }}
        h="50%"
        position="relative"
        justify="center"
        align="center"
        ml={{ base: '0%', xl: '-10%' }}
      >
        <Image
          src="/img/user/mint-animation-rotate.gif"
          w="100%"
          h="100%"
          opacity="0.3"
          objectFit={'cover'}
        />
      </Flex>
    </Flex>
  )
}

export default VerticalAnimation
