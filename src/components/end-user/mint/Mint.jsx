import React, { useRef, useContext, useState, useCallback } from 'react'
import { Box, Flex, Text, Heading, Button, Image } from '@chakra-ui/react'
import { Heading2XL, HeadingLg, HeadingXL, Text2XL } from '@components/shared/Typography'
import VerticalAnimation from '../shared/VerticalAnimation'
import { ContentLg } from '../wrappers'
import useDeviceDetect from '@hooks/useDeviceDetect'

const Mint = ({ onMintSucceed }) => {
  const handleMint = useCallback(() => {
    onMintSucceed()
  }, [])

  return (
    <>
      <Heading2XL>The Roadmap of Your Life</Heading2XL>
      <Text2XL>The first free NFT minting adventure powered completely by AI.</Text2XL>
      <MintFrame onMint={handleMint} />
      <VerticalAnimation />
    </>
  )
}

export default Mint

const MintFrame = ({ onMint }) => {
  const [token, tokenSet] = useState(10)
  const { isMobile } = useDeviceDetect()

  const decrease = useCallback(() => {
    if (token === 0) return
    let newToken = token - 1
    tokenSet(newToken)
  }, [token])

  const increase = useCallback(() => {
    if (token === 10) return
    let newToken = token + 1
    tokenSet(newToken)
  }, [token])

  const setMax = useCallback(() => {
    tokenSet(10)
  }, [])

  return (
    <Box position="relative">
      <Box w="100%" h={{ base: '99px', lg: '222px' }}>
        <MintFrameSvg />
      </Box>
      <Flex
        position="absolute"
        direction="column"
        top="0"
        left="0"
        justifyContent={'center'}
        alignItems="center"
        w="98%"
        h="100%"
        gap={{ base: '8px', lg: '24px' }}
      >
        <HeadingLg color="orange.400" textShadow="0px 0px 15px #ED8936">
          Choose token quantity
        </HeadingLg>
        <Flex gap={{ base: '16px', lg: '48px' }}>
          <Flex direction="column" gap={{ base: '0.5rem', lg: '1rem' }}>
            <Flex direction="column" position="relative" className="token-quantity">
              <TokenQuantitySvg />
              <Flex
                position="absolute"
                top="0"
                left="0"
                justifyContent={'space-between'}
                alignItems="center"
                w="100%"
                h="100%"
              >
                <Flex
                  w={{ base: '36px', lg: '43px' }}
                  justifyContent={'center'}
                  alignItems="center"
                >
                  <Text fontSize={{ base: 'xl', lg: '3xl' }} cursor="pointer" onClick={decrease}>
                    -
                  </Text>
                </Flex>

                <Text fontSize={{ base: 'lg', lg: 'xl' }} color="orange.400">
                  {token}
                </Text>
                <Flex
                  w={{ base: '36px', lg: '43px' }}
                  justifyContent={'center'}
                  alignItems="center"
                >
                  <Text fontSize={{ base: 'xl', lg: '3xl' }} cursor="pointer" onClick={increase}>
                    +
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex className="min-max" w="100%" justifyContent={'center'} gap="16px">
              <Text
                fontSize={{ base: 'sm', lg: 'md' }}
                color="whiteAlpha.500"
                _hover={{ color: 'orange.400' }}
                cursor={'pointer'}
                onClick={setMax}
              >
                MINT MAX
              </Text>
            </Flex>
          </Flex>
          <Button w={{ base: '160px', md: '296px' }} onClick={onMint} variant="orange">
            MINT
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

const MintFrameSvg = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 766 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_14030_2050)">
        <rect width="766" height="222" rx="30" fill="black" fillOpacity="0.8" />
        <rect
          width="766"
          height="222"
          rx="30"
          fill="url(#paint0_linear_14030_2050)"
          fillOpacity="0.2"
        />
        <rect
          x="0.5"
          y="0.5"
          width="765"
          height="221"
          rx="29.5"
          stroke="white"
          strokeOpacity="0.16"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_14030_2050"
          x="-15"
          y="-15"
          width="796"
          height="252"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_14030_2050" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_14030_2050"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_14030_2050"
          x1="246.822"
          y1="-32.375"
          x2="276.677"
          y2="266.632"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED8936" stopOpacity="0.85" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const TokenQuantitySvg = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 296 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="296" height="56" rx="12" fill="black" />
      <rect x="0.5" y="0.5" width="295" height="55" rx="11.5" stroke="white" strokeOpacity="0.16" />
    </svg>
  )
}
