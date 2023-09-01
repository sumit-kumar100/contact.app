"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calender";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast/use-toast";
import { useDispatch, useSelector } from "@/hooks/redux";
import { genderOptions } from "@/lib/dropdowns";
import { cn } from "@/lib/utils";
import {
  FulfilledAction,
  RootDispatch,
  RootState,
  persistor,
} from "@/redux/store";
import {
  clearMessage,
  clearParams,
  createContact,
  updateContact,
} from "@/services/contacts";
import { ContactFormData } from "@/types/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { PersistGate } from "redux-persist/integration/react";
import * as z from "zod";

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: "First name must be at least 3 characters.",
    })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "First name must contain only alphabetic characters.",
    }),
  lastName: z
    .string()
    .min(3, {
      message: "Last name must be at least 3 characters.",
    })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Last name must contain only alphabetic characters.",
    }),
  phone: z
    .string()
    .min(10, {
      message: "Phone must be at least 10 characters.",
    })
    .max(10, {
      message: "Phone must be at most 10 characters.",
    })
    .refine((value) => /^[\w \.\'\-]+$/.test(value), {
      message: "Invalid phone number.",
    }),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  gender: z.string(),
  dateOfBirth: z.date(),
  active: z.boolean().refine((value) => value !== undefined && value !== null, {
    message: "Status is required.",
  }),
  addressLineOne: z.string().min(8, {
    message: "Address be at least 8 characters.",
  }),
  addressLineTwo: z.string().optional(),
  city: z.string().nonempty({
    message: "City is required and cannot be empty.",
  }),
  country: z
    .string()
    .trim()
    .refine((value) => /^[A-Z0-9_!@#$%^&*() ]+$/g.test(value), {
      message: "Country must contain uppercase letters.",
    }),
  zipcode: z.string().max(10, {
    message: "Zipcde must be at most 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactManager({
  params,
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();

  const dispatch: RootDispatch = useDispatch();

  const state = useSelector((state: RootState) => state.contact);

  const defaultValues: Partial<ContactFormValues> = useMemo(() => {
    if (params.action === "edit" && state.editData) {
      return {
        ...state.editData,
        dateOfBirth: new Date(state.editData.dateOfBirth),
      };
    }
    return {};
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (formData: ContactFormValues) => {
    const formattedData = {
      ...formData,
      dateOfBirth: format(formData.dateOfBirth, "yyyy-MM-dd"),
    };

    let response: FulfilledAction<ContactFormData, any>;

    if (params.action === "edit") {
      response = await dispatch(
        updateContact({
          ...formattedData,
          id: searchParams.id,
        })
      );
    } else {
      response = await dispatch(createContact(formattedData));
    }

    if (response.meta.requestStatus === "fulfilled") {
      dispatch(clearParams())
      router.push("/contacts");
    }
  };

  useEffect(() => {
    if (state.loading === "idle" && !!state.message) {
      toast({
        variant: "default",
        title: state.message,
      });
      dispatch(clearMessage());
    }
  }, [state.message]);

  return (
    <PersistGate persistor={persistor}>
      <div className="flex min-h-[80vh] items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border-1 space-y-8 rounded-lg p-4 shadow-xl md:w-5/12 md:p-10"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone no.</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Id</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="justify-between gap-2 md:flex">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Gender</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[220px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? genderOptions.find(
                                (gender) => gender.value === field.value
                              )?.label
                              : "Select gender"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] p-0">
                        <Command>
                          <CommandInput placeholder="Search gender..." />
                          <CommandEmpty>No gender found.</CommandEmpty>
                          <CommandGroup>
                            {genderOptions.map((gender) => (
                              <CommandItem
                                value={gender.label}
                                key={gender.value}
                                onSelect={() => {
                                  form.setValue("gender", gender.value, {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                {gender.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[220px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Icons.Calendar className="ml-auto h-4 w-4 opacity-50" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="addressLineOne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address one</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLineTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Two</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your zipcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {params.action === "edit" ? "Update" : "Add"} Contact
            </Button>
          </form>
        </Form>
      </div>
    </PersistGate>
  );
}
