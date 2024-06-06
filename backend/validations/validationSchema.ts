import zod from "zod";

const signUpSchema = zod.object({
    userName: zod.string(),
    password: zod.string().min(8).max(16),
    firstName: zod.string(),
    lastName: zod.string()
}).strict();

export default {
    signUpSchema
}