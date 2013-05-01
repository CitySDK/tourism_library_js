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
 * @fileOverview Library API for the CitySDK WP5 Tourism. Data parser component.
 * @version 1.0
 * @author Pedro Cruz
 */
 
/**
 * @field 
 * @description terms used within the JSON message. These can be used to read data (with {@link DataReader})
 * and get the values of given fields within a POI-based object. The available terms are as follow:
 * 
 * <ul>
 * <li>AUTHOR_TERM_PRIMARY: primary;</li>
 * <li>AUTHOR_TERM_SECONDARY: secondary;</li>
 * <li>AUTHOR_TERM_CONTRIBUTER: contributer;</li>
 * <li>AUTHOR_TERM_EDITOR: editor;</li>
 * <li>AUTHOR_TERM_PUBLISHER: publisher;</li>
 * <li>LABEL_TERM_PRIMARY: primary;</li>
 * <li>LABEL_TERM_NOTE: note;</li>
 * <li>TIME_TERM_START: start;</li>
 * <li>TIME_TERM_END: end;</li>
 * <li>TIME_TERM_INSTANT: instant;</li>
 * <li>TIME_TERM_OPEN: open;</li>
 * <li>LINK_TERM_SOURCE: source;</li>
 * <li>LINK_TERM_ALTERNATE: alternate;</li>
 * <li>LINK_TERM_CANONICAL: canonical;</li>
 * <li>LINK_TERM_COPYRIGHT: copyright;</li>
 * <li>LINK_TERM_DESCRIBEDBY: describedby;</li>
 * <li>LINK_TERM_EDIT: edit;</li>
 * <li>LINK_TERM_ENCLOSURE: enclosure;</li>
 * <li>LINK_TERM_ICON: icon;</li>
 * <li>LINK_TERM_LATEST_VERSION: latest-version;</li>
 * <li>LINK_TERM_LICENSE: license;</li>
 * <li>LINK_TERM_RELATED: related;</li>
 * <li>LINK_TERM_SEARCH: search;</li>
 * <li>LINK_TERM_PARENT: parent;</li>
 * <li>LINK_TERM_CHILD: child;</li>
 * <li>LINK_TERM_HISTORIC: historic;</li>
 * <li>LINK_TERM_FUTURE: future;</li>
 * <li>POINT_TERM_CENTER: center;</li>
 * <li>POINT_TERM_NAVIGATION_POINT: navigation point;</li>
 * <li>POINT_TERM_ENTRANCE: entrance;</li>
 * <li>RELATIONSHIP_TERM_EQUALS: equals;</li>
 * <li>RELATIONSHIP_TERM_DISJOINT: disjoint;</li>
 * <li>RELATIONSHIP_TERM_CROSSES: crosses;</li>
 * <li>RELATIONSHIP_TERM_OVERLAPS: overlaps;</li>
 * <li>RELATIONSHIP_TERM_WITHIN: within;</li>
 * <li>RELATIONSHIP_TERM_CONTAINS: contains;</li>
 * <li>RELATIONSHIP_TERM_TOUCHES: touches.</li>
 * </ul>
 *
 * An example of its usage: term.AUTHOR_TERM_PRIMARY
 *
 */
