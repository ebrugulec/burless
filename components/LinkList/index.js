import React, { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import '../../styles/LinkList.scss'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import windowSize from "../../lib/windowSize";
import NewLink from "../NewLink";

const LinkList = ({ linkData, id }) => {
  const userListRef = useRef(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [matchedIdStyle, setMatchedIdStyle] = useState(false);
  const [newLinkId, setNewLinkId] = useState(null)
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)
  const size = windowSize();
  const router = useRouter()

  let isLargeScreen = size.width > 768;

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

  const addedNewLink = (responseData) => {
    setNewLinkId(responseData.data.link._id)
    setLinks([responseData.data.link, ...links])
  };

  function returnNewAddedLinkStyle (linkId) {
    return linkId === newLinkId ? 'table-success'
      : ((newLinkId === null && linkId === id ) ? 'table-success' : '')
  }

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
          {isLargeScreen && <th scope="col">Clicks</th>}
          <th scope="col">Short Link</th>
          {isLargeScreen && <th scope="col">Long Link</th>}
          {isLargeScreen && <th scope="col">Created Date</th>}
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {links && links.length > 0 &&
        links.map((link, i) => {
          return (
            <tr key={i} className={returnNewAddedLinkStyle(link._id)}>
              {isLargeScreen &&
                <th className="click">
                  {link.totalClickCount}
                </th>
              }
              <th key={i}>
                <Link className="link" href={`/statistic/${encodeURIComponent(link.linkCode)}`}>
                  <a>{link.shortLink}</a>
                </Link>
              </th>
              {isLargeScreen &&
                <th>
                  <div className="long-link">
                    <a className="link">{link.longLink}</a>
                  </div>
                </th>
              }
              {isLargeScreen &&
                <th>
                  12.2.2222
                </th>
              }
              <th>
                <Link className="link" href={`/statistic/${encodeURIComponent(link.linkCode)}`}>
                  <a><FontAwesomeIcon icon={faChartBar} /></a>
                </Link>
                {isLargeScreen && <a><FontAwesomeIcon icon={faTrash} /></a>}
              </th>
            </tr>
          )
        })}
        </tbody>
      </table>
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
      <NewLink addedNewLink={addedNewLink}/>
    </div>
  )
}
export default LinkList
