"use client";
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Code from "./code";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Accordion, CssBaseline } from "@mui/material";
import Buttons from "./buttons";
import FAQ from "./faq";
import Footer from "./fotter";
import Header from "./header"
import  Terminal  from "./terminal";
const theme = createTheme();
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export default function Page() {
	const [open, setOpen] = React.useState(false);
	const [currentSection, setCurrentSection] = React.useState(0);
	const [isScrolling, setIsScrolling] = React.useState(false);
	
	const sectionRefs = [
		React.useRef(null), // Section A
		React.useRef(null), // Section B
		React.useRef(null), // Section C
	];
	
	const targetSectionRef = sectionRefs[1]; // Section B for drawer functionality

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	// Drawer functionality (only for section B)
	React.useEffect(() => {
		const handleDrawerScroll = () => {
			if (targetSectionRef.current) {
				const rect = targetSectionRef.current.getBoundingClientRect();
				const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;

				// Only open drawer when specifically in section B
				if (currentSection === 1 && isInView && !open) {
					setOpen(true);
				} else if ((currentSection !== 1 || !isInView) && open) {
					setOpen(false);
				}
			}
		};

		handleDrawerScroll();
		
		// Also listen to scroll events for manual scrolling
		window.addEventListener("scroll", handleDrawerScroll);

		return () => {
			window.removeEventListener("scroll", handleDrawerScroll);
		};
	}, [open, currentSection]);

	// Section scrolling functionality
	React.useEffect(() => {
		let scrollTimeout;

		const handleWheel = (e) => {
			if (isScrolling) return;

			e.preventDefault();
			
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				const delta = e.deltaY;
				let nextSection = currentSection;

				if (delta > 0 && currentSection < sectionRefs.length - 1) {
					// Scroll down
					nextSection = currentSection + 1;
				} else if (delta < 0 && currentSection > 0) {
					// Scroll up
					nextSection = currentSection - 1;
				}

				if (nextSection !== currentSection) {
					scrollToSection(nextSection);
				}
			}, 50);
		};

		const handleKeyDown = (e) => {
			if (isScrolling) return;

			let nextSection = currentSection;

			if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection < sectionRefs.length - 1) {
				nextSection = currentSection + 1;
			} else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
				nextSection = currentSection - 1;
			}

			if (nextSection !== currentSection) {
				e.preventDefault();
				scrollToSection(nextSection);
			}
		};

		// Touch/swipe support for mobile
		let touchStartY = 0;
		const handleTouchStart = (e) => {
			touchStartY = e.touches[0].clientY;
		};

		const handleTouchEnd = (e) => {
			if (isScrolling) return;

			const touchEndY = e.changedTouches[0].clientY;
			const deltaY = touchStartY - touchEndY;
			const threshold = 50; // Minimum swipe distance

			if (Math.abs(deltaY) > threshold) {
				let nextSection = currentSection;

				if (deltaY > 0 && currentSection < sectionRefs.length - 1) {
					// Swipe up (scroll down)
					nextSection = currentSection + 1;
				} else if (deltaY < 0 && currentSection > 0) {
					// Swipe down (scroll up)
					nextSection = currentSection - 1;
				}

				if (nextSection !== currentSection) {
					scrollToSection(nextSection);
				}
			}
		};

		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchend', handleTouchEnd, { passive: true });

		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
			clearTimeout(scrollTimeout);
		};
	}, [currentSection, isScrolling]);

	const scrollToSection = (sectionIndex) => {
		if (sectionRefs[sectionIndex]?.current && !isScrolling) {
			setIsScrolling(true);
			setCurrentSection(sectionIndex);

			// Close drawer immediately when leaving section B
			if (sectionIndex !== 1 && open) {
				setOpen(false);
			}

			sectionRefs[sectionIndex].current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});

			// Reset scrolling flag after animation completes
			setTimeout(() => {
				setIsScrolling(false);
			}, 1000);
		}
	};

	// Detect which section is currently in view (for manual scrolling)
	React.useEffect(() => {
		const handleScroll = () => {
			if (isScrolling) return;

			const scrollPosition = window.scrollY + window.innerHeight / 2;

			sectionRefs.forEach((ref, index) => {
				if (ref.current) {
					const rect = ref.current.getBoundingClientRect();
					const elementTop = window.scrollY + rect.top;
					const elementBottom = elementTop + rect.height;

					if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
						setCurrentSection(index);
					}
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isScrolling]);

	const TypedCode = ({ code, language = "javascript" }) => {
		const [displayedCode, setDisplayedCode] = useState("");
		const [currentIndex, setCurrentIndex] = useState(0);

		useEffect(() => {
			if (currentIndex < code.length) {
				const timeout = setTimeout(() => {
					setDisplayedCode(code.slice(0, currentIndex + 1));
					setCurrentIndex(currentIndex + 1);
				}, 40);
				return () => clearTimeout(timeout);
			}
		}, [currentIndex, code]);

		return (
			<SyntaxHighlighter
				language={language}
				style={dark}
				customStyle={{
					background: "transparent",
					border: "none",
					borderRadius: 0,
					padding: 0,
					margin: 0,
					Width: "100%",
					boxShadow: "none",
					outline: "none",
				}}
			>
				{displayedCode}
			</SyntaxHighlighter>
		);
	};

	const DrawerList = (
		<Box sx={{ p: 3 }} className="nobar">
			<Code />
		</Box>
	);

	
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
		
			
			
				
			<Box
				ref={sectionRefs[0]}
				sx={{
					height: "100vh",
					display: "flex",
					bgcolor: "#000000",
				}}
			>
				
				
				<Grid container spacing={{ xs: 2, sm: 4, md: 10 }}>
					<Grid
						size={{ xs: 12, sm: 12, md: 6 }}
						sx={{
							justifyContent: "center",
							alignItems: "flex-end",
							padding: {
								xs: "2rem 1rem",
								sm: "3rem 2rem",
								md: "4rem 3rem",
								lg: "6rem",
							},
						}}
					>
						<div>
							<Typography
								variant="h1"
								sx={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
									fontWeight: 900,
									fontSize: {
										xs: "28px",
										sm: "36px",
										md: "48px",
										lg: "64px",
									},
									lineHeight: {
										xs: "32px",
										sm: "40px",
										md: "52px",
										lg: "68px",
									},
								}}
								className="inline"
							>
								LegoLinux is a <span style={{ color: "#FECC1B" }}>modular</span>{" "}
								<span style={{ color: "#FECC1B" }}>Linux</span>{" "}
								<span style={{ color: "#f44336" }}>distribution</span> with
								built-in{" "}
								<span style={{ color: "#9c27b0" }}>local AI models.</span>{" "}
								<span style={{ color: "#6BD968" }}>
									Snap together the components you need.
								</span>
							</Typography>
						</div>
						<Typography
							variant="h5"
							gutterBottom
							sx={{
								mt: { xs: 2, sm: 2.5, md: 3 },
								color: "rgb(200, 200, 200)",
								fontFamily:
									'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
								fontWeight: 400,
								fontSize: {
									xs: "14px",
									sm: "16px",
									md: "18px",
									lg: "20px",
								},
								lineHeight: {
									xs: "22px",
									sm: "25px",
									md: "28px",
									lg: "31px",
								},
							}}
						>
							LegoLinux is a modular, open-source Linux distribution designed
							for the AI era. Like connecting Lego blocks, our system lets you
							snap together the components you need—from lightweight desktop
							environments to powerful local AI models.
						</Typography>
						<Buttons />
					</Grid>
					<Grid
						size={{ xs: 12, sm: 12, md: 6 }}
						sx={{
							justifyContent: "center",
							alignItems: "flex-end",
							padding: {
								xs: "1rem 1rem",
								sm: "1rem 2rem",
								md: "1rem",
							},
							marginTop: {
								xs: "1rem 1rem",
								sm: "1rem 2rem",
								md: "5rem",
							},
						}}
					>
						<Terminal/>
					</Grid>
				</Grid>
			</Box>

			{/* Section B */}
			<Box
				ref={sectionRefs[1]}
				sx={{
					minHeight: "100vh",
					display: "flex",
					bgcolor: "#000000",
					alignItems: "center",
					py: { xs: 4, sm: 6, md: 8 },
				}}
			>
				<Grid container sx={{ width: "100%", height: "100%" }}>
					<Grid
						size={{ xs: 12, sm: 12, md: 6 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: { xs: "center", md: "flex-start" },
							padding: {
								xs: "2rem 1.5rem",
								sm: "3rem 2rem",
								md: "3rem 2rem",
								lg: "4rem 3rem",
							},
							textAlign: { xs: "center", md: "left" },
						}}
					>
						<div className="block">
							<Typography
								variant="h1"
								sx={{
									fontFamily:
										'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
									fontWeight: 900,
									fontSize: {
										xs: "32px",
										sm: "40px",
										md: "52px",
										lg: "64px",
									},
									lineHeight: {
										xs: "36px",
										sm: "44px",
										md: "56px",
										lg: "68px",
									},
									mb: { xs: 2, sm: 3, md: 4 },
									letterSpacing: "-0.02em",
								}}
							>
								<span style={{ color: "#00c853" }}>Open Source</span>{" "}
								<span style={{ color: "#ff5722" }}>Local AI</span>{" "}
								<span style={{ color: "#ffc107" }}>Models</span>
							</Typography>

							<Typography
								variant="h4"
								sx={{
									color: "rgb(200, 200, 200)",
									fontFamily:
										'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
									fontWeight: 400,
									fontSize: {
										xs: "16px",
										sm: "18px",
										md: "20px",
										lg: "22px",
									},
									lineHeight: {
										xs: "24px",
										sm: "28px",
										md: "31px",
										lg: "34px",
									},
									mb: { xs: 3, sm: 4, md: 5 },
									maxWidth: { xs: "100%", md: "90%", lg: "85%" },
									opacity: 0.9,
								}}
							>
								AI models run directly on your computer, offering privacy and
								control. They are free, customizable, and work offline. No cloud
								dependence, no data leaks, just seamless local intelligence.
							</Typography>

							<Box
								className="models-logo"
								sx={{
									display: "flex",
									flexWrap: "wrap",
									gap: { xs: 2, sm: 3, md: 4 },
									alignItems: "center",
									justifyContent: { xs: "center", md: "flex-start" },
									"& img": {
										height: { xs: "35px", sm: "40px", md: "45px", lg: "50px" },
										width: "auto",
										opacity: 0.8,
										transition: "all 0.3s ease",
										filter: "brightness(0.9)",
										"&:hover": {
											opacity: 1,
											transform: "scale(1.1)",
											filter: "brightness(1.1)",
										},
									},
								}}
							>
								<img src="deepseek.svg" alt="DeepSeek AI" />
								<img src="copilot.svg" alt="GitHub Copilot" />
								<img src="grok.svg" alt="Grok AI" />
								<img src="llama.svg" alt="Meta LLaMA" />
								<img src="mistral.svg" alt="Mistral AI" />
								<img src="gpt.svg" alt="Open AI" />
								<img src="qwen.svg" alt="Qwen AI" />
								<img src="claude.svg" alt="Claude AI" />
								<img src="gemini.svg" alt="Gemini AI" />
								<img src="granite.svg" alt="Granite AI" />
							</Box>
						</div>
					</Grid>
				</Grid>
			</Box>

			{/* Section C */}
			<Box
				ref={sectionRefs[2]}
				sx={{
					minHeight: "100vh",
					display: "block",
					alignItems: "center",
					justifyContent: "center",
					bgcolor: "#000000",
				}}
			>
				<FAQ />
				<Footer/>
			</Box>

			<Drawer
				anchor="right"
				open={open}
				onClose={toggleDrawer(false)}
				sx={{
					"& .MuiDrawer-paper": {
						width: "50vw",
						[theme.breakpoints.down("md")]: {
							width: 0,
							overflow: "hidden",
							visibility: "hidden",
						},
					},
					"& .MuiBackdrop-root": {
						backgroundColor: "transparent",
						[theme.breakpoints.down("md")]: {
							display: "none",
						},
					},
				}}
			>
				{DrawerList}
			</Drawer>
		</ThemeProvider>
	);
}