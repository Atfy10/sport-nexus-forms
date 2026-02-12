import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormLayout from "@/components/FormLayout";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { AppUserDto } from "@/types/appUserDto";

const formSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  ssn: z.string().length(12, "SSN must be 12 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  nationality: z.string().min(1, "Nationality is required"),
  salary: z
    .number()
    .min(10, "Salary must be positive")
    .or(z.nan().transform(() => 0)),
  gender: z.string().min(4, "Gender is required"),
  birthDate: z.string().min(8, "Birth date is required"),
  hireDate: z.string().min(8, "Hire date is required"),
  address: z
    .string()
    .min(10, "Address is required")
    .refine((val) => val.split(",").length === 2, {
      message: "Address must be in format: Street, City",
    }),
  phoneNumber: z.string().min(8, "Phone number is required"),
  secondPhoneNumber: z.string().optional(),
  position: z.string().min(4, "Position is required"),
  branchId: z.string().min(1, "Branch is required"),
  userName: z.string().optional(),
});

const EmployeeForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      ssn: "",
      email: "",
      nationality: "",
      salary: 0,
      gender: "",
      birthDate: "",
      hireDate: "",
      address: "",
      phoneNumber: "",
      secondPhoneNumber: "",
      position: "",
      branchId: "",
      userName: "",
    },
  });

  const [availableUsers, setAvailableUsers] = useState<AppUserDto[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const res = await fetch("https://localhost:7000/api/User/get-unlinked");

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: AppUserDto[] = await res.json();
        setAvailableUsers(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load available users");
      } finally {
        setUsersLoading(false);
      }
    };

    fetchAvailableUsers();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const [street, city] = values.address.split(",").map((part) => part.trim());

    const command = {
      ...values,
      branchId: Number(values.branchId),
      street,
      city,
    };

    delete command.address;

    setIsLoading(true);

    try {
      const res = await fetch("https://localhost:7000/api/Emplopyee/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
      });

      const result = await res.json();

      console.log("Status:", res.status);
      console.log("Backend result:", result);

      // business failure from backend
      if (!result.isSuccess) {
        toast.error(result.message);
        return; // ⛔ no reset
      }

      // success
      toast.success("Employee created successfully");
      form.reset(); // ✅ reset only on success
    } catch (error) {
      // network / unexpected error
      toast.error(
        error instanceof Error ? error.message : "Unable to connect to server",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout title="Create Employee">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSN</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678901234" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="Egyptian" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
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
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hireDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hire Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Coach">Coach</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Receptionist">Receptionist</SelectItem>
                      <SelectItem value="Cleaner">Cleaner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="33">Qortuba Sports Academy</SelectItem>
                      <SelectItem value="36">Bayan Sports Academy</SelectItem>
                      <SelectItem value="40">Sharq Sports Academy</SelectItem>
                    </SelectContent>{" "}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {availableUsers.length > 0 && (
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App User (Optional)</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {availableUsers.map((user) => (
                          <SelectItem key={user.userName} value={user.userName}>
                            {user.userName} {/*({user.phoneNumber})*/}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address (Street, City)</FormLabel>
                <FormControl>
                  <Textarea placeholder="El Tahrir St, Cairo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            {isLoading ? "Submitting..." : "Create Employee"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
};

export default EmployeeForm;
