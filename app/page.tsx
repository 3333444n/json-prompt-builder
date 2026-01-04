import { PromptBuilder } from "@/components/prompt-builder";
import { PromptProvider } from "@/context/prompt-context";

export default function Home() {
  return (
    <main className="min-h-screen">
      <PromptProvider>
        <PromptBuilder />
      </PromptProvider>
    </main>
  );
}
