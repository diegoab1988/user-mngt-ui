import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <Header title="Dashboard" userName={session.user?.name || null} />
      <main className="container mx-auto p-6">
        <h2 className="text-xl font-semibold">Bem-vindo ao painel</h2>
      </main>
    </div>
  );
}
