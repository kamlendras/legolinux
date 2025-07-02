import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});
const TypewriterCodeDisplay = () => {
	const code = `export async function loader({ request }) {
  return getProjects();
}

export async function action({ request }) {
  const form = await request.formData();
  return createProject({ title: form.get("title") });
}

export default function Projects() {
  const projects = useLoaderData();
  const { state } = useNavigation();
  const busy = state === "submitting";

  return (
    <div>
      {projects.map((project) => (
        <Link to={project.slug}>{project.title}</Link>
      ))}

      <Form method="post">
        <input name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Project"}
        </button>
      </Form>
    </div>
  );
}
  export default function NewInvoice() {
  return (
    <Form method="post">
      <input type="text" name="company" />
      <input type="text" name="amount" />
      <button type="submit">Create</button>
    </Form>
  );
}

export async function action({ request }) {
  const body = await request.formData();
  const invoice = await createInvoice(body);
}
  export default function NewInvoice() {
  const navigation = useNavigation();
  return (
    <Form method="post">
      <input type="text" name="company" />
      <input type="text" name="amount" />
      <button type="submit">
        {navigation.state === "submitting"
          ? "Creating invoice..."
          : "Create invoice"}
      </button>
    </Form>
  );

export async function action({ request }) {
  const form = await request.formData();
  return createProject({ title: form.get("title") });
}

export default function Projects() {
  const projects = useLoaderData();
  const { state } = useNavigation();
  const busy = state === "submitting";

  return (
    <div>
      {projects.map((project) => (
        <Link to={project.slug}>{project.title}</Link>
      ))}

      <Form method="post">
        <input name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Project"}
        </button>
      </Form>
    </div>
  );
}
  export default function NewInvoice() {
  return (
    <Form method="post">
      <input type="text" name="company" />
      <input type="text" name="amount" />
      <button type="submit">Create</button>
    </Form>
  );
}

export async function action({ request }) {
  const body = await request.formData();
  const invoice = await createInvoice(body);
}
  export default function NewInvoice() {
  const navigation = useNavigation();
  return (
    <Form method="post">
      <input type="text" name="company" />
      <input type="text" name="amount" />
      <button type="submit">
        {navigation.state === "submitting"
          ? "Creating invoice..."
          : "Create invoice"}
      </button>
    </Form>
  );
}`;

	const [displayedText, setDisplayedText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(true);
	const containerRef = useRef(null);

	const typingSpeed = 0;

	const startTyping = () => {
		setIsTyping(true);
		setCurrentIndex(0);
		setDisplayedText("");
	};

	const stopTyping = () => {
		setIsTyping(false);
	};

	const resetTyping = () => {
		setIsTyping(false);
		setCurrentIndex(0);
		setDisplayedText("");
	};

	useEffect(() => {
		if (!isTyping || currentIndex >= code.length) {
			if (currentIndex >= code.length) {
				setIsTyping(false);
			}
			return;
		}

		const timer = setTimeout(() => {
			setDisplayedText((prev) => prev + code[currentIndex]);
			setCurrentIndex((prev) => prev + 1);
		}, typingSpeed);

		return () => clearTimeout(timer);
	}, [currentIndex, isTyping, code, typingSpeed]);

	// Auto-scroll when content overflows
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [displayedText]);

	const progress = code.length > 0 ? (currentIndex / code.length) * 100 : 0;

	return (
		<div>
			<div
				ref={containerRef}
				className="drawer-content"
				style={{
					height: "calc(100vh - 120px)",
				}}
			>
				<pre>
					<code>
						<Typography
							variant="body2"
							gutterBottom
							sx={{
								fontFamily: sourceCodePro.style.fontFamily,
								fontWeight: 400,
								fontSize: "18px",
								lineHeight: "29px",
							}}
						>
							<SyntaxHighlighter
								language="javascript"
								style={dark}
								customStyle={{
									background: "transparent",
									border: "none",
									borderRadius: 0,
									padding: 0,
									margin: 0,
									boxShadow: "none",
									outline: "none",
								}}
							>
								{displayedText}
							</SyntaxHighlighter>
							{isTyping && (
								<span className="animate-pulse bg-green-400 text-gray-900 px-1">
									|
								</span>
							)}
						</Typography>
					</code>
				</pre>
			</div>
		</div>
	);
};

export default TypewriterCodeDisplay;
