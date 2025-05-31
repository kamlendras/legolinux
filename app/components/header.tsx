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
import { usePathname } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface Props {
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

const pageColors: { [key: string]: string } = {
	home: "#c8983a",
	packages: "#2D98D4", 
	forums: "#57A557", 
	wiki: "#7b1fa2", 
	security: "#E95B4D", 
	download: "#EC924C", 
	github: "#424242", 
};

const pages = ["Packages", "Forums", "Wiki", "GitHub", "Security", "Download"];

export default function DrawerAppBar(props: Props) {
	const pathname = usePathname();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	
	const getActiveSectionFromPath = (path: string): string => {
		if (path === "/") return "home";
		if (path.startsWith("/packages")) return "packages";
		if (path.startsWith("/forums")) return "forums";
		if (path.startsWith("/wiki")) return "wiki";
		if (path.startsWith("/security")) return "security";
		if (path.startsWith("/download")) return "download";
		if (path.includes("github.com")) return "github";
		return "home";
	};

	const [activeSection, setActiveSection] = React.useState<string>(getActiveSectionFromPath(pathname));

	
	React.useEffect(() => {
		setActiveSection(getActiveSectionFromPath(pathname));
	}, [pathname]);

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

	const handleSectionClick = (section: string) => {
		setActiveSection(section.toLowerCase());
		handleCloseNavMenu();
	};

	const handleHomeClick = () => {
		setActiveSection("home");
	};

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Link href="/" onClick={handleHomeClick}>
				<Typography variant="h6" sx={{ my: 2 }}>
					Lego Linux
				</Typography>
			</Link>
			<Divider />
			<List>
				<Link href="/packages" onClick={() => handleSectionClick("packages")}>
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Packages</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/forums" onClick={() => handleSectionClick("forums")}>
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Forums</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/wiki" onClick={() => handleSectionClick("wiki")}>
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Wiki</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="https://github.com/kamlendras/legolinux" onClick={() => handleSectionClick("github")}>
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>GitHub</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/security" onClick={() => handleSectionClick("security")}>
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Security</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/download" onClick={() => handleSectionClick("download")}>
					<ListItem disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText>Download</ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;
	
	return (
		<AppBar 
			position="static" 
			style={{ 
				background: pageColors[activeSection],
				transition: "background-color 0.3s ease"
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { md: "none" } }}
					>
						<MenuIcon />
					</IconButton>

					<Link href="/" onClick={handleHomeClick}>
						<img
							src="/white-icon.svg"
							height={36}
							width={36}
							style={{ marginRight: 10 }}
						/>
					</Link>
					<Link href="/" onClick={handleHomeClick}>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Lego Linux
						</Typography>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<Link href="/packages" onClick={() => handleSectionClick("packages")}>
							<Button
								sx={{ 
									my: 2, 
									color: "white", 
									display: "block",
									backgroundColor: activeSection === "packages" ? "rgba(255,255,255,0.1)" : "transparent",
									"&:hover": {
										backgroundColor: "rgba(255,255,255,0.2)"
									}
								}}
							>
								Packages
							</Button>
						</Link>
						<Link href="/forums" onClick={() => handleSectionClick("forums")}>
							<Button
								sx={{ 
									my: 2, 
									color: "white", 
									display: "block",
									backgroundColor: activeSection === "forums" ? "rgba(255,255,255,0.1)" : "transparent",
									"&:hover": {
										backgroundColor: "rgba(255,255,255,0.2)"
									}
								}}
							>
								Forums
							</Button>
						</Link>
						<Link href="/wiki" onClick={() => handleSectionClick("wiki")}>
							<Button
								sx={{ 
									my: 2, 
									color: "white", 
									display: "block",
									backgroundColor: activeSection === "wiki" ? "rgba(255,255,255,0.1)" : "transparent",
									"&:hover": {
										backgroundColor: "rgba(255,255,255,0.2)"
									}
								}}
							>
								Wiki
							</Button>
						</Link>
						<Link href="https://github.com/kamlendras/legolinux" onClick={() => handleSectionClick("github")}>
							<Button
								sx={{ 
									my: 2, 
									color: "white", 
									display: "block",
									backgroundColor: activeSection === "github" ? "rgba(255,255,255,0.1)" : "transparent",
									"&:hover": {
										backgroundColor: "rgba(255,255,255,0.2)"
									}
								}}
							>
								GitHub
							</Button>
						</Link>
						<Link href="/security" onClick={() => handleSectionClick("security")}>
							<Button
								sx={{ 
									my: 2, 
									color: "white", 
									display: "block",
									backgroundColor: activeSection === "security" ? "rgba(255,255,255,0.1)" : "transparent",
									"&:hover": {
										backgroundColor: "rgba(255,255,255,0.2)"
									}
								}}
							>
								Security
							</Button>
						</Link>
						<Link href="/download" onClick={() => handleSectionClick("download")}>
							<Button
								sx={{ 
									my: 2, 
									color: "white", 
									display: "block",
									backgroundColor: activeSection === "download" ? "rgba(255,255,255,0.1)" : "transparent",
									"&:hover": {
										backgroundColor: "rgba(255,255,255,0.2)"
									}
								}}
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
								keepMounted: true, 
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

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
				</Toolbar>
			</Container>
		</AppBar>
	);
}









