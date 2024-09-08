import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function BookModal({
  isOpen,
  onOpenChange,
  slot,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  slot: { date: string; hour: number };
}) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="auto"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 dark">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <div>
                <div>Date: {slot.date}</div>
                <div>Hour: {slot.hour}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
