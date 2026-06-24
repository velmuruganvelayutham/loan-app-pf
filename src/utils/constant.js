export const baseURL = process.env.REACT_APP_LOAN_APP_BACKEND_API

export const isFeatureReceiptByImageEnabled = () => {
    if (Number(process.env.REACT_APP_IS_FEATURE_RECEIPT_BY_IMAGE_ENABLED) === 1) {
        //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", 1)
        return true;
    }
    if (Number(process.env.REACT_APP_IS_FEATURE_RECEIPT_BY_IMAGE_ENABLED) === 0) {
        //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", 0)
        return false;
    }
}
export const getDefaultWeekCount = () => {
    //console.log("REACT_APP_DEFAULT_WEEK_COUNT", process.env.REACT_APP_DEFAULT_WEEK_COUNT)

    if (Number(process.env.REACT_APP_DEFAULT_WEEK_COUNT) === 25) {
        //console.log("REACT_APP_DEFAULT_WEEK_COUNT", 25)
        return 25;
    }
    if (Number(process.env.REACT_APP_DEFAULT_WEEK_COUNT) === 24) {
        //console.log("REACT_APP_DEFAULT_WEEK_COUNT", 24)
        return 24;
    }
    if (Number(process.env.REACT_APP_DEFAULT_WEEK_COUNT) === 26) {
        //console.log("REACT_APP_DEFAULT_WEEK_COUNT", 24)
        return 26;
    }

}
export const isCitywsieEnabled = () => {
    return false;
}

export const isReadOnlyLoanNo = () => {

    //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", process.env.REACT_APP_DEFAULT_IS_LOAN_READONLY)
    if (Number(process.env.REACT_APP_DEFAULT_IS_LOAN_READONLY) === 1) {
        //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", 1)
        return true;
    }
    if (Number(process.env.REACT_APP_DEFAULT_IS_LOAN_READONLY) === 0) {
        //console.log("REACT_APP_DEFAULT_IS_LOAN_READONLY", 0)
        return false;
    }

}
