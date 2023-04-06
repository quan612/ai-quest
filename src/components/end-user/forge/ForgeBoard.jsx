import React, { useRef, useContext, useState, useCallback } from 'react'

import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  ButtonGroup,
  Image,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react'
import { Timer } from '../shared/Timer'
import {
  Heading2XL,
  HeadingLg,
  HeadingSm,
  HeadingXL,
  Text2XL,
  TextXL,
} from '@components/shared/Typography'
import { useRouter } from 'next/router'
import QuestWrapper from '../shared/QuestWrapper'

const LANDING = 0
const ORB_TO_BURN = 1
const FORGE_COMPLETED = 2

const ForgeBoard = () => {
  const router = useRouter()
  const [view, viewSet] = useState(LANDING)

  const onBurnOrbs = useCallback(() => {
    viewSet(FORGE_COMPLETED)
  }, [])

  return (
    <Box
      flex="1"
      position={'relative'}
      display="flex"
      w="100%"
      h="auto" //100%
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      __css={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 91.67%), linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/img/user/ai-forge.png)`,
      }}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      backgroundRepeat="no-repeat"
    >
      <Flex
        w={'container.lg'}
        maxW="container.lg"
        direction="column"
        gap="48px"
        justifyContent={'center'}
        alignItems="center"
        mt="13rem"
        mb="46px"
      >
        {view === LANDING && (
          <>
            <Heading2XL>Become Permanent</Heading2XL>

            <Text2XL>
              Making one Orb permanent will require burning x orbs. Select which Orb you would like
              to make permanent.
            </Text2XL>

            <Flex gap="24px">
              {Array(3)
                .fill(null)
                .map((index) => {
                  return (
                    <Box
                      key={index}
                      w="240px"
                      h="240px"
                      __css={{
                        background: `url(/img/user/orb.png)`,
                      }}
                      backgroundRepeat="no-repeat"
                      backgroundSize={'cover'}
                      border="2px solid rgba(255, 255, 255, 0.16)"
                      borderRadius={'10px'}
                      _hover={{
                        transition: '0.5s',
                        border: '2px solid rgba(237, 137, 54, 1)',
                        padding: '0px',
                      }}
                      transition="0.5s"
                      p="1px"
                    />
                  )
                })}
            </Flex>

            <Button
              w={{ base: '192px', md: '296px' }}
              onClick={() => viewSet(ORB_TO_BURN)}
              variant="orange"
            >
              CONFIRM
            </Button>
          </>
        )}

        {view === ORB_TO_BURN && <OrbToBurn goBack={() => viewSet(LANDING)} goNext={onBurnOrbs} />}

        {view === FORGE_COMPLETED && <ForgeCompleted />}
      </Flex>
      <Timer />
    </Box>
  )
}

export default ForgeBoard

const ForgeCompleted = () => {
  return (
    <ContentMdWrapper>
      <Heading2XL>Permanence Achieved</Heading2XL>
      <Image
        src="/img/user/orb.png"
        w="360px"
        border="2px solid rgba(237, 137, 54, 1)"
        borderRadius="20px"
      />
      <TextXL>Your unique Roadmap.Art NFT is now permanent.</TextXL>

      <ButtonGroup gap="3rem">
        <Button
          w={{ base: '192px', md: '296px' }}
          onClick={() => console.log('share twitter')}
          variant="outline-orange"
        >
          SHARE ON TWITTER
        </Button>
        <Button
          w={{ base: '192px', md: '296px' }}
          onClick={() => console.log('open sea')}
          variant="orange"
        >
          VIEW ON OPENSEA
        </Button>
      </ButtonGroup>
    </ContentMdWrapper>
  )
}

const ContentMdWrapper = ({ children }) => {
  return (
    <Flex
      display={'flex'}
      className="content-md-wrapper"
      flexDirection="column"
      w={'992px'}
      maxW="992px" //container.md
      __css={{
        background:
          'linear-gradient(160.99deg, rgba(237, 137, 54, 0.17) -2.59%, rgba(0, 0, 0, 0) 98.58%), rgba(0, 0, 0, 0.8)',
      }}
      border="1px solid rgba(255, 255, 255, 0.16)"
      borderRadius={'10px'}
      gap="3rem"
      justifyContent={'center'}
      alignItems="center"
      p="36px 0px"
    >
      {children}
    </Flex>
  )
}

const OrbToBurn = ({ goBack, goNext }) => {
  return (
    <Flex
      w="992px"
      maxW="992px"
      direction="column"
      gap="48px"
      justifyContent={'center'}
      alignItems="center"
    >
      <Heading2XL>Choose x orbs to Burn</Heading2XL>

      <Text fontSize={'2xl'} textAlign="center" lineHeight={'36px'}>
        Orbs chosen will be burned forever.
      </Text>

      <Flex gap="24px" w="100%" className="orb-to-burn-select">
        <Flex position={'relative'} w="464px">
          <OrbFrameSvg />
          <Flex
            position="absolute"
            w="100%"
            h="100%"
            direction="column"
            align="center"
            justify={'space-between'}
            p="4.5rem 2rem"
          >
            <HeadingSm color="orange.400">Selected for Permanence</HeadingSm>
            <Box w="70%">
              <Image w="100%" src="/img/user/orb.png" />
            </Box>
          </Flex>
        </Flex>
        <Flex flex="1" h="100%">
          <SimpleGrid columns="2" gap="24px" w="100%" h="100%" minH="100%">
            {Array(4)
              .fill(null)
              .map((index) => {
                return (
                  <GridItem colSpan={1} key={index}>
                    <Box
                      border="2px solid rgba(255, 255, 255, 0.16)"
                      borderRadius={'10px'}
                      _hover={{
                        transition: '0.5s',
                        border: '2px solid rgba(237, 137, 54, 1)',
                        padding: '0px',
                      }}
                    >
                      <Image w="100%" src="/img/user/orb.png" borderRadius={'10px'} />
                    </Box>
                  </GridItem>
                )
              })}
          </SimpleGrid>
        </Flex>
      </Flex>

      <ButtonGroup w="100%" alignItems={'center'} justifyContent="center" gap="3rem">
        <Button w={{ base: '192px', md: '296px' }} onClick={goBack} variant="outline-orange">
          BACK
        </Button>
        <Button w={{ base: '192px', md: '296px' }} onClick={goNext} variant="orange">
          CONFIRM
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

const OrbFrameSvg = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 464 504"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="464" height="504" rx="10" fill="black" fillOpacity="0.8" />
      <rect
        width="464"
        height="504"
        rx="10"
        fill="url(#paint0_linear_14030_2625)"
        fillOpacity="0.2"
      />
      <rect x="0.5" y="0.5" width="463" height="503" rx="9.5" stroke="white" strokeOpacity="0.16" />
      <defs>
        <linearGradient
          id="paint0_linear_14030_2625"
          x1="149.511"
          y1="-73.5"
          x2="374.554"
          y2="527.88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED8936" stopOpacity="0.85" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
