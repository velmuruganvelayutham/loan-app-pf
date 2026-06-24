import React, { Fragment, useState, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
import { isCitywsieEnabled } from '../utils/constant';

var first = [];


const CurrentWeekGivenAmount = ({ pendingLoans, datefrom, dateto, isPrinting, lineman, bond,cityselected }) => {

    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
    const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);
    var serialno = 0;

    const renderPage = (page) => {
        var pagetotalgiven = 0;
        var pagetotalamount = 0;
        var pagetotaldocument = 0;
        var pagetotalinterest = 0;
        var totalgiven = 0;
        var totalamount = 0;
        var totaldocument = 0;
        var totalinterest = 0;

        const startIndex = (page - 1) * recordsPerPage;
        const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);
        const isLastPage = page === totalPages;
        first = pageRecords.length > 0 ? pendingLoans[0] : "";
        serialno = startIndex;
        if (isLastPage) {
            totalgiven = pendingLoans.reduce((previous, current) => {
                return previous + current.givenamount;
            }, 0);
            totaldocument = pendingLoans.reduce((previous, current) => {
                return previous + current.documentamount;
            }, 0);
            totalinterest = pendingLoans.reduce((previous, current) => {
                return previous + current.interestamount;
            }, 0);
            totalamount = pendingLoans.reduce((previous, current) => {
                return previous + current.totalamount;
            }, 0);
        }
        return (
            <Fragment>
                <div style={{ display: "flex" }}>
                    <div className='col-sm-12 fixed text-center mt-5'><h3>{t('currentweekamountgiven')}</h3></div>
                </div>
                {lineman !== "" && <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <div className='col-sm-4 fixed' style={{ paddingLeft: "20px" }}>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>
                    <div className='col-sm-4 fixed'>{t("lineman") + " : " + (pendingLoans.length > 0 ? first.linemanname : "")}</div>
                    <div className='col-sm-4 fixed fw-bold'>{t("date") + " : " + dateFormatdd(datefrom) + " - " + dateFormatdd(dateto)}</div>
                </div>
                }
                {cityselected && <div style={{ display: "flex", paddingLeft: "10px" }}>
                    <div className='col-sm-4 fixed' style={{ paddingLeft: "20px" }}>{t('city') + " : " + (pendingLoans.length > 0 ? first.city : "")}</div>
                    <div className='col-sm-4 fixed'>{t("lineman") + " : " + (pendingLoans.length > 0 ? first.linemanname : "")}</div>
                    <div className='col-sm-4 fixed fw-bold'>{t("date") + " : " + dateFormatdd(datefrom) + " - " + dateFormatdd(dateto)}</div>
                </div>
                }
                <Table className='table text-center fs-6 table-bordered border-dark' style={{ width: "103%" }} >
                    <thead>
                        <tr>
                            <th style={{ width: "1%" }}></th>
                            <th style={{ fontSize: "12px" }}>
                                {t('no')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('givendate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('loannotooshort')}
                            </th>
                            <th>{t('doc')}</th>
                            {bond && (<><th style={{ fontSize: "12px" }}>{t('bond')}</th>
                                <th style={{ fontSize: "12px" }}>{t('cheque')}</th></>)}

                            <th style={{ fontSize: "12px" }}>
                                {t('customer')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('city')}</th>
                            <th style={{ fontSize: "12px", width: "60px" }} className='w-5'>
                                {t('booknomedium')}
                            </th>
                            <th style={{ fontSize: "12px" }}>
                                {t('enddate')}
                            </th>
                            <th style={{ fontSize: "12px" }}>{t('givenamount')}</th>
                            <th style={{ fontSize: "12px" }}>{t('doc')}</th>
                            <th style={{ fontSize: "12px" }}>{t('interest')}</th>
                            <th style={{ fontSize: "12px" }}>{t('total')}</th>
                            <th style={{ fontSize: "12px" }}>{t('week')}</th>
                            <th style={{ fontSize: "12px", textAlign: "left" }}>{t('pay')}</th>
                            <th style={{ width: "1.5%" }}></th>
                            <th style={{ width: "2.5%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageRecords && pageRecords.length > 0
                                ?
                                (pageRecords.map((customer, i) => {
                                    serialno = serialno + 1;
                                    pagetotalgiven = pagetotalgiven + customer.givenamount;
                                    pagetotaldocument = pagetotaldocument + customer.documentamount;
                                    pagetotalinterest = pagetotalinterest + customer.interestamount;
                                    pagetotalamount = pagetotalamount + customer.totalamount;
                                    return (
                                        <tr className='currentweekamount'>

                                            <td></td>
                                            <td style={{ fontSize: "12px" }}>{serialno}</td>
                                            <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.givendate)}</td>
                                            <td className="fw-bold" style={{ fontSize: "12px" }}>{customer.loannumber}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.document}</td>
                                            {bond && <><td style={{ fontSize: "12px" }}>{customer.bond}</td>
                                                <td style={{ fontSize: "12px" }}>{customer.cheque}</td></>}
                                            <td style={{ fontSize: "12px" }}>{customer.customer}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.referencecity}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.bookno}</td>
                                            <td style={{ fontSize: "12px" }}>{dateFormatdd(customer.finisheddate)}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.givenamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.documentamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.interestamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.totalamount}</td>
                                            <td style={{ fontSize: "12px" }}>{customer.weekcount}</td>
                                            <td style={{ fontSize: "12px", textAlign: "left" }}>{customer.dueamount}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    )
                                })
                                )
                                :
                                t('tabledata')
                        }
                        <tr className='currentweekamount'>

                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {bond && <><td></td><td></td></>}
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{t('pagetotal')}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalgiven}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotaldocument}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalinterest}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{pagetotalamount}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                    {
                        isLastPage ? <tr className="rounded bg-white currentweekamount">

                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {bond && <><td></td><td></td></>}
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{t('total')}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalgiven}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totaldocument}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalinterest}</td>
                            <td className='fw-bold' style={{ fontSize: "12px" }}>{totalamount}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> : null
                    }
                </Table>
                {!isLastPage && <div style={{ pageBreakAfter: "always" }} ><div style={{ paddingTop: "20px" }}></div></div>}


            </Fragment>
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
export default CurrentWeekGivenAmount
