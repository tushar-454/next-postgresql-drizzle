"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FormButton({
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
}) {
    const { pending } = useFormStatus();
    return (
        <Button
            {...props}
            disabled={pending}
        >
            {pending ? <LoaderCircle className="animate-spin" /> : children}
        </Button>
    );
}
