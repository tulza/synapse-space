import type { HTMLAttributes, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/libs/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const variants = tv({
	base: "flex min-w-[250px] flex-col rounded border border-[#424242]/50 bg-[#212121] text-white",
	variants: {
		color: {},
	},
});

const NodeContainer = ({ children, ...props }: Props) => {
	return (
		<div {...props} className={cn(variants({}), props.className)}>
			{children}
		</div>
	);
};
export default NodeContainer;
