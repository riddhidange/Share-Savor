import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import { registerSchema } from "@/lib/schemas";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "./ui/use-toast";

export default function Register() {
  // TODO: Calendar to switch between months and years
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { toast } = useToast();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    university: "",
  };

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  async function onSubmit(values) {
    // TODO: Once authentication is implemented, this will be the place to call the API to register the user.
    const apiUrl = "http://localhost:3000/api/auth/register";

    // Making the date of birth in MM/DD/YYYY format
    values.dateOfBirth = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(values.dateOfBirth);
    // Make the API call
    try {
      const response = await axios.post(apiUrl, values);
      if (response.data) {
        toast({
          title: "Congratulations! You have successfully registered.",
          description: `Please login to continue.`,
          duration: 3000,
          className: "top-0 right-0 flex fixed md:max-w-[420px]",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: `${error.response.data.error}`,
        duration: 3000,
        className: "bg-red-400 top-0 right-0 flex fixed md:max-w-[420px]",
      });
    }
  }

  return (
    <div className="flex flex-col h-full p-12 items-center gap-10">
      <h1 className="text-5xl font-bold  mb-4">Welcome!</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-2 p-4 grid grid-cols-2 gap-4 rounded-xl max-w-lg mx-auto text-left"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                {!form?.formState?.errors?.firstName && (
                  <FormDescription>Enter your first name</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                {!form?.formState?.errors?.lastName && (
                  <FormDescription>Enter your last name</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {!form?.formState?.errors?.gender && (
                  <FormDescription>Choose your gender</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel>Date of birth</FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
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
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      onSelect={(e) => {
                        field.onChange(e);
                        setIsCalendarOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                {!form?.formState?.errors?.dateOfBirth && (
                  <FormDescription>Choose date of birth.</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                {!form?.formState?.errors?.email && (
                  <FormDescription>Enter your email</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your university" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Stevens">Stevens</SelectItem>
                  </SelectContent>
                </Select>
                {!form?.formState?.errors?.university && (
                  <FormDescription>Choose your university</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {!form?.formState?.errors?.password && (
                  <FormDescription>Enter your password</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password again"
                    type="password"
                    {...field}
                  />
                </FormControl>
                {!form?.formState?.errors?.confirmPassword && (
                  <FormDescription>Enter your password again</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 space-y-2">
            <span className="text-sm">
              Already have an account?{" "}
              <Link className="text-blue-400" to={"/login"}>
                Login
              </Link>
            </span>
            <Button className="w-full" type="submit">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
