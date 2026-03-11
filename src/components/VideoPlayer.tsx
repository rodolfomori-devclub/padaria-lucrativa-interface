import {
  buildGoogleDriveEmbedUrl,
  extractGoogleDriveFileId,
} from "~/lib/parseGoogleDriveUrl";
import { cn } from "~/lib/utils";

export interface VideoPlayerProps {
  /** Full Google Drive URL (e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing) */
  videoUrl: string;
  /** Video title for iframe accessibility */
  title: string;
  /** Optional className for the container */
  className?: string;
}

export function VideoPlayer({ videoUrl, title, className }: VideoPlayerProps) {
  const fileId = extractGoogleDriveFileId(videoUrl);
  const embedUrl = fileId ? buildGoogleDriveEmbedUrl(fileId) : null;

  if (!embedUrl) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-gray-100 text-gray-500",
          className
        )}
        style={{ aspectRatio: "16/9" }}
      >
        URL do vídeo inválida
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-gray-100",
        className
      )}
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
  );
}
