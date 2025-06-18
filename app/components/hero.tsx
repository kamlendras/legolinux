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
	Divider,
	Link as MuiLink,
} from "@mui/material";
import {
	styled,
	alpha,
	ThemeProvider,
	createTheme,
	keyframes,
	responsiveFontSizes,
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

let theme = createTheme({
	palette: {
		primary: { main: "#4285F4" }, // Google Blue
		secondary: { main: "#EA4335" }, // Google Red
		success: { main: "#34A853" }, // Google Green
		warning: { main: "#FBBC05" }, // Google Yellow
		background: {
			default: "#0a0a0a",
			paper: "#1a1a1a",
		},
		text: {
			primary: "#fff",
			secondary: "#b0b0b0",
		},
		divider: "rgba(255,255,255,0.12)",
	},
	shape: {
		borderRadius: 16,
	},
	typography: {
		fontFamily: 'Roboto, "poppins", "Helvetica", "Arial", sans-serif',
		h1: {
			fontWeight: 900,
			fontSize: "4rem",
			letterSpacing: "-0.03em",
		},
		h2: {
			fontWeight: 700,
			fontSize: "2.5rem",
			letterSpacing: "-0.02em",
		},
		h5: {
			fontWeight: 600,
			fontSize: "1.3rem",
		},
		body1: {
			fontSize: "1.1rem",
		},
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					transition: "box-shadow 0.3s, transform 0.3s",
					'&:hover': {
						boxShadow: '0 8px 32px 0 rgba(66,133,244,0.18)',
						transform: 'translateY(-8px) scale(1.01)',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					fontWeight: 700,
					textTransform: 'none',
					fontSize: '1.1rem',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					letterSpacing: '0.01em',
					borderRadius: 8,
					boxShadow: '0 2px 8px 0 rgba(66,133,244,0.08)',
				},
			},
		},
	},
});
theme = responsiveFontSizes(theme);

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
	background: `linear-gradient(120deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.success.main, 0.08)} 100%)`,
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `repeating-linear-gradient(90deg, transparent, transparent 100px, ${alpha(theme.palette.warning.main, 0.03)} 100px, ${alpha(theme.palette.warning.main, 0.03)} 101px)`,
		zIndex: 1,
	},
}));

const HeroContent = styled(Box)({
	position: "relative",
	zIndex: 2,
	textAlign: "center",
	color: "white",
	padding: '2rem 0',
});

const GlowingCard = styled(Card)(({ theme }) => ({
	height: "100%",
	display: "flex",
	flexDirection: "column",
	backdropFilter: "blur(10px)",
	borderRadius: Number(theme.shape.borderRadius) * 1.25,
	transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
	position: "relative",
	overflow: "hidden",
	boxShadow: '0 4px 24px 0 rgba(66,133,244,0.10)',
	"&:hover": {
		transform: "translateY(-12px) scale(1.02)",
		boxShadow: '0 8px 32px 0 rgba(66,133,244,0.18)',
	},
}));

