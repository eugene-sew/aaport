"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function RequestCVPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    purpose: "academic",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, purpose: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // This would be replaced with actual Supabase integration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Request Sent",
        description:
          "Thank you for your request. I'll send my CV to your email shortly!",
      });

      setFormData({
        name: "",
        email: "",
        organization: "",
        purpose: "academic",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Request My CV
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Interested in learning more about my academic and professional
          background? Fill out the form below to request a copy of my curriculum
          vitae.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
        <Card className="overflow-hidden rounded-2xl md:col-span-2 h-fit">
          <CardHeader>
            <CardTitle>CV Request Form</CardTitle>
            <CardDescription>
              Please provide your information and I'll send my CV to your email
              address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="University, company, or organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Purpose of Request</Label>
                <RadioGroup
                  value={formData.purpose}
                  onValueChange={handleRadioChange}
                  className="grid gap-2 md:grid-cols-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="academic" id="academic" />
                    <Label htmlFor="academic" className="cursor-pointer">
                      Academic Collaboration
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employment" id="employment" />
                    <Label htmlFor="employment" className="cursor-pointer">
                      Employment Opportunity
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="speaking" id="speaking" />
                    <Label htmlFor="speaking" className="cursor-pointer">
                      Speaking Engagement
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please provide any additional details about your request"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="h-60 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Request CV
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>CV Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Education</h4>
                <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>
                    PhD Candidate, Counselor Education & Supervision, Michigan
                    State University
                  </li>
                  <li>MA, Counseling Psychology, University of Michigan</li>
                  <li>BS, Psychology, University of Illinois</li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Professional Experience</h4>
                <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Licensed Counseling Psychologist</li>
                  <li>Clinical Supervisor</li>
                  <li>Counselor Educator</li>
                  <li>Researcher</li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h4 className="mb-2 font-medium">Research Focus</h4>
                <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Multicultural Counseling Competence</li>
                  <li>Supervision Models and Effectiveness</li>
                  <li>Social Justice Advocacy in Counseling</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/contact">Back to Contact</Link>
        </Button>
      </div>
    </div>
  );
}
