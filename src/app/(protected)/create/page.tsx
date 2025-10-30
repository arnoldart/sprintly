"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

function CreateProjectPage() {
  const {register, handleSubmit, reset} = useForm<FormInput>()

  const OnSubmit = (data: FormInput) => {
    
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
              placeholder='Repo Url'
              required
              {...register('repoUrl', {required: true})}
            />
            <Input 
              placeholder='Github Token (optional)'
              required
              {...register('githubToken', {required: true})}
            />
            <div className='h-2'></div>
            <Button type='submit'>
              Create Project
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProjectPage