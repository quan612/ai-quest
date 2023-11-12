import React, { useContext, useState, useRef } from 'react'
import { Box, Flex, Button, Text, Icon, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useAccount, useConnect, useNetwork, useSignMessage, useDisconnect } from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { RoadmapLogo } from '@components/shared/Logo'
import NextLink from 'next/link'
import { AppContext, BURN_STATE, FORGE_STATE, MINT_STATE } from '@context/AppContext'

export default function Navigation({ session }) {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const router = useRouter()

  const navigationWrap = useBreakpointValue({ base: 'sm', sm: 'md', lg: 'lg' })

  const { appState } = useContext(AppContext)

  if (router.pathname === '/quest/[id]') {
    return <MinimalNavigation />
  } else
    return (
      <Flex
        className="navigation"
        bg="transparent"
        position={'absolute'}
        top={{ base: '16px', lg: '32px' }}
        h={{ base: '66px', lg: '112px' }}
        w="100%"
        p={navigationWrap === 'lg' ? '0px 128px' : '0px 1rem'}
        zIndex={999}
      >
        {navigationWrap === 'lg' && (
          <Flex className="roadmap-art" flex="45%" align={'center'}>
            <RoadmapLogo />
          </Flex>
        )}

        <Flex
          className="nav-items"
          flex={navigationWrap === 'lg' ? '55%' : '100%'}
          align={'center'}
          justify="space-between"
        >
          {appState.name === MINT_STATE && (
            <>
              <NextLink href="/">
                <Text
                  color={`${router.pathname === '/' ? 'orange.400' : 'white'}`}
                  _hover={{ color: 'orange.400' }}
                  cursor="pointer"
                >
                  MINT
                </Text>
              </NextLink>
              <NextLink href="/quest">
                <Text
                  color={`${router.pathname === '/quest' ? 'orange.400' : 'white'}`}
                  _hover={{ color: 'orange.400' }}
                  cursor="pointer"
                >
                  QUEST
                </Text>
              </NextLink>
            </>
          )}
          {appState.name === BURN_STATE && (
            <>
              <NextLink href="/">
                <Text
                  color={`${router.pathname === '/' ? 'orange.400' : 'white'}`}
                  _hover={{ color: 'orange.400' }}
                  cursor="pointer"
                >
                  BURN
                </Text>
              </NextLink>
              <NextLink href="/leaderboard">
                <Text
                  color={`${router.pathname === '/leaderboard' ? 'orange.400' : 'white'}`}
                  _hover={{ color: 'orange.400' }}
                  cursor="pointer"
                >
                  LEADERBOARD
                </Text>
              </NextLink>
            </>
          )}
          {appState.name === FORGE_STATE && (
            <>
              <NextLink href="/">
                <Text
                  color={`${router.pathname === '/' ? 'orange.400' : 'white'}`}
                  _hover={{ color: 'orange.400' }}
                  cursor="pointer"
                >
                  FORGE
                </Text>
              </NextLink>
              <NextLink href="/leaderboard">
                <Text
                  color={`${router.pathname === '/leaderboard' ? 'orange.400' : 'white'}`}
                  _hover={{ color: 'orange.400' }}
                  cursor="pointer"
                >
                  LEADERBOARD
                </Text>
              </NextLink>
            </>
          )}
          <NextLink href="/about">
            <Text
              color={`${router.pathname === '/about' ? 'orange.400' : 'white'}`}
              _hover={{ color: 'orange.400' }}
              cursor="pointer"
            >
              ABOUT
            </Text>
          </NextLink>

          <WalletButton session={session} />
        </Flex>
      </Flex>
    )
}

export const MinimalNavigation = () => {
  return (
    <Flex
      className="navigation"
      bg="transparent"
      position={'absolute'}
      top={{ base: '16px', lg: '32px' }}
      h={{ base: '66px', lg: '112px' }}
      w="100%"
      p="0px 128px"
      zIndex={999}
      align={'center'}
      justify="center"
    >
      <RoadmapLogo />
    </Flex>
  )
}

