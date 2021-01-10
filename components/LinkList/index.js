import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Router, { useRouter } from "next/router";
// import "./styles.scss"

const LinkList = ({ linkData }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)
  const router = useRouter();

  Router.onRouteChangeComplete = url =>
    console.log('Route changed to: ', url);

  useEffect(() => {
    setFirstRender(false);
    Router.events.on("routeChangeStart", startLoading)
    Router.events.on("routeChangeComplete", stopLoading)
    return () => {
      Router.events.off("routeChangeStart", startLoading)
      Router.events.off("routeChangeComplete", stopLoading)
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

  const handlePagination = page => {
    if (!firstRender) {
      const path = router.pathname
      const query = router.query
      query.page = page.selected + 1
      router.push({
        pathname: path,
        query: query,
      })
    }
  };
  return (
    <>
      {loading && <h1>Loading..</h1>}
      <ul className="link-list">
        {links.length > 0 &&
        links.map((link, i) => {
          return (
            <li className="link" key={i}>
              <span>{link.linkCode}</span>
            </li>
          )
        })}
      </ul>
      <ReactPaginate
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        initialPage={linkData.curPage - 1}
        pageCount={linkData.maxPage}
        onPageChange={handlePagination}
        containerClassName={"paginate-wrap"}
        subContainerClassName={"paginate-inner"}
        pageClassName={"paginate-li"}
        pageLinkClassName={"paginate-a"}
        activeClassName={"paginate-active"}
        nextLinkClassName={"paginate-next-a"}
        previousLinkClassName={"paginate-prev-a"}
        breakLinkClassName={"paginate-break-a"}
      />
    </>
  );
};
export default LinkList;