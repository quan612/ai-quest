import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  ButtonGroup,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react'

const QuestWrapper = ({ children }) => {
  const bp = useBreakpointValue({ base: 'base', md: 'md' }, { ssr: false })

  return (
    <Box position="relative" className="quest-wrapper" w="100%">
      <Box w="100%" h={{ base: '352px', lg: '536px' }}>
        {bp === 'md' && <QuestFrameSvg />}
        {bp === 'base' && <QuestFramgMobileSvg />}
      </Box>
      <Flex
        position="absolute"
        direction="column"
        top="0"
        left="0"
        justifyContent={{ base: 'space-between', md: 'center' }}
        alignItems="center"
        w="100%"
        h="100%"
        gap={{ base: '24px', lg: '45px' }}
        p={{ base: '1.5rem 22px', lg: '2rem 4rem' }}
        className="quest-wrapper-content"
      >
        {children}
      </Flex>
    </Box>
  )
}

export default QuestWrapper

const QuestFramgMobileSvg = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 328 352"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_14489_3800)">
        <rect x="1" y="1" width="326" height="350" rx="10" fill="black" fillOpacity="0.8" />
        <rect
          x="1"
          y="1"
          width="326"
          height="350"
          rx="10"
          fill="url(#paint0_linear_14489_3800)"
          fillOpacity="0.2"
        />
        <rect
          x="0.5"
          y="0.5"
          width="327"
          height="351"
          rx="10.5"
          stroke="white"
          strokeOpacity="0.16"
          strokeLinejoin="bevel"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_14489_3800"
          x="-15"
          y="-15"
          width="358"
          height="382"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_14489_3800" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_14489_3800"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_14489_3800"
          x1="106.044"
          y1="-50.0417"
          x2="260.952"
          y2="368.769"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED8936" stopOpacity="0.85" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>

    // <svg
    //   width="100%"
    //   height="100%"
    //   viewBox="0 0 322 447"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <g filter="url(#filter0_b_14489_3800)">
    //     <rect x="1" y="1" width="320" height="445" rx="10" fill="black" fill-opacity="0.8" />
    //     <rect
    //       x="1"
    //       y="1"
    //       width="320"
    //       height="445"
    //       rx="10"
    //       fill="url(#paint0_linear_14489_3800)"
    //       fill-opacity="0.2"
    //     />
    //     <rect
    //       x="0.5"
    //       y="0.5"
    //       width="321"
    //       height="446"
    //       rx="10.5"
    //       stroke="white"
    //       stroke-opacity="0.16"
    //       stroke-linejoin="bevel"
    //     />
    //   </g>
    //   <defs>
    //     <filter
    //       id="filter0_b_14489_3800"
    //       x="-15"
    //       y="-15"
    //       width="352"
    //       height="477"
    //       filterUnits="userSpaceOnUse"
    //       color-interpolation-filters="sRGB"
    //     >
    //       <feFlood flood-opacity="0" result="BackgroundImageFix" />
    //       <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
    //       <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_14489_3800" />
    //       <feBlend
    //         mode="normal"
    //         in="SourceGraphic"
    //         in2="effect1_backgroundBlur_14489_3800"
    //         result="shape"
    //       />
    //     </filter>
    //     <linearGradient
    //       id="paint0_linear_14489_3800"
    //       x1="104.111"
    //       y1="-63.8958"
    //       x2="339.982"
    //       y2="428.438"
    //       gradientUnits="userSpaceOnUse"
    //     >
    //       <stop stop-color="#ED8936" stop-opacity="0.85" />
    //       <stop offset="1" stop-opacity="0" />
    //     </linearGradient>
    //   </defs>
    // </svg>
  )
}

const QuestFrameSvg = () => {
  return (
    <Icon
      width="100%"
      height="100%"
      viewBox="0 0 770 436"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="quest-frame-desktop-svg"
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
