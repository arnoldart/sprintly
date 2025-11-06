'use client'

import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import useProject from '@/hooks/use-projects'
import { cn } from '@/lib/utils'
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Q&A',
        url: '/qa',
        icon: Bot
    },
    {
        title: 'Meetings',
        url: '/meetings',
        icon: Presentation
    },
    {
        title: 'Billing',
        url: '/billing',
        icon: CreditCard
    }
]

const projects = [
    {
        title: 'Project Alpha',
    },
    {
        title: 'Project Beta',
    },
    {
        title: 'Project Gamma',
    }
]

function AppSidebar() {
    const pathname = usePathname()
    const {open} = useSidebar()
    const {projects, projectId, setProjectId} = useProject()
    
    return (
        <Sidebar collapsible='icon' variant='floating'>
            <SidebarHeader>
                Logo
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url} className={cn({ '!bg-primary !text-white': pathname === item.url })}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Project
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects?.map((project) => (
                                <SidebarMenuItem className='cursor-pointer' key={project.name} onClick={() => setProjectId(project.id)}>
                                    <SidebarMenuButton asChild>
                                        <div>
                                            <div className={cn(
                                                'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',
                                                {
                                                    // 'bg-primary text-white': true
                                                    'bg-primary text-white' : project.id === projectId

                                                }
                                            )}>
                                                {project.name.charAt(0)}
                                            </div>
                                            {project.name}
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <div className='h-2'></div>
                            {open && (
                              <SidebarMenuItem>
                                <Link href="/create">
                                  <Button size={'sm'} variant={"outline"} className='w-fit'>
                                    <Plus />
                                    New Project
                                  </Button>
                                </Link>
                              </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar