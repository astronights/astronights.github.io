import ReactFlow, { Background, ReactFlowProvider, useReactFlow } from 'reactflow';
import { Study } from '../types';
import 'reactflow/dist/style.css';
import { Card } from '@chakra-ui/react';

const Flow = (props: { education: Study[] }) => {
    const reactFlowInstance = useReactFlow();
    console.log(reactFlowInstance.project)

    const nodes = [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    ];
    const edges = [{ id: 'e1-2', source: '1', target: '2' }];

    return (
        <Card variant='elevated' style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges}>
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