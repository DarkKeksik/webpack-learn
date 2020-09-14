import * as $ from "jquery";

import "@/styles/styles.css";
import "@/styles/check.less";
import "@/styles/check.scss";

import logo from "@/assets/logo.svg";
import testJson from "@/checkJson.json";
import deepComponents from "@deepFolder/deepComponent";

import React from "react";
import {render} from "react-dom";


// console.log(testJson);
// console.log(logo);
// console.log(deepComponents);


$(".logo").hide().slideDown();
const App = () => <div className="reactApp">Hello i react app!</div>;
render(<App/>, document.getElementById("reactApp"))