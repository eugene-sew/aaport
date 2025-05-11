import Link from "next/link";
import Image from "next/image";
import { Heart, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Community service data
const communityProjects = [
  {
    id: 1,
    title: "Mental Health Education Programs",
    role: "Founder & Executive Director",
    organization: "Rayuwa Foundation",
    description:
      "Lead mental health education and awareness programs targeting marginalized groups in Ghana, providing resources and support for vulnerable populations.",
    image:
      "/placeholder.svg?height=250&width=500&text=Mental%20Health%20Education",
  },
  {
    id: 2,
    title: "Women & Children Support Initiative",
    role: "Program Coordinator",
    organization: "Rayuwa Foundation",
    description:
      "Organize outreach programs focusing on supporting women and children affected by domestic violence through mental health resources and educational empowerment.",
    image:
      "/placeholder.svg?height=250&width=500&text=Women%20Support%20Initiative",
  },
  {
    id: 3,
    title: "Campus Mental Health Advocacy",
    role: "Student Leader",
    organization: "Campus RSOs",
    description:
      "Lead student initiatives promoting mental health awareness and education within the campus community, organizing workshops and support groups.",
    image: "/placeholder.svg?height=250&width=500&text=Campus%20Advocacy",
  },
  {
    id: 4,
    title: "Educational Support for Underserved Communities",
    role: "Project Lead",
    organization: "Rayuwa Foundation",
    description:
      "Develop and implement educational support programs for underserved communities in Ghana, focusing on access to resources and learning opportunities.",
    image: "/placeholder.svg?height=250&width=500&text=Educational%20Support",
  },
];

// Gallery images
const galleryImages = [
  {
    id: 1,
    src: "/teach_full.png",
    alt: "Community outreach session with local children",
    className: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "/ru.jpg",
    alt: "Mental health workshop in session",
    className: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "/multi.jpg",
    alt: "Educational program for marginalized youth",
    className: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "/mentorship pic.jpg",
    alt: "Women's empowerment session",
    className: "col-span-1 row-span-2",
  },
  {
    id: 5,
    src: "/pro_l.jpg",
    alt: "Foundation team planning meeting",
    className: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "/mentorship pic.jpg",
    alt: "Educational resource distribution",
    className: "col-span-1 row-span-1",
  },
  {
    id: 7,
    src: "/bg.png",
    alt: "Educational resource distribution",
    className: "col-span-2 row-span-1",
  },
];

export default function CommunityServicePage() {
  return (
    <div>
      {/* Hero Section with Darkened Overlay */}
      <section className="relative h-[600px] w-full">
        <Image
          src="/multi.jpg"
          alt="Community Service Hero"
          fill
          className="object-cover"
          priority
        />

        {/* Enhanced overlay with gradient */}

        <div className="absolute inset-0 bg-gradient-to-b from-red-700/80 to-black/90">
          <div className="container flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
              Community Service
            </h1>
            <p className="mx-auto max-w-2xl text-xl">
              Actively contributing to local and global communities through
              mental health education, advocacy, and support for marginalized
              populations.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-16">
        {/* Overview */}
        <section className="mb-16">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Making an Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Asmau actively contributes to her local and global communities
              through various service initiatives as a student leader in various
              campus RSOs. As the Founder and Executive Director of Rayuwa
              Foundation, she leads programs targeting mental health and
              educational support for marginalized groups in Ghana.
            </p>
          </div>
        </section>

        {/* Key Service Areas */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">
            Key Focus Areas
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Mental Health Education</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Organizing mental health education and awareness programs for
                  vulnerable populations, providing resources and support to
                  those in need.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Women & Children Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Supporting women and children affected by domestic violence
                  through outreach programs, educational empowerment, and mental
                  health resources.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                  <Globe className="h-6 w-6" />
                </div>
                <CardTitle>Educational Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Developing and implementing educational support programs for
                  underserved communities in Ghana, focusing on access to
                  resources and learning opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">
            Community Projects
          </h2>
          <div className="grid gap-8">
            {communityProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden rounded-2xl">
                <div className="grid md:grid-cols-3">
                  <div className="aspect-video md:aspect-auto md:h-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <CardHeader>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-300">
                          {project.organization}
                        </span>
                      </div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Bento Grid Gallery */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">
            Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className={`relative rounded-xl overflow-hidden ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Get Involved
              </h2>
              <p className="mb-8 text-lg text-red-100">
                Join us in making a difference through mental health education
                and support for marginalized communities. Together, we can
                create lasting positive change.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
