function isArray(arr) {
    return arr instanceof Array;
}

function isFunction(fn) {
    return fn instanceof Function;
}


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    let type = Object.prototype.toString.call(src);
    var result = null;
    if (type.includes("[object Array]")) {
        result = [];
        for (let i = 0; i < src.length; i++) {
            result.push(src[i]);
        }
    } else if (type.includes("[object Number]") ||
        type.includes("[object Null]") ||
        type.includes("[object Undefined]") ||
        type.includes("[object Boolean]") ||
        type.includes("[object Date]")) {
        result = src;
    } else if (type.includes("[object String]")) {
        result = "";
        for (let i = 0; i < src.length; i++) {
            result += src[i];
        }
    } else if (type.includes("[object Object]")) {
        result = {};
        let keys = Object.keys(src);
        for (let i = 0; i < keys.length; i++) {
            result[keys[i]] = cloneObject(src[keys[i]]);
        }
    }
    return result;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    let h = {};
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!h[arr[i]]) {
            newArr.push(arr[i]);
            h[arr[i]] = 1;
        }
    }
    return newArr;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    let i = 0, j = str.length - 1;
    while (str[i].charCodeAt() === 32 || str[j].charCodeAt() === 32) {
        if (str[i].charCodeAt() === 32) {
            str = str.substring(1, str.length);
            j = str.length - 1;
        }
        if (str[j].charCodeAt() === 32) {
            str = str.substring(0, --j);
        }
    }
    return str;
}

// 半角空格的ASCII码为32，从字符串两端同时开始检查，若为空格则移除

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    let email = /^(\w+)@(\w+[-\w]*\w+\.){1,63}([a-z]+)$/;
    return email.test(emailStr);
}

//^(\w+)匹配邮箱开头部分
//{1,63}匹配63级域名
//邮箱结尾部分为小写字母，所以用[a-z]

// 判断是否为手机号
function isMobilePhone(phone) {
    let tel = /^（\+\d{1,4}）?\d{7,11}$/;
    return tel.test(phone);
}

//区号至少1位，至多4位
//电话号码至少七位，至多14位

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        fn(arr[i], i);
    }
    return null;
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];

function output(item) {
    console.log(item)
}

each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];

function output(item, index) {
    console.log(index + ': ' + item)
}

each(arr, output);  // 0:java, 1:c, 2:php, 3:html

//函数的参数在内部用一个数组表示，不关心传递了几个参数
//each 函数中传入了 arr[i] 和 i 两个参数
//第一个 output 调用时只使用了 arr[i]
//第二个 output 调用时使用了 arr[i] 和 i

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj));

//Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组


//DOM
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    let oldClassName = element.className;
    element.className = oldClassName === "" ? newClassName :
        oldClassName + " " + newClassName;
    return null;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var allClassName = element.className;
    var reg = new RegExp("\\b" + oldClassName + "\\b");
    element.className = allClassName.replace(reg, "");
}

//用正则表达式匹配，\b确定边界

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentElement === siblingNode.parentElement;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // let viewWidth = document.documentElement.clientWidth;
    // let viewHeight = document.documentElement.clientHeight;
    let left = element.offsetLeft;
    let top = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null) {
        left += current.offsetLeft;
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return "(" + left + "," + top + ")";
}

//offsetParent 提供相对于父元素的偏移量,不断向父级找，直到html

// 实现一个简单的Query(未完成)
function $(selector) {
    if (typeof selector !== "string") {
        alert("请输入字符串");
        return;
    }
    let arr = selector.split(/\s+/);
    let len = arr.length;
    let pattern = {
        idReg: {reg: /^#[a-zA-z]+\w*$/, type: "id"},
        classReg: {reg: /^\.[a-zA-z]+\w*$/, type: "class"},
        attrReg: {reg: /^\[[a-z]+(-[a-z]+)*(=['"]\w+['"])?]$/, type: "attr"},
        tagReg: {reg: /^[a-zA-z]+\w*$/, type: "tag"}
    };
    let typeArr = [];
    for (let i = 0; i < len; i++) {
        let type = testTypes(arr[i], pattern);
        if (type === null) {
            console.log("请输入正确的格式");
            return;
        }
        typeArr.push(type);
    }
    let element = null;

    for (let i = 0; i < len; i++) {
        switch (typeArr[i]) {
            case "id" :
                element = document.getElementById(arr[i]);
                break;
            case "class" :
                element = document.getElementsByClassName(arr[i])[0];
                break;
            case "attr" :

                break;
            case "tag" :
                element = document.getElementsByTagName(arr[i])[0];
        }
    }
}

function testTypes(item, pattern) {
    for (let key in pattern) {
        if (pattern[key].reg.test(item)) {
            return pattern[key].type;
        }
    }
    return null;
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time='2015']"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象





//4.事件
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, true);
    }
}

//查了犀牛书，addEventListener() 接受三个参数，注册的事件类型，发生时应该调用的函数，和一个布尔值，一般为false，可忽略
//removeEventListener() 同样接受三个参数，注册的事件类型，移除的事件函数，和一个布尔值，一般为true

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function (e) {
        if (e.keyCode === 13) {
            listener();
        }
    })
}

//事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (event) {
        let target = event.target || event.srcElement;
        if (target.tagName.toLowerCase() === tag.toLowerCase()) {
            listener.call(target, event);
        }
    })
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
        let patIE = /MSIE (\\d+\\d+);/;
        patIE.test(userAgent);
        let IEver = parseFloat(patIE["&1"]);
        if(IEver === 7) {
            return 7;
        } else if(IEver === 8) {
            return 8;
        } else if(IEver === 9) {
            return 9;
        } else if(IEver === 10) {
            return 10;
        } else {
            return 6;
        }
    } else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    let cookie = cookieName + "=" + encodeURIComponent(cookieValue);
    if (typeof expiredays === "number") {
        cookie += "; max-age=" + (expiredays * 60 * 60 * 24);
        document.cookie = cookie;
    }
}

// 获取cookie值
function getCookie(cookieName) {
    let cookie = {};
    let all = document.cookie;
    if (all === "") return cookie;
    let list = all.split("; ");
    for (let i = 0; i < list.length; i++) {
        let cookie = list[i];
        let p = cookie.indexOf("=");
        let name = cookie.substring(0, p);
        let value = cookie.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
