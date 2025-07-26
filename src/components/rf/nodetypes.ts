import { AgentNode } from "./nodes/AgentNode";
import { AINode } from "./nodes/AINode";
import { NumberNode } from "./nodes/Number";
import { TextUpdaterNode } from "./nodes/textUpdaterNode";

export const nodeTypes = {
	textUpdater: TextUpdaterNode,
	"ai-node": AINode,
	"agent-node": AgentNode,
	"number-node": NumberNode,
};
