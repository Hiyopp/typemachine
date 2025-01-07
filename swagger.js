#!/usr/bin/env node
const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

let url = "https://api.stg.gistalk.gistory.me/api";
if(url.charAt(url.length - 1) === '/') url = url.substr(0, url.length - 1);
if(url.charAt(url.length - 1) != '#') url = url + "/#";

function promiseReturn(items) { //url 뒤에 붙는 path 정보 저장
  return new Promise((res, rej) => {
    res(items);
  });
}

const getDetailUrl = async() => {
  let pathId = [];

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.opblock-summary-path');

    pathId = await page.$$eval('.opblock-summary-path a', elems => {
      return elems.map((elem) => elem.getAttribute('href'));
    });

    await page.close();
    await browser.close();
  } catch (err) {
    console.error(err); 
  }

  return new Promise(async(res, rej) => {
    res(await promiseReturn(pathId));
  });
}

const getCode = async(num) => { //브라우저 실행 
  let codeString = {value: "", method: "", http: ""};

  try {
    const detailUrl = (await getDetailUrl())[num];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url + detailUrl.replace('#', ''));
    const divId = "#operations" + detailUrl.replace('#', '').replaceAll('/', '-');
    await page.waitForSelector('.responses-inner');

    const content = await page.content();
    const $ = cheerio.load(content);
    codeString.value = $('code').text(); //리퀘스트랑 레스폰스 구분하기..!
    codeString.method = $(`${divId} .opblock-summary-method`).text();
    codeString.http = $(`${divId} a`).text();

    await page.close();
    await browser.close();
  } catch (err) {
    console.error(err); 
  }

  return new Promise(async(res, rej) => {
    res(await promiseReturn(codeString));
  });
}

const swaggerString = async() => {return new Promise(async(res, rej) => {
  let list = [];
  for(let k = 0; k < (await getDetailUrl()).length; k++) {
    list[k] = await getCode(k); 
    //여러개의 브라우저를 실행하므로 시간이 오래걸린다. 
    //하나의 브라우저에서 swagger 내용이 담긴 버튼을 클릭하여 code 태그를 노출시키는 방법으로 개선할 수 있을 것 같다. 
  }
  res(await promiseReturn(list));
});}

(async() => {console.log(await swaggerString()); module.exports.read = swaggerString;})();