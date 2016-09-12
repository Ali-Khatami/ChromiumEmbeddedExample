$(function () {
	
	console.debug("Initializing QuoteService...");

	var aaplQuoteService = new QuoteService("AAPL");

	console.debug("Getting quote...");
	aaplQuoteService.getQuote().fail(function () {
		console.error("something went wrong");
	}).done(function (data) {
		console.debug("Quote successful", data);
	});
});