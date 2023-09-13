import ReactFlow, { Background, ReactFlowProvider, useReactFlow } from 'reactflow';
import { Study } from '../types';
import 'reactflow/dist/style.css';
import { Card } from '@chakra-ui/react';

const Flow = (props: { education: Study[] }) => {
    const reactFlowInstance = useReactFlow();

    console.log(reactFlowInstance)

    const nodes = props.education.map((edu) => ({
        id: edu.node.toString(),
        position: {
            x: 100 * edu.node,
            y: Number.isInteger(edu.node) ? 100 : 100 + 100 * (edu.node - Math.floor(edu.node))
        },
        data: { label: edu.node },
    }));

    console.log(nodes)

    const edges = props.education.filter((edu) =>
        Number.isInteger(edu.node) && edu.node > 0).map((edu) => ({
            id: `${edu.node - 1}to${edu.node}`,
            source: (edu.node - 1).toString(),
            target: edu.node.toString(),
        }));

    return (
        <Card variant='elevated' style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView={true} snapToGrid={true}>
                <Background />
            </ReactFlow>
        </Card>
    )
}

const EduNeuralNet = (props: { education: Study[] }) => {

    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}

export default EduNeuralNet;