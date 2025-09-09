 
import FeatureDetail from "@/components/feature"

const feature = [
  { title: "Karim", description: "This is description" },
  { title: "Altaf", description: "Another description" },
  { title: "John", description: "Something else" },
]

export default function MyName() {
  return <FeatureDetail feature={feature} />
}
