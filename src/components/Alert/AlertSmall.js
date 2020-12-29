import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  CloseButton
} from "@chakra-ui/react"

function AlertSmall (props) {
  return (
    <Alert status={props.status}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{props.title}</AlertTitle>
        <AlertDescription display="block">{props.text}</AlertDescription>
      </Box>
      <CloseButton 
      position="absolute" 
      right="8px" 
      top="8px" 
      onClick={props.cancelAction}
      />
    </Alert>
  )
}

export default AlertSmall;