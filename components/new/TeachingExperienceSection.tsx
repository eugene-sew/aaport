import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TeachingExperienceSection() {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto bg-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:gap-12">
            {/* Image Column - Only visible on md screens and above */}
            <div className="hidden md:block md:w-1/2 flex-shrink-0 mb-8 md:mb-0">
              <div className="relative h-full">
                <Image
                  src="/teach_full.png"
                  alt="Teaching workshop session"
                  fill
                  layout="fill"
                  className="rounded-lg object-contain h-full"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1">
              {/* Section Header with orange underline */}
              <div className="mb-6">
                <h2 className="text-[#FF2819] text-xl font-medium mb-1">
                  Teaching Experience
                </h2>
                <div className="w-12 h-1 bg-[#FF2819]"></div>
              </div>

              {/* Image for mobile - Only visible on small screens */}
              <div className="md:hidden mb-6">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/teach_full.png"
                    alt="Teaching workshop session"
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              </div>

              {/* Teaching content */}
              <div className="mb-8">
                <p className="text-gray-700 text-lg md:text-xl text-muted-foreground leading-loose">
                  Asmau, a passionate educator at Michigan State University,
                  excels in Rehabilitation Counseling instruction. She
                  independently develops and teaches Substance Abuse courses
                  with comprehensive syllabi and engaging methodologies. <br />
                  <br /> Her experience spans graduate and undergraduate
                  teaching, including mentoring international teaching
                  assistants in summer programs. <br />
                  <br /> Guided by a teaching philosophy focused on critical
                  thinking, student engagement, and real-world application,
                  Asmau's approach fosters meaningful learning experiences.
                </p>
              </div>

              {/* CTA Button in dark container */}
              <div>
                <Link href="/teaching">
                  <div className="inline-flex items-center bg-[#FF2819] text-white px-4 py-2 hover:bg-gray-800 transition-colors">
                    <span className="mr-2">See more</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
