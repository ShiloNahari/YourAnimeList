import React from "react"
import "./Pagination.css"
const pagination = (props) => {
  const { totalPosts, postsPerPage, setCurrentPage, currentPage } = props
  let pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
    
  }
  function setPage (page){
    setCurrentPage(page)
    console.log(page)
  }
  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            type="button"
            key={index}
            onClick={() => setPage(page)}
            className={page === currentPage ? "btn-primary active" : "btn-primary"}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default pagination
