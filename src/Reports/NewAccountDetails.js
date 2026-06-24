import React, { Fragment, useState, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"

var first = [];


const NewAccountDetails = ({ pendingLoans, datefrom, dateto, isPrinting, cityselected}) => {

    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
    const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);

    var serialno = 0;
    const renderPage = (page) => {
        const startIndex = (page - 1) * recordsPerPage;
        const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);
        const isLastPage = page === totalPages;
        first = pageRecords.length > 0 ? pendingLoans[0] : "";
        serialno = startIndex;
        return (
            <Fragment>
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center", paddingTop: page === 1 ? "0px" : "15px" }} className='print-margin' >
                    <div className='col-sm-12 fixed mt-5 fw-bold text-center' ><h4>{t('newaccountaddress')}</h4></div>
                </div>
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center"}} className='print-margin' >
                    {cityselected && <div className='col-sm-4 fixed' >{t('city') + " : " + (pendingLoans.length>0?first.city:'')}</div>
                    }
                    {!cityselected && <div className='col-sm-4 fixed' >{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
                    }
                    {!cityselected && <div className='flex col-sm-4 fixed' >{t("lineman") + " : " + (pendingLoans.length > 0 ? first.linemanname : "")}</div>
                    }
                    <div className='flex col-sm-4 fixed fw-bold' >{t("date") + " : " + dateFormatdd(datefrom) + " - " + dateFormatdd(dateto)}</div>
                </div>
                <Table className='table text-center fs-6 table-bordered border-dark'  >
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th style={{ fontSize: "12px" }}>
                                {t('no')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loannotooshort')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>
                            <th colSpan={2} style={{ fontSize: "12px" }}>
                                {t('fathername')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('address')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('phoneno')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                            <th style={{ fontSize: "12px" }}>{t('givenamount')}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageRecords && pageRecords.length > 0
                                ?
                                (pageRecords.map((customer, i) => {
                                    serialno = serialno + 1;
                                    return (
                                        <tr className='newaccountaddress'>
                                            <td></td>
                                            <td></td>
                                            <td style={{ fontSize: "12px" }}>{serialno}</td>
                                            <td className="fw-bold" style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }}>{Number(customer.relationtype) === 0 ? t('fathershort') : t('husbandshort')}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.fathername}</td>
                                            <td style={{ fontSize: "12px" }} className='overflow-hidden'>{customer.address}</td>
                                            <td style={{ fontSize: "12px", wordWrap: "break-all", padding: "0px", margin: "0px" }}>{customer.mobileno}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.referencecity}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.totalamount}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    )
                                })
                                )
                                :
                                t('tabledata')
                        }

                    </tbody>

                </Table>
                {!isLastPage && <div style={{ pageBreakAfter: "always" }} ><div style={{ paddingTop: "20px" }}></div></div>}

            </Fragment >
        )
    }
    return (
        <div>
            {(!isPrinting) ?
                (<div>{renderPage(currentPage)}
                    <Pagination>
                        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item
                                key={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}
                            >{i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                    </Pagination>
                </div>)
                : (<div>{Array.from({ length: totalPages }, (_, i) => renderPage(i + 1))}</div>)
            }
        </div>
    );
}

export default NewAccountDetails
