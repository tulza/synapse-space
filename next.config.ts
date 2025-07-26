import type { NextConfig } from "next";

const glslTurbopackRule = {
	loaders: ["raw-loader", "glslify-loader"],
	as: "*.js",
};

const nextConfig: NextConfig = {
	experimental: {
		devtoolSegmentExplorer: true,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(glsl|vs|fs|vert|frag)$/,
			use: ["raw-loader", "glslify-loader"],
		});
		return config;
	},
	turbopack: {
		rules: {
			"*.glsl": glslTurbopackRule,
			"*.vs": glslTurbopackRule,
			"*.fs": glslTurbopackRule,
			"*.vert": glslTurbopackRule,
			"*.frag": glslTurbopackRule,
		},
	},
};

export default nextConfig;