var term = {
	"AUTHOR_TERM_PRIMARY": "primary",
	"AUTHOR_TERM_SECONDARY": "secondary",
	"AUTHOR_TERM_CONTRIBUTER": "contributer",
	"AUTHOR_TERM_EDITOR": "editor",
	"AUTHOR_TERM_PUBLISHER": "publisher",
	
	"LABEL_TERM_PRIMARY": "primary",
	"LABEL_TERM_NOTE": "note",
	
	"TIME_TERM_START": "start",
	"TIME_TERM_END": "end",
	"TIME_TERM_INSTANT": "instant",
	"TIME_TERM_OPEN": "open",
	
	"LINK_TERM_SOURCE": "source",			/*POI source information*/
	"LINK_TERM_ALTERNATE": "alternate",	    /*a identical POI. Often used as a permalink*/
	"LINK_TERM_CANONICAL": "canonical",	    /*the preferred version of a set of POIs with highly 
										      similar content. For example, there could be many 
										      different perceptions of a neighborhood boundary 
										      POI, but the city's neighborhood map could be the 
										      canonical version of this POI.*/
	"LINK_TERM_COPYRIGHT": "copyright",	    /*a copyright statement that applys to the link's 
										      context*/
	"LINK_TERM_DESCRIBEDBY": "describedby", /*more information about this POI*/
	"LINK_TERM_EDIT": "edit",				/*a resource that can be used to edit the POI's 
											  context*/
	"LINK_TERM_ENCLOSURE": "enclosure",	  	/*a related resource that is potentially large 
											  and might require special handling*/
	"LINK_TERM_ICON": "icon",
	"LINK_TERM_LATEST_VERSION": "latest-version", /*points to a resource containing the latest 
												    version*/
	"LINK_TERM_LICENSE": "license",				/*a license for this POI*/
	"LINK_TERM_RELATED": "related",				/*a related resource*/
	"LINK_TERM_SEARCH": "search",				/*a resource that can be used to search through 
											      the link's context and related resources*/
	"LINK_TERM_PARENT": "parent",				/*a parent POI, often the enclosing geographic 
											   	  entity, or the entity this POI in under the 
											   	  domain of : such as a field office-corporate 
											   	  headquarters relationship*/
	"LINK_TERM_CHILD": "child",					/*a child POI, often a geography entity enclosed
	 										   	  or under the domain of this POI*/
	"LINK_TERM_HISTORIC": "historic",			/*links to a POI or other web resource that 
											   	  describes this place at a previous point in time*/
	"LINK_TERM_FUTURE": "future",				/*links to a POI or other web resource that 
											      describes this place at a later point in time*/
	
	"POINT_TERM_CENTER": "center",
	"POINT_TERM_NAVIGATION_POINT": "navigation point",
	"POINT_TERM_ENTRANCE": "entrance",
	
	"RELATIONSHIP_TERM_EQUALS": "equals",
	"RELATIONSHIP_TERM_DISJOINT": "disjoint",
	"RELATIONSHIP_TERM_CROSSES": "crosses",
	"RELATIONSHIP_TERM_OVERLAPS": "overlaps",
	"RELATIONSHIP_TERM_WITHIN": "within",
	"RELATIONSHIP_TERM_CONTAINS": "contains",
	"RELATIONSHIP_TERM_TOUCHES": "touches"
};

/**
 * @name DataReader
 * @class Used to parse single POI objects.
 */
function DataReader() { 

};

/**
 * @private
 */
DataReader.langsAreEqual = function(lang1, lang2) {
	if(lang1 == undefined || lang2 == undefined)
		return false;
	
	var parsedLang1 = lang1.replace("-", "_").split("_"),
		parsedLang2 = lang2.replace("-", "_").split("_");

	return parsedLang1[0] == parsedLang2[0];
};

/**
 * @private
 */
DataReader.loadMimeTypes = function() {
	if(this.mimeTypes == undefined) {
		this.mimeTypes = [];
		this.mimeTypes['image/bmp'] = 'image/bmp';
		this.mimeTypes['image/cis-cod'] = 'image/cis-cod';
		this.mimeTypes['image/gif'] = 'image/gif';
		this.mimeTypes['image/ief'] = 'image/ief';
		this.mimeTypes['image/jpeg']	= 'image/jpeg';
		this.mimeTypes['image/pipeg'] = 'image/pipeg';
		this.mimeTypes['image/svg+xml'] = 'image/svg+xml';
		this.mimeTypes['image/tiff'] = 'image/tiff';
		this.mimeTypes['image/x-cmu-raster'] = 'image/x-cmu-raster';
		this.mimeTypes['image/x-cmx'] = 'image/x-cmx';
		this.mimeTypes['image/x-icon'] = 'image/x-icon';
		this.mimeTypes['image/x-portable-anymap'] = 'image/x-portable-anymap';
		this.mimeTypes['image/x-portable-bitmap'] = 'image/x-portable-bitmap';
		this.mimeTypes['image/x-portable-graymap'] = 'image/x-portable-graymap';
		this.mimeTypes['image/x-portable-pixmap'] = 'image/x-portable-pixmap';
		this.mimeTypes['image/x-rgb'] = 'image/x-rgb';
		this.mimeTypes['image/x-xbitmap'] = 'image/x-xbitmap';
		this.mimeTypes['image/x-xpixmap'] = 'image/x-xpixmap';
		this.mimeTypes['image/x-xwindowdump'] = 'image/x-xwindowdump';
	}
};

/**
 * Gets the local language and country.
 * @memberOf DataReader
 * @returns {String} the local language in the following format lang_COUNTRY (e.g.: pt_PT) or 
 * just "en" if it was not possible to get it. 
 */
DataReader.getLocalLanguage = function() {
	if (navigator.userLanguage)   // Explorer
		return navigator.userLanguage.replace("-", "_");
	else if (navigator.language)  // FF, Chrome
		return navigator.language.replace("-", "_");
	else
	 	return "en";
};

/**
 * @name ImageContent
 * @class Container of an image. It can be either the byte-code (base64) of the image or a URI of the image.
 * @param content either an image URI or byte code
 */
function ImageContent(content) {
	this.content = content;
	this.imgByteCode = false;
	this.imgUri = false;
	
	/**
     * Checks whether the content is byte code or not
     * @memberOf ImageContent
     * @returns {Boolean} true if content is byte code, false otherwise
     */
	this.hasImgByteCode = function() {
		return this.imgByteCode;
	};

	/**
     * Indicates if the content is image byte code
     * @memberOf ImageContent
     * @param imgByteCode boolean indicating if content is byte code or not
     */
	this.isImgByteCode = function(imgByteCode) {
		this.imgByteCode = imgByteCode;
	};

	/**
     * Checks whether the content is an image URI or not
     * @memberOf ImageContent
     * @returns {Boolean} true if content is an URI, false otherwise
     */
	this.hasImgUri = function() {
		return this.imgUri;
	};

	/**
     * Indicates if the content is an image URI or not
     * @memberOf ImageContent
     * @param imgUri boolean indicating if content is byte code or not
     */
	this.isImgUri = function(imgUri) {
		this.imgUri = imgUri;
	};
	
	/**
     * Setter
     * @memberOf ImageContent
     * @param the new content
     */
	this.setContent = function(content) {
		this.content = content;
	};
	
	/**
     * Getter
     * @memberOf ImageContent
     * @returns {String} the content
     */
	this.getContent = function() {
		return this.content;
	};
};

/**
 * @name LocationContent
 * @class Container of a location.
 * @param latitude latitude of the location
 * @param longitude longitude of the location
 */
function LocationContent(latitude, longitude) {
	this.latitude = latitude;
	this.longitude = longitude;
	
	/**
     * Gets the latitude
     * @memberOf LocationContent
     * @returns {String} the latitude
     */
	this.getLatitude = function() {
		return this.latitude;
	};

	/**
     * Gets the longitude
     * @memberOf LocationContent
     * @returns {String} the longitude
     */
	this.getLongitude = function() {
		return this.longitude;
	};
}

/**
 * @name GeometryContent
 * @class Geometry container
 */
function GeometryContent() {
	/**
     * Gets the number of geometries associated with this geometry
     * @memberOf GeometryContent
     * @returns {Integer} the number of geometries
     */
	this.getNumGeo = function() { 
		return 0; 
	};
};

/**
 * @name PointContent
 * @class Container of a single Point.
 * @param latitude latitude of the point
 * @param longitude longitude of the point
 */
function PointContent(latitude, longitude) {
	this.location = new LocationContent(latitude, longitude);
	
	/**
     * Gets the location of this point
     * @memberOf PointContent
     * @returns {LocationContent} the location
     */
	this.getLocation = function() {
		return this.location;
	};
	
	this.getNumGeo = function() {
		return 1;
	};
};

PointContent.prototype = new GeometryContent;

/**
 * @name LineContent
 * @class Container of a line. A line is no more than two LocationContent.
 * @param pointOne point one of the line
 * @param pointTwo point two of the line
 */
function LineContent(pointOne, pointTwo) {
	this.pointOne = pointOne;
	this.pointTwo = pointTwo;

	/**
     * Gets the point one of this line
     * @memberOf LineContent
     * @returns {LocationContent} point one
     */
	this.getPointOne = function() {
		return this.pointOne;
	};

	/**
     * Gets the point two of this line
     * @memberOf LineContent
     * @returns {LocationContent} point two
     */
	this.getPointTwo = function() {
		return this.pointTwo;
	};
	
	this.getNumGeo = function() {
		return 2;
	};
};

