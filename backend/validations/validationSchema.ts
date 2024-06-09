import zod from "zod";

const signUpSchema = zod.object({
    userName: zod.string().email().min(3).max(30).refine((value) => {
        const containsWhiteSpace = value === value.trim();
        const everythingInLowercase = value === value.toLowerCase();
        return containsWhiteSpace && everythingInLowercase;
    }),
    password: zod.string().min(8).max(16),
    firstName: zod.string().max(50).refine((value) => {
        return value === value.trim();
    }),
    lastName: zod.string().max(50).refine((value) => {
        return value === value.trim();
    })
}).strict();

const logInSchema = zod.object({
    userName: zod.string().email().min(3).max(30).refine((value) => {
        const containsWhiteSpace = value === value.trim();
        const everythingInLowercase = value === value.toLowerCase();
        return containsWhiteSpace && everythingInLowercase;
    }),
    password: zod.string().min(8).max(16)
}).strict();

const updateUserSchema = zod.object({
    password: zod.string().min(8).max(16).optional(),
    firstName: zod.string().max(50).refine((value) => {
        return value === value.trim();
    }).optional(),
    lastName: zod.string().max(50).refine((value) => {
        return value === value.trim();
    }).optional()
})

export default {
    signUpSchema,
    logInSchema,
    updateUserSchema
}