"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("md")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

const pages = ["Packages", "Forums", "Docs", "GitLab", "Security", "Download"];

export default function DrawerAppBar(props: Props) {
	const theme = useTheme();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null,
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);
	const [headerSearch, setHeaderSearch] = React.useState("");
	const router = useRouter();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Link href="/">
				<Typography variant="h6" sx={{ my: 2 }}>
					Lego Linux
				</Typography>
			</Link>
			<Divider />
			<List>
				<Link href="/packages">
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Packages</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="https://forum.legolinux.org">
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Forums</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="https://docs.legolinux.org">
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Docs</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="https://gitlab.legolinux.org">
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>GitHub</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/security">
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Security</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/download">
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Download</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;
	return (
		<>
			<AppBar
				position="static"
				elevation={3}
				sx={{
					background: "#181C20",
					backdropFilter: "blur(8px)",
					boxShadow: "0 2px 12px 0 rgba(66,133,244,0.10)",
				}}
			>
				<Container maxWidth="xl">
					<Toolbar
						disableGutters
						sx={{
							minHeight: 64,
							px: { xs: 1, md: 2 },
							display: "flex",
							borderRadius: { xs: 0, md: 2 },
						}}
					>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { md: "none" }, borderRadius: 2, p: 1.2 }}
						>
							<MenuIcon />
						</IconButton>

						<Link href="/">
							<img
								src="/white-icon.svg"
								height={40}
								width={40}
								style={{ marginRight: 12 }}
							/>
						</Link>
						<Link href="/">
							<Typography
								variant="h5"
								noWrap
								//   component="a"
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									fontWeight: 900,
									fontSize: "1.5rem",
									color: "#fff",
									textDecoration: "none",
									letterSpacing: "-0.01em",
								}}
							>
								Lego Linux
							</Typography>
						</Link>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
								alignItems: "center",
							}}
						>
							{[
								{ name: "Packages", url: "/packages", external: false },
								{
									name: "Forums",
									url: "https://forum.legolinux.org",
									external: true,
								},
								{
									name: "Docs",
									url: "https://docs.legolinux.org",
									external: true,
								},
								{
									name: "GitLab",
									url: "https://gitlab.legolinux.org",
									external: true,
								},
								{ name: "Security", url: "/security", external: false },
							].map((page) =>
								page.external ? (
									<a
										href={page.url}
										key={page.name}
										target="_blank"
										rel="noopener noreferrer"
										style={{ textDecoration: "none" }}
									>
										<Button
											sx={{
												my: 2,
												color: "#fff",
												display: "block",
												borderRadius: 2,
												px: 2.5,
												fontWeight: 600,
												fontSize: "1.08rem",
												transition: "background 0.2s",
												"&:hover": {
													background: "rgba(255,255,255,0.08)",
												},
											}}
											disableRipple
										>
											{page.name}
										</Button>
									</a>
								) : (
									<Link href={page.url} key={page.name}>
										<Button
											sx={{
												my: 2,
												color: "#fff",
												display: "block",
												borderRadius: 2,
												px: 2.5,
												fontWeight: 600,
												fontSize: "1.08rem",
												transition: "background 0.2s",
												"&:hover": {
													background: "rgba(255,255,255,0.08)",
												},
											}}
											disableRipple
										>
											{page.name}
										</Button>
									</Link>
								),
							)}
							<Link href="/download">
								<Button
									variant="contained"
									color="primary"
									sx={{
										my: 2,
										ml: 2,
										px: 3.5,
										borderRadius: 99,
										fontWeight: 700,
										fontSize: "1.08rem",
										boxShadow: 2,
										textTransform: "none",
										letterSpacing: 0,
										minHeight: 44,
										color: "#fff",
										background: theme.palette.primary.main,
										transition: "box-shadow 0.2s, transform 0.2s",
									}}
									aria-label="Download Lego Linux"
								>
									Download
								</Button>
							</Link>
						</Box>

						<nav>
							<Drawer
								container={container}
								variant="temporary"
								open={mobileOpen}
								onClose={handleDrawerToggle}
								ModalProps={{
									keepMounted: true, // Better open performance on mobile.
								}}
								sx={{
									display: { md: "block", lg: "none" },
									"& .MuiDrawer-paper": {
										boxSizing: "border-box",
										width: drawerWidth,
									},
								}}
							>
								{drawer}
							</Drawer>
						</nav>

						<Search
							sx={{
								ml: 2,
								borderRadius: 99,
								bgcolor: "rgba(255,255,255,0.08)",
								"&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
							}}
						>
							<SearchIconWrapper>
								<SearchIcon
									sx={{ cursor: "pointer" }}
									onClick={() => {
										if (headerSearch.trim()) {
											router.push(
												`/packages?query=${encodeURIComponent(headerSearch)}`,
											);
										}
									}}
								/>
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
								value={headerSearch}
								onChange={(e) => setHeaderSearch(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && headerSearch.trim()) {
										router.push(
											`/packages?query=${encodeURIComponent(headerSearch)}`,
										);
									}
								}}
							/>
						</Search>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
