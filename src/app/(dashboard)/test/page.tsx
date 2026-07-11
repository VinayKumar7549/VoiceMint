import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { HealthCheck } from "./help-check";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary"

export default function TestPage() {
    prefetch(trpc.health.queryOptions())
    return (
        <HydrateClient>
            <div>
                < ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <Suspense fallback={<div>Loading...</div> }>
                        <HealthCheck/>
                    </Suspense>
                </ErrorBoundary>
                
                
            </div>
        </HydrateClient>
    )
}