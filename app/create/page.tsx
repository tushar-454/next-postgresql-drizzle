"use client";

import { createUser } from "@/actions/actions";
import FormButton from "@/components/form-button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateUser() {
    const router = useRouter();
    const handleUserCreate = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const result = await createUser(formData);
            if (result.success) {
                toast.success("User created successfully.");
                router.push("/");
            } else {
                toast.error(`Error: ${result.error}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
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
                <Input
                    name="name"
                    placeholder="Name"
                    className="border p-2 text-black"
                />
                <Input
                    name="email"
                    placeholder="Email"
                    className="border p-2 text-black"
                />
                <FormButton type="submit">Create User</FormButton>
            </form>
        </main>
    );
}
