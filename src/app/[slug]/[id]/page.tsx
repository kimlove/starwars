import Link from "next/link";

export default async function DashboardPage({ params }: any) {
  const slug = params.slug;
  const id = params.id;

  return (
    <div className="">
      <main className="">
        <ul>
          <li>slug: {slug}</li>
          <li>id: {id}</li>
        </ul>

        <p className="my-4">
          <Link href="/">Back to homepage</Link>
        </p>
      </main>
    </div>
  );
}
