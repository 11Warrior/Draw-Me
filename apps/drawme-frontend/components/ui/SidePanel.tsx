import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, LogIn, ArrowLeft } from "lucide-react";
import { GlobalContext } from "../../context/GlobalContext";
import { RoomContext } from "../../context/RoomContext";
import { useRouter } from "next/navigation";

const SidePanel = () => {

    const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
    const [roomSlug, setRoomSlug] = useState("");
    // const [generatedCode, setGeneratedCode] = useState("");
    // const [copied, setCopied] = useState(false);

    const context = useContext(GlobalContext);
    if (!context) return null;

    const roomContext = useContext(RoomContext);
    if (!roomContext) return null;

    const { createRoom, joinRoom, getRoomId } = roomContext

    const { setPanelState, panelState } = context;
    const router = useRouter();

    const handleEnterRoom = async () => {
        console.log(mode);
        if (mode === 'create') {
            console.log("Creating new room", roomSlug)

            await createRoom(roomSlug);
        }
        else if (mode === 'join') {
            const roomId = await getRoomId(roomSlug);
            console.log("Joining : ", roomId);
            joinRoom(roomId);
        }

        router.push(`/draw/${roomSlug}`);

        setRoomSlug("")
    }

    return (
        <AnimatePresence>
            {panelState && (
                <>
                    <motion.div
                        className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPanelState(false)}
                    />

                    <motion.div
                        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                    >
                        <div className="flex items-center justify-between border-b border-border px-6 py-4">
                            <h2 className="font-display text-2xl text-foreground">
                                {mode === "choose" && "Start drawing"}
                                {mode === "create" && "Your room is ready"}
                                {mode === "join" && "Join a room"}
                            </h2>
                            <button
                                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
                            >
                                <X onClick={() => setPanelState(false)} size={20} />
                            </button>
                        </div>

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
                                            onClick={() => setMode("create")}
                                            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/40 hover:shadow-md  cursor-pointer"
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
                                            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-accent/40 hover:shadow-md cursor-pointer"
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

                                        <div className="flex flex-col items-center gap-3 rounded-xl p-6">
                                            <div >
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="room-code" className="text-sm font-medium text-foreground">
                                                        Room Slug
                                                    </label>
                                                    <input
                                                        id="room-code"
                                                        type="text"
                                                        maxLength={20}
                                                        placeholder="e.g. creative-hub"
                                                        value={roomSlug}
                                                        onChange={(e) => setRoomSlug(e.target.value.toLowerCase())}
                                                        className="rounded-lg border border-input bg-background px-4 py-3 text-center  text-3xl tracking-[0.25em] text-foreground placeholder:text-lg placeholder:tracking-normal placeholder:font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                                    />
                                                </div>
                                            </div>

                                        </div>


                                        <button
                                            disabled={!roomSlug.trim()}
                                            onClick={handleEnterRoom}
                                            className="rounded-lg  px-6 py-3  font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]  hover:bg-white hover:text-black border border-white cursor-pointer"
                                        >
                                            Enter room
                                        </button>

                                        <button
                                            onClick={() => setMode("choose")}
                                            className="text-lg text-muted-foreground flex items-center justify-center transition-colors hover:text-foreground cursor-pointer"
                                        >
                                            <div className="size-5">
                                                <ArrowLeft className="size-full" />
                                            </div>
                                            Back
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
                                        <p className="text-lg text-muted-foreground">
                                            Enter the  room slug to join the whiteboard.
                                        </p>

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="room-code" className="text-sm font-medium text-foreground">
                                                Room Slug
                                            </label>
                                            <input
                                                id="room-code"
                                                type="text"
                                                maxLength={20}
                                                placeholder="e.g. creative-hub"
                                                value={roomSlug}
                                                onChange={(e) => setRoomSlug(e.target.value.toLowerCase())}
                                                className="rounded-lg border border-input bg-background px-4 py-3 text-center  text-3xl tracking-[0.25em] text-foreground placeholder:text-lg placeholder:tracking-normal placeholder:font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>

                                        <button
                                            disabled={roomSlug.length !== 6}
                                            onClick={handleEnterRoom}
                                            className="rounded-lg  px-6 py-3  font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]  hover:bg-white hover:text-black border border-white cursor-pointer"
                                        >
                                            Join Room
                                        </button>

                                        <button
                                            onClick={() => setMode("choose")}
                                            className="text-lg text-muted-foreground flex items-center justify-center transition-colors hover:text-foreground cursor-pointer"
                                        >
                                            <div className="size-5">
                                                <ArrowLeft className="size-full" />
                                            </div>
                                            Back
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
