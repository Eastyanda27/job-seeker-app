import type { DefaultOptions, UseMutationOptions } from "@tanstack/react-query";

export const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  },
};

export type ApiFnReturn<T extends (...args: never[]) => Promise<unknown>> = Awaited<ReturnType<T>>;
export type MutationConfig<T extends (...args: never[]) => Promise<unknown>> = UseMutationOptions<
  ApiFnReturn<T>,
  Error,
  Parameters<T>[0]
>;
