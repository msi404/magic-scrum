'use client'
import { type NextPage } from 'next'
import {
	BackgroundBeams,
	TaskBoard,
	Card,
	CardContent,
	Container
} from '@/app/_shared/ui'

const Home: NextPage = () => {
	return (
		<Container>
			<Card className="space-y-4 overflow-hidden w-[1130px] mx-auto max-w-full shadow-xl border">
				<CardContent>
					<TaskBoard />
				</CardContent>
			</Card>
			<BackgroundBeams className="z-[-1]" />
		</Container>
	)
}

export default Home
