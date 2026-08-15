import { Button } from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
export default function HeroSection() {
    return (
   <section className="relative overflow-hidden bg-gradient-to-b from-[#0352c1] to-[#0f172a] text-white py-20 px-4 sm:px-6 lg:px-8">
       <div className="wrapper">
           <div className="flex flex-col items-center justify-center text-center lg:py-24 py-12">
               <Badge variant={"outline"} className="mb-8 text-white px-4 py-3 backgrop-blur-sm border-white/20 ">
               <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                 <span >
                   Join the community of developers and makers sharing their work
                 </span>
               </Badge>
                <h1 className="text-5xl sm:text-6xl
lg:text-7xl font-bold tracking-tight mb-6
max-w-5xl">Share What You&apos;ve built, Track new initiatives</h1>
                <p>
                 A community platform for developers to share their projects, get feedback, and discover new ideas.
                </p>
                 <Button variant={"default"} size={"lg"}>Share your projects</Button>
                 <Button variant={"default"} size={"lg"}>Explore projects</Button>
           </div>
       </div>
   </section>
    )
}