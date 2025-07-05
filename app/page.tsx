"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Award,
  Users,
  MessageSquare,
  Mail,
  Bookmark,
  MessageCircle,
  Loader2,
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
import AwardsAndHonorsSection from "@/components/new/AwardsAndHonorsSection";
import TeachingExperienceSection from "@/components/new/TeachingExperienceSection";
import ResearchProjectsSection from "@/components/new/ResearchProjectsSection";
import { toast } from "@/hooks/use-toast";
import FeaturedBlogPosts from "@/components/blog/FeaturedBlogPosts";
import { format } from "date-fns";

import { useState } from "react";
import { Input } from "@/components/ui/input";
export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // This would be replaced with actual Supabase integration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success!",
        description: "You've been subscribed to the newsletter",
      });

      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* background image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover bg-no-repeat "
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-sm" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 z-10">
        <div className="container grid md:grid-cols-12 gap-8 lg:gap-16 items-center ">
          {/* Left Column: Text */}
          <div className="md:col-span-5 relative flex justify-center md:justify-end">
            <div className="w-full max-w-sm lg:max-w-md ">
              <Image
                src="/main.png"
                alt="Asmau Ayub"
                width={450}
                height={540}
                className="w-full h-auto object-contain rounded-lg shadow-2xl -ml-20"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-7 text-white text-center md:text-left">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">
              Asmau Ayub
              <span className="text-red-500 text-2xl lg:text-4xl tracking-wide">
                , MPhil, LCP
              </span>
            </h1>
            <p className="mb-8 text-xl text-white/90 md:text-2xl max-w-2xl mx-auto md:mx-0 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)] hidden">
              Licensed Counseling Psychologist &amp; PhD Candidate with over a
              decade of clinical experience, passionate about mental health
              advocacy, research, and education.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#FF0601] hover:bg-[#FF0601]/80 shadow-lg"
              >
                <Link href="/about">Learn More</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-black border-black hover:bg-white/75 hover:text-red-500 shadow-lg"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative z-10 -mt-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-lg overflow-hidden">
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-red-600 mb-4 font-semibold tracking-wider">
                WHO AM I
              </h3>
              <div className="flex flex-col gap-4 justify-center items-center h-full">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                  Ph.D. Candidate at Michigan State University
                </h2>
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 mt-4 rounded-md text-white"
                >
                  <Link href="/about">Read More</Link>
                </Button>
              </div>
            </div>
            <div className="bg-[#FF0601] p-8 md:p-12">
              <h3 className="text-white mb-4 font-semibold tracking-wider">
                SHORT BIOGRAPHY
              </h3>
              <p className="text-red-100 text-start leading-loose">
                <span className="text-5xl font-serif text-white">D</span>
                iscover the journey of Asmau, a dedicated and passionate
                licensed clinician and a doctoral candidate in the Counselor
                Education and Supervision program at Michigan State University.
                With a specialization in rehabilitation and disability studies,
                she combines her extensive background in mental health,
                education, and community service to foster positive change.
                Here, you'll find detailed insights into her professional
                experiences, research endeavors, teaching responsibilities, and
                leadership roles within the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Projects Section */}
      <ResearchProjectsSection />

      {/* Latest Blog Posts */}

      <section className="py-16 md:py-24 px-12 md:px-24 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 mx-auto max-w-full">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Latest Blog Posts
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Checkout my most recent blog posts
            </p>
          </div>

          <FeaturedBlogPosts />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="rounded-2xl bg-red-600 p-8 text-white shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Connect with Asmau
              </h2>
              <p className="mb-8 text-lg text-red-100">
                For collaborations, inquiries, and more information on her work
                in counseling, research, and community service, please reach
                out.
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
