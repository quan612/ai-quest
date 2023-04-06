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

const Leaderboard = () => {
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
        <Flex
          className="journey-about"
          gap="4rem"
          p="56px 32px 145px 32px"
          direction={'column'}
          textAlign="center"
        >
          <Heading2XL>Leaderboard</Heading2XL>
          <TextXL>
            Top 10 burners will receive legendary traits in their NFT.{' '}
            <Text as={'span'} color="orange.400">
              Burn your tokens
            </Text>{' '}
            before the phase ends to receive your Roadmap.Art NFTs.
          </TextXL>

          <Ranking />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Leaderboard

const AnimatedGif = () => {
  return (
    <Box position="absolute" w="100%" h="100%" zIndex={1}>
      <Image
        src="/img/user/animated wavy lines.gif"
        w="100%"
        h="calc(100%)"
        opacity="0.3"
        objectFit="cover"
        // h="calc(100% - 16rem)"
        // mt="16rem"
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

const tempRanking = Array(25)
  .fill(null)
  .map((f, index) => ({ id: index + 1, address: '0xb3z645', stats: 'Stats' }))
const Ranking = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = tempRanking.slice(indexOfFirstRecord, indexOfLastRecord)
  const nPages = Math.ceil(tempRanking.length / recordsPerPage)

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <Flex direction="column" gap="12px" color="orange.400">
        <Flex
          w="100%"
          h="100%"
          align={'center'}
          justify="space-between"
          top="0"
          p="0px 103px 0px 44px"
        >
          <Text as={'Span'}>Ranking</Text>
          <Text as={'Span'}>Name</Text>
          <Text as={'Span'}>Stats 1</Text>
        </Flex>

        {currentRecords.map((r, index) => {
          return (
            <Flex position="relative" h="auto" key={index}>
              <RankingItemSvg />
              <Flex
                position="absolute"
                w="100%"
                h="100%"
                align={'center'}
                justify="space-between"
                top="0"
                p="0px 103px 0px 64px"
              >
                <Text as={'Span'}>{r.id}</Text>
                <Text as={'Span'}>{r.address}</Text>
                <Text as={'Span'} color="white">
                  {r.stats}
                </Text>
              </Flex>
            </Flex>
          )
        })}

        <Flex
          w="100%"
          h="100%"
          align={'center'}
          justify="space-between"
          top="0"
          p="0px 103px 0px 44px"
          className="leaderboard-pagination"
        >
          <Text
            as={'Span'}
            cursor="pointer"
            onClick={prevPage}
            color={`${currentPage === 1 ? 'whiteAlpha.400' : 'orange.400'}`}
          >
            Previous Page
          </Text>
          <Text as={'Span'}>
            {currentPage}/{nPages}
          </Text>
          <Text
            as={'Span'}
            cursor="pointer"
            onClick={nextPage}
            color={`${currentPage === nPages ? 'whiteAlpha.400' : 'orange.400'}`}
          >
            Next Page
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

const RankingItemSvg = () => {
  return (
    <svg
      width="768"
      height="65"
      viewBox="0 0 768 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_14030_2392)">
        <rect width="768" height="65" rx="12" fill="black" fillOpacity="0.7" />
        <rect
          width="768"
          height="65"
          rx="12"
          fill="url(#paint0_linear_14030_2392)"
          fillOpacity="0.2"
        />
        <rect
          x="0.5"
          y="0.5"
          width="767"
          height="64"
          rx="11.5"
          stroke="white"
          strokeOpacity="0.16"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_14030_2392"
          x="-15"
          y="-15"
          width="798"
          height="95"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_14030_2392" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_14030_2392"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_14030_2392"
          x1="254"
          y1="-31"
          x2="272.801"
          y2="118.508"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED8936" stopOpacity="0.85" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
