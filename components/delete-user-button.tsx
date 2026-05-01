// components/DeleteUserButton.tsx
"use client";

import { deleteUser } from "@/actions/actions";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DeleteUserButton({ userId }: { userId: number }) {
    const [isPending, startTransition] = useTransition();

    return (
        <form
            action={(formData) => {
                startTransition(() => {
                    deleteUser(formData);
                });
            }}
        >
            <Input
                type="hidden"
                name="id"
                value={userId}
            />
            <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
            >
                {isPending ? "Deleting..." : "Delete"}
            </Button>
        </form>
    );
}
