import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const blinkCursor = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const TerminalContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0a0a0a',
  border: '1px solid #333',
  borderRadius: '12px',
  padding: '20px',
  fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#00ff00',
  maxHeight: '500px',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '0 8px 32px rgba(0, 255, 0, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30px',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px 12px 0 0',
    borderBottom: '1px solid #333',
  }
}));

const TerminalHeader = styled(Box)({
  position: 'absolute',
  top: '8px',
  left: '15px',
  display: 'flex',
  gap: '8px',
  zIndex: 1,
});

const TerminalButton = styled('div')(({ color }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: color,
}));

const TerminalContent = styled(Box)({
  marginTop: '30px',
  minHeight: '400px',
});

const CommandLine = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

const Prompt = styled(Typography)({
  color: '#00ff00',
  fontWeight: 'bold',
  marginRight: '8px',
  fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
});

const Command = styled(Typography)({
  color: '#ffffff',
  fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
});

const Output = styled(Typography)({
  color: '#888',
  marginLeft: '16px',
  marginBottom: '12px',
  fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
});

const SuccessOutput = styled(Typography)({
  color: '#00ff00',
  marginLeft: '16px',
  marginBottom: '12px',
  fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
});

const Cursor = styled('span')({
  animation: `${blinkCursor} 1s infinite`,
  color: '#00ff00',
  fontWeight: 'bold',
});

const LegoTerminal = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef(null);

  const commands = [
    {
      command: "lego --version",
      output: "LegoLinux Package Manager v2.1.0\nBuild your perfect Linux system, block by block."
    },
    {
      command: "lego search desktop",
      output: "Available Desktop Environments:\n• gnome-minimal     - Clean, modern GNOME\n• kde-plasma        - Feature-rich KDE\n• xfce-light        - Lightweight XFCE\n• i3-tiling         - Minimalist tiling WM"
    },
    {
      command: "lego install gnome-minimal",
      output: "📦 Installing gnome-minimal...\n✅ Downloaded (127 MB)\n✅ Configured desktop environment\n✅ gnome-minimal installed successfully!"
    },
    {
      command: "lego add ai-model llama3",
      output: "🤖 Adding AI model: Llama 3...\n📊 Model size: 4.1 GB\n🔒 Privacy mode: ENABLED\n✅ Llama 3 ready for local inference!"
    },
    {
      command: "lego add ai-model deepseek-coder",
      output: "👨‍💻 Adding AI model: DeepSeek Coder...\n📊 Model size: 6.7 GB\n🔧 Optimized for code generation\n✅ DeepSeek Coder installed!"
    },
    {
      command: "lego configure privacy-shield",
      output: "🛡️  Configuring privacy protection...\n🚫 Blocked telemetry\n🔒 Enabled local-only AI inference\n🌐 Configured secure networking\n✅ Privacy shield activated!"
    },
    {
      command: "lego status",
      output: "🧱 LegoLinux System Status:\n┌─────────────────────────────────┐\n│ Base System      ✅ Running     │\n│ Desktop (GNOME)  ✅ Active      │\n│ Llama 3          ✅ Ready       │\n│ DeepSeek Coder   ✅ Ready       │\n│ Privacy Shield   ✅ Protected   │\n└─────────────────────────────────┘"
    },
    {
      command: "lego ai chat \"Hello, what can you help me with?\"",
      output: "🤖 Llama 3 (Local): Hello! I'm running locally on your LegoLinux\nsystem. I can help you with:\n• Programming and code review\n• System administration\n• Creative writing\n• Data analysis\n• And much more - all privately on your machine!"
    }
  ];

  useEffect(() => {
    if (!isTyping) return;

    const currentCommand = commands[currentCommandIndex];
    if (!currentCommand) return;

    if (currentCharIndex < currentCommand.command.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(currentCharIndex + 1);
      }, 100 + Math.random() * 50); // Varying typing speed
      return () => clearTimeout(timer);
    } else {
      // Command fully typed, show output
      const timer = setTimeout(() => {
        setDisplayedCommands(prev => [
          ...prev,
          {
            command: currentCommand.command,
            output: currentCommand.output
          }
        ]);
        
        // Move to next command
        if (currentCommandIndex < commands.length - 1) {
          setCurrentCommandIndex(currentCommandIndex + 1);
          setCurrentCharIndex(0);
        } else {
          // All commands done, restart after delay
          setTimeout(() => {
            setDisplayedCommands([]);
            setCurrentCommandIndex(0);
            setCurrentCharIndex(0);
          }, 3000);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentCommandIndex, currentCharIndex, isTyping, commands]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedCommands, currentCharIndex]);

  const getCurrentCommand = () => {
    const command = commands[currentCommandIndex];
    if (!command) return '';
    return command.command.slice(0, currentCharIndex);
  };

  return (
    <TerminalContainer elevation={3}>
      <TerminalHeader>
        <TerminalButton color="#ff5f56" />
        <TerminalButton color="#ffbd2e" />
        <TerminalButton color="#27ca3f" />
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#888', 
            marginLeft: '12px', 
            fontSize: '12px',
            fontFamily: 'Monaco, Consolas, "Lucida Console", monospace'
          }}
        >
          user@legolinux:~
        </Typography>
      </TerminalHeader>
      
      <TerminalContent ref={terminalRef}>
        {/* Display completed commands */}
        {displayedCommands.map((cmd, index) => (
          <Box key={index}>
            <CommandLine>
              <Prompt variant="body2">$</Prompt>
              <Command variant="body2">{cmd.command}</Command>
            </CommandLine>
            <Output variant="body2" component="pre">
              {cmd.output}
            </Output>
          </Box>
        ))}
        
        {/* Current typing command */}
        {isTyping && currentCommandIndex < commands.length && (
          <CommandLine>
            <Prompt variant="body2">$</Prompt>
            <Command variant="body2">
              {getCurrentCommand()}
              {currentCharIndex < commands[currentCommandIndex]?.command.length && (
                <Cursor>|</Cursor>
              )}
            </Command>
          </CommandLine>
        )}
        
        {/* Always show cursor at the end */}
        {currentCommandIndex >= commands.length && (
          <CommandLine>
            <Prompt variant="body2">$</Prompt>
            <Cursor>|</Cursor>
          </CommandLine>
        )}
      </TerminalContent>
    </TerminalContainer>
  );
};

export default LegoTerminal;