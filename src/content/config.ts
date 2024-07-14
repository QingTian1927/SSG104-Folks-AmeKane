import { z, defineCollection } from "astro:content";

const legalCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string().transform((str) => new Date(str)),
    })
});

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string().transform((str) => new Date(str)),
        author: z.string().default("Rainboot"),
    })
})

export const collections = {
    'legal': legalCollection,
    'blog': blogCollection,
}
