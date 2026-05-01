"use client";

import { createPost } from "@/actions/actions";
import FormButton from "./form-button";
import { Input } from "./ui/input";

export default function CreatePostForm({ userId }: { userId: number }) {
    return (
        <form
            action={async (formData) => {
                await createPost(formData);
            }}
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
