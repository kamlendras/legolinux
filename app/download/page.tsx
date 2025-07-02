import type { Metadata } from "next";
import Download from "../components/download";

export const metadata: Metadata = {
	title: "Lego Linux | Download",
	description: "Lego Linux",
	icons: {
		icon: "/icons/orange-favicon.ico",
	},
};

export default function RootLayout() {
	return (
		<>
			<Download />
		</>
	);
}
