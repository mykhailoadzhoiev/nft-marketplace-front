import { useCallback, useEffect, useState } from 'react'
import { ELotSaleType, ILot } from '../types/lot'
import { List } from '../components/Lots'
import { lot as lotAPI, user as userAPI } from '../utils/api/index'
import { IUser } from '../types/user'
import { UserList } from '../components/Users'
import { ISelectOption, Select } from '../components/UI/Select'
import { PageLoader } from '../components/Loader'
import { EventContext } from '../ctx/event'
import { TRow } from '../types/api'
import { NumPagination } from '../hoc/Pagination'
import { OGSetDescription, OGSetTitle, OGUpdateUrl } from '../utils/openGraph'
import { useTypedLocation } from '../hooks/useTypedLocation'

export const Search = () => {
    const [loading, setLoading] = useState(false)
    const [row, setRow] = useState<TRow<ILot>>()
    const [lots, setLots] = useState<ILot[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [page, setPage] = useState(1)
    const { location } = useTypedLocation()

    const sortOptions: ISelectOption<{
        desc: boolean
        orderBy: 'createdAt' | 'viewsRating' | 'expiresAt'
    }>[] = [
        {
            label: 'Recently added',
            value: '1',
            meta: {
                desc: true,
                orderBy: 'createdAt',
            },
        },
        {
            label: 'Most viewed',
            value: '2',
            meta: {
                desc: true,
                orderBy: 'viewsRating',
            },
        },
        {
            label: 'Enging Soon',
            value: '3',
            meta: {
                desc: false,
                orderBy: 'expiresAt',
            },
        },
    ]
    const [sort, setSort] = useState(sortOptions[0])

    const salesTypeOptions: ISelectOption<{
        type: ELotSaleType | undefined
    }>[] = [
        {
            label: 'All',
            value: '1',
        },
        {
            label: 'Auctions',
            value: '2',
            meta: {
                type: ELotSaleType.AUCTION,
            },
        },
        {
            label: 'Sale',
            value: '3',
            meta: { type: ELotSaleType.SALE },
        },
    ]
    const [saleType, setSaleType] = useState(salesTypeOptions[0])

    const getLots = useCallback(async () => {
        setLoading(true)
        try {
            await lotAPI
                .get({
                    sortBy: sort.meta?.orderBy,
                    sortDesc: sort.meta?.desc,
                    search: location.state?.search,
                    saleType: saleType.meta?.type,
                    page,
                })
                .then(({ data }) => {
                    setRow(data)
                    setLots(data.rows)
                })
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }, [sort, location.state, saleType, page])

    useEffect(() => {
        window.scrollTo(0, location.state?.pageYOffset || 0)
    }, [row, location.state?.pageYOffset])

    useEffect(() => {
        getLots()
    }, [sort, getLots])

    async function changeLot(lot: ILot) {
        const updatedLots = lots.map((l) => {
            return l.id === lot.id ? lot : l
        })
        setLots(updatedLots)
    }

    function removeLot(id: string) {
        setLots(lots.filter((l) => l.id !== id))
    }

    useEffect(() => {
        OGSetTitle('Search | TasteNFT')
        OGSetDescription(
            'The NFT marketplace for sensual digital artwork empowering creators of exclusive fine nude and body art'
        )
        OGUpdateUrl()
        userAPI
            .get({ name: location.state?.search })
            .then(({ data }) => setUsers(data.rows))
    }, [location.state])

    return (
        <>
            <EventContext.Provider
                value={{
                    onPaginationPage: setPage,
                    onTimerEnd: removeLot,
                    onTimerUpdated: changeLot,
                }}
            >
                {loading ? <PageLoader></PageLoader> : null}
                <div className="selects">
                    <div className="selects__item">
                        <Select
                            state={[sort, setSort]}
                            options={sortOptions}
                        ></Select>
                    </div>
                    <div className="selects__item">
                        <Select
                            state={[saleType, setSaleType]}
                            options={salesTypeOptions}
                        ></Select>
                    </div>
                </div>
                <List lots={lots}></List>
                {row ? <NumPagination row={row}></NumPagination> : null}

                {!loading && !row?.rows.length ? (
                    <div className="empty">Nothing here yet</div>
                ) : null}
                {users ? (
                    <UserList users={users} title="Creators"></UserList>
                ) : null}
            </EventContext.Provider>
        </>
    )
}
