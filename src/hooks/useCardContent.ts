import { useMemo } from 'react'
import { ICard } from '../types/card'
import { ITokenMediaView } from '../types/lot'

export function useCardContent(card: ICard): ITokenMediaView | undefined {
    return useMemo(() => {
        return (
            card.contents.find((c) => c.isOriginal) ||
            card.contents.find((c) => c.isCensored) ||
            card.contents.find((c) => c.isWatermark) ||
            card.contents[0]
        )
    }, [card])
}
