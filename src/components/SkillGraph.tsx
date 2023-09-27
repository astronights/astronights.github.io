import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import { Skills } from "../types";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import lodash from 'lodash';

const SkillNet = (props: { skills: Skills, color: string }) => {

    const ref = useRef(null);
    const graphRef = useRef<ForceGraphMethods>();
    const [width, setWidth] = useState(0);
    const [data, setData] = useState({ nodes: [], links: [] });

    useLayoutEffect(() => {
        if (ref && ref.current) {
            setWidth(ref.current.offsetWidth);
        }
      }, []);

    useEffect(() => {
        if (props.skills.others.length === 0) {
            setData({ nodes: [], links: [] });
        } else {
            const nodes = [];
            nodes.push({ id: 'Shubhankar', group: 0 });
            nodes.push({ id: 'Technology Skills', group: 1, key: 'parent' })
            nodes.push({ id: 'Programming Languages', group: 2, key: 'parent' })
            Object.keys(props.skills.technology.languages).forEach((lang) => {
                nodes.push({ id: lang, group: 2, size: props.skills.technology.languages[lang] })
            });
            nodes.push({ id: 'Frameworks', group: 3, key: 'parent' })
            props.skills.technology.frameworks.forEach((framework) => {
                nodes.push({ id: framework, group: 3 })
            });
            nodes.push({ id: 'Data Science', group: 4, key: 'parent' })
            props.skills.technology.ds.forEach((ds) => {
                nodes.push({ id: ds, group: 4 })
            });
            nodes.push({ id: 'Database', group: 5, key: 'parent' })
            props.skills.technology.db.forEach((db) => {
                nodes.push({ id: db, group: 5 })
            });
            nodes.push({ id: 'Languages', group: 6, key: 'parent' })
            Object.keys(props.skills.languages).forEach((lang) => {
                nodes.push({ id: lang, group: 6, size: props.skills.languages[lang] })
            });
            nodes.push({ id: 'Soft Skills', group: 7, key: 'parent' })
            props.skills.others.forEach((soft) => {
                nodes.push({ id: soft, group: 7 })
            });

            const linkKeys = ['Technology Skills', 'Languages', 'Soft Skills'];
            const links = [];
            linkKeys.forEach((key) => {
                links.push({ source: 'Shubhankar', target: key, level: 1 })
            });
            ['Programming Languages', 'Frameworks', 'Data Science', 'Database'].forEach((skill) => {
                links.push({ source: 'Technology Skills', target: skill, level: 2 })
            })
            const groups = lodash.groupBy(nodes, 'group');
            Object.keys(groups).forEach((group) => {
                const parent = groups[group].find((node) => node.key === 'parent');
                if (parent) {
                    groups[group].forEach((node) => {
                        if (node.key !== 'parent') {
                            links.push({ source: parent.id, target: node.id, level: 3 })
                        }
                    })
                };

            });

            const langLinks = {
                'Python': ['Pandas', 'Polars', 'DuckDB', 'Kafka', 'Hive', 'Spark',
                    'NLTK', 'Scikit-Learn', 'PyTorch'],
                'Java': ['Springboot', 'Kafka'],
                'Typescript': ['NodeJS', 'React'],
                'SQL': ['Python', 'Java', 'Kibana', 'Grafana'],
                'MongoDB': ['Typescript', 'Python', 'NodeJS', 'React'],
                'Hadoop': ['Hive', 'Spark', 'Python', 'DuckDB', 'Polars'],
                'ElasticSearch': ['Java', 'Kibana', 'Grafana']
            }

            Object.keys(langLinks).forEach((lang) => {
                langLinks[lang].forEach((link) => {
                    links.push({ source: lang, target: link, level: 4 })
                })
            });
            links.push({ source: 'Data Science', target: 'Python', level: 4 })
            setData({ nodes: nodes, links: links });
        }
    }, [props.skills]);

    useEffect(() => {
        graphRef.current.cameraPosition({ x: 0, y: 0, z: 320 }, { x: 0, y: 0, z: 0 }, 1000);
        graphRef.current.zoomToFit(1000, 1000);
    }, [graphRef]);

    return (
        <div ref={ref}>
            <ForceGraph3D
                ref={graphRef}
                graphData={data}
                nodeAutoColorBy="group"
                nodeThreeObject={node => {
                    const sprite = new SpriteText(node.id);
                    sprite.color = node.color;
                    sprite.textHeight = 10;
                    return sprite;
                }}
                height={window.visualViewport.height / 1.3}
                width={width > 0 ? width : 800} />
        </div>
    )
}

export default SkillNet;