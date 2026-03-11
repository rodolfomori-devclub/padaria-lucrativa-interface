import { useEffect } from "react";
import { TutorialsLayout } from "~/components/TutorialsLayout";
import { useAuth } from "~/contexts/AuthContext";
import { ALL_TUTORIAL_VIDEOS } from "~/constants/tutorialVideos";

export function TutoriaisPage() {
  const { user, completeTutorials } = useAuth();

  useEffect(() => {
    if (user?.isFirstLogin) {
      completeTutorials();
    }
  }, [user?.isFirstLogin, completeTutorials]);

  const isFirstLogin = user?.isFirstLogin;
  const videos = isFirstLogin
    ? ALL_TUTORIAL_VIDEOS
    : ALL_TUTORIAL_VIDEOS.filter((video) => video.id !== "introduction");

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tutoriais</h1>
        <p className="text-gray-600 mt-2">
          Assista aos vídeos e aprenda a usar o sistema
        </p>
      </div>

      <TutorialsLayout videos={videos} />
    </div>
  );
}
