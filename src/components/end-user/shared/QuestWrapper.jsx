import { Box, Flex, Text, Heading, Button, Input, ButtonGroup, Icon } from '@chakra-ui/react'

const QuestWrapper = ({ children }) => {
  return (
    <Box position="relative">
      <QuestFrameSvg />
      <Flex
        position="absolute"
        direction="column"
        top="0"
        left="0"
        justifyContent={'center'}
        alignItems="center"
        w="100%"
        h="100%"
        gap="45px"
        p="0px 4rem"
      >
        {children}
      </Flex>
    </Box>
  )
}

export default QuestWrapper
const QuestFrameSvg = () => {
  return (
    <Icon
      width="100%"
      height="536px"
      viewBox="0 0 770 436"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_14165_8000)">
        <rect x="1" y="1" width="768" height="434" rx="10" fill="black" fillOpacity="0.8" />
        <rect
          x="1"
          y="1"
          width="768"
          height="434"
          rx="10"
          fill="url(#paint0_linear_14165_8000)"
          fillOpacity="0.2"
        />
        <rect
          x="0.5"
          y="0.5"
          width="769"
          height="435"
          rx="10.5"
          stroke="white"
          strokeOpacity="0.16"
          strokeLinejoin="bevel"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_14165_8000"
          x="-15"
          y="-15"
          width="800"
          height="466"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_14165_8000" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_14165_8000"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_14165_8000"
          x1="248.467"
          y1="-62.2917"
          x2="359.206"
          y2="506.522"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED8936" stopOpacity="0.85" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </Icon>
  )
}
