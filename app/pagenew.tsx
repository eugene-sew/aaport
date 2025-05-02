import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlobBackground from "@/components/blob-background";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <BlobBackground />

      <div className="container relative z-10 text-center">
        <div className="mb-8 overflow-hidden rounded-full border-4 border-red-600 shadow-xl mx-auto w-32 h-32 md:w-40 md:h-40">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Asmau Ayub"
            width={200}
            height={200}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Asmau Ayub
        </h1>

        <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
          Licensed Counseling Psychologist & PhD Candidate
        </p>

        <div className="mb-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            My professional website is currently under construction. I'm working
            on creating a comprehensive platform to share my research,
            publications, and professional journey in counseling psychology.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link href="mailto:your-email@example.com">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
