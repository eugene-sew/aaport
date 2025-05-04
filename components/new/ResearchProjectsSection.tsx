import React from "react";
import Link from "next/link";
import { BookOpen, FileText, Users, Book, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const researchExperiences = [
  {
    id: 1,
    title:
      "USAID Minority Serving Institutions Partnership (MSI) Learning Review",
    year: "2024-Present",
  },
  {
    id: 2,
    title:
      "Stereotypes between Africans in the diaspora and Africans on the continent",
    year: "2023",
  },
  {
    id: 3,
    title:
      "Conversational agents as an aid for cancer survivors' information search",
    year: "2023",
  },
  {
    id: 4,
    title:
      "Hard wired for news revisited: Biology, culture, deviance, time, and reality",
    year: "2022",
  },
];

const researchPublications = [
  {
    id: 1,
    icon: BookOpen,
    title: "Book Chapter Publications",
    items: [
      "Ayub, A., Wiafe, E. (In-press). Journeys of Becoming Critical Scholars: Volume 1 & 2.",
      "Shultz, J., Ayub, A., (2024). Designing Supervision Intervention to Strengthen Supervisee Competency.",
    ],
    link: "/publications",
  },
  {
    id: 2,
    icon: FileText,
    title: "Article Publications",
    items: [
      "Ayub, A., Lee, G., Easley, T. (under review). Perceiving Acceptance Through the Lens of Autistic College Students.",
      "Ayub, A., Umucu, E., & Lee, G. (in preparation). Veteran Employment Needs: A Scoping Review.",
    ],
    link: "/publications",
  },
  {
    id: 3,
    icon: Book,
    title: "Book Publications",
    items: [
      "Ayub, A., Danquah, S.A., Bruce, D. (2013). Foster and Biological Parenting: Impact on Personality and Cognitive Performance.",
    ],
    link: "/publications",
  },
  {
    id: 4,
    icon: Users,
    title: "Conference Presentations",
    items: [
      "Perceiving Acceptance Through the Lens of Autistic College Students. CEC annual International conference, January 2025.",
      "The Art of Supervision: Reflecting on Supervisee Qualities in Clinical Supervision, November 2023.",
    ],
    link: "/presentations",
  },
];

export default function ResearchSection() {
  return (
    <section className="relative py-16 md:py-24 bg-black/45 text-white z-10 px-4 md:px-20">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Research Experience
          </h2>
          <div className="w-24 h-1 bg-[#FF2819] mb-3 "></div>

          <h3 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Counselor Education and Supervision - PhD Candidate
          </h3>
        </div>

        <div className="w-full h-px bg-slate-700 my-8"></div>

        <div className="grid gap-8 md:grid-cols-2">
          {researchExperiences.map((experience) => (
            <div key={experience.id} className="flex gap-6">
              <div className="text-3xl font-bold text-white">
                {experience.id}
              </div>
              <div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                  <div className="w-12 h-1 bg-[#FF2819] mb-3"></div>
                  <p className="text-slate-300">{experience.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            className="bg-[#FF2819] hover:bg-[#FF2819]/90 text-white px-8 py-2 rounded"
          >
            <Link href="/research">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Research Publications
          </h2>
          <p className="mb-8 text-slate-300 max-w-3xl">
            Asmau's research contributions reflect her commitment to
            understanding and addressing pressing issues in mental health and
            rehabilitation.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {researchPublications.map((publication) => (
              <Card
                key={publication.id}
                className="bg-white border-slate-700 text-gray-900 overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-slate-700 p-2 text-[#FF2819] w-fit">
                    <publication.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{publication.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 font-light">
                    {publication.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link
                    href={publication.link}
                    className="inline-flex items-center text-sm font-medium text-[#FF2819] transition-colors hover:text-[#FF2819]/90"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
