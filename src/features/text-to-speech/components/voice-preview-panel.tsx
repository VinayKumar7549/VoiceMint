"use client";

import { useState, useRef, useEffect } from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";

type VoicePreviewPanelVoice = {
    id? : string;
    name: string;
};

export function VoicePreviewPanel({
    audioUrl,
    voice,
    text,
}: {
    audioUrl: string;
    voice: VoicePreviewPanelVoice | null;
    text: string;
}) {
    const selectedVoiceName = voice?.name ?? null;
    const selectedVoiceSeed = voice?.id ?? null;

    const audioRef = useRef<HTMLAudioElement | null> (null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);

        audio.play().catch(() => {});

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);
        }
    }, [audioUrl])

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if(!audio) return;

        if(isPlaying) {
            audio.pause();
        } else{
            audio.play();
        }
    };

    return (
        <div className="h-full gap-8 flex-col border-t hidden flex-1 lg:flex">
            {/* Header */}
            <div className="p-6 pb-0">
                <h3 className="font-semibold text-foreground">Voice preview</h3>
            </div>

            {/* Content */}
            <div className="relative flex flex-1 items-center justify-center">
                <audio ref={audioRef} src={audioUrl}/>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center p-6">
                <div className="grid w-full grid-cols-3">
                    {/* Metadata */}
                    <div className="flex min-w-0 flex-col gap-0.5">
                        <p className="truncate text-sm font-medium text-foreground">
                        {text}
                        </p>

                        {selectedVoiceName && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <VoiceAvatar
                                    seed={selectedVoiceSeed ?? selectedVoiceName}
                                    name={selectedVoiceName}
                                    className="shrink-0"
                                />
                                <span className="truncate">{selectedVoiceName}</span>
                            </div>
                        )}
                    </div>

                     {/* Player controls */}
                        <div className="flex items-center justify-center gap-3">
                            <Button
                                variant="default"
                                size="icon-lg"
                                className="rounded-full"
                                onClick={togglePlayPause}
                            >
                                {isPlaying ? (
                                    <Pause className="fill-background" />
                                ) : (
                                    <Play className="fill-background" />
                                )}
                            </Button>
                        </div>

                        {/* Spacer */}
                        <div />
                </div>
            </div>

        </div>
    )

}