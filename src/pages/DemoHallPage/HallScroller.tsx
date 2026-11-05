import { PointerEvent as ReactPointerEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import style from './hallScroller.styles.module.scss'

/**
 * Horizontal scroll area with an always-visible, draggable scrollbar.
 * Native scrollbars are hidden on iOS/macOS overlay mode, so we draw our own.
 * Only active on phones (see styles); on wider screens it is a plain wrapper.
 */
export const HallScroller = ({ children }: { children: ReactNode }) => {
    const viewportRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const drag = useRef<{ startX: number, startScroll: number } | null>(null)
    const [thumb, setThumb] = useState({ width: 100, left: 0 })

    const update = useCallback(() => {
        const el = viewportRef.current
        if (!el) return
        const { scrollWidth, clientWidth, scrollLeft } = el
        const width = scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 100
        const maxScroll = scrollWidth - clientWidth
        const left = maxScroll > 0 ? (scrollLeft / maxScroll) * (100 - width) : 0
        setThumb({ width, left })
    }, [])

    useEffect(() => {
        const el = viewportRef.current
        if (!el) return
        // Start centered on the hall.
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
        update()
        const observer = new ResizeObserver(update)
        observer.observe(el)
        return () => observer.disconnect()
    }, [update])

    const scrollByTrack = (dxPx: number, startScroll: number) => {
        const el = viewportRef.current
        const track = trackRef.current
        if (!el || !track) return
        el.scrollLeft = startScroll + dxPx * (el.scrollWidth / track.clientWidth)
    }

    const onThumbPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.currentTarget.setPointerCapture(e.pointerId)
        drag.current = { startX: e.clientX, startScroll: viewportRef.current?.scrollLeft ?? 0 }
    }

    const onThumbPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (!drag.current) return
        scrollByTrack(e.clientX - drag.current.startX, drag.current.startScroll)
    }

    const onThumbPointerUp = () => {
        drag.current = null
    }

    // Tap on the track: center the thumb at the tap point.
    const onTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        const el = viewportRef.current
        const track = trackRef.current
        if (!el || !track) return
        const rect = track.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        el.scrollTo({ left: ratio * el.scrollWidth - el.clientWidth / 2, behavior: 'smooth' })
    }

    const scrollable = thumb.width < 99.5

    return (
        <div className={style.HallScroller}>
            <div ref={viewportRef} className={style.viewport} onScroll={update}>
                {children}
            </div>
            {scrollable && (
                <div className={style.bar}>
                    <span className={style.hint} aria-hidden="true">← листайте схему →</span>
                    <div ref={trackRef} className={style.track} onPointerDown={onTrackPointerDown}>
                        <div
                            className={style.thumb}
                            style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
                            onPointerDown={onThumbPointerDown}
                            onPointerMove={onThumbPointerMove}
                            onPointerUp={onThumbPointerUp}
                            onPointerCancel={onThumbPointerUp}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
