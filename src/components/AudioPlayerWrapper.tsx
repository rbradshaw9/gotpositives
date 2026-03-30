'use client'

import { useState } from 'react'
import AudioPlayer from '@/components/AudioPlayer'
import { mockDailyAudios } from '@/lib/mock-data/content'

// AudioPlayerWrapper manages the "currently playing" episode state
// so any page can trigger playback without prop-drilling.
// In production this could be a Zustand/Jotai store or React context.
export default function AudioPlayerWrapper() {
  const [currentEpisode] = useState(mockDailyAudios[0])
  return <AudioPlayer episode={currentEpisode} />
}
