import Coder, { CoderAttributes } from '../models/user'
import { generateShortId } from '../utils/shortidgenerator'
import bcrypt from 'bcrypt'

export const SeedUser = async () => {
    console.info("Seeding user...");

    const userData: CoderAttributes[] = [
        {
            email: "nainggolanben12@gmail.com",
            id: generateShortId(8),
            password: await bcrypt.hash("Aldoger19!", 5),
            isVerified: true,
        },
        {
            email: "madesatya505@gmail.com",
            id: generateShortId(8),
            password: await bcrypt.hash("satya", 5),
            isVerified: true,
        }
    ];

    try {
        const count = await Coder.count();
        if (count > 0) {
            console.info("User already exists");
            return;
        }

        for (const user of userData) {
            await Coder.create(user);
        }

        console.info("User successfully seeded");
    } catch (e: unknown) {
        console.error(e);
    }
};
