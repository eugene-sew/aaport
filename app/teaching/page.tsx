import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Users,
  GraduationCap,
  Award,
  BookMarked,
  FlaskConical,
} from "lucide-react";
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

// Courses taught based on the provided data
const courses = [
  {
    id: 1,
    title: "Substance Abuse Counseling",
    code: "CEP 873",
    level: "Undergraduate",
    institution: "Michigan State University",
    description:
      "A comprehensive course on substance abuse counseling theory and practice. Students learn assessment, intervention, and treatment approaches for substance use disorders.",
    topics: [
      "Addiction Models and Theories",
      "Assessment and Diagnosis",
      "Evidence-based Interventions",
      "Co-occurring Disorders",
      "Recovery and Relapse Prevention",
    ],
  },
  {
    id: 2,
    title: "Rehabilitation Counseling Fundamentals",
    code: "CEP 861",
    level: "Graduate",
    institution: "Michigan State University",
    description:
      "An introduction to the principles and practices of rehabilitation counseling, focusing on helping individuals with disabilities achieve their personal and vocational goals.",
    topics: [
      "Disability Models and Perspectives",
      "Vocational Assessment",
      "Case Management",
      "Psychosocial Adjustment",
      "Accommodation and Accessibility",
    ],
  },
  {
    id: 3,
    title: "International Teaching Assistant Program",
    code: "Summer Program",
    level: "Graduate",
    institution: "Michigan State University",
    description:
      "A supportive program designed to help international teaching assistants acclimate to U.S. academic expectations and develop effective teaching strategies.",
    topics: [
      "Cross-cultural Communication",
      "Classroom Management",
      "Student Engagement Techniques",
      "Assessment Methods",
      "Academic Policies and Procedures",
    ],
  },
];

const teachingPhilosophy = [
  {
    title: "Student Engagement",
    description:
      "Asmau creates dynamic learning environments that actively involve students in the learning process through discussions, group activities, and interactive exercises that promote deep understanding of counseling concepts.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Critical Thinking",
    description:
      "Students are encouraged to analyze, evaluate, and synthesize information from multiple perspectives, developing the analytical skills necessary for effective clinical decision-making in complex situations.",
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    title: "Practical Application",
    description:
      "Asmau emphasizes the practical application of theoretical knowledge through case studies, role-plays, and supervised field experiences that prepare students for real-world counseling scenarios and challenges.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Real-world Integration",
    description:
      "Teaching incorporates current research and evidence-based practices in rehabilitation counseling, ensuring students develop skills that are directly applicable to contemporary clinical settings.",
    icon: <GraduationCap className="h-6 w-6" />,
  },
];

export default function TeachingPage() {
  return (
    <div className="relative">
      <BlobBackground />

      {/* Hero Section with Image */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Teaching
              </h1>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  As a dedicated instructor at Michigan State University, Asmau
                  is passionate about imparting knowledge in the field of
                  Rehabilitation Counseling:
                </p>
                <ul className="space-y-2">
                  <li>
                    She independently develops and teaches multiple sections of
                    Substance Abuse courses, integrating comprehensive syllabi
                    and engaging teaching methodologies.
                  </li>
                  <li>
                    Graduate-Level Instruction: Asmau has experience as a
                    teaching assistant at the master’s class level and
                    undergraduate levels, and in summer programs, where she
                    supports international teaching assistants in acclimating to
                    academic expectations.
                  </li>
                </ul>
                <p>
                  Her teaching philosophy emphasizes student engagement,
                  critical thinking, and practical application of counseling
                  theories to real-world scenarios.
                </p>
              </div>
              <Button asChild className="mt-6 bg-red-600 hover:bg-red-700">
                <Link href="/contact">Contact for Collaborations</Link>
              </Button>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative h-72 w-full rounded-2xl overflow-hidden md:h-96">
                <Image
                  src="/lecture.png"
                  alt="Asmau teaching"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Interested in Counselor Education?
              </h2>
              <p className="mb-8 text-lg text-red-100">
                Asmau welcomes inquiries about rehabilitation counseling
                education, substance abuse counseling courses, and opportunities
                for academic collaboration.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
