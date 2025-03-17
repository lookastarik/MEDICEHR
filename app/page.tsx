import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the preview page
  redirect("/preview")
}

