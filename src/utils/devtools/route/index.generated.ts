// automatically generated with generate-index.js,
// last generated: 26/07/2025

export type RouteSection = {
	name: string;
	routes: Route[];
};

export type Route = { url: string; name: string };

export const PAGES_ROUTES: RouteSection = {
	name: "Pages Routes",
	routes: [
		{
			url: "/np/",
			name: "NodePlayground",
		},
		{
			url: "/",
			name: "Home",
		},
		{
			url: "/playground/",
			name: "Playground",
		},
	],
};

export const ROUTE_SYSTEM: RouteSection[] = [PAGES_ROUTES];
