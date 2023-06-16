import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

export const comparePassword = async (dbPassword: string, currPassword: string): Promise<boolean> => {
    return await bcrypt.compare(currPassword, dbPassword);
}