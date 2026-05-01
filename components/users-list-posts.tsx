import { getUsersWithPosts } from "@/queries";
import CreatePostForm from "./create-posts";
import DeletePostButton from "./delete-post-button";

export default async function Home() {
    const users = await getUsersWithPosts();

    return (
        <main className="min-h-screen p-24">
            <h1 className="text-3xl font-bold mb-8">Users & Posts</h1>

            <div className="space-y-8">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="border rounded-lg p-6 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-xl font-bold">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                                <span
                                    className={`text-xs px-2 py-1 rounded ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                            {/* Simple Form to Add Post for this User */}
                        </div>
                        <CreatePostForm userId={user.id} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h3 className="font-semibold mb-2">
                                Posts ({user.posts.length})
                            </h3>
                            {user.posts.length === 0 ? (
                                <p className="text-gray-400 text-sm">
                                    No posts yet.
                                </p>
                            ) : (
                                <ul className="space-y-2">
                                    {user.posts.map((post) => (
                                        <li
                                            key={post.id}
                                            className="border-b pb-2 last:border-0 last:pb-0"
                                        >
                                            <p className="font-medium">
                                                {post.title}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {post.content}
                                            </p>
                                            <DeletePostButton
                                                postId={post.id}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
