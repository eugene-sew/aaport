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
            Current Research
          </h2>
          <div className="w-24 h-1 bg-[#FF2819] mb-3 "></div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white/20 backdrop-blur-sm text-white p-8 rounded-md">
          <div className="max-w-4xl bg-black/45 rounded-2xl shadow-lg p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Intersecting Identities and Cultural Narratives
            </h1>
            <div className="w-16 h-1 bg-[#FF2819] mx-auto mb-6"></div>
            <p className="text-center text-slate-300 text-lg mb-8">
              A Study on Ethnicity, Disability, and Perception Among Autistic
              Students in Ghana
            </p>
            <div className="text-slate-300 leading-relaxed text-justify">
              <p className="mb-4">
                This research investigates the intersection of ethnicity,
                disability, and cultural narratives in shaping the experiences
                of autistic students in Ghana. It aims to explore how autistic
                individuals navigate issues of identity, stigma, and social
                belonging within the complexities of Ghana's cultural and ethnic
                landscape.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Button
              asChild
              className="bg-[#FF2819] hover:bg-[#FF2819]/90 text-white px-8 py-2 rounded"
            >
              <Link href="/research">
                View All Research <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
