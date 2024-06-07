import zod from "zod";

const signUpSchema = zod.object({
    userName: zod.string().min(3).max(30).refine((value) => {
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

export default {
    signUpSchema
}