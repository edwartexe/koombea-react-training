import { Spinner, Flex} from "@chakra-ui/react"

function AppLoading (){
  return (
      <Flex align="center" justify="center">
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    
  );
}

export default AppLoading;