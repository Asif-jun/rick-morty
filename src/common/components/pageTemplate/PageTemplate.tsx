import React from 'react'

type PageTemplateProps = {
  searchComponent?: React.ReactNode
  loading?: boolean
  error?: string | boolean
  notFoundComponent?: React.ReactNode
  children: React.ReactNode
  paginationComponent?: React.ReactNode
  cardsClassName?: string
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  searchComponent,
  loading = false,
  error = false,
  notFoundComponent,
  children,
  paginationComponent,
  cardsClassName,
}) => {
  const hasChildren = React.Children.count(children) > 0

  return (
    <div className='pageContainer'>
      {searchComponent}

      {loading && <div className='loader'>Loading...</div>}

      {/* Ошибка без NotFound */}
      {!loading && error && !notFoundComponent && (
        <div className='errorMessage'>
          {typeof error === 'string' ? error : 'Something went wrong'}
        </div>
      )}

      {/* Пустой результат или ошибка с NotFound */}
      {!loading && (!hasChildren || error) && notFoundComponent}

      {/* Основной контент */}
      {!loading && !error && hasChildren && (
        <>
          <div className={cardsClassName || 'cardsContainer'}>{children}</div>
          {paginationComponent}
        </>
      )}
    </div>
  )
}
