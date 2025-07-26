import type { ResponsesModel } from "openai/resources/shared.mjs";
import type { FC, SVGAttributes } from "react";
import Gemini from "@/components/assets/svg/Gemini";
import OpenAI from "@/components/assets/svg/OpenAI";

export type ModelFamily = {
	icon: FC<SVGAttributes<SVGSVGElement>>;
	name: string;
	models: string[];
};

export const OpenAIModels: ModelFamily = {
	icon: OpenAI,
	name: "OpenAI",
	models: [
		"gpt-3.5-turbo",
		"o4-mini",
		"gpt-4.1-nano",
		"gpt-4.1-mini",
	] as ResponsesModel[],
};

export const GeminiModels: ModelFamily = {
	icon: Gemini,
	name: "Gemini",
	models: ["Gemini 2.5 Flash", "Gemini 2.5 Pro"],
};

export const Models: ModelFamily[] = [OpenAIModels, GeminiModels];
