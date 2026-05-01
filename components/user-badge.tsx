"use client";
import { updateUser } from "@/actions/actions";
import { User } from "@/lib/db/schema";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

export default function UserBadge({ user }: { user: User }) {
    async function handleUpdate() {
        try {
            const formData = new FormData();
            formData.append("id", user.id.toString());
            formData.append("name", user.name);
            formData.append("isActive", (!user.isActive).toString());
            const result = await updateUser(formData);
            if (!result.success) {
                toast.error(`Error: ${result.error}`);
            } else {
                toast.success("User status updated successfully.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`);
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    }
    return (
        <Badge
            onClick={handleUpdate}
            variant={user.isActive ? "default" : "destructive"}
            className="cursor-pointer"
        >
            {user.isActive ? "Active" : "Inactive"}
        </Badge>
    );
}
