import React, { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import '../../styles/LinkList.scss'

const LinkList = ({ linkData, id }) => {
  const userListRef = useRef(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [matchedIdStyle, setMatchedIdStyle] = useState(false);
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)
  const router = useRouter()
  console.log('id', id)

  useEffect(() => {
    setFirstRender(false)
    Router.events.on('routeChangeStart', startLoading)
    Router.events.on('routeChangeComplete', stopLoading)
    return () => {
      Router.events.off('routeChangeStart', startLoading)
      Router.events.off('routeChangeComplete', stopLoading)
    }
  }, [])

  useEffect(() => {
    if (linkData) {
      if (linkData.error) {
        // Handle error
      } else {
        // Set links from linkData
        setLinks(linkData.links)
      }
    }
  }, [linkData])

  const handlePagination = (page) => {
    if (!firstRender) {
      const path = router.pathname
      const query = router.query
      query.page = page.selected + 1
      router.push({
        pathname: path,
        query: query,
      })
    }
    // userListRef.current.scrollIntoView()
  };

  useEffect(() => {
    if (id) {
      setMatchedIdStyle(true);
      setTimeout(() => {
        setMatchedIdStyle(false);
      }, 9000)
    }
  }, []);

  // console.log('ma', matchedIdStyle)

  return (
    <div className="link-list">
      {loading && <h1>Loading..</h1>}
      {
        matchedIdStyle &&
        <div className="alert alert-info" role="alert">
          You have created a new short link. Copy and start use. 💃
        </div>
      }
      <table className="table content-table">
        <thead>
        <tr>
          <th scope="col">Clicks</th>
          <th scope="col">Short Link</th>
          <th scope="col">Long Link</th>
          <th scope="col">Created Date</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {links && links.length > 0 &&
        links.map((link, i) => {
          return (
            <tr key={i} className={link._id === id ? 'table-success' : ''}>
              <th className="click">
                  {link.totalClickCount}
              </th>
              <th key={i}>
                <Link className="link" href={`/statistic/${encodeURIComponent(link.linkCode)}`}>
                  <a>{link.shortLink}</a>
                </Link>
              </th>
              <th>
                <a className="link">{link.longLink}</a>
              </th>
              <th>
                12.2.2222
              </th>
              <th>
                <a>{12/21/2222}</a>
              </th>
            </tr>
          )
        })}
        </tbody>
      </table>
      {/*<ul className="user-list" ref={userListRef}>*/}
      {/*  {links && links.length > 0 &&*/}
      {/*    links.map((link, i) => {*/}
      {/*      return (*/}
      {/*        <li className="user" key={i}>*/}
      {/*          <Link href={`/statistic/${encodeURIComponent(link.linkCode)}`}>*/}
      {/*            <a>{link.linkCode}</a>*/}
      {/*          </Link>*/}
      {/*        </li>*/}
      {/*      )*/}
      {/*    })}*/}
      {/*</ul>*/}
      <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        initialPage={linkData.curPage - 1}
        pageCount={linkData.maxPage}
        onPageChange={handlePagination}
        containerClassName={'paginate-wrap'}
        subContainerClassName={'paginate-inner'}
        pageClassName={'paginate-li'}
        pageLinkClassName={'paginate-a'}
        activeClassName={'paginate-active'}
        nextLinkClassName={'paginate-next-a'}
        previousLinkClassName={'paginate-prev-a'}
        breakLinkClassName={'paginate-break-a'}
      />
      <style jsx>{`
        .container {
          background: #ccc;
        }
        p {
          color: blue;
        }
      `}</style>
    </div>
  )
}
export default LinkList
