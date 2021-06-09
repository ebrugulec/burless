import React, { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import '../../styles/LinkList.scss'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import windowSize from "../../lib/windowSize";
import axios from "axios";
import {server} from "../../config";

const LinkList = ({ linkData, id, isSignedIn }) => {
  const userListRef = useRef(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [matchedIdStyle, setMatchedIdStyle] = useState(false);
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)
  const size = windowSize();
  const router = useRouter();
  const [searchVal, setSearchVal] = useState('');

  let isLargeScreen = size.width > 768;

  useEffect(() => {
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
        setFirstRender(false)
      }
    }

    if (router.query && router.query.page == 1) {
      router.replace('/', undefined, { shallow: true })
    }
  }, [linkData]);

  const handlePagination = (page) => {
    const path = router.pathname;
    const query = router.query;
    query.page = page.selected + 1;
    router.push({
      pathname: path,
      query: `page=${query.page}`,
    })
    // userListRef.current.scrollIntoView()
  };
  //
  // useEffect(() => {
  //   if (id) {
  //     setMatchedIdStyle(true);
  //     setTimeout(() => {
  //       setMatchedIdStyle(false);
  //     }, 9000)
  //   }
  // }, []);

  // const addedNewLink = (responseData) => {
  //   setNewLinkId(responseData.data.link._id)
  //   setLinks([responseData.data.link, ...links])
  // };
  //
  // function returnNewAddedLinkStyle (linkId) {
  //   return linkId === newLinkId ? 'table-success'
  //     : ((newLinkId === null && linkId === id ) ? 'table-success' : '')
  // }

  function handleDeleteLink(linkId) {
    axios.delete(`${server}/api/links/${linkId}`)
      .then((res) => {
        setLinks(links.filter(link => link._id !== linkId))
      })
      .catch((err) => {
        console.log('err', err)
      });
  }

  const handleSearch = async (searchString) => {
    if (searchVal.length === 0 || searchVal.length >= 3) {
      axios.get(`${server}/api/links/search?linkCode=${searchString}`)
        .then((res) => {
          if (res && res.data && res.data.data) {
            setLinks(res.data.data.links)
          }
        })
        .catch((err) => {
          console.log('err', err)
        });
    }
    setSearchVal(searchString)
  };
//TODO: Font check
  return (
    <div className="link-list">
      {
        matchedIdStyle &&
        <div className="alert alert-info" role="alert">
          You have created a new short link. Copy and start use. 💃
        </div>
      }
      <div className="link-header-text">
        <h3>Links</h3>
      </div>
      <div className="link-header">
        {isLargeScreen &&
          <div className="count">
            CLICK
          </div>
        }
        <div className="short-link">
          <span>
            SHORT LINK
          </span>
          {isSignedIn &&
            <span>
              <input className="search" type="text" onChange={(e) => handleSearch(e.target.value)} />
            </span>
          }
        </div>
        {isLargeScreen &&
          <div className="date">
            CREATED
          </div>
        }
        {isLargeScreen &&
          <div className="long-link">
            LONG LINK
          </div>
        }
        <div className="operations">
          OPERATIONS
        </div>
      </div>
      {links.map((link, i) => {
        return (
          <div className="link">
            {isLargeScreen &&
              <div className="count">
                {link.totalClickCount}
              </div>
            }
            <div className="short-link">
              <a className="" target="_blank" href={link.linkCode}>{link.shortLink}</a>
            </div>

            {isLargeScreen &&
            <div className="date">
              Apr, 11 2021
            </div>
            }
            {isLargeScreen &&
              <div className="long-link">
                <a className="">{link.longLink}</a>
              </div>
            }
            <div className="operations">
              <Link className="" href={`/statistic/${encodeURIComponent(link.linkCode)}`}>
                <a><FontAwesomeIcon icon={faChartBar} /></a>
              </Link>
              <span onClick={() => handleDeleteLink(link._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          </div>
        )
      }
      )}
      <div>
      </div>
      {links && links.length > 0 &&
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
      }
    </div>
  )
};

export default LinkList
