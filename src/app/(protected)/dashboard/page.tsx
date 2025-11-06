'use client'

import useProject from "@/hooks/use-projects"
import { useUser } from "@clerk/clerk-react"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { project } = useProject()

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-y-4">
        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is linked to {' '}
                <Link href={project?.repoUrl ?? ""} className="inline-flex items-center text-white/80 hover:underline">
                  {project?.repoUrl}
                  <ExternalLink className="size-4 text-white/80" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>

        <div className="flex items-center gap-4">
          teammember
          invitebutton
          archivebutton
        </div>

      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          AskQuestion
          Meetings
        </div>
      </div>


      <div className="mt-8"></div>

      CommitLOg
      
    </div>
  )
}