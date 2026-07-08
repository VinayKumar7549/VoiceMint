import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-3xl font-bold">Welcome to VoiceMint</h1>
      <div className="flex items-around gap-4">
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </div>
  )
}