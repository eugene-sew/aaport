"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
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
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
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
          Contact Me
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Have a question or want to discuss a potential collaboration? Feel
          free to reach out using the form below or through my contact
          information.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        <Card className="overflow-hidden rounded-2xl md:col-span-2">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Fill out the form below and I'll get back to you as soon as
              possible.
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
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
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
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden rounded-2xl">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="mt-0.5 h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:contact@asmauayub.com"
                    className="text-sm text-muted-foreground hover:text-red-600"
                  >
                    contact@asmauayub.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="mt-0.5 h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-muted-foreground hover:text-red-600"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-sm text-muted-foreground">
                    Michigan State University
                    <br />
                    College of Education
                    <br />
                    East Lansing, MI 48824
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <Card className="overflow-hidden rounded-2xl">
          <CardHeader>
            <CardTitle>Request My CV</CardTitle>
            <CardDescription>
              Interested in learning more about my academic and professional
              background? Request a copy of my curriculum vitae.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <a href="/contact/request-cv">Request CV</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
