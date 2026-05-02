"use client";

import { useOptimistic, useTransition } from "react";

export function useOptimisticAction<TData, TInput, TResult = void>(
    currentData: TData,
    updateFn: (currentData: TData, input: TInput) => TData,
) {
    const [optimisticData, setOptimisticData] = useOptimistic(
        currentData,
        updateFn,
    );

    const [isPending, startTransition] = useTransition();

    const execute = async (
        action: (input: TInput) => Promise<TResult>,
        input: TInput,
    ): Promise<TResult> => {
        startTransition(() => {
            setOptimisticData(input);
        });

        try {
            return await action(input);
        } catch (error) {
            console.error(error);
            throw error; // important
        }
    };

    return { optimisticData, isPending, execute };
}
