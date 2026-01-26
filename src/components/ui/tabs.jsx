import React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Altura aumentada para h-14 (melhor para o polegar) e fundo mais escuro
      "inline-flex h-14 items-center justify-center rounded-2xl bg-zinc-900/50 p-1.5 text-zinc-500 border border-zinc-800/50 backdrop-blur-sm",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Texto em negrito, itálico e uppercase para combinar com o branding
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-2.5 text-xs font-black uppercase italic tracking-widest ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
      // Estado Ativo: Fundo cobre com brilho e texto branco
      "data-[state=active]:bg-copper data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(184,115,51,0.4)] data-[state=active]:border-t border-white/10",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // Adicionado uma pequena animação de fade-in para o conteúdo
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 animate-in fade-in-50 duration-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };