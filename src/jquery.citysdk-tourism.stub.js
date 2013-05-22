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
 
/**
 * @fileOverview Library API for the CitySDK WP5 Tourism. REST Calls abstraction component.
 * @version 1.0
 * @author Pedro Cruz
 */

/**
 * @field
 * @description The available terms used to access a given resource in a {@link TourismClient} stub. The available terms are as follows:
 * <ul>
 * <li>RESOURCE_POIS:</li>
 * <ul>
 * <li>FIND_POI: find-poi;</li>
 * <li>FIND_POI_RELATION: find-poi-relation.</li>
 * </ul>
 * <li>RESOURCE_EVENT:</li> 
 * <ul>
 * <li>FIND_EVENT: find-event;</li>
 * <li>FIND_EVENT_RELATION: find-event-relation.</li>
 * </ul>
 * <li>RESOURCE_ROUTE:</li> 
 * <ul>
 * <li>FIND_ROUTE: find-route;</li>
 * <li>FIND_ROUTE_RELATION: find-route-relation.</li>
 * </ul>
 * <li>FIND_CATEGORIES: find-categories;</li>
 * <li>TAGS: find-tags.
 * </ul>
 *
 * An example of its usage: parameterTerms.RESOURCE_POIS.FIND_POI
 *
 */
var resourceTerms = {
	"RESOURCE_POIS": {
		"FIND_POI": "find-poi",
		"FIND_POI_RELATION": "find-poi-relation"
	},
	"RESOURCE_EVENTS": { 
		"FIND_EVENT": "find-event",
		"FIND_EVENT_RELATION": "find-event-relation"
	},
	"RESOURCE_ROUTES": {
		"FIND_ROUTE": "find-route",
	},
	
	"FIND_CATEGORIES": "find-categories",
	"FIND_TAGS": "find-tags"
},

/**
 * @field
 * @description The available terms used as parameters for searching. The available terms are as follows:
 * <ul>
 * <li>POIS: poi;</li>
 * <li>EVENTS: event;</li>
 * <li>ROUTES: route;</li>
 * <li>SEARCH_PARAMETERS:
 * <ul>
 * <li>BASE: base;</li>
 * <li>ID: id;</li>
 * <li>CATEGORY: category;</li>
 * <li>TAG: tag;</li>
 * <li>COMPLETE: complete;</li>
 * <li>MINIMAL: minimal;</li>
 * <li>COORDS: coords;</li>
 * <li>CODE: code;</li>
 * <li>OFFSET: offset;</li>
 * <li>LIMIT: limit;</li>
 * <li>EVENT: event;</li>
 * <li>TIME: time;</li>
 * <li>ROUTE: route;</li>
 * <li>RELATION: relation;</li>
 * <li>LIST: list.</li>
 * </ul>
 * </ul>
 *
 * An example of its usage: parameterTerms.SEARCH_PARAMETERS.TAG
 *
 */
parameterTerms = {
	"POIS": "poi",
	"EVENTS": "event",
	"ROUTES": "route",
	"SEARCH_PARAMETERS": {
		"BASE": "base",
		"ID": "id",
		"CATEGORY": "category",
		"TAG": "tag",
		"COMPLETE": "complete",
		"MINIMAL": "minimal",
		"COORDS": "coords",
		"CODE": "code",
		"OFFSET": "offset",
		"LIMIT": "limit",
		"EVENT": "event",
		"TIME": "time",
		"ROUTE": "route",
		"RELATION": "relation",
		"LIST": "list"
	}
};

/**
 * @name TourismClient
 * @class jQuery client stub for the CitySDK Tourism WP5
 * @param data mapping of available capacities in the server
 */
