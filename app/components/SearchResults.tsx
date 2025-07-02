import {
	Box,
	Card,
	CardContent,
	Typography,
	Chip,
	Skeleton,
	useTheme,
	Divider,
	IconButton,
	Link,
	Stack,
	Tooltip,
} from "@mui/material";
import { SearchResponse } from "meilisearch";
import LaunchIcon from "@mui/icons-material/Launch";
import DownloadIcon from "@mui/icons-material/Download";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SecurityIcon from "@mui/icons-material/Security";
import LabelIcon from "@mui/icons-material/Label";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import InfoIcon from "@mui/icons-material/Info";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TerminalIcon from "@mui/icons-material/Terminal";
import { useState } from "react";

interface Package {
	ID: number;
	Name: string;
	Description: string;
	Version: string;
	Maintainer: string;
	URL?: string;
	PackageBase?: string;
	NumVotes?: number;
	Popularity?: number;
	Depends?: string[];
	FirstSubmitted?: number;
	Keywords?: string[];
	LastModified?: number;
	License?: string[];
	OutOfDate?: number | null;
	PackageBaseID?: number;
	Submitter?: string;
	URLPath?: string;
}

interface SearchResultsProps {
	results: SearchResponse<Package> | null;
	isLoading: boolean;
}

export default function SearchResults({
	results,
	isLoading,
}: SearchResultsProps) {
	const theme = useTheme();
	const [copiedPackage, setCopiedPackage] = useState<string | null>(null);

	const formatDate = (timestamp?: number) => {
		if (!timestamp) return "N/A";
		return new Date(timestamp * 1000).toLocaleDateString();
	};

	const formatTime = (timestamp?: number) => {
		if (!timestamp) return "N/A";
		return new Date(timestamp * 1000).toLocaleString();
	};

	const copyCommand = async (packageName: string) => {
		const command = `lego add ${packageName}`;
		try {
			await navigator.clipboard.writeText(command);
			setCopiedPackage(packageName);
			setTimeout(() => setCopiedPackage(null), 2000);
		} catch (err) {
			console.error("Failed to copy command:", err);
		}
	};

	if (isLoading) {
		return (
			<Stack spacing={3} sx={{ mt: 4 }}>
				{[1, 2, 3, 4, 5].map((i) => (
					<Card
						key={i}
						sx={{
							backgroundColor: "#1f1f1f",
							borderRadius: 3,
							border: "1px solid #333",
							boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
						}}
					>
						<CardContent sx={{ p: 4 }}>
							<Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
								{/* Left section - Main info */}
								<Box sx={{ flex: 1 }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 2,
											mb: 2,
										}}
									>
										<Skeleton
											variant="text"
											width={200}
											height={32}
											animation="wave"
											sx={{ borderRadius: 2 }}
										/>
										<Skeleton
											variant="rounded"
											width={60}
											height={24}
											animation="wave"
											sx={{ borderRadius: 12 }}
										/>
									</Box>
									<Skeleton
										variant="text"
										width="100%"
										height={20}
										animation="wave"
										sx={{ mb: 1, borderRadius: 2 }}
									/>
									<Skeleton
										variant="text"
										width="80%"
										height={20}
										animation="wave"
										sx={{ mb: 3, borderRadius: 2 }}
									/>
									<Box sx={{ display: "flex", gap: 1, mb: 2 }}>
										{[1, 2, 3].map((j) => (
											<Skeleton
												key={j}
												variant="rounded"
												width={80}
												height={28}
												animation="wave"
												sx={{ borderRadius: 14 }}
											/>
										))}
									</Box>
								</Box>

								{/* Right section - Actions */}
								<Box sx={{ display: "flex", gap: 1 }}>
									<Skeleton
										variant="circular"
										width={40}
										height={40}
										animation="wave"
									/>
									<Skeleton
										variant="circular"
										width={40}
										height={40}
										animation="wave"
									/>
								</Box>
							</Box>
						</CardContent>
					</Card>
				))}
			</Stack>
		);
	}

	if (!results?.hits.length) {
		return (
			<Box sx={{ mt: 8, textAlign: "center" }}>
				<Typography
					variant="h5"
					sx={{ color: "#e8eaed", mb: 2, fontWeight: 400 }}
				>
					No packages found
				</Typography>
				<Typography variant="body1" sx={{ color: "#9aa0a6" }}>
					Try different keywords or check your spelling
				</Typography>
			</Box>
		);
	}

	return (
		<Stack spacing={3} sx={{ mt: 4 }}>
			{results.hits.map((pkg) => (
				<Card
					key={pkg.ID}
					sx={{
						backgroundColor: "#1f1f1f",
						borderRadius: 3,
						border: pkg.OutOfDate ? "1px solid #f28b82" : "1px solid #333",
						boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
						transition: "all 0.2s ease-in-out",
						"&:hover": {
							backgroundColor: "#262626",
							boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
							transform: "translateY(-1px)",
						},
					}}
				>
					<CardContent sx={{ p: 4 }}>
						{/* Header Section */}
						<Box
							sx={{
								display: "flex",
								alignItems: "flex-start",
								justifyContent: "space-between",
								mb: 3,
							}}
						>
							<Box sx={{ flex: 1 }}>
								<Box
									sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
								>
									<Typography
										variant="h5"
										component="h2"
										sx={{
											color: "#e8eaed",
											fontWeight: 500,
											fontSize: "1.5rem",
										}}
									>
										{pkg.Name}
									</Typography>
									<Chip
										label={`v${pkg.Version}`}
										size="medium"
										sx={{
											backgroundColor: "#1976d2",
											color: "#fff",
											fontWeight: 500,
											height: 28,
										}}
									/>
									{pkg.OutOfDate && (
										<Chip
											label="Out of Date"
											size="medium"
											sx={{
												backgroundColor: "#f28b82",
												color: "#000",
												fontWeight: 500,
												height: 28,
											}}
										/>
									)}
								</Box>
								<Typography
									variant="body1"
									sx={{
										color: "#9aa0a6",
										fontSize: "1rem",
										display: "flex",
										alignItems: "center",
										gap: 1,
									}}
								>
									<PersonIcon sx={{ fontSize: 18 }} />
									Maintained by {pkg.Maintainer || "N/A"}
								</Typography>
							</Box>

							{/* Action Buttons */}
							<Box sx={{ display: "flex", gap: 1 }}>
								{pkg.URL && (
									<IconButton
										component={Link}
										href={pkg.URL}
										target="_blank"
										sx={{
											color: "#9aa0a6",
											backgroundColor: "#333",
											"&:hover": { backgroundColor: "#444", color: "#e8eaed" },
										}}
									>
										<LaunchIcon />
									</IconButton>
								)}
								{pkg.PackageBase && (
									<IconButton
										component={Link}
										href={`https://pkgs.legolinux.org/${pkg.PackageBase}.tar.gz`}
										target="_blank"
										sx={{
											color: "#9aa0a6",
											backgroundColor: "#333",
											"&:hover": { backgroundColor: "#444", color: "#e8eaed" },
										}}
									>
										<DownloadIcon />
									</IconButton>
								)}
							</Box>
						</Box>

						{/* Terminal Command Section */}
						<Box
							sx={{
								backgroundColor: "#0d1117",
								border: "1px solid #21262d",
								borderRadius: 2,
								p: 2,
								mb: 3,
								fontFamily: "monospace",
								position: "relative",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1.5,
										flex: 1,
									}}
								>
									<TerminalIcon sx={{ fontSize: 18, color: "#58a6ff" }} />
									<Typography
										sx={{
											color: "#f0f6fc",
											fontFamily: "monospace",
											fontSize: "0.9rem",
											userSelect: "all",
											flex: 1,
										}}
									>
										<span style={{ color: "#7c3aed" }}>$</span>{" "}
										<span style={{ color: "#ff7b72" }}>lego</span>{" "}
										<span style={{ color: "#79c0ff" }}>add</span>{" "}
										<span style={{ color: "#ffa657" }}>{pkg.Name}</span>
									</Typography>
								</Box>
								<Tooltip
									title={
										copiedPackage === pkg.Name ? "Copied!" : "Copy command"
									}
									arrow
								>
									<IconButton
										onClick={() => copyCommand(pkg.Name)}
										size="small"
										sx={{
											color: copiedPackage === pkg.Name ? "#57ab5a" : "#8b949e",
											backgroundColor: "rgba(240, 246, 252, 0.1)",
											"&:hover": {
												backgroundColor: "rgba(240, 246, 252, 0.2)",
												color: "#f0f6fc",
											},
											transition: "all 0.2s ease",
											ml: 1,
										}}
									>
										<ContentCopyIcon sx={{ fontSize: 16 }} />
									</IconButton>
								</Tooltip>
							</Box>
						</Box>

						{/* Description */}
						<Typography
							variant="body1"
							sx={{
								color: "#bdc1c6",
								mb: 3,
								fontSize: "1rem",
								lineHeight: 1.6,
							}}
						>
							{pkg.Description}
						</Typography>

						{/* Stats Section */}
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
							{pkg.NumVotes !== undefined && (
								<Chip
									label={`${pkg.NumVotes} votes`}
									size="medium"
									sx={{
										backgroundColor: "#4caf50",
										color: "#fff",
										fontWeight: 500,
										height: 32,
									}}
								/>
							)}
							{pkg.Popularity !== undefined && (
								<Chip
									label={`${pkg.Popularity.toFixed(3)} popularity`}
									size="medium"
									sx={{
										backgroundColor: "#ff9800",
										color: "#fff",
										fontWeight: 500,
										height: 32,
									}}
								/>
							)}
						</Box>

						<Divider sx={{ my: 3, borderColor: "#404040" }} />

						{/* Details Grid */}
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
								gap: 3,
							}}
						>
							{/* License Section */}
							{pkg.License && pkg.License.length > 0 && (
								<Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 1.5,
										}}
									>
										<SecurityIcon sx={{ fontSize: 18, color: "#9aa0a6" }} />
										<Typography
											variant="subtitle2"
											sx={{ color: "#e8eaed", fontWeight: 500 }}
										>
											License
										</Typography>
									</Box>
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
										{pkg.License.map((license, index) => (
											<Chip
												key={index}
												label={license}
												size="small"
												sx={{
													backgroundColor: "#6a1b9a",
													color: "#fff",
													fontSize: "0.8rem",
												}}
											/>
										))}
									</Box>
								</Box>
							)}

							{/* Keywords Section */}
							{pkg.Keywords && pkg.Keywords.length > 0 && (
								<Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 1.5,
										}}
									>
										<LabelIcon sx={{ fontSize: 18, color: "#9aa0a6" }} />
										<Typography
											variant="subtitle2"
											sx={{ color: "#e8eaed", fontWeight: 500 }}
										>
											Keywords
										</Typography>
									</Box>
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
										{pkg.Keywords.slice(0, 5).map((keyword, index) => (
											<Chip
												key={index}
												label={keyword}
												size="small"
												sx={{
													backgroundColor: "#546e7a",
													color: "#fff",
													fontSize: "0.8rem",
												}}
											/>
										))}
										{pkg.Keywords.length > 5 && (
											<Chip
												label={`+${pkg.Keywords.length - 5} more`}
												size="small"
												sx={{
													backgroundColor: "#424242",
													color: "#9aa0a6",
													fontSize: "0.8rem",
												}}
											/>
										)}
									</Box>
								</Box>
							)}

							{/* Dependencies Section */}
							{pkg.Depends && pkg.Depends.length > 0 && (
								<Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 1.5,
										}}
									>
										<AccountTreeIcon sx={{ fontSize: 18, color: "#9aa0a6" }} />
										<Typography
											variant="subtitle2"
											sx={{ color: "#e8eaed", fontWeight: 500 }}
										>
											Dependencies ({pkg.Depends.length})
										</Typography>
									</Box>
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
										{pkg.Depends.slice(0, 3).map((dep, index) => (
											<Chip
												key={index}
												label={dep}
												size="small"
												sx={{
													backgroundColor: "#d32f2f",
													color: "#fff",
													fontSize: "0.8rem",
												}}
											/>
										))}
										{pkg.Depends.length > 3 && (
											<Chip
												label={`+${pkg.Depends.length - 3} more`}
												size="small"
												sx={{
													backgroundColor: "#424242",
													color: "#9aa0a6",
													fontSize: "0.8rem",
												}}
											/>
										)}
									</Box>
								</Box>
							)}

							{/* Package Info Section */}
							<Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										mb: 1.5,
									}}
								>
									<InfoIcon sx={{ fontSize: 18, color: "#9aa0a6" }} />
									<Typography
										variant="subtitle2"
										sx={{ color: "#e8eaed", fontWeight: 500 }}
									>
										Package Info
									</Typography>
								</Box>
								<Stack spacing={0.5}>
									{pkg.PackageBase && (
										<Typography
											variant="body2"
											sx={{ color: "#bdc1c6", fontSize: "0.9rem" }}
										>
											Base: {pkg.PackageBase}
										</Typography>
									)}
									{pkg.Submitter && (
										<Typography
											variant="body2"
											sx={{ color: "#bdc1c6", fontSize: "0.9rem" }}
										>
											Submitter: {pkg.Submitter}
										</Typography>
									)}
									{pkg.PackageBaseID && (
										<Typography
											variant="body2"
											sx={{ color: "#bdc1c6", fontSize: "0.9rem" }}
										>
											Base ID: {pkg.PackageBaseID}
										</Typography>
									)}
								</Stack>
							</Box>

							{/* Dates Section */}
							<Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										mb: 1.5,
									}}
								>
									<CalendarTodayIcon sx={{ fontSize: 18, color: "#9aa0a6" }} />
									<Typography
										variant="subtitle2"
										sx={{ color: "#e8eaed", fontWeight: 500 }}
									>
										Timeline
									</Typography>
								</Box>
								<Stack spacing={0.5}>
									<Typography
										variant="body2"
										sx={{ color: "#bdc1c6", fontSize: "0.9rem" }}
									>
										First submitted: {formatDate(pkg.FirstSubmitted)}
									</Typography>
									<Typography
										variant="body2"
										sx={{ color: "#bdc1c6", fontSize: "0.9rem" }}
									>
										Last modified: {formatTime(pkg.LastModified)}
									</Typography>
									{pkg.OutOfDate && (
										<Typography
											variant="body2"
											sx={{ color: "#f28b82", fontSize: "0.9rem" }}
										>
											Out of date since: {formatTime(pkg.OutOfDate)}
										</Typography>
									)}
								</Stack>
							</Box>
						</Box>
					</CardContent>
				</Card>
			))}
		</Stack>
	);
}
