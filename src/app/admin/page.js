'use client';

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';



export default function AdminPage() {
  const session = useSession();


  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };



  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: "url(/images/background/banner_1.png)" }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">Admin Dashboard</h1>
            <p className="text-white m-b0">Welcome back, {session?.data?.user?.name}</p>
          </div>
        </div>
      </div>
      <div className="section-full content-inner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="p-a30 border-1 seth">
                <p className="m-b20">
                  You are logged in as <strong>{session?.data?.user?.email}</strong>.
                </p>
                <Flex className="m-t20" wrap="wrap" gap="3" align="center">
                  <Button size="3" variant="soft" asChild>
                    <Link href="/admin/recent-posts">Recent Posts</Link>
                  </Button>
                  <Button size="3" variant="soft" asChild>
                    <Link href="/admin/projects">Projects</Link>
                  </Button>

                  <Button size="3" variant="soft" asChild>
                    <Link href="/admin/blogs">Blogs</Link>
                  </Button>


                  <Button size="3" variant="soft" asChild>
                    <Link href="https://clustrmaps.com/site/1c1eu" target='_blank' title="Visit tracker">Visitors count</Link>
                  </Button>

                  <Button size="3" variant="soft" color="red" onClick={handleSignOut}>
                    Sign out
                  </Button>







                </Flex>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
