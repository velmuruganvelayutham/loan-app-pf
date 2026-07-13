import React, { Fragment, useState, useMemo } from 'react'
import { isCitywsieEnabled } from '../utils/constant'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
import { number } from 'react-i18next/icu.macro';

var first = [];


const CitywiseList = ({ pendingLoans, date, company, isPrinting,reporttype, cityselected }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
        const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);
        var serialno = 0;
        
    const renderPage = (page) => {
        var pagetotaldue = 0;
        var pagetotalcredit = 0;
        var pagetotalinstallmentamount = 0;
        var totalinstallment = 0;

        const startIndex = (page - 1) * recordsPerPage;
        const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);
        const totalPages = Math.ceil(pendingLoans.length / recordsPerPage);
        const isLastPage = page === totalPages;
        first = pageRecords.length > 0 ? pendingLoans[0] : "";
         serialno = startIndex;
        return (
            <Fragment>
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center", paddingTop: page === 1 ? "0px" : "15px" }} className='print-margin'>
                    <div className='col-sm-5 fixed mt-5' >
                        <h4>{(company)}</h4>
                    </div>
                    <div className='col-sm-7 fixed mt-5'><h4>{t('citywiselist')}</h4></div>
                </div>
                <div style={{ paddingLeft: "27px", display: "flex", alignItems: "center" }} className='print-margin'>
                    {cityselected && <div className='col-sm-4 fixed' >{t('city') + " : " + (pendingLoans.length > 0 ? first.referencecity : "")}</div>}
                    {!cityselected && <div className='col-sm-2 fixed' >{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>}
                    {!cityselected && <div className='col-sm-2 fixed'>{t("bookno") + " : " + (pendingLoans.length > 0 ? first.bookno : "")}</div>}
                    <div className='col-sm-2 fixed'>{t("date") + " : " + dateFormatdd(date)}</div>
                </div>

                <Table className='table text-center table-bordered border-dark linecheckingtable' style={{width:"103%"}}  >
                    <thead>
                        <tr>
                            <th style={{ fontSize: "11px", width: "1%" }}></th>
                            <th style={{ fontSize: "12px",width:"5%" }}>{t('noshort')}</th>
                            <th style={{ fontSize: "12px",width:"6%" }}>
                                {t('loanno')}
                            </th>
                            <th style={{ fontSize: "11px",width:"12%" }}>{t('customer')}</th>
                            <th style={{ fontSize: "11px",width:"8%" }}>{t('due')}</th>
                            <th style={{ fontSize: "11px",width:"8%" }}>{t('weekno')}</th>
                            <th style={{ fontSize: "11px",width:"9%" }}>{t('amount')}</th>
                            <th style={{ fontSize: "11px", width: "1%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageRecords && pageRecords.length > 0
                                ?
                                (pageRecords.map((customer, i) => {
                                    serialno = serialno + 1;
                                     return (
                                        <tr className='previousweek'>
                                            
                                            <td></td>
                                            <td style={{ fontSize: "12px" }} className='text-nowrap overflow-hidden'>{serialno}</td>
                                            <td style={{ fontSize: "12px" }} className='text-nowrap overflow-hidden'>{(customer.loannumber)}</td>
                                            <td style={{ fontSize: "12px" }} className='text-nowrap overflow-hidden'>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }} className='text-nowrap overflow-hidden'>{customer.dueamount}</td>
                                            <td style={{ fontSize: "12px" }} className='text-nowrap overflow-hidden'></td>
                                            <td style={{ fontSize: "12px" }} className='text-nowrap overflow-hidden'></td>
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
            </Fragment>
        );
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
export default CitywiseList;