LineContent.prototype = new GeometryContent;

/**
 * @name PolygonContent
 * @class Container of a polygon. A polygon is no more than a list of LocationContent.
 */
function PolygonContent() {
	this.values = [];
	
	/**
     * Gets the locations associated with this polygon
     * @memberOf PolygonContent
     * @returns {LocationContent[]} list of locations
     */
	this.getValues = function() {
		return this.values;
	};
	
	/**
     * Adds a location to this polygon
     * @memberOf PolygonContent
     * @param content the location to add
     * @returns list of locations
     */
	this.addLocation = function(content) {
		this.values.push(content);
	};
	
	this.getNumGeo = function() {
		return this.values.length;
	};
};

PolygonContent.prototype = new GeometryContent;

/**
 * Gets the available languages for the POI object.
 * @static
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param field specifies the field to be checked (either label or description).
 * @returns {String[]} an array containing the available languages of a given field.
 */
DataReader.getAvailableLanguages = function(poi, field) {
	var values, 
		languages = [],
		lang;
	if(poi == null || poi == undefined)
		return languages;
		
	if(field != 'label' && field != 'description')
		return languages;
	
	values = poi[field];
	for(key in values) {
		lang = values[key].lang;
		if(lang == undefined)
			lang = poi.lang;
			
		lang = lang.replace("-", "_");
		languages[lang.split("_")[0]] = lang;
	}
	
	return languages;
};

/**
 * Sets the DataReader default language. Default: en_GB
 * @static
 * @param lang the new default language.
 */
DataReader.setDefaultLanguage = function(lang) {
	if(lang == null)
		return;
		
	this.defaultLanguage = lang;
};

/**
 * Gets a label description from the POI object with a given term in a given language.
 * @static
 * @param poi a single POI object (such as a Point of Interest, Route or Event).
 * @param term the wanted term (see {@link term}).
 * @param lang the wanted language.
 * @returns {String} a label description corresponding to the term in a given language, or en_GB if
 * the wanted language does not exist or false if both do not exist. 
 */
DataReader.getLabel = function(poi, term, lang) {
	if(poi == null || poi == undefined)
		return false;
	
	if(this.defaultLanguage == undefined)
		this.setDefaultLanguage("en_GB");
	
	var labelLang,
		poiLang = poi.lang,
		labels = poi.label,
		defaultValue = null;
	
	for(key in labels) {
		if(labels[key].lang == undefined) 
			labelLang = poiLang;
		else
			labelLang = labels[key].lang;
		
		if(labels[key].term == term 
			&& this.langsAreEqual(labelLang, this.defaultLanguage)) {
			defaultValue = labels[key].value;
		} else if(labels[key].term == term
					&& this.langsAreEqual(labelLang, lang)) {
			return labels[key].value;
		}
	}
	
	return defaultValue;
};

/**
 * Gets a given description from the POI object with a given language.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param lang the wanted language.
 * @returns {String} a description in a given language, or in en_GB if
 * the wanted language does not exist or false if both do not exist.
 */
DataReader.getDescription = function(poi, lang) {
	if(poi == null || poi == undefined)
		return false;

	if(this.defaultLanguage == undefined)
		this.setDefaultLanguage("en_GB");
	
	var descriptionLang, poiLang = poi.lang,
		descriptions = poi.description,
		defaultValue = null;
	for(key in descriptions) {
		if(descriptions[key].lang == undefined) 
			descriptionLang = poiLang;
		else
			descriptionLang = descriptions[key].lang;
			
		if((descriptions[key].type == undefined || descriptions[key].type == null)
			&& this.langsAreEqual(descriptionLang, this.defaultLanguage)) {
			defaultValue = descriptions[key].value;
		} else if((descriptions[key].type == undefined || descriptions[key].type == null) 
					&& this.langsAreEqual(descriptionLang, lang)) {
			return descriptions[key].value;
		}
	}
	
	return defaultValue;
};

/**
 * Gets a price description from the POI object with a given language.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param lang the wanted language.
 * @returns {String} a price description in the given language, or in en_GB if
 * the wanted language does not exist or false if both do not exist.
 */
DataReader.getPrice = function(poi, lang) {
	return this.getValueWithTerm(poi, lang, "X-citysdk/price");
};

/**
 * Gets the waiting time description from the POI object with a given language.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @returns {String} the waiting time description (in seconds) or false.
 */
