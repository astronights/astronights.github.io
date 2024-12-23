import { useState, useEffect } from "react";
import { marked } from 'marked'
import { Study } from "../types";

const parseEducation = (mdContent: string): Study[] => {

  const education = [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(mdContent, 'text/html').getElementsByTagName('body')[0];

  Array.from(doc.getElementsByTagName('h2')).forEach((element) => {

    const details = element.nextElementSibling;

    let node = 0;
    let title = element.textContent;
    let institution = '';
    let location = '';
    let period = '';
    let degree = '';
    let grade = '';
    let image = '';
    let country = '';
    let badges = [];
    let description = [];

    Array.from(details.children).forEach((child) => {

      if (child.textContent.startsWith('Node')) {
        node = Number(child.textContent.split('Node: ')[1]);
      } else if (child.textContent.startsWith('Institution')) {
        institution = child.textContent.split('Institution: ')[1];
      } else if (child.textContent.startsWith('Location')) {
        location = child.textContent.split('Location: ')[1];
      } else if (child.textContent.startsWith('Period')) {
        period = child.textContent.split('Period: ')[1];
      } else if (child.textContent.startsWith('Degree')) {
        degree = child.textContent.split('Degree: ')[1];
      } else if (child.textContent.startsWith('Grades')) {
        grade = child.textContent.split('Grades: ')[1];
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

    education.push({
      node,
      title,
      institution,
      image,
      location,
      period,
      degree,
      grade,
      country,
      badges,
      description,
    });

  })

  return education;

};

const EducationArray = (): Study[] => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchAndParseEducation = async () => {
      try {
        const response = await fetch("/content/Education.md");
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }

        const mdContent = await response.text();
        const htmlContent = await Promise.resolve(marked(mdContent));
        setEducation(parseEducation(htmlContent));
      } catch (error) {
        console.error("Error fetching markdown content:", error);
      }
    };

    fetchAndParseEducation();
  }, []);

  return education;
};

export default EducationArray;