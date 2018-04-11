﻿var Grocy = { };

$(function()
{
	var menuItem = $('.nav').find("[data-nav-for-page='" + Grocy.ContentPage + "']");
	menuItem.addClass('active');

	$.timeago.settings.allowFuture = true;
	$('time.timeago').timeago();
});

Grocy.FetchJson = function(url, success, error)
{
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE)
		{
			if (xhr.status === 200)
			{
				if (success)
				{
					success(JSON.parse(xhr.responseText));
				}
			}
			else
			{
				if (error)
				{
					error(xhr);
				}
			}
		}
	};

	xhr.open('GET', url, true);
	xhr.send();
};

Grocy.PostJson = function(url, jsonData, success, error)
{
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE)
		{
			if (xhr.status === 200)
			{
				if (success)
				{
					success(JSON.parse(xhr.responseText));
				}
			}
			else
			{
				if (error)
				{
					error(xhr);
				}
			}
		}
	};

	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(jsonData));
};

Grocy.EmptyElementWhenMatches = function(selector, text)
{
	if ($(selector).text() === text)
	{
		$(selector).text('');
	}
};

String.prototype.contains = function(search)
{
	return this.toLowerCase().indexOf(search.toLowerCase()) !== -1;
};

Grocy.GetUriParam = function(key)
{
	var currentUri = decodeURIComponent(window.location.search.substring(1));
	var vars = currentUri.split('&');

	for (i = 0; i < vars.length; i++)
	{
		var currentParam = vars[i].split('=');

		if (currentParam[0] === key)
		{
			return currentParam[1] === undefined ? true : currentParam[1];
		}
	}
};

Grocy.Wait = function(ms)
{
	return new Promise(resolve => setTimeout(resolve, ms));
}