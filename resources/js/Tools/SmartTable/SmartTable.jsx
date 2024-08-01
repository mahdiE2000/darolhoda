import { cilContact, cilTrash } from "@coreui/icons";
import { cilCommentSquareEdit } from "@coreui/icons-pro";
import CIcon from "@coreui/icons-react";
import { CAvatar, CBadge, CButton, CSmartTable, CTooltip } from "@coreui/react-pro";
import { NavLink } from "react-router-dom";




const SmartTable = (
    {columns,
    Data,
    itemsPerPage,
    totalPages,
    currentPage,
    setItemsPerPage,
    setCurrentPage,
    scopedColumns,
    createButton=true,
    tableProps={
        responsive: true,
        striped: true,
        hover: true,
      }
}) =>{
    const defaultScopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-around" style={{ overflow: 'hidden' }}>
                        <CTooltip
                        content="ویرایش"
                        placement="top"
                        animation={false}
                        >
                            <CButton style={{border: 'none'}}>
                                <NavLink to={`Update/${item.id}`}>
                                    <CIcon icon={cilCommentSquareEdit} className="text-info" size="xl" />
                                </NavLink>
                            </CButton>
                        </CTooltip>
                        {/* <CTooltip
                        content="حذف"
                        placement="top"
                        >
                            <CButton style={{border: 'none'}}>
                                <CIcon icon={cilTrash} className="text-danger" size="xl" />
                            </CButton>
                        </CTooltip> */}
                    </div>
                </td>
            );
        },
    };

    return(
        <>
            <CSmartTable
                clickableRows
                columns={columns}
                // columnFilter
                // columnSorter
                items={Data}
                itemsPerPageSelect
                itemsPerPage={itemsPerPage}
                itemsPerPageLabel="تعداد نمایش"
                pagination
                itemsNumber={5}
                pages={totalPages}
                onItemsPerPageChange={(newItemsPerPage) => {
                    setItemsPerPage(newItemsPerPage);
                    setCurrentPage(1);
                    }}
                paginationProps={{
                    pages: totalPages,
                    onActivePageChange: (page) => {
                        // console.log('Page changed to:', page);
                        setCurrentPage(page);
                    },
                    activePage: currentPage
                }}
                scopedColumns={scopedColumns || defaultScopedColumns}
                // sorterValue={{ column: 'id', state: 'asc' }}
                tableProps={{
                    responsive: true,
                    striped: true,
                    // hover: true,
                  }}
                tableBodyProps={{
                    className: 'align-middle text-wrap'
                }}

                noItemsLabel="داده ای پیدا نشد"
            />
            {createButton && (
                <div className='d-flex justify-content-center p-4'>
                    <NavLink className='col-lg-2' to='Create'>
                        <CButton className="text-white w-100" color="success" shape="rounded-pill">ایجاد</CButton>
                    </NavLink>
                </div>
            )}

        </>
    )
}



export default SmartTable;
