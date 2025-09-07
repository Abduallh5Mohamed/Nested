"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, MessageSquare, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(20, "Message must be at least 20 characters."),
});

export default function Contact() {
  const t = useTranslations('Contact');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await addDoc(collection(db, "contact-submissions"), {
        ...values,
        submittedAt: new Date(),
      });
      
      toast({
        title: t('toastSuccessTitle'),
        description: t('toastSuccessDesc'),
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t('toastErrorTitle'),
        description: t('toastErrorDesc'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="w-full py-24 md:py-32 bg-inherit">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">{t('tagline')}</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline text-black">
              {t('title')}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl/relaxed max-w-xl">
              {t('description')}
            </p>
             <div className="space-y-4 text-gray-600">
                <p><strong>{t('emailLabel')}:</strong> nestedtechno@gmail.com</p>
                <p><strong>{t('phoneLabel')}:</strong> +201271773837</p>
             </div>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-black"><User size={16}/>{t('formNameLabel')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('formNamePlaceholder')} {...field} className="bg-gray-100 border-gray-300 text-black" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-black"><Building size={16}/>{t('formCompanyLabel')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('formCompanyPlaceholder')} {...field} className="bg-gray-100 border-gray-300 text-black" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-black"><Mail size={16}/>{t('formEmailLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('formEmailPlaceholder')} {...field} className="bg-gray-100 border-gray-300 text-black" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-black"><MessageSquare size={16}/>{t('formMessageLabel')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('formMessagePlaceholder')}
                          className="resize-none bg-gray-100 border-gray-300 text-black"
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className="w-full text-lg py-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 me-2 animate-spin" />
                      {t('formSubmitting')}
                    </>
                  ) : (
                    t('formSubmit')
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
