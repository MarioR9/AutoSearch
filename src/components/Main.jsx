const puppeteer = require('puppeteer');

let carCollection = '';
let data = []; //collects car divs

/* ? auyo search and connec to craigsts for price check?*/

(async () => {
	const browser = await puppeteer.launch({ headless: false, devtools: true });
	const page = await browser.newPage();
	await page.goto(
		'https://www.manheim.com/publicauctions/vehicleList.do?auctionID=BWAE&saleDate=20201013&saleYear=2020&saleNumber=42&sortKey=1&sortDirection=asc&consignor=PCAP&consignor=REPO&consignor=PWFB'
	);
	await page.evaluate((carCollection) => {
		console.log(carCollection)
		carCollection = document.getElementById('columnsFrame').children[4].children[2].children.length;
	}, carCollection);
	
	await page.waitFor(2500);
	for (let x = 0; x < carCollection; x++) {
		debugger;
		await page.evaluate((x) => {
			document.getElementById('columnsFrame').children[4].children[2].children[x].children[0].click();  // asyc issue x undefined
		}, x);
		await page.waitFor(1500);
		let result = await page.evaluate((data) => {
			let gallery = [];
			let gallerySize = document.getElementById('smlImageSet').children[3].children.length;
			for (let i = 0; i < gallerySize; i++) {
				gallery.push(
					document.getElementById('smlImageSet').children[3].children[i].children[0].children[0].src
				);
			}
			data.push([
				{
					////////////////////////////////////////////////////////////////////////////////////////////////////
					collects detaisl of each car auto update
					////////////////////////////////////////////////////////////////////////////////////////////////////
					
					year: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[0]
						.children[1].innerText,
					vin: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[0]
						.children[3].innerText,
					make: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[1]
						.children[1].innerText,
					bodyStyle: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1]
						.children[1].children[3].innerText,
					model: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[2]
						.children[1].innerText,
					odometer: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1]
						.children[4].children[1].innerText,
					trans: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1].children[6]
						.children[1].innerText,
					exColor: document.getElementsByClassName('vehTab_detail_specs')[0].children[0].children[1]
						.children[8].children[1].innerText,
					gallery: gallery
				}
			]);

			return data;
		}, data);

		await page.waitFor(1500);
		await page.evaluate((result) => {
			console.log(result);
			debugger;
		}, result);
	}
	await browser.close();
})();
