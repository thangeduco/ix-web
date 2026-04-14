import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        config: Record<string, unknown>
      ) => YoutubePlayerInstance
      PlayerState?: {
        UNSTARTED: number
        ENDED: number
        PLAYING: number
        PAUSED: number
        BUFFERING: number
        CUED: number
      }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

export type YoutubePlayerInstance = {
  playVideo: () => void
  pauseVideo: () => void
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void
  getCurrentTime: () => number
  destroy: () => void
  getPlaybackRate?: () => number
}

type StudentYoutubePlayerProps = {
  videoId: string
  title: string
  playerRef: React.MutableRefObject<YoutubePlayerInstance | null>
  playing: boolean
  resumeRequest?: {
    token: number
    second: number
  } | null
  onReady?: () => void
  onTimeUpdate?: (currentSecond: number) => void
  onEnded?: () => void
  onPlay?: (currentSecond: number) => void
  onPause?: (currentSecond: number) => void
  onSeek?: (fromSecond: number, toSecond: number) => void
}

let youtubeApiLoader: Promise<void> | null = null

function loadYoutubeIframeApi(): Promise<void> {
  if (youtubeApiLoader) return youtubeApiLoader

  youtubeApiLoader = new Promise<void>((resolve) => {
    if (window.YT?.Player) {
      resolve()
      return
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    ) as HTMLScriptElement | null

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.body.appendChild(script)
    }

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve()
    }
  })

  return youtubeApiLoader
}

export function StudentYoutubePlayer({
  videoId,
  title,
  playerRef,
  playing,
  resumeRequest,
  onReady,
  onTimeUpdate,
  onEnded,
  onPlay,
  onPause,
  onSeek,
}: StudentYoutubePlayerProps) {
  const internalPlayerRef = useRef<YoutubePlayerInstance | null>(null)
  const timeUpdateIntervalRef = useRef<number | null>(null)
  const lastResumeTokenRef = useRef<number | null>(null)
  const playerElementIdRef = useRef(
    `student-youtube-player-${Math.random().toString(36).slice(2)}`
  )

  const onReadyRef = useRef(onReady)
  const onTimeUpdateRef = useRef(onTimeUpdate)
  const onEndedRef = useRef(onEnded)
  const onPlayRef = useRef(onPlay)
  const onPauseRef = useRef(onPause)
  const onSeekRef = useRef(onSeek)
  const playingRef = useRef(playing)

  const lastKnownSecondRef = useRef(0)
  const lastStateRef = useRef<number | null>(null)
  const ignoreNextPauseRef = useRef(false)

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate
  }, [onTimeUpdate])

  useEffect(() => {
    onEndedRef.current = onEnded
  }, [onEnded])

  useEffect(() => {
    onPlayRef.current = onPlay
  }, [onPlay])

  useEffect(() => {
    onPauseRef.current = onPause
  }, [onPause])

  useEffect(() => {
    onSeekRef.current = onSeek
  }, [onSeek])

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    let disposed = false

    const clearTimer = () => {
      if (timeUpdateIntervalRef.current != null) {
        window.clearInterval(timeUpdateIntervalRef.current)
        timeUpdateIntervalRef.current = null
      }
    }

    const startTimer = () => {
      clearTimer()

      timeUpdateIntervalRef.current = window.setInterval(() => {
        const player = internalPlayerRef.current
        if (!player) return

        try {
          const currentSecond = Number(player.getCurrentTime?.() ?? 0)
          if (Number.isFinite(currentSecond)) {
            lastKnownSecondRef.current = currentSecond
            onTimeUpdateRef.current?.(currentSecond)
          }
        } catch (error) {
          console.error('[StudentYoutubePlayer] getCurrentTime failed:', error)
        }
      }, 300)
    }

    const mountPlayer = async () => {
      await loadYoutubeIframeApi()

      if (disposed || !window.YT?.Player) return

      const player = new window.YT.Player(playerElementIdRef.current, {
        videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (disposed) return

            internalPlayerRef.current = player
            playerRef.current = player
            startTimer()

            if (playingRef.current) {
              try {
                player.playVideo()
              } catch (error) {
                console.error('[StudentYoutubePlayer] autoplay on ready failed:', error)
              }
            }

            onReadyRef.current?.()
          },
          onStateChange: (event: { data: number }) => {
            const playerState = window.YT?.PlayerState
            if (!playerState) return

            const currentSecond = Number(player.getCurrentTime?.() ?? 0)
            if (Number.isFinite(currentSecond)) {
              lastKnownSecondRef.current = currentSecond
            }

            if (event.data === playerState.PLAYING) {
              startTimer()

              if (lastStateRef.current !== playerState.PLAYING) {
                onPlayRef.current?.(lastKnownSecondRef.current)
              }
            }

            if (event.data === playerState.PAUSED) {
              clearTimer()

              if (ignoreNextPauseRef.current) {
                ignoreNextPauseRef.current = false
              } else {
                onPauseRef.current?.(lastKnownSecondRef.current)
              }
            }

            if (event.data === playerState.ENDED) {
              clearTimer()
              onEndedRef.current?.()
            }

            lastStateRef.current = event.data
          },
        },
      })

      internalPlayerRef.current = player
      playerRef.current = player
    }

    mountPlayer().catch((error) => {
      console.error('[StudentYoutubePlayer] mount player failed:', error)
    })

    return () => {
      disposed = true
      clearTimer()

      if (internalPlayerRef.current) {
        try {
          internalPlayerRef.current.destroy()
        } catch (error) {
          console.error('[StudentYoutubePlayer] destroy failed:', error)
        }
      }

      internalPlayerRef.current = null
      playerRef.current = null
      lastResumeTokenRef.current = null
      lastStateRef.current = null
      lastKnownSecondRef.current = 0
    }
  }, [videoId, playerRef])

  useEffect(() => {
    const player = internalPlayerRef.current
    if (!player) return

    try {
      if (playing) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
    } catch (error) {
      console.error('[StudentYoutubePlayer] sync playing failed:', error)
    }
  }, [playing])

  useEffect(() => {
    const player = internalPlayerRef.current
    if (!player || !resumeRequest) return

    if (lastResumeTokenRef.current === resumeRequest.token) return
    lastResumeTokenRef.current = resumeRequest.token

    try {
      const fromSecond = Number(player.getCurrentTime?.() ?? 0)
      const toSecond = resumeRequest.second

      ignoreNextPauseRef.current = true
      player.seekTo(toSecond, true)
      onSeekRef.current?.(fromSecond, toSecond)

      window.setTimeout(() => {
        try {
          if (playingRef.current) {
            player.playVideo()
          }
        } catch (error) {
          console.error('[StudentYoutubePlayer] play after seek failed:', error)
        }
      }, 150)
    } catch (error) {
      console.error('[StudentYoutubePlayer] resume seek failed:', error)
    }
  }, [resumeRequest])

  return (
    <div className="student-video-task__video student-video-task__iframe">
      <div
        id={playerElementIdRef.current}
        style={{ width: '100%', height: '100%' }}
        aria-label={title}
      />
    </div>
  )
}