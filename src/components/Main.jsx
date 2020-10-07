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

	await page.evaluate((data) => {
		let gallery = [];
		let gallerySize = document.getElementById('smlImageSet').children[3].children.length;
		for (let i = 0; i < gallerySize; i++) {
			gallery.push(document.getElementById('smlImageSet').children[3].children[i].children[0].children[0].src);
		}
		data = [
			{
				year: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[0]
					.children[1].innerText,
				vin: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[0]
					.children[3].innerText,
				make: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[1]
					.children[1].innerText,
				bodyStyle: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[1]
					.children[3].innerText,
				model: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[2]
					.children[1].innerText,
				odometer: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[4]
					.children[1].innerText,
				trans: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[6]
					.children[1].innerText,
				exColor: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[8]
					.children[1].innerText,
				gallery: gallery
			}
		];
	}, data);

	const button2 = await page.evaluateHandle(() => document.getElementById('callout').children[0]);
	await button2.click();

	await page.waitFor(5000);
	await page.evaluate(() => {
		debugger;
	});

	await page.screenshot({ path: 'example.png' });

	await browser.close();
})();

//! document.getElementById('columnsFrame').children[4].children[2].children.length --> table containig all cars
