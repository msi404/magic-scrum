import * as React from 'react'

import { cn } from '@/app/_shared/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary-foreground',
				'flex h-10 w-full min-w-0 rounded-lg border border-orange-500/20 dark:border-orange-500/30',
				'bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-blue-500/5 dark:from-orange-500/10 dark:via-purple-500/10 dark:to-blue-500/10 backdrop-blur-sm',
				'px-4 py-2 text-sm shadow-lg transition-all duration-300',
				'outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium',
				'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
				'focus-visible:border-orange-500/50 focus-visible:ring-2 focus-visible:ring-orange-500/20 dark:focus-visible:border-orange-400/50 dark:focus-visible:ring-orange-400/20',
				'focus-visible:bg-gradient-to-r focus-visible:from-orange-500/10 focus-visible:via-purple-500/10 focus-visible:to-blue-500/10 dark:focus-visible:from-orange-500/20 dark:focus-visible:via-purple-500/20 dark:focus-visible:to-blue-500/20',
				'aria-invalid:border-red-500/50 aria-invalid:ring-2 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-400/50 dark:aria-invalid:ring-red-400/20',
				'aria-invalid:bg-gradient-to-r aria-invalid:from-red-500/10 aria-invalid:to-orange-500/10 dark:aria-invalid:from-red-500/20 dark:aria-invalid:to-orange-500/20',
				'hover:shadow-xl hover:border-orange-500/30 dark:hover:border-orange-500/40',
				className
			)}
			{...props}
		/>
	)
}

export { Input }
