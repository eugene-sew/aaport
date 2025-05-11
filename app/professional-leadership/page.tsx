import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlobBackground from "@/components/blob-background";

export default function ProfessionalLeadershipPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section with Darkened Overlay */}
      <section className="relative py-24 md:py-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pro_l.jpg"
            alt="Leadership Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-700/80 to-black/90 z-10" />
          {/* Darkened overlay */}
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Professional Leadership
            </h1>
            <p className="mb-8 text-lg text-gray-100">
              Asmau is committed to advancing the counseling profession through
              leadership, supervision, mentorship, and community service. Her
              professional activities reflect her dedication to promoting
              excellence, equity, and innovation in counseling practice and
              education.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Areas */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/mentorship pic.jpg"
                  alt="Supervision"
                  width={500}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Supervision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Asmau's leadership extends to her supervision roles, where she
                  fosters professional development among aspiring counselors
                  through mentoring and constructive feedback. She provides
                  guidance to graduate students and interns, emphasizing ethical
                  practices and client-centered approaches in counseling.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/professional-leadership/supervision"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/ru.jpg"
                  alt="Community Service"
                  width={500}
                  height={250}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Community Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Asmau actively contributes to her local and global communities
                  through various service initiatives as a student leader in
                  various campus RSOs. As the Founder and Executive Director of
                  Rayuwa Foundation, she leads programs targeting mental health
                  and educational support for marginalized groups in Ghana. She
                  has organized outreach programs that promote mental health
                  education and empowerment, reaching vulnerable populations,
                  including women and children affected by domestic violence.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link
                  href="/professional-leadership/community-service"
                  className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              Interested in Collaboration?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Asmau is always open to new professional collaborations,
              leadership opportunities, and community partnerships that advance
              the counseling profession and promote mental health and wellbeing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/professional-leadership/supervision">
                  Learn About Supervision
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/professional-leadership/community-service">
                  Explore Community Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
