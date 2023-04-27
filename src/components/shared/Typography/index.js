import { Heading, Text, useBreakpointValue } from '@chakra-ui/react'

// xs: "14px",
// sm: "16px",
// md: "20px",
// lg: "24px",

export const Heading2XL = (props) => {
  const hd2xl = useBreakpointValue({ base: 'base', lg: 'md' }, { ssr: false })


  return (
    <Heading
      // fontSize={{ base: "36px", lg: "48px" }}
      fontSize={{ base: "32px", lg: "48px" }}
      color="orange.300" textShadow="0px 0px 15px #ED8936" fontWeight={"400"}
      textAlign="center"
      {...props}>
      {props.children}
    </Heading>
  )
}

export const HeadingXL = (props) => {
  return (
    <Heading size="xl" color="orange.400" textShadow="0px 0px 15px #ED8936" fontWeight={"400"} p="16px 0px" {...props}>
      {props.children}
    </Heading>
  )
}

export const HeadingSm = (props) => {
  return (
    <Heading size="sm" {...props}>
      {props.children}
    </Heading>
  )
}

export const HeadingLg = (props) => {
  return (
    <Heading fontSize={{ base: "md", lg: "30px" }} {...props}>
      {props.children}
    </Heading>
  )
}

export const TextSm = (props) => {
  return (
    <Text fontSize="sm" {...props}>
      {props.children}
    </Text>
  )
}

export const TextMd = (props) => {
  return (
    <Text fontSize="md" {...props}>
      {props.children}
    </Text>
  )
}
export const TextXL = (props) => {
  return (
    <Text fontSize={{ base: "16px", lg: "xl" }} lineHeight={{ base: "24px", lg: "xl" }} fontWeight={"400"} color="white" textAlign={"center"} {...props} >
      {props.children}
    </Text>
  )
}

export const Text2XL = (props) => {

  const bp = useBreakpointValue({ base: 'base', lg: 'md' }, { ssr: false })
  return (
    <Text fontSize={{ base: "lg", lg: "2xl" }} lineHeight={bp === 'base' ? "24px" : "36px"} fontWeight={"400"} color="white" textAlign={"center"} {...props} >
      {props.children}
    </Text>
  )
}