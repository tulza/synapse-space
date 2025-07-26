import { TriangleRightIcon } from "@radix-ui/react-icons";
import {
	Handle,
	type Node,
	type NodeProps,
	Position,
	useReactFlow,
} from "@xyflow/react";
import {
	createContext,
	type FC,
	type HTMLAttributes,
	memo,
	type ReactNode,
	type SVGAttributes,
	useContext,
	useState,
} from "react";
import { cn } from "@/libs/cn";
import NodeContainer from "../../components/NodeContainer";
import NodeContent from "../../components/NodeContent";
import { NodeLabel } from "../../components/NodeLabel";
import { type ModelFamily, Models } from "./models";

type ModelDisplayProp = {
	icon: FC<SVGAttributes<SVGSVGElement>>;
	family: string;
	model: string;
};

type AINodeData = { model: ModelDisplayProp };
type AINode = Node<AINodeData, "ai-node">;

type Context = {
	model: ModelDisplayProp;
	setModel: (model: ModelDisplayProp) => void;
};

const ModelContext = createContext({} as Context);

// TODO refactor this mess
export const AINode = memo(({ id, data, isConnectable }: NodeProps<AINode>) => {
	const { setNodes } = useReactFlow();
	const [open, setOpen] = useState(false);
	const [model, setModelState] = useState<ModelDisplayProp>(data.model);

	const setModel = (newModel: ModelDisplayProp) => {
		setModelState(newModel);

		setNodes((nodes) =>
			nodes.map((node) => {
				if (node.id === id) {
					return {
						...node,
						data: {
							...newModel,
						},
					};
				}
				return node;
			}),
		);
	};

	return (
		<ModelContext.Provider value={{ model, setModel }}>
			<Handle
				type="source"
				className=" size-2.5!"
				position={Position.Right}
				isConnectable={isConnectable}
				// require a model to be selected
				isConnectableStart={!!model}
			/>
			{/* node */}
			<NodeContainer>
				<NodeLabel>AI Node</NodeLabel>
				<NodeContent>
					<p>models</p>
					<div className="relative w-full" onMouseLeave={() => setOpen(false)}>
						<Button onMouseOver={() => setOpen(true)}>
							<ModelDisplay />
							<TriangleRightIcon />
						</Button>
						{open && <Dropdown />}
					</div>
				</NodeContent>
			</NodeContainer>
		</ModelContext.Provider>
	);
});

interface MenuFlyoutProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Button = ({ children, ...props }: MenuFlyoutProps) => {
	return (
		<div
			{...props}
			className={cn(
				"relative flex w-full cursor-pointer items-center justify-between rounded border border-[#424242] bg-[#212121] px-3 py-1 transition-colors hover:bg-[#424242]/40",
				props.className,
			)}
		>
			{children}
		</div>
	);
};

const Dropdown = () => {
	return (
		<HoverMenu>
			{Models.map((model) => (
				<ModelSelect key={model.name} {...model} />
			))}
		</HoverMenu>
	);
};

const ModelSelect = (model: ModelFamily) => {
	const [open, setOpen] = useState(false);
	const { setModel } = useContext(ModelContext);

	const handleSetModel = (m: string) => {
		setModel({
			icon: model.icon,
			family: model.name,
			model: m,
		});
	};

	return (
		<div onMouseLeave={() => setOpen(false)} className="relative w-full">
			<Button
				className="rounded-none border-none"
				onMouseOver={() => setOpen(true)}
			>
				<div className="flex items-center gap-2">
					<model.icon className="size-4 *:fill-white" />
					<p>{model.name}</p>
				</div>
				<TriangleRightIcon />
			</Button>
			{open && (
				<HoverMenu>
					{model.models.map((model) => (
						<Button
							key={model}
							className="rounded-none border-none"
							onClick={() => handleSetModel(model)}
						>
							{model}
						</Button>
					))}
				</HoverMenu>
			)}
		</div>
	);
};

const HoverMenu = ({ children }: { children: ReactNode }) => {
	return (
		<div className=" absolute top-0 w-full translate-x-full pl-2">
			<div className="flex w-full flex-col items-start rounded border border-[#424242] bg-[#212121]">
				{children}
			</div>
		</div>
	);
};

const ModelDisplay = () => {
	const { model } = useContext(ModelContext);

	if (!model) {
		return <p className="text-[#848484]">Select a model</p>;
	}

	return (
		<div className="flex items-center gap-2">
			<model.icon className="size-4 *:fill-white" />
			<p>{model.model}</p>
		</div>
	);
};
