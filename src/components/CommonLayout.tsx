'use client'

import Link from "next/link"
import {

  CircleUser,
 
  Home,
 
  Menu,
 
  Package2,
  Search,
 
  Telescope,
 
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {useRouter} from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { signOut, useSession } from "next-auth/react"
import { useToast } from "./ui/use-toast"
import React, { useEffect } from "react"
import { SearchContext } from "./SearchContext"


export default function CommonLayout({children}:{children:React.ReactNode}) {

  const session = useSession()
  const router = useRouter()
  const {toast} = useToast()
  const {  searchText,setSearchText } = React.useContext(SearchContext);

  const handleLogout = () => {
    toast({
      title:"Logged out successfully",
    })
    signOut({callbackUrl:"/sign-in",redirect:true})
  }

 


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Telescope  className="h-4 w-4" />
              Explore
            </Link>

            
          </nav>
        </div>
       
      </div>
    </div>
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Telescope  className="h-4 w-4" />
              Explore
            </Link>
            
           
            </nav>
           
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          
            <div className="relative flex  gap-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value) }
                placeholder="Search blogs..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            <Button onClick={() => router.push('/explore')}>Search</Button>
            </div>
          
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
           <div className="flex items-center justify-center sp">
           {
              session.data?.user && <p className="font-bold">{session.data.user.name}</p>
            }
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
           </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            {
              session.data?.user ? <DropdownMenuItem onClick={ handleLogout }>Logout</DropdownMenuItem> :<DropdownMenuItem onClick={() => router.push('/sign-in')}>Login  </DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 item-center justify-center flex-col gap-4 p-4 lg:gap-6 lg:p-6">
       {children}
      </main>
    </div>
  </div>
  )
}
