const puppeteer = require('puppeteer');

let carCollection = '';
let data = [];

(async () => {
	const browser = await puppeteer.launch({ headless: false, devtools: true });
	const page = await browser.newPage();
	await page.goto(
		'https://www.manheim.com/publicauctions/vehicleList.do?auctionID=BWAE&saleDate=20201013&saleYear=2020&saleNumber=42&sortKey=1&sortDirection=asc&consignor=PCAP&consignor=REPO&consignor=PWFB'
	);
	await page.evaluate((carCollection) => {
		carCollection = document.getElementById('columnsFrame').children[4].children[2].children.length;
	}, carCollection);

	const button = await page.evaluateHandle(
		() => document.getElementById('columnsFrame').children[4].children[2].children[0].children[0]
	);
	await button.click();

	await page.waitFor(5000);
	await page.evaluate(() => {
		debugger;
	});

	await page.screenshot({ path: 'example.png' });

	await browser.close();
})();

//! document.getElementById('columnsFrame').children[4].children[2].children.length --> table containig all cars
