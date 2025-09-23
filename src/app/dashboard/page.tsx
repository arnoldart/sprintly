'use client'

import { useUser } from "@clerk/clerk-react"

export default function DashboardPage() {
  const { user } = useUser()
  
  return (
    <div>
      {user?.firstName}
    </div>
  )
}