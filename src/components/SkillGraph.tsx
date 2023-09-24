import ForceGraph3D from 'react-force-graph-3d';
import { Skills } from "../types";
import { useEffect, useState } from 'react';

const SkillNet = (props: { skills: Skills, color: string }) => {

    const [data, setData] = useState({ nodes: [], links: [] });

    useEffect(() => {
        const nodes = Object.keys(props.skills.technology.languages).map((lang) => {
            return { id: lang, group: 1 }
        });
        setData({ nodes: nodes, links: [] });
    }, [props.skills]);

    return (
        <div>
            <ForceGraph3D graphData={data} width={800}/>
        </div>
    )
}

export default SkillNet;