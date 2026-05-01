"use client";

import { deletePost } from "@/actions/actions";
import { Badge } from "./ui/badge";

export default function DeletePostButton({ postId }: { postId: number }) {
    const handleDelete = async () => {
        const formData = new FormData();
        formData.append("id", postId.toString());
        await deletePost(formData);
    };
    return (
        <Badge
            variant={"destructive"}
            className="cursor-pointer"
            onClick={handleDelete}
        >
            Delete
        </Badge>
    );
}
