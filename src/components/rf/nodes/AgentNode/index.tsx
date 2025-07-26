import {
	Handle,
	type Node,
	type NodeProps,
	Position,
	useNodeConnections,
	useNodesData,
	useReactFlow,
} from "@xyflow/react";
import { memo, useCallback, useEffect, useState } from "react";
import NodeContainer from "../../components/NodeContainer";
import NodeContent from "../../components/NodeContent";
import { NodeLabel } from "../../components/NodeLabel";

type AgentNodeData = {
	model: object;
	temperature: { value: number };
};
type AgentNode = Node<AgentNodeData, "agent-node">;

export const AgentNode = memo(({ id, isConnectable }: NodeProps<AgentNode>) => {
	const [data, setData] = useState({} as AgentNodeData);
	const { updateNodeData } = useReactFlow();

	useEffect(() => {
		updateNodeData(id, data);
	}, [data, id, updateNodeData]);

	const handleModelChange = useCallback((v: object) => {
		setData((prev) => ({ ...prev, model: v }));
	}, []);

	const handleTemperatureChange = useCallback((v: { value: number }) => {
		setData((prev) => ({ ...prev, temperature: v }));
	}, []);

	return (
		<>
			<NodeContainer>
				<NodeLabel>Agent Node</NodeLabel>
				<NodeContent>
					<CustomHandle id="model" label="model" onChange={handleModelChange} />
					<CustomHandle
						id="temperature"
						label="tempreture"
						onChange={handleTemperatureChange}
					/>
				</NodeContent>
			</NodeContainer>
			<Handle
				type="source"
				position={Position.Right}
				isConnectable={isConnectable}
				className=" size-2.5!"
			/>
		</>
	);
});

type CustomHandleProps<T> = {
	id: string;
	label: string;
	onChange: (d: T) => void;
};

const CustomHandle = memo(({ id, label, onChange }: CustomHandleProps<any>) => {
	const connections = useNodeConnections({
		handleType: "target",
		handleId: id,
	});

	const source = connections.length > 0 ? connections[0].source : "";
	const nodeData = useNodesData(source);

	useEffect(() => {
		onChange(nodeData?.data ? nodeData.data : {});
	}, [nodeData, onChange]);

	return (
		<div className="relative">
			<Handle
				className="-left-4! size-2.5!"
				id={id}
				type="target"
				position={Position.Left}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
});
