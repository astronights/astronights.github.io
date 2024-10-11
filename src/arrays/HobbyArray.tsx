import { useState, useEffect } from "react";
import { marked } from 'marked'
import { Hobbies } from "../types";

const parseHobbies = (mdContent: string): Hobbies => {

    const hobbies: Hobbies = {
        interests: {},
        activities: []
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(mdContent, 'text/html').getElementsByTagName('body')[0];

    Array.from(doc.getElementsByTagName('h2')).forEach((element) => {

        if (element.innerText === 'Interests') {
            hobbies.interests = Array.from(element.nextElementSibling.children).reduce((acc, child) => {
                acc[child.textContent.split(':')[0]] = parseFloat(child.textContent.split(':')[1]);
                return acc;
            }, {});

        } else if (element.innerText === 'Activities') {
            hobbies.activities = Array.from(element.nextElementSibling.children).map((child) => child.textContent);
        }

    })

    return hobbies;

};

const HobbiesArray = (): Hobbies => {
    const [hobbies, setHobbies] = useState({
        interests: {},
        activities: []
    });

    useEffect(() => {
        const fetchAndParseHobbies = async () => {
            try {
                const response = await fetch("/content/Hobbies.md");
                if (!response.ok) {
                    throw new Error("Failed to fetch markdown content");
                }

                const mdContent = await response.text();
                const htmlContent = await Promise.resolve(marked(mdContent));
                setHobbies(parseHobbies(htmlContent));
            } catch (error) {
                console.error("Error fetching markdown content:", error);
            }
        };

        fetchAndParseHobbies();
    }, []);

    return hobbies;
};

export default HobbiesArray;