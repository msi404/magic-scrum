'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'motion/react'

import { cn } from '@/app/_shared/lib/utils'

const Dialog = ({ children, ...props }: DialogPrimitive.DialogProps) => (
	<AnimatePresence>
		<DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
	</AnimatePresence>
)

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			'fixed inset-0 bg-gray-900/70 backdrop-blur-md data-[state=open]:animate-[enter_200ms_ease-out] data-[state=closed]:animate-[exit_450ms_ease-in-out] data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			className
		)}
		{...props}
	/>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay />
		<DialogPrimitive.Content asChild {...props}>
			<motion.div
				ref={ref}
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -100, opacity: 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
				className={cn(
					'fixed left-[50%] top-[50%] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 backdrop-blur-md p-6 shadow-xl shadow-gray-900/20 dark:shadow-gray-900/50',
					className
				)}
			>
				<div
					className="relative"
					onPointerDown={(e: React.PointerEvent) => {
						// Prevent closing when clicking on date picker
						if (e.target instanceof HTMLElement && e.target.closest('.rdp')) {
							e.preventDefault()
						}
					}}
				>
					{children}
				</div>
			</motion.div>
		</DialogPrimitive.Content>
	</DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col space-y-3 text-center sm:text-left',
			className
		)}
		{...props}
	/>
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6',
			className
		)}
		{...props}
	/>
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			'text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100',
			className
		)}
		{...props}
	/>
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
		{...props}
	/>
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription
}
