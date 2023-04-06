import React, { useRef, useContext, useState, useCallback } from 'react'

import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Badge,
  UnorderedList,
  ListItem,
  Image,
} from '@chakra-ui/react'

import { Heading2XL, TextXL } from '@components/shared/Typography'
import { useRouter } from 'next/router'
import { Badge as AppBadge } from '@components/shared/Badge'

const About = () => {
  const router = useRouter()

  return (
    <Box
      position={'relative'}
      display="flex"
      w="100%"
      h="auto"
      bg="black"
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
    >
      <AnimatedGif />

      <Flex
        w={'container.md'}
        maxW="container.md"
        direction="column"
        justifyContent={'center'}
        alignItems="center"
        mt="16rem" // 7rem plus header
        gap="101px"
        zIndex={2}
      >
        <TheJourney />

        <Flex w="100%" direction={'column'}>
          <TheMint />
          <TheBurn />
          <TheReveal />

          <Flex
            w="50%"
            alignSelf={'end'}
            direction={'column'}
            gap="1.5rem"
            mt="-5rem"
            position="relative"
          >
            <Flex
              position="absolute"
              top="0"
              left="15rem"
              direction={'column'}
              w="100%"
              h="auto"
              gap="1.5rem"
            >
              <Heading2XL>The Forge</Heading2XL>
              <AppBadge>APRIL 25 - APRIL 30</AppBadge>
              <UnorderedList fontSize={'xl'}>
                <ListItem>
                  Players who did not earn Permanence during the burn quest have the opportunity to
                  gain Permanence
                </ListItem>
                <ListItem>Art without Permanence will be burned</ListItem>
              </UnorderedList>
            </Flex>
          </Flex>
        </Flex>
        <Heading2XL
          color="orange.600"
          textShadow=""
          cursor="pointer"
          mt="23rem"
          mb="11rem"
          _hover={{ transition: '0.5s', textShadow: ' 0px 0px 8px #ED8936', color: '#FBD38D' }}
          onClick={() => router.push('/')}
        >
          Start Your Journey
        </Heading2XL>
      </Flex>
    </Box>
  )
}

export default About

const AnimatedGif = () => {
  return (
    <Box position="absolute" w="100%" h="auto" top="16rem" zIndex={1}>
      <Image
        src="/img/user/animated wavy lines.gif"
        w="100%"
        h="100%"
        opacity="0.3"
        objectFit="cover"
      />
      <Box
        className="start-board-gradient-overlay"
        w="100%"
        h="100%"
        top="0"
        position="absolute"
        __css={{
          background: `linear-gradient(160.72deg, #000000 18.3%, rgba(0, 0, 0, 0) 38.51%)`,
        }}
        zIndex={2}
      />
    </Box>
  )
}

const TheJourney = () => {
  return (
    <Flex
      className="journey-about"
      gap="4rem"
      p="56px 32px 145px 32px"
      direction={'column'}
      textAlign="center"
    >
      <Heading2XL>The Journey</Heading2XL>
      <TextXL>
        This is an experiment. It is an adventure that bonds human and AI through the blockchain.
        Every decision you make will effect the outcome of your reward. Tread carefully, and be
        yourself.
      </TextXL>
    </Flex>
  )
}

const TheMint = () => {
  return (
    <Flex w="50%" alignSelf={'start'} direction={'column'} gap="1.5rem">
      <Heading2XL>The Mint</Heading2XL>
      <AppBadge>IN PROGRESS</AppBadge>
      <UnorderedList fontSize={'xl'}>
        <ListItem>The first quest is the Mint Quest</ListItem>
        <ListItem>Players can mint an initial 10 Tokens</ListItem>
        <ListItem>They can earn additional Tokens by playing the daily quests</ListItem>
        <ListItem>Tokens are the key to accessing the Burn Quest</ListItem>
      </UnorderedList>
    </Flex>
  )
}

const TheBurn = () => {
  return (
    <Flex w="50%" alignSelf={'end'} direction={'column'} gap="1.5rem" mt="21rem">
      <Heading2XL>The Burn</Heading2XL>
      <AppBadge>APRIL 20 - APRIL 23</AppBadge>
      <UnorderedList fontSize={'xl'}>
        <ListItem>The Second Quest is the burn quest.</ListItem>
        <ListItem>Players decide how many Tokens to sacrifice before their quest</ListItem>
        <ListItem>The more a player sacrifices, the higher the rewards</ListItem>
        <ListItem>Players claim their unrevealed Art</ListItem>
      </UnorderedList>
    </Flex>
  )
}

const TheReveal = () => {
  return (
    <Flex w="50%" alignSelf={'start'} direction={'column'} gap="1.5rem" mt="29rem">
      <Heading2XL>The Reveal</Heading2XL>
      <AppBadge isDisabled={true}>PHASE COMPLETED</AppBadge>
      <UnorderedList fontSize={'xl'}>
        <ListItem>The Art is revealed</ListItem>
        <ListItem>
          Players who did not sacrifice enough will not have Permanence and their Art will vanish
          after a short amount of time
        </ListItem>
        <ListItem>
          The Art is a summation of players quest decisions, rarity and total Tokens sacrificed
        </ListItem>
      </UnorderedList>
    </Flex>
  )
}
