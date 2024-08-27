'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import DeleteAlert from "@/components/Delete-alert";

export interface Posts {
  created_at: string;
  id: number;
  image: string;
  title: string;
  updated_at: string;
  userId: number;
  description: string;

}

export default function Dashboard() {
  const router = useRouter();
  const session = useSession();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/blog/get-user-blogs");
        setPosts(res.data.postsByUser);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);



  return (
    <div>
      {
        session.data?.user ? <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Tabs defaultValue="all">
                <div className="flex items-center">
                  <div className="ml-auto flex items-center gap-2">
                    <Button onClick={ () => router.push("/add-blog") } size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Blog
                      </span>
                    </Button>

                  </div>
                </div>
                <TabsContent value="all">
                  <Card>
                    <CardHeader>
                      <CardTitle>Blogs</CardTitle>
                      <CardDescription>
                        Manage your blogs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="hidden md:table-cell">Likes</TableHead>
                            <TableHead className="hidden md:table-cell">Created at</TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          { loading ? (
                            <TableRow>
                              <TableCell>Loading...</TableCell>
                            </TableRow>
                          ) : (
                            posts.map((post) => (
                              <TableRow key={ post.id }>
                                <TableCell className="hidden sm:table-cell">
                                  <Image
                                    alt="Product image"
                                    className=" rounded-md object-cover"
                                    height="64"
                                    src={ post.image }
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium">{ post.title }</TableCell>
                                <TableCell className="truncate overflow-hidden max-w-[200px]">{ post.description }</TableCell>
                                <TableCell className="hidden md:table-cell">299</TableCell>
                                <TableCell className="hidden md:table-cell">{ post.created_at }</TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={ () => router.push(`/update-blog-post/${post.id}`) }>Edit</DropdownMenuItem>
                                      <div className="w-fit flex items-center justify-start p-2 text-sm hover:bg-black/5 ">
                                      <DeleteAlert title={post.title} id={post.id.toString()}/>
                                      </div>

                                      
                                        
                                      
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) }
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong> products
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div> : <h1 className="text-4xl w-full flex items-center justify-center text-orange-500 font-bold">Login to see the blogs</h1>
      }
    </div>
  );
}
