"use client";
import { type NextPage } from "next";
import { Container } from "@/app/_shared/ui/container";
import { Card, CardContent } from '@/app/_shared/ui/card';
import { TaskBoard } from "@/app/_shared/ui/task-board";
import { BackgroundBeams } from "@/app/_shared/ui/background-beams";
import { DatePicker } from '@/app/_shared/ui/date-picker'

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
	);
};

export default Home;
