import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/libs/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const NodeContent = ({ children, ...props }: Props) => {
	return (
		<div {...props} className={cn("flex flex-col gap-1 p-4", props.className)}>
			{children}
		</div>
	);
};
export default NodeContent;
