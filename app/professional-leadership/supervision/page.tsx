import Link from "next/link";
import Image from "next/image";
import { Users, BookOpen, Shield, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SupervisionPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Supervision
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Asmau's leadership extends to her supervision roles, where she fosters
          professional development among aspiring counselors through mentoring
          and constructive feedback.She supervises and mentors graduate level
          students, undergraduate students, as well as transitioning and young
          adults.
        </p>
      </div>

      {/* Supervision Approach */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          Supervision Philosophy
        </h2>
        <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="order-2 md:order-1 h-full">
            <div className="space-y-4 text-muted-foreground h-full flex flex-col justify-center">
              <p>
                Asmau's supervision philosophy is rooted in fostering a
                collaborative learning environment that nurtures professional
                growth while maintaining focus on client welfare. She believes
                effective supervision balances support with appropriate
                challenge, encouraging supervisees to develop their unique
                professional identity within ethical boundaries.
              </p>
              <p>
                Drawing from developmental and multicultural supervision models,
                Asmau tailors her approach to meet the unique needs and learning
                styles of each supervisee. She creates a supportive space that
                promotes critical reflection, cultural humility, and clinical
                competence.
              </p>
              <p>
                Central to her supervision practice is the integration of
                cultural factors. Asmau helps supervisees explore how their
                cultural identities and those of their clients influence the
                counseling process, emphasizing culturally responsive
                interventions and awareness of power dynamics.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 h-full">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image
                src="/app.jpg"
                alt="Supervision Approach"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              Connect for Supervision
            </h2>
            <p className="mb-8 text-lg text-red-100">
              Asmau is committed to supporting the development of ethical,
              culturally competent counseling professionals. If you're
              interested in supervision opportunities or would like to discuss
              professional development, please reach out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Asmau</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-red-700"
              >
                <Link href="/professional-leadership">
                  Back to Professional Leadership
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
