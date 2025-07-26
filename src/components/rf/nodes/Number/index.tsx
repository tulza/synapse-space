import { NumberInput } from "@ark-ui/react/number-input";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import {
	Handle,
	type Node,
	type NodeProps,
	Position,
	useReactFlow,
} from "@xyflow/react";
import { memo } from "react";
import NodeContainer from "../../components/NodeContainer";
import NodeContent from "../../components/NodeContent";
import { NodeLabel } from "../../components/NodeLabel";

type NumberNodeData = {
	model: object;
	temperature: { value: number };
};
type NumberNode = Node<NumberNodeData, "number-node">;

export const NumberNode = memo(
	({ id, isConnectable }: NodeProps<NumberNode>) => {
		const { updateNodeData } = useReactFlow();

		return (
			<>
				<NodeContainer>
					<NodeLabel variant={{ color: "blue" }}>Number</NodeLabel>
					<NodeContent>
						<NumberInput.Root
							className="flex flex-col gap-1"
							defaultValue="0.70"
							formatOptions={{
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							}}
							allowOverflow={false}
							min={0}
							max={1}
							step={0.01}
							onValueChange={(v) => {
								if (v.valueAsNumber > 1) v.valueAsNumber = 1.0;
								if (v.valueAsNumber < 0) v.valueAsNumber = 0.0;
								updateNodeData(id, {
									value: v.valueAsNumber || 0,
								});
							}}
							allowMouseWheel
						>
							<NumberInput.Label>Label</NumberInput.Label>
							<div className="relative flex w-full cursor-pointer items-center justify-between rounded border border-[#424242] bg-[#212121] pl-3 transition-colors focus-within:ring-1">
								<NumberInput.Input className="bg-transparent outline-none" />
								<NumberInput.Control className="flex flex-col">
									<NumberInput.IncrementTrigger className="flex w-8 items-center justify-center border-[#424242] border-b border-l">
										<TriangleUpIcon />
									</NumberInput.IncrementTrigger>
									<NumberInput.DecrementTrigger className="flex w-8 items-center justify-center border-[#424242] border-l">
										<TriangleDownIcon />
									</NumberInput.DecrementTrigger>
								</NumberInput.Control>
							</div>
						</NumberInput.Root>
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
	},
);
