import * as $ from "jquery";
const counter = () => {
    let count = 0;
    return () => count++;
}
let countOnBody = counter();

$( document ).on("click", function () {
    console.log(`Analytics ${ countOnBody() }`);
});