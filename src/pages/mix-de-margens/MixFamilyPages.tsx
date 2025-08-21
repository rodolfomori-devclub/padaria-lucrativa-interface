import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Loading } from "~/components/ui/loading";
import { useFamilies } from "~/hooks/families/useFamilies";
import { useDebounce } from "~/hooks/useDebounce";
import { CreateFamilyDialog } from "./components/CreateFamilyDialog";
import { FamiliesTable } from "./components/FamiliesTable";

export function MixFamilyPages() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search });

  const { families, isLoading, error } = useFamilies();

  // Filter families based on search
  const filteredFamilies = families.filter((family) =>
    family.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-600">
          Erro ao carregar famílias. Tente novamente.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Famílias</h1>
            <p className="text-gray-600 mt-2">
              Gerencie as famílias de produtos para mix de margens
            </p>
          </div>
          <CreateFamilyDialog />
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar famílias..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-64">
          <Loading />
        </div>
      ) : (
        <FamiliesTable families={filteredFamilies} isLoading={isLoading} />
      )}
    </div>
  );
}
