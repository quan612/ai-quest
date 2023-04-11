import React, { useState, useEffect, useContext, useCallback } from 'react'

import { Box, Flex, Container, Image, Icon, Text } from '@chakra-ui/react'
import getTimeLeft from '@util/getTimeLeft'
import {
  AppContext,
  BURN_END,
  BURN_STATE,
  FORGE_END,
  FORGE_STATE,
  MINT_END,
  MINT_STATE,
  PENDING_STATE,
} from '@context/AppContext'

export const Timer = () => {
  const { appState } = useContext(AppContext)
  const [timeLeft, setTimeLeft] = useState(false)

  const getTimerText = useCallback(() => {
    switch (appState.name) {
      case MINT_STATE:
        return 'Open Mint Ends In'
      case BURN_STATE:
        return 'Burn Phase Ends In'
      case FORGE_STATE:
        return 'Permanence Window Ends In'
      default:
        return 'Pending'
    }
  }, [appState])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (appState.name !== PENDING_STATE && appState.expired !== '')
        setTimeLeft(getTimeLeft(appState.expired))
    }, 1000)
    return () => clearTimeout(timer)
  })

  return (
    <Flex
      className="timer"
      position="relative"
      mt="auto"
      w="100%"
      h="80px"
      align={'center'}
      justify="center"
      zIndex="99"
      pointerEvents={'none'}
    >
      <Flex w="auto" h="100%" align={'center'} justify="center" position="relative">
        <TimerSvg />
        <Flex
          position={'absolute'}
          top="0"
          left="0"
          w="auto"
          h="100%"
          justifyContent="center"
          pointerEvents={'all'}
          gap="20px"
        >
          <Flex className="open-mint-end" flex="40%" align={'center'} justify="center">
            <Text color="orange.400" ml="1rem" textAlign={'center'}>
              {getTimerText()}
            </Text>
          </Flex>
          <Flex className="counter" flex="60%" p="15px 0px" gap="20px">
            <Box w="56px" className="timer-day" textAlign="center">
              <Text color="orange.300" fontSize={'xl'}>
                {timeLeft.days}
              </Text>
              <Text color="white" fontSize={'sm'}>
                DAY
              </Text>
            </Box>

            <Box w="56px" className="timer-hour" textAlign="center">
              <Text color="orange.300" fontSize={'xl'}>
                {timeLeft.hours}
              </Text>
              <Text color="white" fontSize={'sm'}>
                HOURS
              </Text>
            </Box>

            <Box w="56px" className="timer-minutes" textAlign="center">
              <Text color="orange.300" fontSize={'xl'}>
                {timeLeft.minutes}
              </Text>
              <Text color="white" fontSize={'sm'}>
                MINUTES
              </Text>
            </Box>
            <Box w="56px" className="timer-seconds" textAlign="center">
              <Text color="orange.300" fontSize={'xl'}>
                {timeLeft.seconds}
              </Text>
              <Text color="white" fontSize={'sm'}>
                SECONDS
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

const TimerSvg = () => {
  return (
    <Icon
      width="100%"
      height="100%"
      viewBox="0 0 550 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_14165_7288)">
        <mask id="path-1-inside-1_14165_7288" fill="white">
          <path d="M0 12C0 5.37258 5.37258 0 12 0H538C544.627 0 550 5.37258 550 12V80H0V12Z" />
        </mask>
        <path
          d="M0 12C0 5.37258 5.37258 0 12 0H538C544.627 0 550 5.37258 550 12V80H0V12Z"
          fill="black"
          fillOpacity="0.8"
        />
        <path
          d="M0 12C0 5.37258 5.37258 0 12 0H538C544.627 0 550 5.37258 550 12V80H0V12Z"
          fill="url(#paint0_linear_14165_7288)"
          fillOpacity="0.2"
        />
        <path
          d="M-1 12C-1 4.8203 4.8203 -1 12 -1H538C545.18 -1 551 4.8203 551 12H549C549 5.92487 544.075 1 538 1H12C5.92487 1 1 5.92487 1 12H-1ZM550 80H0H550ZM-1 80V12C-1 4.8203 4.8203 -1 12 -1V1C5.92487 1 1 5.92487 1 12V80H-1ZM538 -1C545.18 -1 551 4.8203 551 12V80H549V12C549 5.92487 544.075 1 538 1V-1Z"
          fill="white"
          fillOpacity="0.16"
          mask="url(#path-1-inside-1_14165_7288)"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_14165_7288"
          x="-15"
          y="-15"
          width="580"
          height="110"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_14165_7288" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_14165_7288"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_14165_7288"
          x1="177.222"
          y1="-11.6667"
          x2="182.662"
          y2="96.8852"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED8936" stopOpacity="0.85" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </Icon>
  )
}
