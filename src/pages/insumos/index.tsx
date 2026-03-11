import { useInputs } from "~/hooks/inputs/useInputs";
import { InputsTable, NewInputDialog } from "./components";
import { TutorialButton } from "~/components/TutorialButton";

export function InputsPage() {
  const { inputs, isLoading } = useInputs();

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insumos</h1>
            <p className="text-gray-600 mt-2">Gerencie os insumos da padaria</p>
          </div>
          <div className="flex items-center gap-2">
            <TutorialButton
              videoUrl="https://drive.google.com/file/d/1JGHyq4xLjvcU-0xypsn5js3SbEeF4GxM/view?usp=sharing"
              title="Tutorial - Insumos"
              description="Aprenda a gerenciar os insumos da sua padaria."
            />
            <NewInputDialog />
          </div>
        </div>
      </div>

      <InputsTable inputs={inputs} isLoading={isLoading} />
    </div>
  );
}