const StatCard = styled(Paper)(({ theme }) => ({
	padding: "2rem",
	textAlign: "center",
	background: `linear-gradient(145deg, #1a1a1a, ${alpha(theme.palette.primary.main, 0.08)})`,
	border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
	borderRadius: theme.shape.borderRadius,
	transition: "all 0.3s ease",
	boxShadow: '0 2px 8px 0 rgba(66,133,244,0.08)',
	"&:hover": {
		transform: "translateY(-5px)",
		border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
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
		link: "/packages",
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
		link: "/security",
		chips: ["Zero-Day Protection", "SOC 2 Compliant", "24/7 Monitoring"],
		highlight: "Enterprise Grade",
	},
	{
		title: "Developer Paradise",
		description:
			"Complete DevOps toolkit with integrated CI/CD, container orchestration, and cloud deployment tools. Built by developers, for developers.",
		icon: <Terminal fontSize="large" />,
		color: "#5C6BC0",
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
												background: 'white' ,
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
											Experience blazing-fast performance, military-grade security, and an ecosystem designed for the next generation of computing
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
											<Link href="/download" passHref legacyBehavior>
												<Button variant="contained" color="primary" size="large" startIcon={<Download />} sx={{ minWidth: 180, fontWeight: 700, fontSize: '1.2rem', boxShadow: 3 }} aria-label="Download LegoLinux">
													Download
												</Button>
											</Link>
											<Link href="https://docs.legolinux.org" passHref legacyBehavior>
												<Button variant="outlined" color="primary" size="large" startIcon={<PlayArrow />} sx={{ minWidth: 180, fontWeight: 700, fontSize: '1.2rem', borderWidth: 2, boxShadow: 1 }} aria-label="View Documentation">
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
				<Box sx={{ py: 10, position: "relative", bgcolor: theme => `linear-gradient(135deg, ${theme.palette.background.default} 60%, ${theme.palette.primary.dark} 100%)` }}>
					<Container maxWidth="lg">
						<Box textAlign="center" mb={8}>
							<Typography
								variant="h2"
								component="h2"
								sx={{
									fontFamily: `'Google Sans', 'Roboto', 'Arial', sans-serif`,
									fontWeight: 900,
									fontSize: { xs: '2.8rem', md: '4.5rem' },
									letterSpacing: '-0.02em',
									mb: 3,
									background: 'linear-gradient(90deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%)',
									backgroundClip: 'text',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									textShadow: 'none',
									display: 'inline-block',
								}}
							>
								Powerful Ecosystem
							</Typography>
							<Typography
								variant="h5"
								color="text.secondary"
								sx={{
									fontFamily: `'Google Sans', 'Roboto', 'Arial', sans-serif`,
									fontWeight: 400,
									fontSize: { xs: '1.15rem', md: '1.35rem' },
									color: theme => theme.palette.text.secondary,
									letterSpacing: 0.01,
									lineHeight: 1.65,
									maxWidth: '800px',
									mx: 'auto',
									mb: 2,
								}}
							>
								Every tool, every feature, every component designed to accelerate your workflow and unleash your creativity
							</Typography>
						</Box>

						<Grid container spacing={5}>
							{features.map((feature, index) => (
								<Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
									<Box sx={{ width: '100%', display: 'flex', alignItems: 'stretch' }}>
										<Card
											elevation={3}
											sx={{
												position: 'relative',
												bgcolor: theme => theme.palette.background.paper,
												borderRadius: 5,
												boxShadow: 3,
												px: 3,
												pt: 7,
												pb: 2,
												width: '100%',
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												overflow: 'visible',
												minHeight: 370,
												transition: 'box-shadow 0.3s, transform 0.3s',
												'&:hover': {
													boxShadow: 8,
													transform: 'translateY(-8px) scale(1.025)',
												},
												'&:hover .feature-avatar': {
													transform: 'scale(1.12)',
													boxShadow: 4,
												},
											}}
										>
											{/* Floating Avatar */}
											<Box
												className="feature-avatar"
												sx={{
													position: 'absolute',
													top: -32,
													left: 0,
													right: 0,
													mx: 'auto',
													width: 64,
													height: 64,
													bgcolor: feature.color,
													color: '#fff',
													borderRadius: '50%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													boxShadow: 3,
													fontSize: 36,
													transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
													zIndex: 2,
												}}
											>
												{feature.icon}
											</Box>
											<CardContent sx={{ flexGrow: 1, width: '100%', textAlign: 'center', px: 0, pt: 0 }}>
												<Typography variant="h6" component="h3" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary', fontSize: '1.35rem', letterSpacing: '-0.01em' }}>
													{feature.title}
												</Typography>
												<Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 64, fontSize: '1.08rem' }}>
													{feature.description}
												</Typography>
												<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
													{feature.chips.map((chip, chipIndex) => (
														<Chip
															key={chipIndex}
															label={chip}
															size="small"
															variant="filled"
															sx={{
																fontWeight: 500,
																bgcolor: `${feature.color}22`, // soft color
																color: feature.color,
																borderRadius: 2,
																px: 1.5,
																fontSize: '0.92rem',
																letterSpacing: 0,
																// Ensure chip text is readable on dark
																'& .MuiChip-label': {
																	color: feature.color,
																},
															}}
														/>
													))}
												</Box>
											</CardContent>
											<Divider sx={{ width: '80%', mx: 'auto', mb: 2, mt: 0, bgcolor: 'rgba(255,255,255,0.08)' }} />
											<CardActions sx={{ width: '100%', px: 0, pb: 1, pt: 0, justifyContent: 'center' }}>
												<MuiLink
													href={feature.link}
													color="inherit"
													underline="none"
													sx={{ width: '100%' }}
												>
													<Button
														variant="contained"
														fullWidth
														endIcon={<ArrowForwardIcon sx={{ ml: 0.5, fontSize: 22 }} />}
														sx={{
															fontWeight: 500,
															borderRadius: Number(theme.shape.borderRadius) * 1.25,
															px: 2.5,
															py: 1.1,
															fontSize: '1.05rem',
															background: t => alpha(t.palette.background.paper, 0.92),
															color: t => t.palette.text.primary,
															border: '1.5px solid transparent',
															boxShadow: 'none',
															textTransform: 'none',
															letterSpacing: 0.02,
															minHeight: 44,
															transition: 'box-shadow 0.18s, transform 0.18s, background 0.18s, border 0.18s',
															'&:hover': {
																background: t => `linear-gradient(90deg, ${feature.color}18 0%, ${feature.color}22 100%)`,
																border: `1.5px solid ${feature.color}`,
																boxShadow: '0 4px 16px 0 rgba(66,133,244,0.13)',
																transform: 'scale(1.035)',
																color: t => t.palette.text.primary,
															},
															'&:focus-visible': {
																outline: '2.5px solid',
																outlineColor: t => t.palette.primary.main,
																outlineOffset: 2,
															},
															'& .MuiTouchRipple-root': {
																borderRadius: Number(theme.shape.borderRadius) * 1.25,
															},
														}}
														aria-label={`Learn more about ${feature.title}`}
													>
														Learn More
													</Button>
												</MuiLink>
											</CardActions>
										</Card>
									</Box>
								</Grid>
							))}
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
