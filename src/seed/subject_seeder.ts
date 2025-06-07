import Subject, { SubjectAttributes, SubjectInstance } from "../models/subject";
import { generateShortId } from "../utils/shortidgenerator";

export const SeedSubject = async () => {
    
    console.info("Seeding subject...");

    const subjectData: SubjectAttributes[] = [
        {
            id: generateShortId(6),
            mata_kuliah: "Dasar Pemrograman",
            src: "/photos/images/dasprog/dasprog.png",
        },
        {
            id: generateShortId(6),
            mata_kuliah: "Pengembangan Perangkat Lunak",
            src: "/photos/images/ppl/SDLC.png"
        },
        {
            id: generateShortId(6),
            mata_kuliah: "Sistem Digital",
            src: "/photos/images/sisdig/sisdig.png"
        }
    ];

    try {

        const count = await Subject.findAll();
        if(count.length > 0){
            console.info("Subjects already exist");
            return;
        };

        for (const subject of subjectData){
            await Subject.create(subject);
        };

        console.info("Subject successfully seed");
    }catch(e: unknown){
        console.error(e);
    }
}