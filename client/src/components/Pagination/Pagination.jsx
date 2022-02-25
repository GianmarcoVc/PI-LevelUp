import './Pagination.scss'
import { setPage } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const Pagination = ({size}) => {

  const dispatch = useDispatch()
  const { page } = useSelector(state => state)

  const result = []
  const numPages = Math.ceil(size / 15)
  for (let i = 1; i <= numPages; i++) {result.push(i)}
  
  return (
    <div id='pagination'>
      {result.length > 1 && result.map((r, i) =>
        <button 
          id={r} 
          key={i}
          className={page === r ? 'active' : 'desactive'} 
          onClick={() => dispatch(setPage(r))}
        >{r}</button>
      )}
    </div>
  )
}

export default Pagination
