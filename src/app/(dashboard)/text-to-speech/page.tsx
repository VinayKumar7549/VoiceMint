import { TextToSpeechView } from "@/features/text-to-speech/view/text-speech-view";
import type { Metadata } from "next";
import { trpc, HydrateClient, prefetch } from "@/trpc/server";

export const metadata: Metadata = { title: "Text to Speech" };  //shows text-to-speech near the favicon

export default async function TextToSpeechPage({
    searchParams,
} :{
    searchParams: Promise<{text?: string; voiceId?: string}>;
}) {
    const { text, voiceId } = await searchParams;

    prefetch(trpc.voices.getAll.queryOptions());
    prefetch(trpc.generations.getAll.queryOptions());
    return (
        <HydrateClient>
            <TextToSpeechView initialValues={{ text, voiceId }} />
        </HydrateClient>
        
    )
}