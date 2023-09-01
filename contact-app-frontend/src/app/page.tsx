import { redirect } from "next/navigation";

export default async function IndexPage() {
  redirect("/contacts");
}
