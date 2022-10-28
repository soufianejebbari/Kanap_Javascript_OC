const getParamFromUrl = (url, param) => {
    let newUrl = new URL(url);
    let searchParams = new URLSearchParams(newUrl.search);
    let paramValue = searchParams.get(param);
    return paramValue;
}

let windowUrl = window.location.href;
let orderId = getParamFromUrl(windowUrl, "id");

document.getElementById("orderId").innerHTML = orderId;