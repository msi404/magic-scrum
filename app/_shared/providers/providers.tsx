'use client'

import type { ReactNode, FC } from 'react';
import { Provider } from 'react-redux'
import { DirectionProvider } from '@radix-ui/react-direction'
import { ThemeProvider } from 'next-themes'
import { store } from '@/app/_shared/lib/store';

export const Providers: FC<{children: ReactNode}> = ({ children }) => {
	return (
		<Provider store={store}>
			<ThemeProvider attribute="class" enableSystem>
				<DirectionProvider dir='rtl'>
					{children}
				</DirectionProvider>
			</ThemeProvider>
		</Provider>
	);
}