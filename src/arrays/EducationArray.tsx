import { useState, useEffect } from "react";
import { marked } from 'marked'

const parseEducation = (mdContent) => {

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
      } else if (child.textContent.startsWith('Grade')) {
        grade = child.textContent.split('Grade: ')[1];
      } else if (child.textContent.startsWith('Description')) {
        description = Array.from(child.getElementsByTagName('ul')[0].children).map((li) => li.textContent);
      }
    });

    education.push({
      node,
      title,
      institution,
      location,
      period,
      degree,
      grade,
      description,
    });

  })
  
  return education;

};

const EducationArray = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch("/content/Education.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        return response.text();
      })
      .then((mdContent) => {
        setEducation(parseEducation(marked(mdContent)));
      })
      .catch((error) => {
        console.error("Error fetching markdown content:", error);
      });
  }, []);

  return education;
};

export default EducationArray;