import { Button } from "@/components/ui/button";
import UsersList from "@/components/users-list";
import Link from "next/link";

export default function Home() {
    return (
        <main className="m-5">
            <div className="">
                <h1 className="text-2xl font-bold mb-4">
                    Drizzle + Next.js Test
                </h1>

                <h4 className="text-lg mb-5">
                    List of users will be displayed here after creation.
                </h4>

                <Link href="/create">
                    <Button variant="secondary">Create User</Button>
                </Link>
            </div>

            <UsersList />
        </main>
    );
}
