import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlobBackground from "@/components/blob-background";

export default function AboutPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                About Me
              </h1>
              <p className="mb-4 text-lg text-muted-foreground">
                I am Asmau Ayub, a dedicated and passionate doctoral candidate
                in the Counselor Education and Supervision program at Michigan
                State University. With a specialization in Rehabilitation
                Counseling, I combine my extensive background in mental health,
                education, and community service to foster positive change.
              </p>
              <p className="mb-6 text-muted-foreground">
                My research interests focus on understanding and addressing
                pressing issues in mental health and rehabilitation. As a
                licensed counseling psychologist in Ghana, I have dedicated over
                eleven years to advancing mental health support, specializing in
                rehabilitation and school counseling.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/research">View Research</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact/request-cv">Request CV</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative h-72 w-72 md:h-[600px] md:w-[550px]">
                <Image
                  src="/main.png"
                  alt="Asmau Ayub"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>



    

      {/* Community Service */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Community Service
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8">
            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Rayuwa Foundation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As the Founder and Executive Director of Rayuwa Foundation, I
                  lead programs targeting mental health and educational support
                  for marginalized groups in Ghana. The foundation organizes
                  outreach programs that promote mental health education and
                  empowerment, reaching vulnerable populations, including women
                  and children affected by domestic violence.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle>Academic Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I actively contribute to my local and global communities
                  through various service initiatives as a student leader in
                  various campus RSOs. My leadership extends to supervision
                  roles, where I foster professional development among aspiring
                  counselors through mentoring and constructive feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
