import { useState } from 'react';

interface YouTubeEmbedProps {
  /** 11-character YouTube video id. */
  id: string;
  /** Accessible title for the player iframe. */
  title: string;
  /** Accessible label for the play button before the player mounts. */
  playAria: string;
}

/** Lightweight YouTube facade: shows YouTube's own poster frame and
 *  only mounts the real iframe once the viewer hits play, so the page
 *  never loads the player up front. Falls back to a brand panel if the
 *  poster image is missing. */
export function YouTubeEmbed({ id, title, playAria }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [posterBroken, setPosterBroken] = useState(false);

  if (playing) {
    return (
      <div className="yt-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`yt-embed yt-facade${posterBroken ? ' is-bare' : ''}`}
      aria-label={playAria}
      onClick={() => setPlaying(true)}
    >
      {!posterBroken && (
        <img
          className="yt-poster"
          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setPosterBroken(true)}
        />
      )}

      <span className="yt-scrim" aria-hidden="true" />

      <span className="yt-play" aria-hidden="true">
        <svg viewBox="0 0 68 48">
          <path
            className="yt-play-bg"
            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
          />
          <path className="yt-play-arrow" d="M45 24 27 14v20" />
        </svg>
      </span>
    </button>
  );
}
