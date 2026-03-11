import { useState } from "react";
import { VideoPlayer } from "~/components/VideoPlayer";
import { cn } from "~/lib/utils";
import type { TutorialVideo } from "~/constants/tutorialVideos";

interface TutorialsLayoutProps {
  videos: TutorialVideo[];
}

export function TutorialsLayout({ videos }: TutorialsLayoutProps) {
  const [selectedVideo, setSelectedVideo] = useState<TutorialVideo | null>(
    videos[0] ?? null,
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-0">
      <div className="flex-1 min-w-0">
        {selectedVideo ? (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedVideo.title}
            </h3>
            {selectedVideo.description && (
              <p className="text-gray-600 text-sm">
                {selectedVideo.description}
              </p>
            )}
            <VideoPlayer
              videoUrl={selectedVideo.videoUrl}
              title={selectedVideo.title}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 h-64">
            Selecione um vídeo na lista
          </div>
        )}
      </div>

      <aside className="w-full lg:w-72 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Vídeos
        </h4>
        <nav className="space-y-1 max-h-[500px] overflow-y-auto overflow-x-hidden">
          {videos.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelectedVideo(video)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md transition-colors cursor-pointer",
                "hover:bg-gray-100",
                selectedVideo?.id === video.id
                  ? "bg-blue-50 border-l-2 border-blue-600 ml-[2px] pl-[14px] text-blue-900"
                  : "text-gray-700",
              )}
            >
              <span className="block font-medium text-sm">{video.title}</span>
              {video.description && (
                <span className="block text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {video.description}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}
