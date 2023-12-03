import { initSveltekitRest } from "sveltekit-rest";
import { z } from "zod";

const r = initSveltekitRest.create()

export const groupOneRouter = {
    one:r.input(z.object({name:z.string()})).get(({input})=>{
        return `Executed groupOneRoute.one with input ${input.name}`
    }),
    two:r.input(z.number()).post(async({input})=>{
        return `Executed groupOneRoute.two with input ${input}`
    })
}