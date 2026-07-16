import * as Sentry from "@sentry/node";
import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from "superjson"; 
 
export const createTRPCContext = cache(async () => {  //we are returning an emtpy object and not implementing auth here bcz to see if a user is logged in we need to query "clerk await(auth)" so using this we only be adding additional overhead
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return {};
});
 
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
});

// if the sentry subscription ends delete this
const sentryMiddleware = t.middleware(
    Sentry.trpcMiddleware({
        attachRpcInput: true,
    }),
);
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(sentryMiddleware);  // remove the .use(sentryMiddleware) if the sentry sub ends 


// Authenticated procedure - calls auth() only when needed            
export const authProcedure = baseProcedure.use(async ({ next }) => {    // This is a Middkeware , so we use {next}
    const { userId } = await auth();                                            // clerk await(auth)

    if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
        ctx: { userId },
    });
});

// Organization procedure - requires userId and orgId
export const orgProcedure = baseProcedure.use(async ({ next }) => {
    const { userId, orgId } = await auth();

    if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (!orgId) {
        throw new TRPCError({
        code: "FORBIDDEN",
        message: "Organization required",
        });
    }

    return next({ ctx: { userId, orgId } });
});