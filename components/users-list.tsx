import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { Button } from "./ui/button";

async function getUsers() {
    const users = await db.select().from(usersTable).orderBy(usersTable.id);
    return users;
}

export default async function Home() {
    const users = await getUsers();

    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            <div className="w-full max-w-md space-y-4">
                {users.length === 0 ? (
                    <p className="text-gray-500">No users found.</p>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center border p-4 rounded"
                        >
                            <div>
                                <p className="font-bold">{user.name}</p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            {/* We will create this component in Step 3 */}
                            <Button>Delete </Button>
                        </div>
                    ))
                )}
            </div>

            {/* Include the Create Form from Level 1 here if you want */}
        </div>
    );
}