DataReader.getWaitingTime = function(poi) {
	return this.getValueWithTerm(poi, null, "X-citysdk/waiting-time");
};

/**
 * Gets the occupation description from the POI object with a given language.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @returns {String} the occupation description (0 to 100) or false.
 */
DataReader.getOccupation = function(poi, lang) {
	return this.getValueWithTerm(poi, null, "X-citysdk/occupation");
};

/**
 * @private
 */
DataReader.getValueWithTag = function(poi, lang, tag) {
	if(poi == null || poi == undefined)
		return false;
		
	if(this.defaultLanguage == undefined)
		this.setDefaultLanguage("en_GB");
	
	var descriptionLang, 
		poiLang = poi.lang,
		descriptions = poi.description,
		defaultValue = null;
	for(key in descriptions) {
		if(descriptions[key].lang == undefined) 
			descriptionLang = poiLang;
		else
			descriptionLang = descriptions[key].lang;
			
		if(descriptions[key].type != undefined
			&& descriptions[key].type == tag) {
			if(lang == null || this.langsAreEqual(descriptionLang, this.defaultLanguage))
				defaultValue = descriptions[key].value;
		} else if(descriptions[key].type != undefined
					&& descriptions[key].type == tag) {
			if(lang == null || this.langsAreEqual(descriptionLang, this.defaultLanguage))
				return descriptions[key].value;
		}
	}
	
	return defaultValue;
};

/**
 * Gets all the thumbnail URI or base-64 bytecode from the POI object.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @returns {ImageContent[]} all the thumbnail URI or base-64 bytecode or an empty list.
 */
DataReader.getThumbnails = function(poi) {
	var thumbnails = [],
		links,
		content;
	if(poi == null || poi == undefined)
		return thumbnails;
	
	links = poi.link;
	for(key in links) {
		if(links[key].term == term.LINK_TERM_ICON) {
			if(links[key].href != undefined) {
				content = new ImageContent(links[key].href);
				content.isImgUri(true);
				thumbnails.push(content);
			} else if (links[key].value != undefined) {
				content = new ImageContent(links[key].value);
				content.isImgByteCode(true);
				thumbnails.push(content);
			}
		}
	}
	
	return thumbnails;
};

/**
 * Gets the point from the location of the POI object with a given term.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param term the wanted term.
 * @returns {PointContent[]} an array containing all points with the given term or an empty array.
 */
DataReader.getLocationPoint = function(poi, term) {
	var list = [], 
		location, 
		point, 
		data, 
		points;
	if(poi == null || poi == undefined)
		return list;
		
	location = poi.location;
	if(location.point != undefined) {
		points = location.point;
		for(key in points) {
			if(points[key].term == term) {
				data = []; 
				data = points[key].Point.posList.split(" ");
				point = new PointContent(data[0], data[1]);
				list.push(point);
			}
		}
	}
	
	return list;
};

/**
 * Gets the lines from the location of the POI object with a given term.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param term the wanted term.
 * @returns {LineContent[]} an array containing all lines with the given term or an empty array.
 */
DataReader.getLocationLine = function(poi, term) {
	var list = [],
		location,
		line,
		data, 
		point1,
		point2, 
		lines;
	if(poi == null || poi == undefined)
		return list;
		
	location = poi.location;
	if(location.line != undefined) {
		lines = location.line;
		for(key in lines) {
			if(lines[key].term == term) {
				data = [];
				point1 = [];
				point2 = [];
				data = lines[key].LineString.posList.split(",");
				point1 = data[0].split(" ");
				point2 = data[1].split(" ");
				line = new LineContent(new LocationContent(point1[0], point1[1]), 
									   new LocationContent(point2[2], point2[3]));
				list.push(line);
			}
		}
	}
	
	return list;
};

/**
 * Gets the polygons from the location of the POI object with a given term.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param term the wanted term.
 * @returns {PolygonContent[]} an array containing all polygons with the given term or an empty array.
 */