TourismClient = function(data) {
	var mapping = mapConvert(data), version;
	
	/**
	 * @private
	 */
	function mapConvert(data) {
		var links = data["citysdk-tourism"], map = [];
		for(key in links) {
			map[links[key].version] = links[key]["_links"];
		}
			
		return map;
	};
	
	/**
     * Use a given version
     * @memberOf TourismClient
     * @param v version to use
     */
	this.useVersion = function(v) {
		version = v;
	};
	
	/**
     * Gets the available resources for the visited server.
     * @memberOf TourismClient
     * @returns {String[]} a mapping of available resources.
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getResources = function() {
		verifyVersion();
		return Object.keys(mapping[version]);
	};
	
	/**
     * Checks whether the given resource is available or not.
     * @memberOf TourismClient
     * @param resource the resource to check for availability.
     * @returns {boolean} true if available, false otherwise.
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.hasResource = function(resource) {
		verifyVersion();
		return resource in mapping[version];
	};
	
	/**
     * Checks whether the given parameter is available in a resource or not.
     * @memberOf TourismClient
     * @param resource the resource to check the parameter.
     * @param parameter the parameter to check for availability
     * @returns {boolean} true if available, false otherwise.
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.hasResourceParameter = function(resource, parameter) {
		verifyVersion();
		UriTemplate.fromTemplate(mapping[version][resource].href);
		return UriTemplate.hasParameter(parameter);
	};
	
	/**
     * Perform a request with the given parameters to get the POIs corresponding to the query.
     * @memberOf TourismClient
     * @param parameters the request parameters 
     * @param handleData the callback to handle the returned data. Its parameters should be the data (a list of POIs), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     * @throws {ResourceNotAvailableException} thrown if POIs listing search is not available in this server.
     * @throws {InvalidParameterException} thrown if at least one parameter is not valid for the POIs listing search. 
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getPois = function(parameters, handleData, handleError) {
		getList(parameters, handleData, handleError, resourceTerms.RESOURCE_POIS.FIND_POI);
	};
	
	/**
     * Perform a request with the given parameters to get the Events corresponding to the query.
     * @memberOf TourismClient
     * @param parameters the request parameters 
     * @param handleData the callback to handle the returned data. Its parameters should be the data (a list of Events), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     * @throws {ResourceNotAvailableException} thrown if Events listing search is not available in this server.
     * @throws {InvalidParameterException} thrown if at least one parameter is not valid for the Events listing search. 
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getEvents = function(parameters, handleData, handleError) {
		getList(parameters, handleData, handleError, resourceTerms.RESOURCE_EVENTS.FIND_EVENT);
	};
	
	/**
     * Perform a request with the given parameters to get the Routes corresponding to the query.
     * @memberOf TourismClient
     * @param parameters the request parameters 
     * @param handleData the callback to handle the returned data. Its parameters should be the data (a list of Routes), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     * @throws {ResourceNotAvailableException} thrown if Routes listing search is not available in this server.
     * @throws {InvalidParameterException} thrown if at least one parameter is not valid for the Routes listing search. 
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getRoutes = function(parameters, handleData, handleError) {
		getList(parameters, handleData, handleError, resourceTerms.RESOURCE_ROUTES.FIND_ROUTE);
	};
	
	/**
     * Perform a request to get a list of Categories of either POIs, Events or Routes.
     * @memberOf TourismClient
     * @param parameters the request parameters. The list parameter should be either pois, events or routes.
	 * @param handleData the callback to handle the returned data. Its parameters should be the data (a list of Categories) and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     * @throws {InvalidTermException} thrown if the term is an invalid term.
     * @throws {ResourceNotAvailable} thrown if getting a category listing is unavailable for the server.
     * @throws {InvalidParameterException} thrown if at least one parameter is not valid for the Categories listing search. 
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getCategories = function(parameters, handleData, handleError) {
		getCategorization(parameters, handleData, handleError, resourceTerms.FIND_CATEGORIES);
	};
	
	/**
     * Perform a request to get a list of Tags of either POIs, Events or Routes.
     * @memberOf TourismClient
     * @param parameters the request parameters. The list parameter should be either pois, events or routes.
	 * @param handleData the callback to handle the returned data. Its parameters should be the data (a list of Tags) and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     * @throws {InvalidTermException} thrown if the term is an invalid term.
     * @throws {ResourceNotAvailable} thrown if getting a tags listing is unavailable for the server. 
     * @throws {InvalidParameterException} thrown if at least one parameter is not valid for the Tags listing search. 
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getTags = function(parameters, handleData, handleError) {
		getCategorization(parameters, handleData, handleError, resourceTerms.FIND_TAGS);
	};
	
	/**
     * Request for a single POI.
     * @memberOf TourismClient
     * @param base the base URI of the POI.
     * @param id the id of the POI.
	 * @param handleData the callback to handle the returned data. Its parameters should be the data (a POI), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     */
	this.getPoi = function(base, id, handleData, handleError) {
		makeSingleCall(base + id, handleData, handleError);
	};
	
	/**
     * Request for a single Event.
     * @memberOf TourismClient
     * @param base the base URI of the Event.
     * @param id the id of the Event.
	 * @param handleData the callback to handle the returned data. Its parameters should be the data (a Event), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     */
	this.getEvent = function(base, id, handleData, handleError) {
		makeSingleCall(base + id, handleData, handleError);
	};
	
	/**
     * Request for a single Route.
     * @memberOf TourismClient
     * @param base the base URI of the Route.
     * @param id the id of the Route.
	 * @param handleData the callback to handle the returned data. Its parameters should be the data (a Route), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
     * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
     */
	this.getRoute = function(base, id, handleData, handleError) {
		makeSingleCall(base + id, handleData, handleError);
	};
	
	/**
     * Returns a list of Points of Interest with the given relation with the POI
	 * identified by base and id. The relation should be either: child or parent
     * @memberOf TourismClient
     * @param base the base URI of the related POI.
     * @param id the id of the related POI.
	 * @param relation the relationship to search for
	 * @param handleData the callback to handle the returned data. Its parameters should be the data (a list of POIs), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
	 * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
	 * @throws {InvalidTermException} thrown if the relation is an invalid term.
	 * @throws {ResourceNotAvailable} thrown if getting a POI relations is unavailable for the server. 
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getPoiRelation = function(base, id, relation, handleData, handleError) {
		getRelation(base, id, relation, handleData, handleError, resourceTerms.RESOURCE_POIS.FIND_POI_RELATION);
	};
	
	/**
     * Returns a list of Events with the given relation with the Event
	 * identified by base and id. The relation should be either: child or parent
     * @memberOf TourismClient
     * @param base the base URI of the related Event.
     * @param id the id of the related Event.
	 * @param relation the relationship to search for
	 * @param handleData the callback to handle the returned data. Its parameters should be the data (a list of Events), a textStatus and a jQuery XMLHttpRequest (jqXHR) object.
	 * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown.
	 * @throws {InvalidTermException} thrown if the relation is an invalid term.
	 * @throws {ResourceNotAvailable} thrown if getting a Event relations is unavailable for the server. 
     * @throws {VersionNotAvailableException} thrown if the version was not set or is not available.
     */
	this.getEventRelation = function(base, id, relation, handleData, handleError) {
		getRelation(base, id, relation, handleData, handleError, resourceTerms.RESOURCE_EVENTS.FIND_EVENT_RELATION);
	};
	
	/**
	 * @private
	 */ 
	getList = function(parameters, handleData, handleError, resource) {
		verifyVersion();
		validateResource(resource);
		validateParameters(resource, parameters);
		makeQueryCall(mapping[version][resource].href, parameters, handleData, handleError);
	};
	
	/**
	 * @private
	 */
	getCategorization = function(parameters, handleData, handleError, resource) {
		verifyVersion();
		validateResource(resource);
		validateParameters(resource, parameters);
		validateListTerm(parameters['list']);
		makeQueryCall(mapping[version][resource].href, parameters, handleData, handleError);
	};
	
	/**
	 * @private
	 */ 
	getRelation = function(base, id, relation, handleData, handleError, resource) {
		verifyVersion();
		validateResource(resource);
		validateRelationTerm(relation);
		var parameters = {
			"base": base,
			"id": id,
			"relation": term
		};
		makeQueryCall(mapping[version][resource].href, parameters, handleData, handleError);
	};
	
	/**
	 * @private
	 */
	makeQueryCall = function(resource, parameters, handleData, handleError) {
		UriTemplate.fromTemplate(resource);
		$.support.cors = true;
		$.ajax({
			headers: { 
        		Accept : "application/json"
        	},
        	crossDomain: true,
        	dataType: "json",
			url: encodeURI(UriTemplate.build(parameters)),
			type: 'GET',
			processData: true,
			success: function(data, textStatus, jqXHR) {
				handleData(data, textStatus, jqXHR);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				handleError(jqXHR, textStatus, errorThrown);
			}
		});
	};
	
	/**
	 * @private
	 */
	makeSingleCall = function(url, handleData, handleError) {
		$.support.cors = true;
		$.ajax({
			headers: { 
        		Accept : "application/json"
        	},
        	crossDomain: true,
			url: encodeURI(url),
			dataType: "json",
			type: 'GET',
			success: function(data, textStatus, jqXHR) {
				handleData(data, textStatus, jqXHR);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				handleError(jqXHR, textStatus, errorThrown);
			}
		});
	};
	
	/**
	 * @private
	 */
	verifyVersion = function() {
		if(version == undefined
			|| mapping[version] == undefined) {
			throw {
				name: "VersionNotAvailableException",
		   		level: "Show Stopper",
		    	message: version + " is not available"
			};
		}
	};
	
	/**
	 * @private
	 */
	validateResource = function(resource) {
		if(!(resource in mapping[version])) {
			throw {
				name: "ResourceNotAvailableException",
		   		level: "Show Stopper",
		    	message: resource + " is not available"
			};
		}
	};
 	
	/**
	 * @private
	 */
	validateParameters = function(resource, parameters) {
		UriTemplate.fromTemplate(mapping[version][resource].href);
		for(key in parameters) {
			if(!UriTemplate.hasParameter(key)) {
				throw {
		    		name: "InvalidParameterException",
		   			level: "Show Stopper",
		    		message: key + " parameter is invalid for resource " + resource
		   		};
   			}
		}
	};
	
	/**
	 * @private
	 */
	validateListTerm = function(term) {
		if(term == undefined 
			|| (term != parameterTerms.POIS
				&& term != parameterTerms.EVENTS
				&& term != parameterTerms.ROUTES)) {
			throw {
		    	name: "InvalidTermException",
		   		level: "Show Stopper",
		    	message: term + " is invalid. It should be either poi, event or route"
		   	};
		}	
	};
	
	/**
	 * @private
	 */
	validateRelationTerm = function(term) {
		if(term == undefined) {
			throw {
		    	name: "InvalidTermException",
		   		level: "Show Stopper",
		    	message: term + " is invalid. It should be either child or parent."
		   	};
		}
		
		if(term == undefined 
			|| (term != "child"
				&& term != "parent")) {
			throw {
		    	name: "InvalidTermException",
		   		level: "Show Stopper",
		    	message: term + " is invalid. It should be either child or parent."
		   	};
		}
	};
};

/**
 * @name TourismVisitor
 * @class Used to generate a TourismClient stub, after visiting a given URI through @see visitHome.
 */
function TourismVisitor() { };

/**
 * Visits the given URI and returns a Client stub with the available capacities.
 * @static
 * @memberOf TourismVisitor
 * @param uri the wanted URI.
 * @param handleData the callback containing the response from this function. This callback should receive a TourismClient stub as a parameter.
 * @param handleError the callback to handle network errors. Its parameters should be a jQuery XMLHttpRequest (jqXHR) object, textStatus and errorThrown. 
 */
TourismVisitor.visit = function(uri, handleData, handleError) {
	$.support.cors = true;
	$.ajax({
		headers: { 
        	Accept : "application/json"
        },
        crossDomain: true,
        dataType: "json",
		url: uri,
		type: 'GET',
		success: function(data, textStatus, jqXHR) {
			handleData(new TourismClient(data), textStatus, jqXHR);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			handleError(jqXHR, textStatus, errorThrown);
		}
	});
};
