"use client";
import Grid from "@mui/material/GridLegacy";
import Link from "next/link";
import Background from "./background";
import React, { useState, useEffect, useRef } from "react";
import {
	Container,
	Typography,
	Box,
	Button,
	Card,
	CardContent,
	CardActions,
	Fade,
	Chip,
	IconButton,
	Paper,
} from "@mui/material";
import {
	styled,
	alpha,
	ThemeProvider,
	createTheme,
	keyframes,
} from "@mui/material/styles";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AdbIcon from "@mui/icons-material/Adb";
import GroupIcon from "@mui/icons-material/Group";
import {
	Download,
	Security,
	Description,
	PlayArrow,
	Shield,
	Terminal,
	CloudDownload,
	KeyboardArrowRight,
} from "@mui/icons-material";

const theme = createTheme({
	palette: {
		secondary: {
			main: "#2D98D4",
		},
		background: {
			default: "#0a0a0a",
			paper: "#1a1a1a",
		},
		text: {
			primary: "#ffffff",
			secondary: "#b0b0b0",
		},
	},
	typography: {
		fontFamily: '"poppins", "Helvetica", "Arial", sans-serif',
	},
});


const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(200, 152, 58, 0.3); }
  50% { box-shadow: 0 0 40px rgba(200, 152, 58, 0.6); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const HeroSection = styled(Box)(({ theme }) => ({
	minHeight: "100vh",
	display: "flex",
	alignItems: "center",
	position: "relative",
	overflow: "hidden",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 100px,
        rgba(200, 152, 58, 0.03) 100px,
        rgba(200, 152, 58, 0.03) 101px
      )
    `,
		zIndex: 1,
	},
}));



const HeroContent = styled(Box)({
	position: "relative",
	zIndex: 2,
	textAlign: "center",
	color: "white",
});

const GlowingCard = styled(Card)(({ theme}) => ({
	height: "100%",
	display: "flex",
	flexDirection: "column",
	backdropFilter: "blur(10px)",
	borderRadius: "20px",
	transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
	position: "relative",
	overflow: "hidden",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: "2px",
		opacity: 0,
		transition: "opacity 0.3s ease",
	},
	"&:hover": {
		transform: "translateY(-12px) scale(1.02)",
		"&::before": {
			opacity: 1,
		},
	},
}));

const StatCard = styled(Paper)(({ theme }) => ({
	padding: "2rem",
	textAlign: "center",
	background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
	border: "1px solid rgba(200, 152, 58, 0.1)",
	borderRadius: "16px",
	transition: "all 0.3s ease",
	"&:hover": {
		transform: "translateY(-5px)",
		border: "1px solid rgba(200, 152, 58, 0.3)",
	},
}));



const pageColors = {
	packages: "#2D98D4",
	forums: "#57A557",
	docs: "#7b1fa2",
	security: "#E95B4D",
	download: "#EC924C",
	gitlab: "#00e5ff",
	home: "#c8983a",
};

const features = [
	{
		title: "Advanced Package Management",
		description:
			"Lightning-fast package installation with intelligent dependency resolution. Features automatic updates, rollback capabilities, and secure package verification.",
		icon: <AdbIcon fontSize="large" />,
		color: pageColors.packages,
		link: "https://pkgs.legolinux.org",
		chips: ["0K+ Packages", "Auto-Update", "Rollback Support"],
		highlight: "Most Popular",
	},
	{
		title: "Thriving Community",
		description:
			"Join our 24/7 active community of Linux enthusiasts, developers, and experts. Get instant help, share projects, and collaborate on open-source initiatives.",
		icon: <GroupIcon fontSize="large" />,
		color: pageColors.forums,
		link: "https://forum.legolinux.org",
		chips: ["0K+ Members", "24/7 Support", "Expert Mentors"],
	},
	{
		title: "Comprehensive Documentation",
		description:
			"From beginner tutorials to advanced system administration guides. Interactive examples, video walkthroughs, and API documentation all in one place.",
		icon: <Description fontSize="large" />,
		color: pageColors.docs,
		link: "https://docs.legolinux.org",
		chips: ["0+ Guides", "Interactive Labs", "Video Tutorials"],
	},
	{
		title: "Enterprise Security",
		description:
			"Military-grade security with real-time threat detection, automated patching, and comprehensive audit logging. SOC 2 compliant and battle-tested.",
		icon: <Shield fontSize="large" />,
		color: pageColors.security,
		link: "https://security.legolinux.org",
		chips: ["Zero-Day Protection", "SOC 2 Compliant", "24/7 Monitoring"],
		highlight: "Enterprise Grade",
	},
	{
		title: "Developer Paradise",
		description:
			"Complete DevOps toolkit with integrated CI/CD, container orchestration, and cloud deployment tools. Built by developers, for developers.",
		icon: <Terminal fontSize="large" />,
		color: pageColors.gitlab,
		link: "https://gitlab.legolinux.org",
		chips: ["Full DevOps Stack", "Container Native", "Cloud Ready"],
	},
	{
		title: "Instant Downloads",
		description:
			"Get started in minutes with our optimized ISOs. Multiple flavors available including minimal, desktop, and server editions with ARM64 support.",
		icon: <CloudDownload fontSize="large" />,
		color: pageColors.download,
		link: "/download",
		chips: ["Multiple Editions", "ARM64 Support", "Live Boot"],
		highlight: "New Release",
	},
];

const stats = [
	{
		number: "0K+",
		label: "Active Users",
		icon: <GroupIcon />,
		color: "#57A557",
	},
	{ number: "0K+", label: "Packages", icon: <AdbIcon />, color: "#2D98D4" },
	{
		number: "99.99%",
		label: "Uptime",
		icon: <AccessTimeFilledIcon />,
		color: "#c8983a",
	},
	{ number: "24/7", label: "Security", icon: <Shield />, color: "#E95B4D" },
];

export default function Home() {
	const [visible, setVisible] = useState(false);
	const [activeFeature, setActiveFeature] = useState(0);
	const heroRef = useRef(null);

	useEffect(() => {
		setVisible(true);
		const interval = setInterval(() => {
			setActiveFeature((prev) => (prev + 1) % features.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
				{/* Hero Section */}
				<Background height="400" width="400">
					<HeroSection ref={heroRef}>
					

						<Container maxWidth="lg">
							<HeroContent>
								<Fade in={visible} timeout={1000}>
									<Box>
										<Typography
											variant="h1"
											component="h1"
											sx={{
												fontSize: { xs: "3rem", md: "5.5rem" },
												fontWeight: 900,
												mb: 3,
												maxWidth: "35ch",
												background: "#ffffff",
												backgroundClip: "text",
												WebkitBackgroundClip: "text",
												WebkitTextFillColor: "transparent",
												textShadow: "none",
												letterSpacing: "-0.02em",
											}}
										>
											Develop faster. <br />
											Run anywhere.
										</Typography>
										<Typography
											variant="h2"
											component="h2"
											sx={{
												fontSize: { xs: "1.5rem", md: "2.2rem" },
												mb: 2,
												fontWeight: 300,
												opacity: 0.9,
												maxWidth: "900px",
												mx: "auto",
												lineHeight: 1.4,
											}}
										>
											Build with the #1 most-used developer tool
										</Typography>
										<Typography
											variant="h6"
											sx={{
												mb: 6,
												opacity: 0.7,
												maxWidth: "700px",
												mx: "auto",
												fontSize: { xs: "1rem", md: "1.3rem" },
											}}
										>
											Experience blazing-fast performance, military-grade
											security, and an ecosystem designed for the next
											generation of computing
										</Typography>
										<Box
											sx={{
												display: "flex",
												gap: 3,
												justifyContent: "center",
												flexWrap: "wrap",
												mt: 6,
											}}
										>
											<Link href="/download">
												<Button className="contained-button" size="large">
													<Download sx={{ mr: 1 }} />
													Download
												</Button>
											</Link>
											<Link href="https://docs.legolinux.org">
												<Button className="outlined-button" size="large">
													<PlayArrow sx={{ mr: 1 }} />
													Documentation
												</Button>
											</Link>
										</Box>
									</Box>
								</Fade>
							</HeroContent>
						</Container>
					</HeroSection>
				</Background>
				{/* Stats Section */}
				<Box sx={{ py: 8, position: "relative" }}>
					<Container maxWidth="lg">
						<Grid container spacing={4} justifyContent="center">
							{stats.map((stat, index) => (
								<Grid item xs={6} md={3} key={index}>
									<Fade in={visible} timeout={1200 + index * 200}>
										<StatCard elevation={0}>
											<Box sx={{ color: stat.color, mb: 2 }}>{stat.icon}</Box>
											<Typography
												variant="h2"
												component="div"
												sx={{
													fontWeight: 900,
													color: "text.primary",
													fontSize: { xs: "2rem", md: "3rem" },
													mb: 1,
												}}
											>
												{stat.number}
											</Typography>
											<Typography variant="h6" color="text.secondary">
												{stat.label}
											</Typography>
										</StatCard>
									</Fade>
								</Grid>
							))}
						</Grid>
					</Container>
				</Box>

				{/* Features Section */}
				<Box sx={{ py: 10, position: "relative" }}>
					<Container maxWidth="lg">
						<Box textAlign="center" mb={8}>
							<Typography
								variant="h2"
								component="h2"
								sx={{
									fontSize: { xs: "2.5rem", md: "4rem" },
									fontWeight: 900,
									mb: 3,
									background: `linear-gradient(45deg, ${pageColors.home}, ${pageColors.packages})`,
									backgroundClip: "text",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
								}}
							>
								Powerful Ecosystem
							</Typography>
							<Typography
								variant="h5"
								color="text.secondary"
								sx={{ maxWidth: "800px", mx: "auto", lineHeight: 1.6 }}
							>
								Every tool, every feature, every component designed to
								accelerate your workflow and unleash your creativity
							</Typography>
						</Box>

						<Grid container spacing={4}>
							{features.map((feature, index) => (
								<Grid item xs={12} md={6} lg={4} key={index}>
									<Fade in={visible} timeout={1500 + index * 150}>
										<GlowingCard color={feature.color}>
											{feature.highlight && (
												<Box
													sx={{
														position: "absolute",
														top: 16,
														right: 16,
														background: `linear-gradient(45deg, ${feature.color}, ${alpha(feature.color, 0.8)})`,
														color: "white",
														px: 2,
														py: 0.5,
														borderRadius: "20px",
														fontSize: "0.75rem",
														fontWeight: 700,
														animation: `${glow} 2s ease-in-out infinite`,
													}}
												>
													{feature.highlight}
												</Box>
											)}
											<CardContent sx={{ flexGrow: 1, p: 4 }}>
												<Box
													sx={{
														color: feature.color,
														mb: 3,
														p: 2,
														borderRadius: "16px",
														background: `linear-gradient(145deg, ${alpha(feature.color, 0.1)}, ${alpha(feature.color, 0.05)})`,
														display: "inline-block",
													}}
												>
													{feature.icon}
												</Box>
												<Typography
													variant="h5"
													component="h3"
													gutterBottom
													sx={{
														fontWeight: 700,
														color: "text.primary",
														mb: 2,
													}}
												>
													{feature.title}
												</Typography>
												<Typography
													variant="body1"
													color="text.secondary"
													paragraph
													sx={{ lineHeight: 1.7 }}
												>
													{feature.description}
												</Typography>
												<Box
													sx={{
														display: "flex",
														flexWrap: "wrap",
														gap: 1,
														mt: 3,
													}}
												>
													{feature.chips.map((chip, chipIndex) => (
														<Chip
															key={chipIndex}
															label={chip}
															size="small"
															sx={{
																backgroundColor: alpha(feature.color, 0.1),
																color: feature.color,
																fontWeight: 600,
																border: `1px solid ${alpha(feature.color, 0.3)}`,
															}}
														/>
													))}
												</Box>
											</CardContent>
											<CardActions sx={{ p: 4, pt: 0 }}>
												<Link
													href={feature.link}
													style={{ width: "100%", textDecoration: "none" }}
												>
													<Button
													className="contained-button"
														fullWidth
														endIcon={<KeyboardArrowRight />}
														sx={{
															color: feature.color,
															borderColor: feature.color,
															py: 1.5,
															fontSize: "1rem",
															fontWeight: 600,
															borderRadius: "12px",
															"&:hover": {
																borderColor: feature.color,
																background: `linear-gradient(145deg, ${alpha(feature.color, 0.1)}, ${alpha(feature.color, 0.05)})`,
																transform: "translateY(-2px)",
															},
														}}
													>
														Explore Now
													</Button>
												</Link>
											</CardActions>
										</GlowingCard>
									</Fade>
								</Grid>
							))}
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
