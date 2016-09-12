"use strict;"

class QuoteService {
	constructor(ticker) {
		this.ticker = ticker;
	}
	getQuote() {
		return $.ajax({
			url: "http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp",
			type: "GET",
			dataType: "jsonp",
			data: {
				symbol: this.ticker
			}
		});
	}
}