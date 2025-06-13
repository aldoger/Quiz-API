import { customAlphabet } from "nanoid";

export const generateShortId = (size: number): string => {
    const nanoid = customAlphabet('123456789abcdefghijklmnopqerstuvwxyz', size);
    return nanoid();
};
