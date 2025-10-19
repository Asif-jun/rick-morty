// src/common/components/pageTemplate/PageTemplate.tsx
import React from 'react'
import type { ErrorType } from '../../hooks/useFetch'

type PageTemplateProps = {
  searchComponent?: React.ReactNode
  loading?: boolean
  errorType?: ErrorType // 'network' | 'notFound' | null
  notFoundComponent?: React.ReactNode
  children?: React.ReactNode
  paginationComponent?: React.ReactNode
  cardsClassName?: string
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  searchComponent,
  loading = false,
  errorType = null,
  notFoundComponent = null,
  children,
  paginationComponent,
  cardsClassName,
}) => {
  const hasChildren = React.Children.count(children) > 0

  return (
    <div className='pageContainer'>
      {searchComponent}

      {loading && <div className='loader'>Loading...</div>}

      {/* Network (generic) error */}
      {!loading && errorType === 'network' && (
        <div className='errorMessage'>Something went wrong</div>
      )}

      {/* Not found — only when specific notFoundComponent is provided */}
      {!loading && errorType === 'notFound' && notFoundComponent}

      {/* Normal content when no error and we have children */}
      {!loading && !errorType && !hasChildren && notFoundComponent}

      {!loading && !errorType && hasChildren && (
        <>
          <div className={cardsClassName || 'cardsContainer'}>{children}</div>
          {paginationComponent}
        </>
      )}
    </div>
  )
}
