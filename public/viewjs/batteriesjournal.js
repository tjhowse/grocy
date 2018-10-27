﻿var batteriesJournalTable = $('#batteries-journal-table').DataTable({
	'paginate': true,
	'order': [[1, 'desc']],
	'columnDefs': [
		{ 'orderable': false, 'targets': 0 }
	],
	'language': JSON.parse(L('datatables_localization')),
	'scrollY': false,
	'colReorder': true,
	'stateSave': true,
	'stateSaveParams': function(settings, data)
	{
		data.search.search = "";

		data.columns.forEach(column =>
		{
			column.search.search = "";
		});
	}
});

$("#battery-filter").on("change", function()
{
	var value = $(this).val();
	var text = $("#battery-filter option:selected").text();
	if (value === "all")
	{
		text = "";
	}
	
	batteriesJournalTable.column(1).search(text).draw();
});

$("#search").on("keyup", function()
{
	var value = $(this).val();
	if (value === "all")
	{
		value = "";
	}
	
	batteriesJournalTable.search(value).draw();
});

if (typeof GetUriParam("battery") !== "undefined")
{
	$("#battery-filter").val(GetUriParam("battery"));
	$("#battery-filter").trigger("change");
}

$(document).on('click', '.undo-battery-execution-button', function(e)
{
	e.preventDefault();

	var element = $(e.currentTarget);
	var chargeCycleId = $(e.currentTarget).attr('data-charge-cycle-id');

	Grocy.Api.Get('batteries/undo-charge-cycle/' + chargeCycleId.toString(),
		function(result)
		{
			element.closest("tr").addClass("text-muted");
			element.closest(".undo-battery-execution-button").addClass("disabled");
			toastr.success(L("Charge cycle successfully undone"));
		},
		function(xhr)
		{
			console.error(xhr);
		}
	);
});