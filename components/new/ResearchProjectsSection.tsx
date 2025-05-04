import React from "react";
import Link from "next/link";
import { BookOpen, Users, FileText, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export default function ResearchProjectsSection() {
  return (
    <section className="relative py-16 md:py-24 z-10">
      {/* Gradient Background */}
      <div
        className="absolute inset-0  bg-white/95 z-[-1]"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Current Research Projects
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            My research focuses on counselor education, supervision
            methodologies, and multicultural competence in mental health
            interventions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Multicultural Supervision Models</CardTitle>
              <CardDescription>2022 - Present</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Examining how different approaches to multicultural supervision
                influence the development of cultural competence in
                counselors-in-training through mixed-methods research.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/research"
                className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Social Justice Advocacy Training</CardTitle>
              <CardDescription>2021 - Present</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Evaluating the implementation and outcomes of social justice
                advocacy training components within counselor education programs
                through longitudinal assessment.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/research"
                className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="mb-2 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-950 dark:text-red-300 w-fit">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle>Trauma-Informed Supervision</CardTitle>
              <CardDescription>2022 - Present</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Identifying best practices in trauma-informed supervision and
                assessing the training needs of supervisors working with
                counselors who provide trauma treatment.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/research"
                className="inline-flex items-center text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/research">View All Research</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
