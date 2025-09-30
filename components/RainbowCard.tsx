import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function RainbowCard() {
  return (
<div className="flex">
	<a href="https://deepsite.hf.co" target="_blank" rel="noopener noreferrer" className="overflow-hidden z-1 rounded-lg animate-gradient__rotate relative group opacity-0 animate-fade-in">
		<div className="p-6 bg-white/10 cursor-pointer relative overflow-hidden z-1 h-full flex flex-col justify-between transition-all duration-300 group-hover:backdrop-blur-sm">
			<div>
				<div className="mb-4">
					<p className="text-sm text-gray-300 group-hover:text-opacity-100 transition-all duration-200 text-opacity-80 font-medium mb-2">Developer</p>
					<h3 className="font-bold bg-clip-text text-transparent white_gradient text-2xl mb-4">Web Site</h3>
				</div>
				<p className="text-gray-200 text-opacity-90 leading-relaxed mb-6">Develop and deploy web applications.</p>
				<div className="mb-4">
					<p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">Tech Stack</p>
					<div className="flex items-center gap-3 flex-wrap">
						<div className="group/tech transition-all duration-200">
svg
						</div>
						<div className="group/tech transition-all duration-200">
svg
						</div>
						<div className="group/tech transition-all duration-200">
svg
						</div>
					</div>
				</div>
			</div>
			<div className="mt-6 pt-4 border-t border-white border-opacity-10">
				<span className="text-sm font-medium bg-clip-text text-transparent white_gradient group-hover:opacity-100 transition-all duration-200 opacity-80 flex items-center gap-2">
          Visit Project
        </span>
			</div>
		</div>
		<i></i>
	</a>
</div>
  )
}
