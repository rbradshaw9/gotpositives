'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import type { Content } from '@/types/content'

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface AudioPlayerProps {
  episode: Content | null
}

export default function AudioPlayer({ episode }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)        // 0–1
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(episode?.duration_seconds ?? 0)

  // Register Media Session API for background playback / lock screen controls
  useEffect(() => {
    if (!episode || !('mediaSession' in navigator)) return
    navigator.mediaSession.metadata = new MediaMetadata({
      title: episode.title,
      artist: 'Positives',
      album: episode.month_theme ?? 'Daily Practice',
    })
    navigator.mediaSession.setActionHandler('play',  () => handlePlay())
    navigator.mediaSession.setActionHandler('pause', () => handlePause())
    navigator.mediaSession.setActionHandler('seekbackward', () => seek(-15))
    navigator.mediaSession.setActionHandler('seekforward',  () => seek(15))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode])

  const handlePlay = useCallback(() => {
    audioRef.current?.play()
    setIsPlaying(true)
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing'
  }, [])

  const handlePause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused'
  }, [])

  const seek = useCallback((delta: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime + delta)
  }, [])

  function handleTimeUpdate() {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
  }

  function handleLoadedMetadata() {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    if (audioRef.current) {
      audioRef.current.currentTime = ratio * (audioRef.current.duration || 0)
    }
  }

  if (!episode) return null

  const audioSrc = episode.castos_episode_url ?? undefined

  return (
    <>
      {/* Hidden audio element — required for actual playback */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className="player" role="region" aria-label="Audio Player">
        {/* Progress bar */}
        <div className="player__progress-bar-wrapper">
          <div
            className="player__progress-track"
            role="slider"
            aria-label="Playback progress"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={handleProgressClick}
          >
            <div className="player__progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="player__time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Meta + controls */}
        <div className="player__meta">
          <div className="player__info">
            <div className="player__title">{episode.title}</div>
            <div className="player__subtitle">{episode.month_theme ?? 'Daily Practice'}</div>
          </div>

          <div className="player__controls">
            {/* Rewind 15s */}
            <button
              className="player__btn"
              onClick={() => seek(-15)}
              aria-label="Rewind 15 seconds"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M1 4L4 7L7 4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 7V4.5C4 10.8513 9.14873 16 15.5 16C19.0899 16 22.2875 14.3924 24.4348 11.8696" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="7" y="16" fontSize="7" fill="currentColor" stroke="none" fontFamily="Inter,sans-serif" fontWeight="700">15</text>
              </svg>
            </button>

            {/* Play / Pause */}
            <button
              className="player__btn player__btn--play"
              onClick={isPlaying ? handlePause : handlePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M5 3L19 12L5 21V3Z"/>
                </svg>
              )}
            </button>

            {/* Forward 15s */}
            <button
              className="player__btn"
              onClick={() => seek(15)}
              aria-label="Skip forward 15 seconds"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M23 4L20 7L17 4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 7V4.5C20 10.8513 14.8513 16 8.5 16C4.91009 16 1.71254 14.3924 -0.434783 11.8696" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="7" y="16" fontSize="7" fill="currentColor" stroke="none" fontFamily="Inter,sans-serif" fontWeight="700">15</text>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
