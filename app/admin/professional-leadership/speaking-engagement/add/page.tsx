"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProfessionalLeadershipTables } from "@/hooks/useProfessionalLeadershipTables";
import { useAuth } from "@/hooks/useAuth";
import { engagementTypes, audienceTypes, audienceSizes } from "@/types/professional-leadership";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Form handling
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Icons
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Define form schema with validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  event_name: z.string().min(1, "Event name is required"),
  organization: z.string().min(1, "Organization is required"),
  date: z.date().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  audience_size: z.string().optional(),
  audience_type: z.string().optional(),
  engagement_type: z.string().min(1, "Engagement type is required"),
  topics: z.string().optional(), // comma separated
  feedback: z.string().optional(),
  is_featured: z.boolean().default(false),
  featured_image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddSpeakingEngagementPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { useAddSpeakingEngagement } = useProfessionalLeadershipTables();
  const addSpeakingEngagementMutation = useAddSpeakingEngagement();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      event_name: "",
      organization: "",
      date: undefined,
      location: "",
      description: "",
      audience_size: "",
      audience_type: "",
      engagement_type: "",
      topics: "",
      feedback: "",
      is_featured: false,
      featured_image: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to add a speaking engagement.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await addSpeakingEngagementMutation.mutateAsync({
        ...values,
        user_id: user.id,
        date: values.date ? values.date.toISOString() : undefined,
        topics: values.topics ? values.topics.split(",").map(t => t.trim()).filter(Boolean) : [],
      });
      toast({
        title: "Success",
        description: "Speaking engagement has been added successfully.",
      });
      router.push("/admin/professional-leadership/speaking-engagement");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add speaking engagement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/professional-leadership/speaking-engagement"
          className="text-blue-500 hover:underline inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Speaking Engagements
        </Link>
        <h1 className="text-2xl font-bold mt-2">Add New Speaking Engagement</h1>
        <p className="text-muted-foreground">
          Create a new speaking engagement or presentation record.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Engagement Details</CardTitle>
          <CardDescription>
            Enter the details of your speaking engagement or presentation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              id="engagement-form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Keynote on Mental Health" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive title for this engagement.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engagement_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engagement Type*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select engagement type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {engagementTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of engagement or presentation.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="event_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Annual Wellness Conference" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the event or conference.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Example University" {...field} />
                      </FormControl>
                      <FormDescription>
                        The organization hosting the event.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When the event took place.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New York, NY" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where the event took place.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audience_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Audience Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {audienceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of audience.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audience_size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Audience Size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {audienceSizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The size of the audience.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <FormField
                control={form.control}
                name="topics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topics</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mental Health, Wellness" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of topics covered.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the engagement, your role, and key points..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description of the engagement.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Feedback, testimonials, or audience response..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Any feedback or testimonials from the event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional image to highlight this engagement.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Feature this engagement</FormLabel>
                      <FormDescription>
                        Featured engagements may be highlighted on your profile or portfolio.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/professional-leadership/speaking-engagement")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="engagement-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Engagement"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
