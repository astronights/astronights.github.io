import { useState, useEffect } from "react";
import { marked } from 'marked'
import { Skills } from "../types";

const parseSkills = (mdContent: string): Skills => {

    const skills: Skills = {
        technology: {
            languages: {},
            ds: [],
            db: [],
            frameworks: {},
        },
        languages: {},
        others: []
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(mdContent, 'text/html').getElementsByTagName('body')[0];

    Array.from(doc.getElementsByTagName('h2')).forEach((element) => {

        if (element.innerText === 'Technology') {
            Array.from(doc.getElementsByTagName('h3')).forEach((child) => {
                if (child.innerText === 'Programming Languages') {
                    skills.technology.languages = Array.from(child.nextElementSibling.children).reduce((acc, child) => {
                        acc[child.textContent.split(':')[0]] = parseFloat(child.textContent.split(':')[1]);
                        return acc;
                    }, {});
                } else if (child.innerText === 'Data Science') {
                    skills.technology.ds = Array.from(child.nextElementSibling.children).map((child) => child.textContent);
                } else if (child.innerText === 'Database') {
                    skills.technology.db = Array.from(child.nextElementSibling.children).map((child) => child.textContent);
                } else if (child.innerText === 'Frameworks') {
                    skills.technology.frameworks = Array.from(child.nextElementSibling.children).reduce((acc, child) => {
                        acc[child.textContent.split('@_@')[0]] = child.textContent.split('@_@')[1];
                        return acc;
                    }, {});
                }
            });

        } else if (element.innerText === 'Languages') {
            Array.from(element.nextElementSibling.children).forEach((child) => {
                const details = child.textContent
                skills.languages[details.split(':')[0]] = parseFloat(details.split(':')[1]);
            });
        } else if (element.innerText === 'Others') {
            skills.others = Array.from(element.nextElementSibling.children).map((child) => child.textContent);
        }

    })

    console.log(skills);

    return skills;

};

const SkillsArray = (): Skills => {
    const [skills, setSkills] = useState({
        technology: {
            languages: {},
            ds: [],
            db: [],
            frameworks: {},
        },
        languages: {},
        others: []
    });

    useEffect(() => {
        fetch("/content/Skills.md")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch markdown content");
                }
                return response.text();
            })
            .then((mdContent) => {
                setSkills(parseSkills(marked(mdContent)));
            })
            .catch((error) => {
                console.error("Error fetching markdown content:", error);
            });
    }, []);

    return skills;
};

export default SkillsArray;