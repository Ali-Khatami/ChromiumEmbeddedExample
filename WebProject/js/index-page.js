var indexPage = (function () {

	// this is private, due to it being wrapped in the closure
	var symbols = ["AAPL", "INFO", "MSFT", "GOOGL", "FB", "TSLA"];
	var serviceBySymbol = {};

	var IndexPageProtype = function () {
		this.dataPointsToSkipInRender = {"Name":true,"Status":true, "Symbol": true, "Timestamp": true};
	};

	IndexPageProtype.prototype.init = function () {
		this.createServices();
		this.createHtmlInstances();
		this.getQuotes();
	};

	IndexPageProtype.prototype.createServices = function () {
		// create quote serviceInstances
		for (var i = 0; i < symbols.length; i++)
		{
			var symbol = symbols[i];
			serviceBySymbol[symbol] = new QuoteService(symbol);
		}
	};

	IndexPageProtype.prototype.createHtmlInstances = function () {
		var $comparisonsRow = $("#CompanyComparisonsRow");
		var $companyCard = $("section.company-card:first");

		for (var symbol in serviceBySymbol) {
			// clone the existing company card
			var $clone = $companyCard.clone();

			// set the symbol data attribute so we can look it up later
			$clone.attr("data-symbol", symbol);

			// add the clone to the row
			$comparisonsRow.append($clone);
		}

		// remove the template company card
		$companyCard.remove();
	};

	IndexPageProtype.prototype.getQuotes = function () {
		for (var symbol in serviceBySymbol)
		{
			serviceBySymbol[symbol].getQuote()
				.done($.proxy(this.handleQuoteSuccess, this, symbol));
		}
	};

	// jsonp .fail isn't happening for some reason. Will look at this later.
	IndexPageProtype.prototype.handleQuoteError = function (symbol) {
		var $companyCard = $("section.company-card[data-symbol='" + symbol + "']:first");

		$companyCard.find(".panel-body:first").html('<div class="bg-danger">Something went wrong getting data for ' + symbol + '</div>');
	};

	IndexPageProtype.prototype.handleQuoteSuccess = function (symbol, data) {
		var $companyCard = $("section.company-card[data-symbol='" + symbol + "']:first");

		$companyCard.find(".company-name").html(data.Name).append(" <span>(" + data.Symbol + ")</span>");

		var $tbody = $companyCard.find("tbody");

		for (var property in data)
		{
			// skip whatever was defined above
			if (this.dataPointsToSkipInRender[property]) { continue; }

			var $tr = $("<tr></tr>");
			$tr.append("<th>" + property + "</th>");

			var dataValue = data[property];
			if (!isNaN(dataValue))
			{
				dataValue = numeral(dataValue).format('0,0.00');
			}
			$tr.append("<td>" + dataValue + "</td>");

			$tbody.append($tr);
		}
	};

	return new IndexPageProtype();

})();

$(function () {
	indexPage.init();
});