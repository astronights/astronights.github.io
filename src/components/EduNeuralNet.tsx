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

    useEffect(() => {
        let xCounter = 0;
        let yCounter = -25;
        const innerNodes = props.education.filter((edu) => edu.node > 0).map((edu) => {
            if (Number.isInteger(edu.node) || (edu.node - Math.floor(edu.node) < 0.2)) {
                xCounter += 100;
            }
            if (edu.node - Math.floor(edu.node) > 0) {
                yCounter += 50;
            } else {
                yCounter = yCounter !== -25 ? 0 : -25;
            }
            return {
                id: edu.node.toString(),
                position: {
                    x: xCounter,
                    y: edu.node !== Math.floor(edu.node) ? yCounter : 100,
                },
                type: 'nnNode',
                data: {
                    label: edu.node, image: edu.image, alt: edu.institution, country: edu.country,
                    type: 'default'
                }
            }
        });

        const outerNodes = [{
            id: 'start',
            position: { x: 0, y: 100 },
            type: 'infinityNode',
            data: { label: 0, alt: 'Early Life', type: 'source', country: '', image: '' },
        },
        {
            id: 'end',
            position: { x: xCounter + 100, y: 100 },
            type: 'infinityNode',
            data: { label: 0, alt: 'Present', type: 'target', country: '', image: '' },
        }];

        setNodes(outerNodes.concat(innerNodes));

        const parentNodes = props.education.filter((edu) =>
            (edu.node - Math.floor(edu.node)) > 0).map((edu) => Math.floor(edu.node))

        let innerEdges = props.education.filter((edu) =>
            Number.isInteger(edu.node) && edu.node > 0 && !parentNodes.includes(edu.node)).map((edu) => ({
                id: `${edu.node}to${edu.node + 1}`,
                source: edu.node.toString(),
                target: (edu.node + 1).toString(),
            }));

        innerEdges = innerEdges.concat(props.education.filter((edu) =>
            edu.node - Math.floor(edu.node) > 0).map((edu) => ({
                id: `${edu.node}to${Math.ceil(edu.node)}`,
                source: (edu.node).toString(),
                type: 'straight',
                target: Math.ceil(edu.node).toString(),
            }))).concat(props.education.filter((edu) =>
            edu.node - Math.floor(edu.node) > 0).map((edu) => ({
                id: `${Math.floor(edu.node)}to${edu.node}`,
                source: (Math.floor(edu.node)).toString(),
                type: 'straight',
                target: edu.node.toString(),
            })));

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

        // TODO: Make this fit Bounds dynamic
        reactFlowInstance.fitBounds({ x: 90, y: 10, width: xCounter - 50, height: 200 });

    }, [props.education, reactFlowInstance]);

    console.log(reactFlowInstance);

    return (
        <Card variant='elevated' style={{ width: '100vw', height: '65vh' }}>
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