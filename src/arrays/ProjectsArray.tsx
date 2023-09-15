import { useState, useEffect } from "react";
import { marked } from 'marked'
import { Project } from "../types";

const parseProjects = (mdContent: string): Project[] => {

    const projects = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(mdContent, 'text/html').getElementsByTagName('body')[0];

    Array.from(doc.getElementsByTagName('h2')).forEach((element) => {

        const details = element.nextElementSibling;

        let node = 0;
        let title = '';
        let location = '';
        let period = '';
        let link = '';
        let badges = [];
        let description = [];

        Array.from(details.children).forEach((child) => {

            if (child.textContent.startsWith('Node')) {
                node = Number(child.textContent.split('Node: ')[1]);
            } else if (child.textContent.startsWith('Title')) {
                title = child.textContent.split('Title: ')[1];
            } else if (child.textContent.startsWith('Location')) {
                location = child.textContent.split('Location: ')[1];
            } else if (child.textContent.startsWith('Period')) {
                period = child.textContent.split('Period: ')[1];
            } else if (child.textContent.startsWith('Link')) {
                link = child.textContent.split('Link: ')[1];
            } else if (child.textContent.startsWith('Badges')) {
                badges = Array.from(child.getElementsByTagName('ul')[0].children).map((li) => li.textContent);
            } else if (child.textContent.startsWith('Description')) {
                description = Array.from(child.getElementsByTagName('ul')[0].children).map((li) => li.textContent);
            }
        });

        projects.push({
            node,
            title,
            location,
            period,
            link,
            badges,
            description,
        });

    })

    return projects;

};

const ProjectsArray = (): Project[] => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/content/Projects.md")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch markdown content");
                }
                return response.text();
            })
            .then((mdContent) => {
                setProjects(parseProjects(marked(mdContent)));
            })
            .catch((error) => {
                console.error("Error fetching markdown content:", error);
            });
    }, []);

    return projects;
};

export default ProjectsArray;