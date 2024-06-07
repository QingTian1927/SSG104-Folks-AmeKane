import { z, defineCollection } from "astro:content";

const legalCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string().transform((str) => new Date(str)),
    })
});

export const collections = {
    'legal': legalCollection,
}
