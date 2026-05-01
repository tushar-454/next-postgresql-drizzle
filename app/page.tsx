"use client";

import { createUser } from "@/actions/actions";

export default function Home() {
    const handleUserCreate = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const result = await createUser(formData);
            if (result.success) {
                alert("User created successfully.");
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred.");
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-2xl font-bold mb-4">Drizzle + Next.js Test</h1>

            <form
                onSubmit={handleUserCreate}
                className="flex flex-col gap-4"
            >
                <input
                    name="name"
                    placeholder="Name"
                    className="border p-2 text-black"
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    className="border p-2 text-black"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Create User
                </button>
            </form>
        </main>
    );
}
