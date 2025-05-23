import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/app/_shared/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-blue-400/90 via-blue-500/90 to-blue-600/90 text-white backdrop-blur-sm border border-blue-400/20 shadow-sm hover:from-blue-400/80 hover:via-blue-500/80 hover:to-blue-600/80 hover:shadow-md active:from-blue-500/90 active:via-blue-600/90 active:to-blue-700/90",
        destructive:
          "bg-gradient-to-br from-red-400/90 via-red-500/90 to-red-600/90 text-white backdrop-blur-sm border border-red-400/20 shadow-sm hover:from-red-400/80 hover:via-red-500/80 hover:to-red-600/80 hover:shadow-md active:from-red-500/90 active:via-red-600/90 active:to-red-700/90",
        outline:
          "bg-gradient-to-br from-gray-50/90 via-gray-100/90 to-gray-200/90 dark:from-gray-800/90 dark:via-gray-900/90 dark:to-gray-950/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:from-gray-100/90 hover:via-gray-200/90 hover:to-gray-300/90 dark:hover:from-gray-700/90 dark:hover:via-gray-800/90 dark:hover:to-gray-900/90 hover:shadow-md text-gray-700 dark:text-gray-300 active:from-gray-200/90 active:via-gray-300/90 active:to-gray-400/90 dark:active:from-gray-600/90 dark:active:via-gray-700/90 dark:active:to-gray-800/90",
        secondary:
          "bg-gradient-to-br from-gray-100/90 via-gray-200/90 to-gray-300/90 dark:from-gray-800/90 dark:via-gray-900/90 dark:to-gray-950/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:from-gray-200/90 hover:via-gray-300/90 hover:to-gray-400/90 dark:hover:from-gray-700/90 dark:hover:via-gray-800/90 dark:hover:to-gray-900/90 hover:shadow-md text-gray-700 dark:text-gray-300 active:from-gray-300/90 active:via-gray-400/90 active:to-gray-500/90 dark:active:from-gray-600/90 dark:active:via-gray-700/90 dark:active:to-gray-800/90",
        ghost:
          "hover:bg-gradient-to-br hover:from-gray-100/90 hover:via-gray-200/90 hover:to-gray-300/90 dark:hover:from-gray-800/90 dark:hover:via-gray-900/90 dark:hover:to-gray-950/90 backdrop-blur-sm text-gray-700 dark:text-gray-300",
        link: "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-9 px-4 has-[>svg]:px-3",
        lg: "h-11 px-8 has-[>svg]:px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
