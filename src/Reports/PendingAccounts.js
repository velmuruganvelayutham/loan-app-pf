import React, { Fragment, useEffect, useState, useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { dateFormatdd } from "../FunctionsGlobal/StartDateFn"
var first = [];

const PendingAccounts = ({ pendingLoans, date, company, isPrinting, bookno,cityselected }) => {

    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 35;
    const nPage = Math.ceil(Object.keys(pendingLoans).length / recordsPerPage);

    var serialno = 0;

    //first = records.length > 0 ? pendingLoans[0] : "";

    var pagetotal = 0;

    var pagepaid = 0;
    var pagetopay = 0;

    const totalPages = useMemo(() => Math.ceil(pendingLoans.length / recordsPerPage), [pendingLoans]);

    const totals = useMemo(() => {
        const total = pendingLoans.reduce((prev, current) => {
            return prev + current.totalamount
        }, 0);

       
        const topay = pendingLoans.reduce((prev, current) => {
            return prev + current.balance
        }, 0);
        return { total, topay }
    }, [pendingLoans]);





    const renderPage = (page) => {
        const startIndex = (page - 1) * recordsPerPage;

        const pageRecords = pendingLoans.slice(startIndex, startIndex + recordsPerPage);
        const isLastPage = page === totalPages;
        first = pendingLoans.length > 0 ? pendingLoans[0] : "";
        //calculation//
        //const totals = calculateTotals(pendingLoans);

        serialno = startIndex;
        return (
            <Fragment >
                <div style={{ display: "flex", alignItems: "center", paddingTop: page === 1 ? "5px" : "19px" }} className='print-margin' >
                    <div className='col-sm-6 fixed' >
                        <h4>{(company)}</h4>
                    </div>
                    <div className='col-sm-6 fixed'><h4>{t('pendingaccounts')}</h4></div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }} className='print-margin'>
                    {bookno  || cityselected ? <div className='col-sm-4 fixed' style={{ whiteSpace: "normal", wordWrap: "break-word" }} >{t('city') + " : " + first.city}</div> : null}
                    {!cityselected && <div className={bookno  ? 'col-sm-3 fixed' : 'col-sm-6 fixed'}>{t('customer') + " : " + first.linemanname}</div>}
                    {!cityselected && <div className={bookno ? 'col-sm-2 fixed' : 'col-sm-3 fixed'}>{t('line') + " : " + (pendingLoans.length > 0 ? first.lineno : "")}</div>}
                    {bookno && !cityselected ? <div className='col-sm-2 fixed'>{t("bookno") + " : " + (pendingLoans.length > 0 ? first.bookno : "")}</div> : null}
                    <div className={bookno || cityselected ? 'col-sm-2 fixed' : 'col-sm-3 fixed'}>{t("date") + " : " + dateFormatdd(date)}</div>
                </div>
                <Table className='table table-bordered border-dark linecheckingtable ' style={{ width: "103%" }}  >
                    <thead>
                        <tr>
                            <th style={{ fontSize: "11px", width: "1%" }}></th>
                            <th style={{ fontSize: "11px", width: "2.5%" }}>
                                {t('noshort')}
                            </th>
                            <th style={{ fontSize: "9px", width: "5%" }}>
                                {t('startdate')}
                            </th >
                            <th style={{ fontSize: "11px", width: "4%" }}>
                                {t('loannotooshort')}
                            </th>
                            <th style={{ fontSize: "11px", width: "8%" }} >
                                {t('customer')}
                            </th>
                            <th style={{ fontSize: "10px", width: "2%" }}></th>
                            <th style={{ fontSize: "10px", width: "7.5%" }} >
                                {t('fathername')}
                            </th>
                            <th style={{ fontSize: "11px", width: "5.5%" }} >
                                {t('address')}
                            </th>
                            <th style={{ fontSize: "11px", width: "5.5%" }}>
                                {t('city')}
                            </th>
                            <th style={{ fontSize: "11px", width: "6%" }}>
                                {t('phoneno')}
                            </th>
                            <th style={{ fontSize: "9px", width: "5%" }}>
                                {t('enddate')}
                            </th>
                            <th style={{ fontSize: "11px", width: "6%", textAlign: "center" }}>
                                {t('loanamount')}
                            </th>
                            <th style={{ fontSize: "11px", width: "4%", textAlign: "center" }}>
                                {t('dueshort')}
                            </th>
                            <th style={{ fontSize: "9px", width: "6%", textAlign: "left" }}>
                                {t('pending')}
                            </th>
                            <th style={{ fontSize: "9px", width: "2%", textAlign: "left",margin:"0" }}>
                                {t('pendingweek')}
                            </th>
                            <th style={{ fontSize: "11px", width: "1%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageRecords && pageRecords.length > 0
                                ?
                                (pageRecords.map((customer, i) => {
                                    serialno = serialno + 1;
                                    pagetotal = pagetotal + customer.totalamount;
                                    //pagepaid = pagepaid + customer.collectedTotal;
                                    pagetopay = pagetopay + customer.balance;
                                    //pagepaying = pagepaying + customer.payingamount;



                                    //if(customer['addFields'].receiptpendingweekafter >1 )


                                    return (
                                        <tr className='linechecking'>
                                            <td></td>
                                            <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden' id='nowidth'>{serialno}</td>
                                            <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.startdate)}</td>
                                            <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.loannumber}</td>
                                            <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{customer.customer}</td>
                                            <td style={{ fontSize: "11px", width: "1%" }} >{customer.relationtype == 0 ? t('fathershort') : t('husbandshort')}</td>
                                            <td style={{ fontSize: "11px", width: "12%" }} className='text-nowrap overflow-hidden'>{customer.fathername}</td>
                                            <td style={{ fontSize: "11px", overflow: "hidden" }} className='text-nowrap overflow-hidden'>{customer.address}</td>
                                            <td style={{ fontSize: "11px", overflow: "hidden" }} className='text-nowrap overflow-hidden'>{customer.referencecity}</td>
                                            <td style={{ fontSize: "12px", wordWrap: "break-word", padding: "0px", margin: "0px" }}>{customer.mobileno}</td>
                                            <td style={{ fontSize: "11px" }} className='text-nowrap overflow-hidden'>{dateFormatdd(customer.finisheddate)}</td>
                                            <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{customer.totalamount}</td>

                                            <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{customer.dueamount}</td>
                                            <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{customer.balance}</td>
                                            <td style={{ fontSize: "11px", textAlign: "center" }} className='text-nowrap overflow-hidden'>{customer.pendingweek}</td>
                                            <td></td>
                                        </tr>

                                    )
                                })
                                )
                                :
                                t('tabledata')
                        }
                        <tr className='linechecking'>

                            <td></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td></td>
                            <td ></td>
                            <td ></td>
                            <td ></td>
                            <td className='fw-bold' style={{ fontSize: "9px", textAlign: "left" }}>{t('pagetotal')}</td>
                            <td className='fw-bold' style={{ fontSize: "10px", textAlign: "center" }}>{pagetotal}</td>

                            <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}></td>
                            <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}>{pagetopay}</td>
                            <td className='fw-bold' style={{ fontSize: "11px", textAlign: "center" }}></td>
                            <td></td>
                        </tr>
                    </tbody>

                    {

                        isLastPage ? <tr className="rounded bg-white">

                            <td></td>
                            <td></td>
                            <td></td>
                            <td ></td>
                            <td ></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "right" }}>{t('totalcount')}</td>
                            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{totals.total}</td>

                            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}></td>
                            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}>{totals.topay}</td>
                            <td className='fw-bold' style={{ fontSize: "13px", textAlign: "center" }}></td>
                            <td></td>
                        </tr> : null
                    }

                </Table>
                {!isLastPage && <div style={{ pageBreakAfter: "always" }}></div>}
            </Fragment>
        );
    };
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
export default PendingAccounts;