DataReader.getLocationPolygon = function(poi, term) {
	var list = [],
		location,
		polygon,
		polygons,
		data,
		posList,
		i;
	if(poi == null || poi == undefined)
		return list;
		
	location = poi.location;
	if(location.polygon != undefined) {
		polygons = location.polygon;
		for(key in polygons) {
			if(polygons[key].term == term) {
				polygon = new PolygonContent();
				data = [];
				data = polygons[key].SimplePolygon.posList.split(",");
				for(i = 0; i < data.length; i++) {
					posList = data[i].split(" ");
					polygon.addLocation(new LocationContent(posList[0], posList[1]));
				}
				list.push(polygon);
			}
		}
	}
	
	return list;
};

/**
 * Gets all geometries from the location of the POI object with a given term.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param term the wanted term.
 * @returns {GeometryContent[]} an array containing all geometries with the given term or an empty array.
 */
DataReader.getLocationGeometry = function(poi, term) {
	var list = [],
		pointList,
		lineList,
		polygonList;
	if(poi == null || poi == undefined)
		return list;
		
	pointList = DataReader.getLocationPoint(poi, term);
	lineList = DataReader.getLocationLine(poi, term);
	polygonList = DataReader.getLocationPolygon(poi, term);
	
	list = pointList.concat(lineList, polygonList);
	return list;
};

/**
 * Gets the contacts from the POI object.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @returns {String} the contacts in vCard format or false.
 */
DataReader.getContacts = function(poi) {
	if(poi == null || poi == undefined)
		return false;
		
	var location = poi.location;
	if(location == undefined || (location != undefined && location.address == undefined))
		return false;
	else
		return location.address.value;
};

/**
 * Gets the calendar with a given term from the POI object.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @param term the wanted term (see {@link term})
 * @returns {String} the calendar in iCalendar format with the given term or false.
 */
DataReader.getCalendar = function(poi, term) {
	if(poi == null || poi == undefined)
		return false;
		
	var time = poi.time;
	for(key in time) {
		if(time[key].type == "text/icalendar"
			&& time[key].term == term)
			return time[key].value;
	}
	
	return false;
};

/**
 * Gets all image URI from the link section of the POI object.
 * @memberOf DataReader
 * @param poi a single POI object (such as a Point Of Interest, Route or Event).
 * @returns {ImageContent[]} an array of image URI or an empty list.
 */
DataReader.getImagesUri = function(poi) {
	var list = [],
		links,
		content;
	if(poi == null || poi == undefined)
		return list;
	
	this.loadMimeTypes();
	links = poi.link;
	for(key in links) {
		if(links[key].term == term.LINK_TERM_RELATED
			&& this.mimeTypes[links[key].type] != undefined) {
			content = new ImageContent(links[key].href);
			content.isImgUri(true);
			list.push(content);
		}
	}
	
	return list;
};

/**
 * Gets the relationship base with a given term from the POI object.
 * @memberOf DataReader
 * @param poi the object to get the data.
 * @param term the term used (see {@link term}).
 * @returns {String} the relationship base with the given term or false if none was found.
 */
DataReader.getRelationshipBase = function(poi, term) {
	if(poi == null || poi == undefined)
		return false;
		
	var location = poi.location,
		relationship;
	if(location.relationship != undefined) {
		relationship = location.relationship;
		for(key in relationship) {
			if(relationship[key].term == term)
				return relationship[key].base;
		}
	}
	
	return false;
};

/**
 * Gets the relationship id with a given term from the POI object.
 * @memberOf DataReader
 * @param poi the object to get the data.
 * @param term the term used (see {@link term}).
 * @returns {String} the relationship id with the given term or false if none was found.
 */
DataReader.getRelationshipId = function(poi, term) {
	if(poi == null || poi == undefined)
		return false;
		
	var location = poi.location,
		relationship;
	if(location.relationship != undefined) {
		relationship = location.relationship;
		for(key in relationship) {
			if(relationship[key].term == term) {
				if(relationship[key].targetPOI != undefined)
					return relationship[key].targetPOI;
				else
					return relationship[key].targetEvent;
			}
		}
	}
	
	return false;
};

/**
 * Gets a given link with a given term from the POI object.
 * @memberOf DataReader
 * @param poi the object to get the data.
 * @param term the term used - see {@link term}
 * @returns {String} the link with the given term or null if none was found.
 */
DataReader.getLink = function(poi, term) {
	if(poi == null || poi == undefined)
		return false;
		
	var links = poi.link;
	for(key in links) {
		if(links[key].term == term) {
			return links[key].href;
		}
	}
	
	return false;
};
