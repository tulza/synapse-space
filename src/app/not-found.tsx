import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="font-sans h-dvh items-center justify-center flex">
			<main className="flex flex-col gap-6 items-center ">
				<p className="text-4xl font-medium">Page not found</p>
				<Link
					className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
					href="/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						className="dark:invert"
						src="/vercel.svg"
						alt="Vercel logomark"
						width={20}
						height={20}
					/>
					<p>Go back</p>
				</Link>
			</main>
		</div>
	);
}
