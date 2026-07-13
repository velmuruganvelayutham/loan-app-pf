import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { baseURL,isCitywsieEnabled } from "../utils/constant";
import { useTranslation } from "react-i18next";
import PlaceHolder from "../components/spinner/placeholder";
import { startOfWeek, endOfWeek } from '../FunctionsGlobal/StartDateFn';
import ListLineChecking from "./ListLineChecking";
import CitywiseList from "./CitywiseList";
import PreviousWeekList from "./PreviousWeekList"
import NewAccountDetails from "./NewAccountDetails";
import WeekEndAccountDetails from "./WeekEndAccountDetails";
import CurrentWeekGivenAmount from "./CurrentWeekGivenAmount";
import ReactToPrint from 'react-to-print';
import PendingAccounts from "./PendingAccounts.js";
import DailyRecords from "./DailyRecords";
import Select from "react-select";

import {
    useAuth
} from "@clerk/clerk-react";
import NotRunningAccounts from "./NotRunningAccounts.js";
import WeekEndNewAccounts from "./WeekEndNewAccounts.js";

var linecheckingreportname = "checkingdetails";
var passingargument = "";
function LinecheckingReport() {
    const { getToken } = useAuth();
    const [lineNames, setLineNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [checkingDetailsLine, setCheckingDetailsLine] = useState([]);
    const [checkingData, setCheckingData] = useState([]);
    const [company, setCompany] = useState([]);
    const [linemannames, setLinemanNames] = useState([]);
    const reportType = useRef(0);
    const { t } = useTranslation();
    const [line, setLine] = useState("");
    const startDateRef = useRef(startOfWeek());
    const endDateRef = useRef(endOfWeek());
    const [printDateRef, setPrintDateRef] = useState(startOfWeek())
    const linemanoptionRef = useRef("");
    const [show, setShow] = useState(false);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    
    const [linemannameday, setLineManNameDay] = useState("");
    const [linemanlineno, setLineManLineno] = useState("");
    const [isPrinting, setIsPrinting] = useState(false);
    const bookRef = useRef(null);
    const componentRef = useRef(null);
    const radioRef = useRef(null);
    const cityRef = useRef(null);
    
      const asyncSelectRef = useRef(null);
      useEffect(() => {
        const preloadCities = async () => {
          setIsLoading(true); // Start loading
          try {
            const token = await getToken(); // Fetch token
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // Fetch city data
            //const response = await axios.get(`${baseURL}/citycreate/gettwenty?q=`);
            const response = await axios.get(`${baseURL}/citycreate/get?q=`);
            const data = response.data.map((city) => ({
              value: city._id,
              label: city.cityname,
            }));
    
            // Update state and cache the result
            setCityOptions(data);
    
            setErrorMessage("");
            setIsLoading(false);
          } catch (error) {
            console.log("error=", error);
            setErrorMessage(t('errormessagecity'));
            setIsLoading(false);
          } finally {
            setIsLoading(false); // Stop loading
          }
        };
    
        preloadCities();
      }, [getToken]); // Add dependencies if these values could change
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.get(`${baseURL}/company/get`).then((res) => {
                setCompany(res.data);
                setIsLoading(false);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errorcompany'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [getToken])
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get`).then((res) => {
                setLinemanNames(res.data);
                setIsLoading(false);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagelineman'));
                setIsLoading(false)
            })
        }
        fetchData();
    }, [getToken])
    useEffect(() => {

        async function fetchData() {
            setIsLoading(true);
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${baseURL}/linemancreate/get/lines`).then((res) => {
                setLineNames(res.data);
                setIsLoading(false);
            }).catch(error => {
                console.log("error=", error);
                setErrorMessage(t('errormessagecity'));
                setIsLoading(false);
            })
        }
        fetchData();
    }, [getToken])
    const processList = async () => {
        if (Number(reportType.current.value) !== 5) {
            setIsLoading(true);
            //alert(linemanoptionRef.current.value);
            //alert("muru");
            if (Number(reportType.current.value) === 0 || Number(reportType.current.value) === 10) {

                linecheckingreportname = "checkingdetails";
                passingargument = line;
            }
            else if (Number(reportType.current.value) === 1 || Number(reportType.current.value) === 9) {
                setCheckingData([]);
                linecheckingreportname = "previousweekdetails";
                passingargument = line;
                //alert(passingargument);
            }
            else if (Number(reportType.current.value) === 2) {
                setCheckingData([]);
                linecheckingreportname = "newaccountdetails";
                passingargument =!isCitywsieEnabled ?linemanoptionRef.current.value:null;
                //alert(passingargument);
            }
            else if (Number(reportType.current.value) === 4) {
                setCheckingData([]);
                linecheckingreportname = "weekendaccountdetails";
                passingargument =!isCitywsieEnabled ?linemanoptionRef.current.value:null;
            }
            else if (Number(reportType.current.value) === 3) {
                setCheckingData([]);
                linecheckingreportname = "currentweekgivenamount";
                passingargument =!isCitywsieEnabled ?linemanoptionRef.current.value:null;
            }
            else if (Number(reportType.current.value) === 6) {

                setCheckingData([]);
                linecheckingreportname = "notrunningaccounts";
                passingargument =!isCitywsieEnabled ?linemanoptionRef.current.value:null;
            }
            else if (Number(reportType.current.value) === 7) {
                setCheckingData([]);
                linecheckingreportname = "pendingaccounts";
                passingargument =!isCitywsieEnabled ?linemanoptionRef.current.value:null;
            }
            else if (Number(reportType.current.value) === 8) {
                setCheckingData([]);
                linecheckingreportname = "weekendnewdetails";
                passingargument =!isCitywsieEnabled ?linemanoptionRef.current.value:null;
            }
            //alert("muru");
            //alert(selectedCity);
            
            const token = await getToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return (
                axios.get(`${baseURL}/loan/${linecheckingreportname}`, {
                    params: {
                        city_id: selectedCity?null:passingargument.toString(),
                        fromdate: startDateRef.current.value, todate: endDateRef.current.value,
                        bookno:!isCitywsieEnabled ? Number(bookRef.current.value) : 0,
                        cityid: selectedCity ? selectedCity.value : null,
                        reporttype:Number(reportType.current.value),
                        document: Number(radioRef.current.querySelector('input[name="option"]:checked').value)
                    }
                }).then((res) => {
                    //console.log(res.data);
                    Number(reportType.current.value) === 0 || Number(reportType.current.value) === 10 ? setCheckingData(res.data) : setCheckingDetailsLine(res.data)

                    setIsLoading(false);

                })
                    .catch(error => {
                        console.log("error=", error);
                        setErrorMessage(t('erroressagelinechecking'));
                        setIsLoading(false);
                    })
            )

        }

    }

    const handlePrintAll = () => {
        if (Number(reportType.current.value) === 5) {

            window.print();
        }
        else {
            setIsPrinting(true); // Enable print mode
            setTimeout(() => {
                window.print(); // Trigger browser print dialog
                setIsPrinting(false); // Disable print mode after printing
            }, 2000); // Give some time for the render to complete
        }

    };
    const handleChange = (selected) => {
    if (selected) {
      setSelectedCity(selected);
      //cityRef.current.value = selected.label;
    }
    else {
      setSelectedCity(selected);
    }

  };

    const renderLineCheckingList = (
        <Row ref={componentRef}>
            <ListLineChecking pendingLoans={Number(reportType.current.value) === 0 ? checkingData : checkingDetailsLine} date={endDateRef.current.value}
                company={company.length > 0 ? company[0].companyname : ""} isPrinting={isPrinting} bookno={bookRef.current ? bookRef.current.value : ""} lineno={line} bond={radioRef.current ? Number(radioRef.current.querySelector('input[name="option"]:checked').value) === 4 ? true : false : false} />

        </Row>

    )

    const renderpreviousweekList = (
        <Row ref={componentRef}>
            <PreviousWeekList pendingLoans={checkingDetailsLine} date={endDateRef.current.value}
                company={company.length > 0 ? company[0].companyname : ""} isPrinting={isPrinting} reporttype={Number(reportType.current.value)} cityselected={isCitywsieEnabled && selectedCity?true:false} />
        </Row>
    )
    const rendernewaccountList = (
        <Row ref={componentRef}>
            <NewAccountDetails pendingLoans={checkingDetailsLine} datefrom={startDateRef.current.value} dateto={endDateRef.current.value} isPrinting={isPrinting} cityselected={isCitywsieEnabled && selectedCity?true:false} />
        </Row>
    )
    const renderweekendaccountList = (
        <Row >
            <WeekEndAccountDetails pendingLoans={checkingDetailsLine} datefrom={startDateRef.current.value} dateto={endDateRef.current.value} isPrinting={isPrinting} lineman={linemanoptionRef.current ? linemanoptionRef.current.value : ""} bond={radioRef.current ? Number(radioRef.current.querySelector('input[name="option"]:checked').value) === 4 ? true : false : false} cityselected={isCitywsieEnabled && selectedCity?true:false} />
        </Row>
    )
    const rendercurrentweekgivenaccountList = (
        <Row ref={componentRef}>
            <CurrentWeekGivenAmount pendingLoans={checkingDetailsLine} datefrom={startDateRef.current.value} dateto={endDateRef.current.value} isPrinting={isPrinting} lineman={linemanoptionRef.current ? linemanoptionRef.current.value : ""} bond={radioRef.current ? Number(radioRef.current.querySelector('input[name="option"]:checked').value) === 4 ? true : false : false} cityselected={isCitywsieEnabled && selectedCity?true:false} />
        </Row>
    )
    const renderdailyrecords = (
        <Row ref={componentRef}>
            <DailyRecords datefrom={startDateRef.current.value} dateto={endDateRef.current.value} linemanname={linemannameday} linamnline={linemanlineno} collectiondate={printDateRef} cityselected={isCitywsieEnabled && selectedCity?true:false} />
        </Row>
    )

    const renderPendingAccountList = (
        <Row ref={componentRef}>
            <PendingAccounts pendingLoans={checkingDetailsLine} date={endDateRef.current.value}
                company={company.length > 0 ? company[0].companyname : ""} isPrinting={isPrinting} bookno={bookRef.current ? Number(bookRef.current.value) : ""} cityselected={isCitywsieEnabled && selectedCity?true:false}/>

        </Row>
    )
    const renderNotRunningAccountList = (
        <Row ref={componentRef}>
            <NotRunningAccounts pendingLoans={checkingDetailsLine} date={endDateRef.current.value}
                company={company.length > 0 ? company[0].companyname : ""} isPrinting={isPrinting} lineman={linemanoptionRef.current ? linemanoptionRef.current.value : ""} bond={radioRef.current ? Number(radioRef.current.querySelector('input[name="option"]:checked').value) === 4 ? true : false : false} cityselected={isCitywsieEnabled && selectedCity?true:false}/>

        </Row>
    )
    const renderWeekEndNewAccount = (
        <Row ref={componentRef}>
            <WeekEndNewAccounts pendingLoans={checkingDetailsLine} datefrom={startDateRef.current.value} dateto={endDateRef.current.value} isPrinting={isPrinting} lineman={linemanoptionRef.current ? linemanoptionRef.current.value : ""} bond={radioRef.current ? Number(radioRef.current.querySelector('input[name="option"]:checked').value) === 4 ? true : false : false} cityselected={isCitywsieEnabled && selectedCity?true:false} />
        </Row>
    )
    const rendercitywsielist = (
        <Row ref={componentRef}>
            <CitywiseList pendingLoans={Number(reportType.current.value) === 10 ? checkingData : checkingDetailsLine}  date={printDateRef} isPrinting={isPrinting} company={company.length > 0 ? company[0].companyname : ""}  cityselected={isCitywsieEnabled && selectedCity?true:false} />
        </Row>
    )
    const restoreLineman = (e) => {
        const filtered = linemannames.filter(lineman => {
            return lineman._id === e.target.value;
        })
        if (filtered.length > 0) {
            setLineManNameDay(filtered[0].linemanname);
            setLineManLineno(filtered[0].lineno);
        }
    }
    const linemanshow = (
        <Col xs={12} md={2} className="rounder bg-white " >
            <Form.Group className="mb-3" name="linenumber" border="primary" >
                <Form.Label>{t('lineman')}</Form.Label>
                <Form.Select aria-label="Default select example" value={line}
                    onChange={(e) => setLine(e.target.value)} ref={linemanoptionRef} onClick={restoreLineman}>
                    <option key={""} value={""} >{t('linemanplaceholder')}</option>

                    {
                        linemannames.map((linemanname) => (
                            <option key={linemanname._id} value={linemanname._id}
                                selected={linemanname._id} >{linemanname.linemanname}</option>
                        ))}

                </Form.Select>
            </Form.Group>
        </Col>

    )
    const citynameshow = (
        <Col xs={12} md={2} className="rounder bg-white">
            <Form.Group className="mb-3" name="linename" border="primary" >
                <Form.Label>{t('line')}</Form.Label>
                <Form.Select aria-label="Default select example" value={line}
                    onChange={(e) => setLine(e.target.value)} required>
                    <option key={""} value={""} >{t('lineplaceholder')}</option>

                    {
                        lineNames.map((lines) => (
                            <option key={lines._id} value={lines.lineno}
                                selected={lines.lineno} >{lines.linename}</option>
                        ))}

                </Form.Select>
            </Form.Group>
        </Col>
    )
    const handleClick = () => {

        if (Number(reportType.current.value) === 0 || Number(reportType.current.value) === 1 || Number(reportType.current.value) === 9) {
            setShow(false);
        }
        else {
            setShow(true)
        }

    }
    return (
        <Container >
            <Row>
                <Form ref={radioRef}>
                    <Row className="hide-on-print">
                        {show == true && !isCitywsieEnabled() ? linemanshow :! isCitywsieEnabled() ? citynameshow : null}
                        {!isCitywsieEnabled() && <Col xs={12} md={1} className="rounded bg-white">
                            <Form.Group className="mb-3" name="bookno" border="primary" >
                                <Form.Label>{t('bookno')}</Form.Label>{/*book no*/}
                                <Form.Control type="number" required ref={bookRef} />
                            </Form.Group>
                        </Col>}
                        {isCitywsieEnabled() && <Col xs={12} md={3} className="rounded bg-white">
                                      <Form.Group className="mb-3" name="cityname" border="primary" >
                                        <Form.Label>{t('city')}</Form.Label>
                                        <Select
                                          options={cityOptions}
                                          isLoading={isLoading}
                                          onChange={handleChange} // Handles selection
                                          placeholder={t('cityplaceholder')}
                                          value={selectedCity}
                                          isSearchable
                                          isClearable={true}
                                        />
                                      </Form.Group>
                                    </Col>}
                        <Col md={3} className="rounder bg-white">
                            <Form.Group className="mb-3" name="cityname" border="primary" >
                                <Form.Label>{t('report')}</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    ref={reportType} defaultValue={0} onClick={handleClick} >
                                    <option value={0} >{t('linechecking')}</option>
                                    <option value={1}>{t('previousweekreport')}</option>
                                    <option value={2}>{t('newaccountaddress')}</option>
                                    <option value={3}>{t('currentweekamountgiven')}</option>
                                    <option value={4}>{t('weekendaccounts')}</option>
                                    <option value={5}>{t('dailylist')}</option>
                                    <option value={6}>{t('notrunningaccounts')}</option>
                                    <option value={7}>{t('pendingaccounts')}</option>
                                    <option value={8}>{t('weenkendnewaccounts')}</option>
                                    <option value={9}>{t('latependingadvanceless')}</option>
                                    <option value={10}>{t('citywiselist')}</option>

                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounded bg-white">
                            <Form.Group>
                                <Form.Label>{t('startdate')}</Form.Label>
                                <Form.Control type="date" ref={startDateRef} defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounder bg-white">
                            <Form.Group>
                                <Form.Label>{t('enddate')}</Form.Label>
                                <Form.Control type="date" ref={endDateRef} defaultValue={endOfWeek()} />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="rounder bg-white">
                            <Form.Group>
                                <Form.Label>{t('printdate')}</Form.Label>
                                <Form.Control type="date" value={printDateRef} onChange={(e) => setPrintDateRef(e.target.value)} defaultValue={startOfWeek()} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="rounded bg-white text-center hide-on-print">
                        <Col className="col-md-4 mb-4 d-flex align-items-center gap-2" >
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={3} defaultChecked />
                                {t('all')}
                            </label>
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={1} />
                                {t('document')}
                            </label>{'  '}
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={4} />
                                {t('bondandcheque')}
                            </label>{'  '}
                            <label className="d-flex align-items-center" style={{ fontWeight: "600", fontSize: "11px" }}>
                                <input type="radio" name="option" value={2} />
                                {t('other')}
                            </label>
                        </Col>
                        <Col className="col-md-2 mb-4 " >
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={processList}>
                                {t('processbuttonlabel')}
                            </Button>
                        </Col>

                        <Col className="col-md-3 mb-4 " >
                            <Button variant="primary" size="lg" type="button" className="text-center" onClick={handlePrintAll}>
                                {t('printall')}
                            </Button>
                        </Col>
                        <Col className="col-md-3 mb-4 ">
                            <ReactToPrint trigger={() => (
                                <Button variant="primary" size="lg" type="button" className="text-center" onClick={() => handlePrintAll}>
                                    {t('dailylist')}
                                </Button>

                            )}
                                content={() => componentRef.current} />
                        </Col>

                    </Row>
                    <Row  >
                        {isLoading ? <PlaceHolder /> : Number(reportType.current.value) === 0 ?
                            renderLineCheckingList : Number(reportType.current.value) === 1 || Number(reportType.current.value) === 9 ?
                                renderpreviousweekList : Number(reportType.current.value) === 2 ?
                                    rendernewaccountList : Number(reportType.current.value) === 3 ?
                                        rendercurrentweekgivenaccountList : Number(reportType.current.value) === 4 ?
                                            renderweekendaccountList : Number(reportType.current.value) === 6 ?
                                                renderNotRunningAccountList : Number(reportType.current.value) === 7 ?
                                                    renderPendingAccountList : Number(reportType.current.value) === 8 ?
                                                        renderWeekEndNewAccount :Number(reportType.current.value) === 9?
                                                         renderdailyrecords:Number(reportType.current.value) === 10?
                                                         rendercitywsielist:null}
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </Row>

                </Form>
            </Row>
        </Container>
    )
}
export default LinecheckingReport;