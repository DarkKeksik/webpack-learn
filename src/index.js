import * as $ from "jquery";

import "@/styles/styles.css";
import "@/styles/check.less";
import "@/styles/check.scss";
import logo from "@/assets/logo.svg";
import testJson from "@/checkJson.json";
import deepComponents from "@deepFolder/deepComponent";

console.log(testJson);
console.log(logo);
console.log(deepComponents);

$(".logo").hide().slideDown();