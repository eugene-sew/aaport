import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AwardsAndHonorsSection() {
  const awards = [
    {
      title: "Summer Research Fellowship",
      organization: "Michigan State University",
      year: "2025",
    },
    {
      title: "Graduate School Travel Fellowship",
      organization: "Michigan State University",
      year: "Spring 2025",
    },
    {
      title: "Scully-Hill Diversity Award",
      organization: "Michigan State University",
      year: "Spring 2024",
    },
    {
      title: "Rehab Counseling Travel Grant",
      organization: "Michigan State University",
      year: "2024",
    },
    {
      title: "College of Education Research Hard Cost Grant",
      organization: "Michigan State University",
      year: "Spring 2023",
    },
    {
      title: "Office of Rehabilitation and Disability Studies Conference Grant",
      organization: "Michigan State University",
      year: "2023-2025",
    },
  ];

  return (
    <section className="py-16 bg-transparent text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 px-8">
          <div className="uppercase tracking-wider text-sm font-medium text-gray-400 mb-2">
            Awards and Honors
          </div>
          <div className="w-20 h-1 bg-[#FF2819] my-2"></div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 mt-4">
            Awards and Recognitions
          </h2>
        </div>

        {/* Awards Grid */}
        <div className="px-10 pt-10 pb-5 flex flex-col gap-5">
          {awards.slice(0, 4).map((award, index) => (
            <div key={index} className="relative bg-gray-800/80 p-6 md:p-8">
              {/* Orange accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF2819]"></div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  {award.title}
                </h3>
                <div className="text-gray-300">
                  {award.organization}
                  <br />
                  {award.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <Link
            href="/about/awards"
            className="inline-flex items-center px-6 py-3 text-sm font-medium bg-[#FF2819] text-white rounded hover:bg-[#FF2819]/90 transition-colors"
          >
            View All Awards
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
