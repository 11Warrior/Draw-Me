import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, LogIn, Copy, Check } from "lucide-react";

interface SidePanelProps {
    isPanelOpen: boolean;
    togglePanelState: (state: boolean) => void;
}

const SidePanel = ({ isPanelOpen, togglePanelState }: SidePanelProps) => {
    const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
    const [roomCode, setRoomCode] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [userName, setUserName] = useState("");

    // const handleCreate = () => {
    //     const code = generateRoomCode();
    //     setGeneratedCode(code);
    //     setMode("create");
    // };

    // const handleCopy = () => {
    //     navigator.clipboard.writeText(generatedCode);
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 2000);
    // };

    console.log("In Sidepanel", isPanelOpen);

    return (
        <AnimatePresence>
            {isPanelOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => togglePanelState(false)}

                    />

                    {/* Panel */}
                    <motion.div
                        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border px-6 py-4">
                            <h2 className="font-display text-2xl text-foreground">
                                {mode === "choose" && "Start drawing"}
                                {mode === "create" && "Your room is ready"}
                                {mode === "join" && "Join a room"}
                            </h2>
                            <button
                                // onClick={handleClose}
                                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                <X onClick={() => togglePanelState(false)} size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            <AnimatePresence mode="wait">
                                {mode === "choose" && (
                                    <motion.div
                                        key="choose"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-4"
                                    >
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            Create a new whiteboard or join an existing one with a room code.
                                        </p>

                                        <button
                                            // onClick={handleCreate}
                                            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                                <Plus size={22} />
                                            </div>
                                            <div>
                                                <span className="block text-base font-semibold text-foreground">Create a room</span>
                                                <span className="block text-sm text-muted-foreground">
                                                    Start a new whiteboard and invite others
                                                </span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setMode("join")}
                                            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-accent/40 hover:shadow-md"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                                <LogIn size={22} />
                                            </div>
                                            <div>
                                                <span className="block text-base font-semibold text-foreground">Join a room</span>
                                                <span className="block text-sm text-muted-foreground">
                                                    Enter a code to join someone's whiteboard
                                                </span>
                                            </div>
                                        </button>
                                    </motion.div>
                                )}

                                {mode === "create" && (
                                    <motion.div
                                        key="create"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            Share this code with others so they can join your whiteboard.
                                        </p>

                                        {/* Room code display */}
                                        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
                                            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Room Slug
                                            </span>
                                            <span className="font-display text-5xl tracking-[0.3em] text-foreground">
                                                {generatedCode}
                                            </span>
                                            <button
                                                // onClick={handleCopy}
                                                className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                                            >
                                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                                {copied ? "Copied!" : "Copy code"}
                                            </button>
                                        </div>

                                        {/* Name input */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="create-name" className="text-sm font-medium text-foreground">
                                                Your name
                                            </label>
                                            <input
                                                id="create-name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>

                                        <button
                                            disabled={!userName.trim()}
                                            className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            Enter room
                                        </button>

                                        <button
                                            onClick={() => setMode("choose")}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            ← Back
                                        </button>
                                    </motion.div>
                                )}

                                {mode === "join" && (
                                    <motion.div
                                        key="join"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            Enter the 6-character room code to join a whiteboard.
                                        </p>

                                        {/* Code input */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="room-code" className="text-sm font-medium text-foreground">
                                                Room code
                                            </label>
                                            <input
                                                id="room-code"
                                                type="text"
                                                maxLength={6}
                                                placeholder="e.g. A3BX9K"
                                                value={roomCode}
                                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                                className="rounded-lg border border-input bg-background px-4 py-3 text-center font-display text-3xl tracking-[0.25em] text-foreground placeholder:text-lg placeholder:tracking-normal placeholder:font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>

                                        {/* Name input */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="join-name" className="text-sm font-medium text-foreground">
                                                Your name
                                            </label>
                                            <input
                                                id="join-name"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>

                                        <button
                                            disabled={roomCode.length !== 6 || !userName.trim()}
                                            className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            Join room
                                        </button>

                                        <button
                                            onClick={() => setMode("choose")}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            ← Back
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SidePanel;
