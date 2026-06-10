interface PreviewScene {
  sceneNumber: number;
  title: string;
  narrativeText: string;
}

interface PreviewImage {
  sceneNumber: number;
  imageBase64: string;
  mimeType: string;
}

interface StoryPreviewData {
  story?: {
    title: string;
    scenes: PreviewScene[];
  };
  images?: PreviewImage[];
}

const storyData: StoryPreviewData = {};

export default function StoryPreviewPage() {
  if (!storyData.story) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
        <p className="max-w-md text-center text-lg leading-8 text-zinc-300">
          Cole aqui o JSON da história gerada pela API
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="px-2">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            {storyData.story.title}
          </h1>
        </header>

        <div className="flex flex-col gap-12">
          {storyData.story.scenes.map((scene) => {
            const image = storyData.images?.find(
              (item) => item.sceneNumber === scene.sceneNumber,
            );

            return (
              <section
                key={scene.sceneNumber}
                className="overflow-hidden rounded-lg bg-zinc-900"
              >
                {image ? (
                  <img
                    src={`data:${image.mimeType};base64,${image.imageBase64}`}
                    alt={scene.title}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : null}

                <div className="space-y-4 px-5 py-6 sm:px-7 sm:py-8">
                  <h2 className="text-2xl font-semibold leading-tight">
                    {scene.title}
                  </h2>
                  <p className="text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                    {scene.narrativeText}
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
