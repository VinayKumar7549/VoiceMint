import { baseProcedure, createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
    health: baseProcedure.query(async () => {

        //throw new Error("somethingwent worong");
        return { status: "ok", code: 1234}
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;