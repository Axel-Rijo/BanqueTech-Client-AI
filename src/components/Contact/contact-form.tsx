"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitContactForm } from "./action";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
// Import the branch types
import { type BranchInfo, getAllBranches } from "@/lib/branch-data";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

// Update the function signature to accept the selected branch
export function ContactForm({
  selectedBranch,
}: {
  selectedBranch: BranchInfo;
}) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [inquiryType, setInquiryType] = useState("general");
  const branches = getAllBranches();

  async function handleFormSubmit(formData: FormData) {
    // Basic validation
    const errors: Record<string, string> = {};
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const subject = formData.get("subject") as string;

    if (!name || name.trim().length < 2) {
      errors.name = "Please enter your name (minimum 2 characters)";
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!message || message.trim().length < 10) {
      errors.message = "Please enter a message (minimum 10 characters)";
    }

    if (!subject || subject.trim().length < 3) {
      errors.subject = "Please enter a subject (minimum 3 characters)";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: "Form Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        toast({
          title: "Message Sent",
          description: result.message,
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        });
        setFormSubmitted(true);
        setFormErrors({});
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    }
  }

  if (formSubmitted) {
    return (
      <div className="bg-muted p-8 rounded-lg text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">Thank You!</h3>
        <p className="mb-4">
          Your message has been sent. We'll get back to you as soon as possible.
        </p>
        <Button
          className="mt-4 bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300"
          onClick={() => setFormSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form action={handleFormSubmit} className="space-y-5 animate-fadeIn">
      <div className="space-y-3">
        <Label htmlFor="inquiry-type" className="text-base font-medium">
          What can we help you with?
        </Label>
        <RadioGroup
          defaultValue="general"
          className="grid grid-cols-2 gap-4 pt-2"
          onValueChange={setInquiryType}
          name="inquiry-type"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="general" id="general" />
            <Label htmlFor="general" className="cursor-pointer">
              General Inquiry
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="catering" id="catering" />
            <Label htmlFor="catering" className="cursor-pointer">
              Catering
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="feedback" id="feedback" />
            <Label htmlFor="feedback" className="cursor-pointer">
              Feedback
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="press" id="press" />
            <Label htmlFor="press" className="cursor-pointer">
              Press/Media
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-medium">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            className={`w-full transition-all ${
              formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            required
            aria-describedby={formErrors.name ? "name-error" : undefined}
          />
          {formErrors.name && (
            <p id="name-error" className="text-sm text-red-500 mt-1">
              {formErrors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            className={`w-full transition-all ${
              formErrors.email
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            required
            aria-describedby={formErrors.email ? "email-error" : undefined}
          />
          {formErrors.email && (
            <p id="email-error" className="text-sm text-red-500 mt-1">
              {formErrors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Your phone number"
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Optional, but helpful for follow-up
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="font-medium">
            Subject <span className="text-red-500">*</span>
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Subject of your message"
            className={`w-full transition-all ${
              formErrors.subject
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            required
            aria-describedby={formErrors.subject ? "subject-error" : undefined}
          />
          {formErrors.subject && (
            <p id="subject-error" className="text-sm text-red-500 mt-1">
              {formErrors.subject}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="font-medium">
            Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            className={`w-full min-h-[150px] ${
              formErrors.message
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
            required
            aria-describedby={formErrors.message ? "message-error" : undefined}
          />
          {formErrors.message && (
            <p id="message-error" className="text-sm text-red-500 mt-1">
              {formErrors.message}
            </p>
          )}
        </div>
      </div>

      {/* Add hidden input for the branch ID */}
      <input type="hidden" name="branchId" value={selectedBranch.id} />

      {/* Update Submit Button section: */}
      <div className="space-y-2 mt-4">
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="newsletter" name="newsletter" />
          <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
            Sign up for Savoria's newsletter to receive updates and special
            offers
          </Label>
        </div>

        <div className="pt-4">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
