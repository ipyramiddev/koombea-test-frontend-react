import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const PageDetail = ({ itemId }) => {
  const item = {
    id: itemId,
    name: `Item ${itemId}`,
    description: `This is detailed information about Item ${itemId}.`,
  };

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(1);
  let { id } = useParams();
  
  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const fetchItems = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const params = {
            page: currentPage,
            limit: ITEMS_PER_PAGE
        };  
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`http://localhost:3001/webpages/${id}?${queryString}`, {
            "headers": {
            "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setItems(data.links);
        setTotalCnt(data.totalCnt);
        } catch (error) {
            console.log(error);
        }
  };

  const totalPages = Math.ceil(totalCnt / ITEMS_PER_PAGE);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pagination = [];
    let startPage, endPage;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages)  {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pagination.push(
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          <a className="page-link">{page}</a>
        </li>
      );
    }

    return pagination;
  };


    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

    return (
        <div className='container'>
            <h2>Page Detail</h2>
            <p className='back-paragraph'><Link to="/">Back</Link></p>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Total Links</th>
                </tr>
                </thead>
                <tbody>
                {
                    items?.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.url}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>No items</tr>
                    )
                }
                </tbody>
            </table>
            <ul className="pagination">
                {totalPages > 1 && (
                <>
                    <li
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(1)}
                    >
                    <a className="page-link">First</a>
                    </li>
                    {renderPagination()}
                    <li
                    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                    >
                    <a className="page-link">Last</a>
                    </li>
                </>
                )}
            </ul>
        </div>
    );
};

export default PageDetail;