"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useContact, ContactMessage } from "@/hooks/useContact";
import { useContactQueries } from "@/hooks/useContactQuery";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Mail,
  Calendar,
  User,
  MessageSquare,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function ContactMessageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { useUpdateMessageReadStatus, useDeleteContactMessage } =
    useContactQueries();

  const { mutate: updateReadStatus } = useUpdateMessageReadStatus();
  const { mutate: deleteMessage } = useDeleteContactMessage();

  // Fetch the message details
  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("contact_messages")
          .select("*")
          .eq("id", resolvedParams.id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error("Message not found");
        }

        setMessage(data as ContactMessage);

        // If message is unread, mark it as read automatically
        if (data && !data.read) {
          updateReadStatus({ id: parseInt(resolvedParams.id), read: true });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [resolvedParams.id, updateReadStatus]);

  // Handle toggling read status
  const handleToggleReadStatus = () => {
    if (!message) return;

    updateReadStatus(
      { id: message.id, read: !message.read },
      {
        onSuccess: () => {
          setMessage((prev) => (prev ? { ...prev, read: !prev.read } : null));
          toast({
            title: `Message marked as ${!message.read ? "read" : "unread"}`,
            description: "Message status updated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update message status.",
            variant: "destructive",
          });
        },
      }
    );
  };

  // Handle deleting the message
  const handleDeleteMessage = () => {
    if (!message) return;

    if (
      confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      deleteMessage(message.id, {
        onSuccess: () => {
          toast({
            title: "Message deleted",
            description: "The message has been deleted successfully.",
          });
          router.push("/admin/contacts");
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete message.",
            variant: "destructive",
          });
        },
      });
    }
  };

  // Handle reply to email
  const handleReply = () => {
    if (!message) return;
    // Create a more detailed email template with the original message quoted
    const emailSubject = `Re: ${message.subject || "Your message"}`;
    const emailBody = `Dear ${message.name},

Thank you for your message. I'm writing in response to your inquiry.

----------
Original message:
${message.message}
----------

Best regards,
Asmau Ayub`;

    // Open the default email client with pre-filled fields
    window.location.href = `mailto:${
      message.email
    }?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      emailBody
    )}`;
  };

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading message...</p>
        </div>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="container py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/contacts")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to messages
          </Button>
        </div>

        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "Message not found"}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/admin/contacts")}>
              Return to messages
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/contacts")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to messages
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleToggleReadStatus}>
            {message.read ? (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Mark as unread
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as read
              </>
            )}
          </Button>
          <Button onClick={handleReply} variant="secondary">
            <Mail className="mr-2 h-4 w-4" />
            Reply
          </Button>
        </div>
      </div>

      <Card className="mx-auto max-w-4xl shadow-lg border-t-4 border-t-blue-500">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {message.read ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                  >
                    <CheckCircle className="h-3 w-3" /> Read
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> Unread
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
                >
                  <Clock className="h-3 w-3" />{" "}
                  {format(new Date(message.created_at), "MMM d, yyyy")}
                </Badge>
              </div>
              <CardTitle className="text-xl md:text-2xl">
                {message.subject || "No Subject"}
              </CardTitle>
              <CardDescription className="mt-1">
                From <span className="font-medium">{message.name}</span> (
                {message.email})
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {message.read ? "Mark as unread" : "Mark as read"}
                </span>
                <Switch
                  checked={message.read}
                  onCheckedChange={handleToggleReadStatus}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="mt-1 h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    From
                  </p>
                  <p className="text-lg font-semibold">{message.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {message.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Received
                  </p>
                  <p className="text-lg font-semibold">
                    {format(new Date(message.created_at), "PPP")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(message.created_at), "p")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="mt-1 h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    Subject
                  </p>
                  <p className="text-lg font-semibold">
                    {message.subject || "No Subject"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="font-medium text-lg mb-3">Message Content</p>
            <div className="whitespace-pre-wrap rounded-lg bg-white dark:bg-gray-900 border p-6 shadow-sm min-h-[200px]">
              {message.message}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-6 border-t">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Quick Actions:</span>
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={handleReply}
            >
              <Mail className="mr-2 h-4 w-4" />
              Reply via Email
            </Button>
          </div>

          <Button variant="destructive" onClick={handleDeleteMessage}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Missing Badge component - add it
function Badge({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "default";
}) {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  const variantClasses =
    variant === "outline"
      ? "border border-input bg-background text-foreground"
      : "bg-primary text-primary-foreground";

  return (
    <span className={`${baseClasses} ${variantClasses} ${className || ""}`}>
      {children}
    </span>
  );
}
