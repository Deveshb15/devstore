import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import Link from 'next/link'
import { useRouter } from "next/router"

export default function Home() {
  // console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(!user) {
      router.push('/login')
    } else {
      router.push('/folder')
    }
  })

  return (
    <div>
      Got to 
      <Link href="/login">
        /login
      </Link>
    </div>
  )
}
