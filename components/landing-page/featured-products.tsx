import SectionHeader from "../common/section-header";
import { FlameIcon } from "lucide-react";
export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={FlameIcon}
            description="most populat projects"
          />
        </div>
      </div>
    </section>
  );
}
