import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui";
import { MargensLucroContent } from "./MargensLucroContent";
import { MargensLucroTutorialsTab } from "./MargensLucroTutorialsTab";

export function MargensLucroPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Margens de Lucro</h1>
        <p className="text-gray-600 mt-2">
          Configure os percentuais para cálculo das margens de lucro
        </p>
      </div>

      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-highlight data-[state=active]:text-white"
          >
            Conteúdo
          </TabsTrigger>
          <TabsTrigger
            value="tutorials"
            className="data-[state=active]:bg-highlight data-[state=active]:text-white"
          >
            Tutoriais
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-4">
          <MargensLucroContent />
        </TabsContent>
        <TabsContent value="tutorials" className="mt-4">
          <MargensLucroTutorialsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