import { useOnClickOutside } from 'usehooks-ts'
import { signOut } from 'next-auth/react'
import { shortenAddress } from '@util/index'

const WalletButton = ({ session }) => {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef()
  const { disconnect } = useDisconnect()

  useOnClickOutside(ref, () => setOpen(false))

  console.log(session)
  return (
    <Flex gap="1rem" direction="column" position={'relative'} w="189px" ref={ref}>
      <Box position="relative" cursor={'pointer'} onClick={() => setOpen(!isOpen)}>
        <WalletButtonSvg />
        <Flex
          position="absolute"
          top={0}
          left={0}
          align="center"
          justify="center"
          h="100%"
          w="100%"
        >
          <Text color="#ED8936">
            {session?.user?.name?.length > 0 && shortenAddress(session?.user?.name)}
          </Text>
        </Flex>
      </Box>
      {isOpen && (
        <Button
          position={'absolute'}
          left="0"
          top="4rem"
          bg="blackAlpha.700"
          color="whiteAlpha.700"
          border="1px solid rgba(255, 255, 255, 0.16)"
          padding="10.5px 40.5px!important"
          fontSize={'18px'}
          transition="0.5s"
          onClick={() => {
            disconnect()
            signOut()
            // window.location.reload()
          }}
        >
          DISCONNECT
        </Button>
      )}
    </Flex>
  )
}

