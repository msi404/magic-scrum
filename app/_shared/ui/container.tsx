import { type ReactNode, type FC } from 'react'
import { cn } from '@/app/_shared/lib/utils'
export const Container: FC<{ children: ReactNode; className?: string }> = ({
	children,
	className
}) => {
	return (
		<div className={cn('container mx-auto px-4 py-8', className)}>
			{children}
		</div>
	)
}
