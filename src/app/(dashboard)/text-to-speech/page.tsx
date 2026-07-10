import { TextToSpeechView } from "@/features/text-to-speech/view/text-speech-view";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Text to Speech" };  //shows text-to-speech near the favicon

export default function TextToSpeechPage() {
    return <TextToSpeechView />
}