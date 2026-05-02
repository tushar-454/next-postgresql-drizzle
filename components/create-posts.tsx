"use client";

import { createPost } from "@/actions/actions";
import { toast } from "sonner";
import FormButton from "./form-button";
import { Input } from "./ui/input";

export default function CreatePostForm({ userId }: { userId: number }) {
    async function handlePostSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const result = await createPost(formData);
        if (!result.success) {
            toast.error(result.error || "Failed to create post");
        } else {
            toast.success("Post created successfully");
            form.reset();
        }
    }

    return (
        <form
            onSubmit={handlePostSubmit}
            className="flex flex-col gap-2"
        >
            <Input
                name="title"
                placeholder="Title"
                className="border p-1 text-sm rounded"
            />
            <Input
                name="content"
                placeholder="Content"
                className="border p-1 text-sm rounded"
            />
            <Input
                type="hidden"
                name="userId"
                value={userId}
            />
            <FormButton>Create Post</FormButton>
        </form>
    );
}
