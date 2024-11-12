import { ViewDetail } from "@/app/components/view-detail";

interface DetailProps {
  params: {
    slug: "people" | "planets" | "films" | "species";
    id: string;
  };
}

export default function Detail({ params }: DetailProps) {
  const { slug, id } = params;

  return <ViewDetail slug={slug} id={id} />;
}
