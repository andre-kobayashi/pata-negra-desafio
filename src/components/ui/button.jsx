import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  // Estilos base: Adicionei 'active:scale-95' para feedback tátil no mobile e 'uppercase font-bold'
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold uppercase tracking-tight ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none',
  {
    variants: {
      variant: {
        // O primary agora usa o copper (conforme nosso tailwind.config) com uma sombra de brilho
        default: 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
        ghost: 'text-gray-400 hover:bg-zinc-900 hover:text-white',
        link: 'text-primary underline-offset-4 hover:underline normal-case',
        // Novo variant para botões de "venda" ultra chamativos
        shiny: 'bg-copper text-white shadow-[0_0_20px_rgba(184,115,51,0.4)] hover:shadow-[0_0_30px_rgba(184,115,51,0.6)] animate-pulse-slow',
      },
      size: {
        default: 'h-12 px-6 py-3', // Aumentado para melhor toque no mobile
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-lg rounded-2xl',
        xl: 'h-16 px-12 text-xl font-black rounded-2xl w-full', // Ideal para o CTA final
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };