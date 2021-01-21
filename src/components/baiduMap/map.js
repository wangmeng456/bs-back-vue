export function MP(ak) {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(BMap)
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
        script.onerror = reject;
        var script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.src = "https://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js";
        // script.src="https://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js"
        document.head.appendChild(script);
        document.head.appendChild(script1);
    })
}