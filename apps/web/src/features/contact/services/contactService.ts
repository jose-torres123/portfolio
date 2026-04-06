import { supabase } from "@/lib/supabase/client.js";
import type { ContactMessageInput } from "../types/contact.schemas.js";

export async function submitContactMessage(data: ContactMessageInput): Promise<void> {
  const { error } = await supabase.from("contact_messages").insert(data);
  if (error) throw new Error(error.message);
}
