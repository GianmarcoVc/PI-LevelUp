import { useDispatch, useSelector } from 'react-redux'

import styles from './Pagination.module.scss'
import { setPage } from '../../redux/actions'

const Pagination = ({ size }) => {
  const dispatch = useDispatch()
  const { page: pageActual } = useSelector(state => state)

  const pages = []
  const numPages = Math.ceil(size / 15)
  for (let i = 1; i <= numPages; i++) { pages.push(i) }

  return (
    <section id={styles.pagination}>
      {pages.length > 1 && pages.map((page, i) =>
        <button
          key={i}
          id={page}
          onClick={() => dispatch(setPage(page))}
          className={
            pageActual === page
              ? styles.active
              : styles.desactive
          }
        >{page}
        </button>
      )}
    </section>
  )
}

export default Pagination
