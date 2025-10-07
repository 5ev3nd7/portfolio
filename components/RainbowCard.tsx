import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Code2Icon } from "lucide-react"

export function RainbowCard() {
  return (
		<div className="flex overflow-hidden z-1 rounded-lg animate-gradient__rotate relative group opacity-0 animate-fade-in">
			<Card className="p-6 bg-white/10 border-none w-full">
				<CardHeader>
					<CardTitle>
						<h1 className="text-3xl flex items-center gap-4"><Code2Icon /> Solutions</h1>
					</CardTitle>
					<CardDescription>
						<p className="text-base">I design and develop clean, modern interfaces that enhance the user experience and help your business grow.</p>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="list-disc ml-4">
						<li>UI/UX Design</li>
						<li>Fullstack Web Development</li>
						<li>User-Centered Design</li>
						<li>Responsive Layouts</li>
						<li>Design Systems</li>
						<li>Wireframes & Prototypes</li>
						<li>CMS Design & Implementation</li>
						<li>Database Design</li>
					</ul>
				</CardContent>
			</Card>
			<i></i>
		</div>
  )
}
