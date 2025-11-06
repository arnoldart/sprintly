"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

function CreateProjectPage() {
  const {register, handleSubmit, reset} = useForm<FormInput>()
  const createProject = api.project.createProject.useMutation()
  const refetch = useRefetch()
  
  const OnSubmit = (data: FormInput) => {
    createProject.mutate({
      githubUrl: data.repoUrl,
      name: data.projectName,
      githubToken: data.githubToken
    }, {
      onSuccess: () => {
        toast.success('Project created successfully!')
        refetch()
        reset()
      },
      onError: (err) => {
        toast.error(`Error creating project: ${err.message}`)
      }
    })
  }

  return (
    <div className='flex items-center gap-12 h-full justify-center'>
      {/* <img src="" alt="" className="h-56 w-auto" /> */}
      <div>
        <div>
          <h1 className='font-semibold text-2xl'>
            Link your GitHub Repository
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter the URL of your repository to link it to Sprintly.
          </p>
        </div>
        <div className='h-4'></div>
        <div>
          <form onSubmit={handleSubmit(OnSubmit)} className='flex flex-col gap-2'>
            <Input 
              placeholder='Project Name'
              required
              {...register('projectName', {required: true})}
            />
            <Input 
              placeholder='Github Repo'
              required
              {...register('repoUrl', {required: true})}
            />
            <Input 
              placeholder='Github Token (optional)'
              required
              {...register('githubToken', {required: true})}
            />
            <div className='h-2'></div>
            <Button type='submit' disabled={createProject.isPending}>
              Create Project
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProjectPage