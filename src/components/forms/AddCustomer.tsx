import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStore } from "@/stores/useStore";
import { toast } from "sonner";

const addCustomerSchema = z.object({
  name: z.string().trim().min(1, "Customer name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().trim().optional(),
  platform: z.string().trim().min(1, "Platform is required").max(50, "Platform name must be less than 50 characters"),
  notes: z.string().trim().optional().refine(val => !val || val.length <= 500, "Notes must be less than 500 characters"),
  image: z.string().optional(),
});

type AddCustomerFormData = z.infer<typeof addCustomerSchema>;

interface AddCustomerProps {
  children: React.ReactNode;
}

export function AddCustomer({ children }: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const { addCustomer } = useStore();
  const [customerImage, setCustomerImage] = useState<string>("");

  const form = useForm<AddCustomerFormData>({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      platform: "",
      notes: "",
      image: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomerImage(result);
        form.setValue('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCustomerImage("");
    form.setValue('image', "");
  };

  const onSubmit = (data: AddCustomerFormData) => {
    try {
      addCustomer({
        name: data.name,
        platform: data.platform,
        email: data.email || undefined,
        phone: data.phone || undefined,
        notes: data.notes || undefined,
        image: data.image || undefined,
        totalPurchases: 0,
        lastPurchase: new Date().toISOString(),
      });
      
      toast.success("Customer added successfully!");
      setOpen(false);
      form.reset();
      setCustomerImage("");
    } catch (error) {
      toast.error("Failed to add customer. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Neuen Kunde hinzufügen</DialogTitle>
          <DialogDescription>
            Einen neuen Kunden zu Ihrer Datenbank hinzufügen.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kundenname *</FormLabel>
                  <FormControl>
                    <Input placeholder="Max Mustermann" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="max@example.com" {...field} />
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
                    <FormLabel>Telefon (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+49 123 456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plattform *</FormLabel>
                  <FormControl>
                    <Input placeholder="eBay, Instagram, Vinted, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notizen (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Zusätzliche Notizen zu diesem Kunden..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Customer Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Kundenbild (optional)</label>
              <p className="text-xs text-muted-foreground">Max. 5MB, JPG, PNG oder WEBP</p>
              {customerImage ? (
                <div className="relative inline-block">
                  <img 
                    src={customerImage} 
                    alt="Customer preview" 
                    className="w-24 h-24 object-cover rounded-lg border-2 border-brand-primary/20"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-brand-primary/50 transition-colors">
                  <label htmlFor="customer-image-add" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Upload</span>
                    <input
                      id="customer-image-add"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => {
                setOpen(false);
                form.reset();
                setCustomerImage("");
              }}>
                Abbrechen
              </Button>
              <Button type="submit" variant="success">
                Kunde hinzufügen
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}