const WalletButtonSvg = ({ onClick }) => {
  return (
    <Icon
      width="100%"
      height="100%"
      viewBox="0 0 189 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      cursor="pointer"
    >
      <g filter="url(#filter0_b_14314_1526)">
        <rect width="189" height="48" rx="6" fill="black" fillOpacity="0.5" />
        <rect
          width="189"
          height="48"
          rx="6"
          fill="url(#paint0_linear_14314_1526)"
          fillOpacity="0.2"
        />
        {/* <path
          d="M28.0195 17.8965L27.5361 18.3887V19.0742L27.334 19.2676H26.6484L26.165 19.751V28.6455L26.6484 29.1289H27.334L27.5361 29.3311V30.0166L28.0195 30.5H31.4385L31.9219 30.0166V29.3311L32.124 29.1289H32.8096L33.293 28.6455V19.751L32.8096 19.2676H32.124L31.9219 19.0742V18.3887L31.4385 17.8965H28.0195ZM27.6768 26.0527L28.0195 26.3955H28.7051L31.7812 23.3193L31.9746 23.5127L31.6318 23.8555V28.6455L31.4385 28.8477H28.0195L27.8174 28.6455V26.5977L27.4746 26.2549L27.6768 26.0527ZM31.4385 19.5576L31.6318 19.751V21.8076L31.9746 22.1504L31.7812 22.3438L31.4385 22.001H30.7529L27.6768 25.0859L27.4746 24.8838L27.8174 24.541V19.751L28.0195 19.5576H31.4385ZM42.4248 23.1699L42.2314 23.3721H41.5459L41.0625 23.8555V24.541L40.8604 24.7432L39.4805 23.3721H38.8125L38.5928 23.1699V21.1221L38.1094 20.6387H37.4238L36.958 21.1221V23.1699L37.4238 23.6621H38.1094L38.3291 23.8555V24.541L39.6914 25.9121L39.4805 26.1055H38.8125L38.3291 26.5977V27.2744L38.1094 27.4766H37.4238L36.958 27.96V30.0166L37.4238 30.5H38.1094L38.5928 30.0166V27.96L38.8125 27.7666H39.4805L39.9639 27.2744V26.5977L40.1748 26.3955L41.5459 27.7666H42.2314L42.4248 27.96V30.0166L42.917 30.5H43.6025L44.0684 30.0166V27.96L43.6025 27.4766H42.917L42.6973 27.2744V26.5977L41.335 25.2266L41.5459 25.0244H42.2314L42.6973 24.541V23.8555L42.917 23.6621H43.6025L44.0684 23.1699V21.1221L43.6025 20.6387H42.917L42.4248 21.1221V23.1699ZM53.4902 30.0166V29.3311L53.71 29.1113H54.3955L54.8613 28.6455V22.4932L54.3955 22.001H53.71L53.4902 21.79V21.1045L53.0244 20.6387H49.5879L49.2451 20.9814L49.043 20.7617L49.3857 20.4189V18.3711L48.9023 17.8965H48.2168L47.751 18.3711V30.0166L48.2168 30.5H53.0244L53.4902 30.0166ZM49.043 28.9883L49.3857 28.6455V22.4932L49.043 22.1328L49.2451 21.9307L49.5879 22.2734H53.0244L53.2178 22.4932V28.6455L53.0244 28.8477H49.5879L49.2451 29.1816L49.043 28.9883ZM64.3008 30.0166V29.3311L64.5029 29.1289H65.1885L65.6719 28.6455V25.2266L65.1885 24.7432H64.5029L64.3008 24.541V23.8555L64.5029 23.6621H65.1885L65.6719 23.1699V19.751L65.1885 19.2676H64.5029L64.3008 19.0742V18.3887L63.8174 17.8965H60.3984L59.915 18.3887V19.0742L59.7129 19.2676H59.0273L58.5439 19.751V20.4365L59.0273 20.9199H59.7129L60.1963 20.4365V19.751L60.3984 19.5576H63.8174L64.0107 19.751V23.1699L63.8174 23.3721H60.3984L59.915 23.8555V24.541L60.3984 25.0244H63.8174L64.0107 25.2266V28.6455L63.8174 28.8477H60.3984L60.1963 28.6455V27.96L59.7129 27.4766H59.0273L58.5439 27.96V28.6455L59.0273 29.1289H59.7129L59.915 29.3311V30.0166L60.3984 30.5H63.8174L64.3008 30.0166ZM74.8037 22.4932V23.1699L74.6104 23.3721H73.9248L70.708 26.5977V27.2744L70.4883 27.4766H69.8027L69.3369 27.96V30.0166L69.8027 30.5H75.9814L76.4473 30.0166V29.3311L75.9814 28.8477H71.1914L70.8311 29.1816L70.6289 28.9883L70.9717 28.6455V27.96L71.1914 27.7666H71.8594L75.0762 24.541V23.8555L75.2959 23.6621H75.9814L76.4473 23.1699V21.1221L75.9814 20.6387H69.8027L69.3369 21.1221V21.8076L69.8027 22.291H74.6104L74.9531 21.9482L75.1465 22.1504L74.8037 22.4932ZM85.4033 17.8965H81.9844L81.501 18.3887V19.0742L81.2988 19.2676H80.6133L80.1299 19.751V28.6455L80.6133 29.1289H81.2988L81.501 29.3311V30.0166L81.9844 30.5H85.4033L85.8867 30.0166V29.3311L86.0889 29.1289H86.7744L87.2578 28.6455V25.2266L86.7744 24.7432H86.0889L85.8867 24.541V23.8555L85.4033 23.3721H81.9844L81.6416 23.7148L81.4395 23.5127L81.7822 23.1699V19.751L81.9844 19.5576H85.4033L85.5967 19.751V20.4365L86.0889 20.9199H86.7744L87.2578 20.4365V19.751L86.7744 19.2676H86.0889L85.8867 19.0742V18.3887L85.4033 17.8965ZM81.9844 28.8477L81.7822 28.6455V25.2266L81.4395 24.8838L81.6416 24.6816L81.9844 25.0244H85.4033L85.5967 25.2266V28.6455L85.4033 28.8477H81.9844ZM92.5752 18.3887L92.0918 17.8965H91.4062L90.9229 18.3887V23.1699L91.4062 23.6621H92.0918L92.2939 23.8555V24.541L92.7773 25.0244H96.1963L96.5391 24.6816L96.7324 24.8838L96.3896 25.2266V30.0166L96.8818 30.5H97.5674L98.0508 30.0166V18.3887L97.5674 17.8965H96.8818L96.3896 18.3887V23.1699L96.7324 23.5127L96.5391 23.7148L96.1963 23.3721H92.7773L92.5752 23.1699V18.3887ZM107.473 30.0166V29.3311L107.675 29.1289H108.36L108.844 28.6455V25.2266L108.36 24.7432H107.675L107.473 24.541V23.8555L106.989 23.3721H103.57L103.368 23.1699V19.751L103.025 19.4082L103.228 19.2148L103.57 19.5576H108.36L108.844 19.0742V18.3887L108.36 17.8965H102.199L101.716 18.3887V23.1699L102.199 23.6621H102.885L103.087 23.8555V24.541L103.57 25.0244H106.989L107.183 25.2266V28.6455L106.989 28.8477H103.57L103.368 28.6455V27.96L102.885 27.4766H102.199L101.716 27.96V28.6455L102.199 29.1289H102.885L103.087 29.3311V30.0166L103.57 30.5H106.989L107.473 30.0166Z"
          fill="#ED8936"
        /> */}
        {/* <g filter="url(#filter1_d_14314_1526)">
          <circle cx="127" cy="24" r="6" fill="#FBD38D" />
        </g> */}
        {/* <path
          d="M150.317 17.8965H146.898L146.415 18.3887V19.0742L146.213 19.2676H145.527L145.044 19.751V20.4365L145.527 20.9199H146.213L146.696 20.4365V19.751L146.898 19.5576H150.317L150.511 19.751V21.8076L150.317 22.001H149.632L146.415 25.2266V25.9121L146.213 26.1055H145.527L145.044 26.5977V30.0166L145.527 30.5H151.688L152.172 30.0166V29.3311L151.688 28.8477H146.898L146.556 29.1816L146.354 28.9883L146.696 28.6455V26.5977L146.898 26.3955H147.584L150.801 23.1699V22.4932L151.003 22.291H151.688L152.172 21.8076V19.751L151.688 19.2676H151.003L150.801 19.0742V18.3887L150.317 17.8965ZM161.594 30.0166V29.3311L161.796 29.1289H162.481L162.965 28.6455V25.2266L162.481 24.7432H161.796L161.594 24.541V23.8555L161.796 23.6621H162.481L162.965 23.1699V19.751L162.481 19.2676H161.796L161.594 19.0742V18.3887L161.11 17.8965H157.691L157.208 18.3887V19.0742L157.006 19.2676H156.32L155.837 19.751V20.4365L156.32 20.9199H157.006L157.489 20.4365V19.751L157.691 19.5576H161.11L161.304 19.751V23.1699L161.11 23.3721H157.691L157.208 23.8555V24.541L157.691 25.0244H161.11L161.304 25.2266V28.6455L161.11 28.8477H157.691L157.489 28.6455V27.96L157.006 27.4766H156.32L155.837 27.96V28.6455L156.32 29.1289H157.006L157.208 29.3311V30.0166L157.691 30.5H161.11L161.594 30.0166Z"
          fill="#FBD38D"
        /> */}
        <rect x="0.5" y="0.5" width="188" height="47" rx="5.5" stroke="#ED8936" />
      </g>
      <defs>
        <filter
          id="filter0_b_14314_1526"
          x="-15"
          y="-15"
          width="219"
          height="78"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_14314_1526" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_14314_1526"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_14314_1526"
          x="113"
          y="10"
          width="28"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.929412 0 0 0 0 0.537255 0 0 0 0 0.211765 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14314_1526" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_14314_1526"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_14314_1526"
          x1="60.9"
          y1="-7"
          x2="66.5696"
          y2="57.7986"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED8936" stopOpacity="0.85" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </Icon>
  )
}
