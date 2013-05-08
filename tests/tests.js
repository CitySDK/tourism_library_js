/**
 * COPYRIGHT NOTICE:
 *
 * This file is part of CitySDK WP5 Tourism JavaScript Client Library.
 *
 * CitySDK WP5 Tourism Library is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CitySDK WP5 Tourism Library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with CitySDK WP5 Tourism Library. If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2013 IST
 */

 var uri = 'http://polar-lowlands-9873.herokuapp.com/?list=backend',
 categories = ['alojamento', 'hoteis', 'hostel', 'motel', 'musica'];
 poisList = ['http://polar-lowlands-9873.herokuapp.com/v1/poi/1', 
 'http://polar-lowlands-9873.herokuapp.com/v1/poi/2', 
 'http://polar-lowlands-9873.herokuapp.com/v1/poi/3', 
 'http://polar-lowlands-9873.herokuapp.com/v1/poi/4', 
 'http://polar-lowlands-9873.herokuapp.com/v1/poi/5',
 'http://polar-lowlands-9873.herokuapp.com/v1/poi/6'],
 langList = ['pt', 'en'],
 reader = {
 	"Awolnation": ["Awolnation", "Awolnation ao vivo na TMN ao Vivo", "http://www1.sk-static.com/images/media/img/col6/20110322-001232-973681.jpg"],
 	"Sigur Ros": ["Sigur Ros", "Sigur Ros ao vivo no Campo Pequeno", "http://www1.sk-static.com/images/media/img/col6/20120930-091715-168615.jpg"],
 	"Mumford and Sons": ["Mumford and Sons", "Mumford and Sons ao vivo no Coliseu de Lisboa", "http://www2.sk-static.com/images/media/img/col6/20110613-051124-257858.jpg"]	
 };

 function init(onSuccess) {
 	TourismVisitor.visit(uri, onSuccess, onError);
 }

 function onError (jqXHR, textStatus, errorThrown) {
 	start();
 }

 function assertEvents (data, textStatus, jqXHR) {
 	start();
 	var events = data.event,
 	url = "http://polar-lowlands-9873.herokuapp.com/v1/event/",
 	id = 3;
 	for (var i = events.length - 1; i >= 0; i--) {
 		var eventUrl = events[i].base + events[i].id,
 		testUrl = url + (id--);
 		ok(eventUrl == testUrl, eventUrl + ' equal to ' + testUrl);
 	};
 }

 asyncTest("list event", function() {
 	expect(3);

 	var show = [0, 19],
 	category = ['Music', 'Notícias', 'Stuff from Stuff'],
 	tag = 'rock'
 	params = {
 		'show': show,
 		'category': category,
 		'tag': tag
 	};

 	setTimeout(function() {
 		init(function(data, textStatus, jqXHR) {
 			var client = data;
 			client.useVersion('1.0');
 			client.getEvents(params, assertEvents, onError);
 		}, onError);
 	}, 1000);	
 });

 function assertCategories (data) {
 	var categoryList = data.categories,
 	category, label;

 	for(var key in categoryList) {
 		category = categoryList[key];
 		label = DataReader.getLabel(category, 'primary', 'pt-PT');
 		ok($.inArray(label, categories, -1), label + ' present in ' + categories);
 		if(category.categories != undefined
 			&& category.categories.length > 0)
 			assertCategories(category);
 	}
 };

 function onCategoriesSuccess (data, textStatus, jqXHR) {
 	start();
 	assertCategories(data);
 };

 asyncTest("test categories", function(){
 	expect(5);

 	var params = {
 		'list': 'poi'
 	};

 	setTimeout(function() {
 		init(function (data, textStatus, jqXHR) {
 			var client = data;
 			client.useVersion('1.0');
 			client.getCategories(params, onCategoriesSuccess, onError);
 		});
 	}, 1000);
 });

 function assertPois (data, textStatus, jqXHR) {
 	start();
 	var pois = data.poi, poi;
 	for (var i = pois.length - 1; i >= 0; i--) {
 		poi = pois[i];
 		ok($.inArray((poi['base'] + poi['id']), poisList, -1), (poi['base'] + poi['id']) + ' present in ' + poisList);
 	}
 };

 asyncTest("test poi with id", function() {
 	expect(6);

 	var show = [0, 19],
 	category = ['Museum', 'Garden'],
 	tag = 'culture'
 	params = {
 		'show': show,
 		'category': category,
 		'tag': tag
 	};

 	setTimeout(function() {
 		init(function (data, textStatus, jqXHR) {
 			var client = data;
 			client.useVersion('1.0');
 			client.getPois(params, assertPois, onError);
 		});
 	}, 1000);
 });

 function assertLanguages (data, textStatus, jqXHR) {
 	start();
 	var pois = data.poi;
 	for (var i = pois.length - 1; i >= 0; i--) {
 		var poi = pois[i],
 		langs = DataReader.getAvailableLanguages(poi, 'label');
 		for (var key in langs) {
 			ok($.inArray(key, langList, -1), key + ' in ' + langList);
 		}
 	}
 };

 asyncTest("test available languages", function() {
 	expect(12);

 	var show = [0, 19],
 	category = ['Music', 'Notícias', 'Stuff from Stuff'],
 	tag = 'rock'
 	params = {
 		'show': show,
 		'category': category,
 		'tag': tag
 	};

 	setTimeout(function() {
 		init(function(data, textStatus, jqXHR) {
 			var client = data;
 			client.useVersion('1.0');
 			client.getPois(params, assertLanguages, onError);
 		}, onError);
 	}, 1000);
 });

 function assertDataReader (data, textStatus, jqXHR) {
 	start();
 	var events = data.event;
 	for (var i = events.length - 1; i >= 0; i--) {
 		var event = events[i],
 		label = DataReader.getLabel(event, 'primary', 'pt-PT'),
 		description = DataReader.getDescription(event, 'pt-PT'),
 		img = DataReader.getThumbnails(event),
 		imgContent, thumbnail;

 		if(img.length > 0) {
 			imgContent = img[0];
 			thumbnail = imgContent.getContent();
 		}

 		ok($.inArray(label, reader[label], -1), label + ' in ' + reader[label]);
 		ok($.inArray(description, reader[label], -1), description + ' in ' + reader[label]);
 		ok(imgContent != null, 'Has image');
 		ok(imgContent.hasImgUri(), 'Is URI');
 		ok($.inArray(thumbnail, reader[label], -1), thumbnail + ' in ' + reader[label]);
 	}
 }

 asyncTest("test data reader", function() {
 	expect(15);
 	var show = [0, 19],
 	category = ['Music', 'Live'],
 	tag = ['rock', 'indie']
 	params = {
 		'show': show,
 		'category': category,
 		'tag': tag
 	};

 	setTimeout(function() {
 		init(function (data, textStatus, jqXHR) {
 			var client = data;
 			client.useVersion('1.0');
 			client.getEvents(params, assertDataReader, onError);
 		}, onError);
 	}, 1000);
 });
