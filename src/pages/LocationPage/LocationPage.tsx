// LocationPage.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SearchBox } from '../searchBox/SearchBox'
import { AnimatedButton } from '../../common/components/animatedButton/AnimatedButton'
import { Card } from '../../common/components/card/Card'
import { NotFound } from '../../common/components/notFound/NotFound'
import type { Location, LocationResponse } from '../../types/location'
import { PageTemplate } from '../../common/components/pageTemplate/PageTemplate'

export const LocationPage = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios
      .get<LocationResponse>(
        `https://rickandmortyapi.com/api/location?page=${page}&name=${search}`
      )
      .then(res => {
        setLocations(res.data.results)
        setTotalPages(res.data.info.pages)
        setError(false)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [page, search])

  const nextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  return (
    <PageTemplate
      searchComponent={
        <SearchBox
          value={search}
          onChange={val => {
            setSearch(val)
            setPage(1)
          }}
        />
      }
      loading={loading}
      error={error || locations.length === 0}
      notFoundComponent={<NotFound />}
      paginationComponent={
        <div
          style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <AnimatedButton onClick={prevPage} disabled={page === 1}>
            Назад
          </AnimatedButton>
          <AnimatedButton onClick={nextPage} disabled={page === totalPages}>
            Вперед
          </AnimatedButton>
        </div>
      }
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '20px',
        }}
      >
        {locations.map(loc => (
          <Card
            key={loc.id}
            title={loc.name}
            details={
              <>
                <span>
                  <b>Тип:</b> {loc.type}
                </span>
                <br />
                <span>
                  <b>Измерение:</b> {loc.dimension}
                </span>
                <br />
                <span>
                  <b>Персонажей:</b> {loc.residents.length}
                </span>
              </>
            }
          />
        ))}
      </div>
    </PageTemplate>
  )
}
