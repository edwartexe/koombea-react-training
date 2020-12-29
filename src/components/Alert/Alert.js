import {useState, useRef} from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react"

function AlertBasic (props) {
  const [isOpen, setIsOpen] = useState(true)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {props.bodyText}
            </AlertDialogBody>

            <AlertDialogFooter>
              {props.showCancel?
                <Button ref={cancelRef} onClick={props.cancelAction}>
                  Close
                </Button>
              :null
              }
              <Button colorScheme="green" onClick={props.okAction} ml={3}>
                {props.okText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}

export default AlertBasic;