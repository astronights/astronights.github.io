import { useState, useEffect } from "react";
import { marked } from 'marked';
import { Project } from "../types";

const parseProjects = (mdContent: string): Project[] => {
    const projects: Project[] = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(mdContent, 'text/html').getElementsByTagName('body')[0];

    Array.from(doc.getElementsByTagName('h2')).forEach((element) => {
        const details = element.nextElementSibling;

        let node = 0;
        let title = element.textContent || '';
        let link = '';
        let badges: string[] = [];
        let images: string[] = [];
        let description = '';

        Array.from(details?.children || []).forEach((child) => {
            if (child.textContent?.startsWith('Node')) {
                node = Number(child.textContent.split('Node: ')[1]);
            } else if (child.textContent?.startsWith('Link')) {
                link = child.textContent.split('Link: ')[1];
            } else if (child.textContent?.startsWith('Badges')) {
                badges = Array.from(child.getElementsByTagName('ul')[0].children).map((li) => li.textContent || '');
            } else if (child.textContent?.startsWith('Description')) {
                description = child.textContent.split('Description: ')[1];
            } else if (child.textContent?.startsWith('Images')) {
                images = Array.from(child.getElementsByTagName('ul')[0].children).map((li) => li.textContent || '');
            }
        });

        projects.push({
            node,
            title,
            link,
            badges,
            images,
            description,
        });
    });

    return projects;
};

const ProjectsArray = (): Project[] => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchAndParseProjects = async () => {
            try {
                const response = await fetch("/content/Projects.md");
                if (!response.ok) {
                    throw new Error("Failed to fetch markdown content");
                }

                const mdContent = await response.text();
                const htmlContent = await Promise.resolve(marked(mdContent));
                setProjects(parseProjects(htmlContent));
            } catch (error) {
                console.error("Error fetching markdown content:", error);
            }
        };

        fetchAndParseProjects();
    }, []);

    return projects;
};

export default ProjectsArray;
