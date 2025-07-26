import { tv, type VariantProps } from "tailwind-variants";

const variants = tv({
	base: "rounded-t px-3 py-2 font-bold",
	variants: {
		color: {
			red: "bg-[#E90065]",
			green: "bg-[#00A86B]",
			orange: "bg-[#eb7600]",
			blue: "bg-[#2c37de]",
		},
	},
	defaultVariants: {
		color: "red",
	},
});

type LabelVariants = VariantProps<typeof variants>;

type Props = {
	children: string;
	variant?: LabelVariants;
};

export const NodeLabel = ({ children, variant }: Props) => {
	return <div className={variants(variant)}>{children}</div>;
};
