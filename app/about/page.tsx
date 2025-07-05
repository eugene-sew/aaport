import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  Users,
  School,
  Briefcase,
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
                About Asmau Ayub
              </h1>
              <p className="mb-4 text-lg text-muted-foreground">
                Asmau Ayub is a doctoral candidate in Counselor Education and
                Supervision at Michigan State University, specializing in
                Rehabilitation Counseling. Her research focuses on the
                intersection of neurodiversity, culture, and disability
                acceptance, particularly how these factors influence the mental
                health and college experiences of transitioning youth and
                families and marginalized groups. Currently, Asmau's research
                examines cultural identity and disability acceptance among
                autistic students in Ghana. She aims to advance inclusive
                practices informed by both academic scholarship and lived
                experience.
              </p>
              <p className="mb-4 text-muted-foreground">
                Asmau's 14 years of experience in teaching, clinical work,
                community engagement, and academic research underlie her
                dedication to advocacy and empowerment. She is a TEDx speaker,
                sharing insights on the challenges faced by minority groups and
                promoting awareness of their unique needs. As the founder and
                executive director of the Rayuwa Foundation, a nonprofit
                organization in Ghana, Asmau leads initiatives that support
                education and empowerment for underserved populations.
              </p>
              <p className="mb-6 text-muted-foreground">
                Driven by her commitment to creating inclusive environments,
                Asmau continues to contribute to the fields of counseling,
                rehabilitation, and advocacy, inspiring change and understanding
                in the community.
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
              <div className="relative h-72 w-72 md:h-[500px] md:w-96">
                <Image
                  src="/about.jpg"
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

      {/* Global Leadership Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-3xl font-bold text-center md:text-4xl">
              Global Leadership
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  {/* Image placeholder - replace with actual image when available */}
                  <Image
                    src="/mentorship pic.jpg"
                    alt="Asmau Ayub Leadership"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div>
                <p className="mb-6 text-lg text-muted-foreground">
                  As a thought leader, Asmau champions and speaks to the
                  importance of cultural diversity, tolerance, and peaceful
                  coexistence in local and global communities through various
                  service initiatives. In her leadership role, she not only
                  fosters these values but also mentors aspiring counselors,
                  supporting their professional growth with constructive
                  feedback and guidance.
                </p>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="/contact">
                    Connect with Asmau <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Awards Page */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-xl border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-slate-900 dark:border-slate-700">
            <div className="flex justify-center mb-4">
              <Award className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-slate-900 dark:text-white">
              Awards & Recognitions
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore a collection of honors celebrating dedication to research,
              leadership, and community service.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/awards">
                View All Awards <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
