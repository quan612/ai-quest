import { Heading, Text } from '@chakra-ui/react'

// xs: "14px",
// sm: "16px",
// md: "20px",
// lg: "24px",

export const Heading2XL = (props) => {
  return (
    <Heading size="2xl" color="orange.300" textShadow="0px 0px 15px #ED8936" fontWeight={"400"}
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
    <Heading size="lg" {...props}>
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
    <Text fontSize="xl" lineHeight="30px" fontWeight={"400"} color="white" textAlign={"center"} {...props} >
      {props.children}
    </Text>
  )
}

export const Text2XL = (props) => {
  return (
    <Text fontSize="2xl" lineHeight="36px" fontWeight={"400"} color="white" textAlign={"center"} {...props} >
      {props.children}
    </Text>
  )
}