import { useMutation } from "@tanstack/react-query";
import { submitContactMessage } from "../services/contactService.js";
import type { ContactMessageInput } from "../types/contact.schemas.js";

export function useSubmitContact() {
  return useMutation<void, Error, ContactMessageInput>({
    mutationFn: submitContactMessage,
  });
}
