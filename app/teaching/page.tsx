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
    level: "Graduate",
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
      "Students are encouraged to analyze, evaluate, and synthesize information from multiple perspectives, developing the analytical skills necessary for effective clinical decision-making in complex counseling situations.",
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
              <p className="mb-4 text-lg text-muted-foreground">
                As a dedicated instructor at Michigan State University, Asmau is
                passionate about imparting knowledge in the field of
                Rehabilitation Counseling.
              </p>
              <p className="mb-6 text-muted-foreground">
                Her teaching philosophy emphasizes student engagement, critical
                thinking, and practical application of counseling theories to
                real-world scenarios.
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/contact">Contact for Collaborations</Link>
              </Button>
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative h-72 w-full rounded-2xl overflow-hidden md:h-96">
                <Image
                  src="/teach_full.png"
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

      {/* Teaching Philosophy */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Teaching Philosophy
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {teachingPhilosophy.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Experience */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Teaching Experience
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src="/suba.jpg"
                  alt="Substance Abuse Counseling"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <BookMarked className="h-6 w-6" />
                </div>
                <CardTitle>Independent Instruction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Asmau independently develops and teaches multiple sections of
                  Substance Abuse courses, integrating comprehensive syllabi and
                  engaging teaching methodologies.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src="/grad.jpg"
                  alt="Graduate Level Teaching"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <CardTitle>Graduate-Level Instruction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Asmau has experience as a teaching assistant at the master's
                  class level and undergraduate levels, providing instructional
                  support and mentorship to developing counselors.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src="/bg.png"
                  alt="International Teaching"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <CardTitle>International Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In summer programs, Asmau supports international teaching
                  assistants in acclimating to academic expectations, enhancing
                  cross-cultural teaching competencies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Courses Taught
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                      {course.code}
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                      {course.level}
                    </span>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.institution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="rounded-lg bg-background p-4">
                    <h4 className="mb-2 font-medium">Key Topics:</h4>
                    <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                      {course.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Approach Highlights */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/ru.jpg"
                alt="Teaching Approach"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                Instructional Approach
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Asmau designs her courses with a focus on experiential
                  learning and evidence-based practices. Her teaching
                  methodologies include interactive lectures, case-based
                  learning, small group discussions, and reflective practice
                  exercises.
                </p>
                <p>
                  In substance abuse counseling courses, she integrates current
                  research and clinical perspectives, bringing real-world
                  scenarios into the classroom to prepare students for the
                  complexities of addiction treatment.
                </p>
                <p>
                  Assessment strategies are designed to evaluate both
                  theoretical knowledge and applied skills, with opportunities
                  for students to demonstrate competence through simulated
                  counseling sessions, case conceptualizations, and
                  research-informed treatment planning.
                </p>
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
