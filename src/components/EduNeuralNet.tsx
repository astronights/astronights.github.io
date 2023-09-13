import ReactFlow, { Background, Handle, Position, ReactFlowProvider, useReactFlow } from 'reactflow';
import { Study } from '../types';
import { Card } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import 'reactflow/dist/style.css';
import '../assets/css/neuralnet.sass';

const NeuralNetNode = ({ data }) => {

    const handlers = data.type === 'default' ? ['source', 'target'] : [data.type];
    const handlerMap = { 'source': 'Right', 'target': 'Left' }

    return (
        <div className='nn-node'>
            {
                handlers.map((handler, index) => (
                    <Handle key={index} id={handlerMap[handler]} type={handler}
                        position={Position[handlerMap[handler]]}
                        isConnectable={false} />
                ))
            }
            <img alt={data.alt} src={data.image} />
            <img alt={data.country} className='flag'
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.country}.svg`} />
        </div>
    );
}

const InfinityNode = ({ data }) => {

    const handlerMap = { 'source': 'Right', 'target': 'Left' }

    return (
        <div className='nn-node'>
            <Handle id={handlerMap[data.type]} type={data.type}
                position={Position[handlerMap[data.type]]}
                isConnectable={false} />
        </div>
    );
}

const nodeTypes = { nnNode: NeuralNetNode, infinityNode: InfinityNode };

const Flow = (props: { education: Study[] }) => {
    const reactFlowInstance = useReactFlow();

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [visibleNodes, setVisibleNodes] = useState([]);

    useEffect(() => {
        const innerNodes = props.education.filter((edu) => edu.node > 0).map((edu) => ({
            id: edu.node.toString(),
            position: {
                x: 100 * edu.node,
                y: Number.isInteger(edu.node) ? 100 : 100 + 100 * (edu.node - Math.floor(edu.node))
            },
            type: 'nnNode',
            data: {
                label: edu.node, image: edu.image, alt: edu.institution, country: edu.country,
                type: 'default'
            },
        }));

        const outerNodes = [{
            id: 'start',
            position: { x: 0, y: 100 },
            type: 'infinityNode',
            data: { label: 0, alt: 'Early Life', type: 'source', country: '', image: '' },
        },
        {
            id: 'end',
            position: { x: 100 * (props.education.length + 1), y: 100 },
            type: 'infinityNode',
            data: { label: 0, alt: 'Present', type: 'target', country: '', image: '' },
        }];

        setNodes(outerNodes.concat(innerNodes));

        const innerEdges = props.education.filter((edu) =>
            Number.isInteger(edu.node) && edu.node > 0).map((edu) => ({
                id: `${edu.node - 1}to${edu.node}`,
                source: (edu.node - 1).toString(),
                target: edu.node.toString(),
            }));

        const outerEdges = [{
            id: `startto1`,
            source: 'start',
            target: '1',
        },
        {
            id: `${props.education.length}toend`,
            source: '3',
            target: 'end',
        }];

        setEdges(outerEdges.concat(innerEdges));

        setVisibleNodes(innerNodes);
        console.log(outerNodes.concat(innerNodes));

        reactFlowInstance.fitBounds({ x: 150, y: 0, width: 200, height: 200 });

    }, [props.education]);

    console.log(reactFlowInstance);

    return (
        <Card variant='elevated' style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}
                snapToGrid={true}
                panOnDrag={false} panOnScroll={false}
                zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}>
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