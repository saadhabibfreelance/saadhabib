import { memo, useRef } from "react";
import { useStoryMotion } from "../../hooks/useStoryMotion";
import { scenes } from "./story/scenes";
import { StoryChapter } from "./story/StoryChapter";

export const Story = memo(function Story() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  useStoryMotion(wrapRef, sceneRefs);

  return (
    <div ref={wrapRef} className="relative bg-[#050816] text-white">
      {scenes.map((scene, i) => (
        <StoryChapter
          key={scene.eyebrow}
          scene={scene}
          index={i}
          total={scenes.length}
          ref={(el) => {
            sceneRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
});
