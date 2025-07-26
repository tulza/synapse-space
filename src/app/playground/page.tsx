"use client";

import type {} from "@xyflow/react";
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	BackgroundVariant,
	Controls,
	type Edge,
	type Node,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
	Panel,
	ReactFlow,
	SelectionMode,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { nodeTypes } from "@/components/rf/nodetypes";
import NodeInspector from "@/utils/devtools/nodeInspector";

export default function Playground() {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodeChanges: OnNodesChange = useCallback(
		(changes) =>
			setNodes((nodeSnapshot) => applyNodeChanges(changes, nodeSnapshot)),
		[],
	);
	const onEdgeChanges: OnEdgesChange = useCallback(
		(changes) =>
			setEdges((edgeSnapshot) => applyEdgeChanges(changes, edgeSnapshot)),
		[],
	);
	const onConnect: OnConnect = useCallback(
		(params) => setEdges((edgeSnapshot) => addEdge(params, edgeSnapshot)),
		[],
	);

	return (
		<main className="h-dvh">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodesChange={onNodeChanges}
				onEdgesChange={onEdgeChanges}
				onConnect={onConnect}
				selectionOnDrag
				panOnDrag={panOnDrag}
				selectionMode={SelectionMode.Partial}
				fitView
			>
				<NodeInspector />
				<Panel position="top-center">
					<p className="border">Hello world!</p>
				</Panel>
				<Background
					bgColor="#1c1c1c"
					color="#222"
					variant={BackgroundVariant.Lines}
				/>
				<Controls />
			</ReactFlow>
		</main>
	);
}

const panOnDrag = [1, 2];
const initialNodes: Node[] = [
	{
		id: "n2",
		type: "agent-node",
		position: { x: 250, y: -250 },
		data: {},
	},
	{
		id: "n3",
		type: "ai-node",
		position: { x: -500, y: -250 },
		data: {},
	},
	{
		id: "t3",
		type: "number-node",
		position: { x: -500, y: 60 },
		data: {},
	},
];

const initialEdges: Edge[] = [
	{
		id: "n2-n3",
		source: "n3",
		target: "n2",
		targetHandle: "model",
	},
	{
		id: "t3-n2",
		source: "t3",
		target: "n2",
		targetHandle: "temperature",
	},
];
