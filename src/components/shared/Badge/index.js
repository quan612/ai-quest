import { Heading, Text, Box, Flex } from '@chakra-ui/react'

// xs: "14px",
// sm: "16px",
// md: "20px",
// lg: "24px",

export const Badge = (props) => {
  return (
    <Box color={`${props.isDisabled ? "gray.600" : "orange.400"}`} {...props}>
      <Text as={'span'} fontSize={'sm'} border="1px solid" borderColor="currentColor" borderRadius="2px" p="0px 4px">
        {props.children}
      </Text>
    </Box>
  )
}
