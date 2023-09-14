import { useState, useEffect } from "react";
import { marked } from 'marked'
import { Work } from "../types";

const parseExperience = (mdContent: string): Work[] => {

    const experience = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(mdContent, 'text/html').getElementsByTagName('body')[0];

    Array.from(doc.getElementsByTagName('h2')).forEach((element) => {

        const details = element.nextElementSibling;

        let node = 0;
        let firm = element.textContent;
        let title = '';
        let location = '';
        let period = '';
        let image = '';
        let country = '';
        let badges = [];
        let description = [];

        Array.from(details.children).forEach((child) => {

            if (child.textContent.startsWith('Node')) {
                node = Number(child.textContent.split('Node: ')[1]);
            } else if (child.textContent.startsWith('Location')) {
                location = child.textContent.split('Location: ')[1];
            } else if (child.textContent.startsWith('Period')) {
                period = child.textContent.split('Period: ')[1];
            } else if (child.textContent.startsWith('Title')) {
                title = child.textContent.split('Title: ')[1];
            } else if (child.textContent.startsWith('Image')) {
                image = child.textContent.split('Image: ')[1];
            } else if (child.textContent.startsWith('Country')) {
                country = child.textContent.split('Country: ')[1];
            } else if (child.textContent.startsWith('Badges')) {
                badges = Array.from(child.getElementsByTagName('ul')[0].children).map((li) => li.textContent);
            } else if (child.textContent.startsWith('Description')) {
                description = Array.from(child.getElementsByTagName('ul')[0].children).map((li) => li.textContent);
            }
        });

        experience.push({
            node,
            title,
            firm,
            image,
            location,
            period,
            country,
            badges,
            description,
        });

    })

    return experience;

};

const ExperienceArray = (): Work[] => {
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        fetch("/content/Experience.md")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch markdown content");
                }
                return response.text();
            })
            .then((mdContent) => {
                setExperience(parseExperience(marked(mdContent)));
            })
            .catch((error) => {
                console.error("Error fetching markdown content:", error);
            });
    }, []);

    return experience;
};

export default ExperienceArray;