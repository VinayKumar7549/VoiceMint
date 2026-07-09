import Link from "next/link";

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils"
import { Headphones, ThumbsUp } from "lucide-react";

export function PageHeader({
    title,
    className,
}: {
    title: string;
    className?: string;
}) {
    return(
        <div
            className={cn("flex items-center justify-between border-b px-4 py-4", className)}  // cn takes care of overwriting classNames and proper turneries
        >
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:demo329032@gmail.com">
                        <ThumbsUp />
                        <span className="hidden lg:block">Feedback</span>
                    </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:demo329032@gmail.com">
                        <Headphones />
                        <span className="hidden lg:block">Need Help?</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}