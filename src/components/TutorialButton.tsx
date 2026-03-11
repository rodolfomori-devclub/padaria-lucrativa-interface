import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  buildGoogleDriveEmbedUrl,
  extractGoogleDriveFileId,
} from "~/lib/parseGoogleDriveUrl";
import { cn } from "~/lib/utils";

export interface TutorialButtonProps {
  /** Full Google Drive URL (e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing) */
  videoUrl: string;
  /** Modal title (e.g. "Tutorial - Despesas Fixas") */
  title: string;
  /** Short description shown above the video */
  description?: string;
  /** Button label (default: "Tutorial") */
  buttonLabel?: string;
  /** Optional className for the trigger button */
  className?: string;
}

export function TutorialButton({
  videoUrl,
  title,
  description,
  buttonLabel = "Tutorial",
  className,
}: TutorialButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileId = extractGoogleDriveFileId(videoUrl);
  const embedUrl = fileId ? buildGoogleDriveEmbedUrl(fileId) : null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 bg-transparent border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
            className,
          )}
        >
          <CircleHelp className="size-5" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {embedUrl && isOpen ? (
          <div
            className="relative w-full overflow-hidden rounded-lg bg-gray-100"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={true}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center rounded-lg bg-gray-100 text-gray-500"
            style={{ aspectRatio: "16/9" }}
          >
            {!fileId ? "URL do vídeo inválida" : "Carregando vídeo..."}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
