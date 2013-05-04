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
 * @fileOverview Library API for the CitySDK WP5 Tourism. URI Template component.
 * @version 1.0
 * @author Pedro Cruz
 */
var operator = {
	"DEFAULT_OP": {
		"value": "",
		"operator": "",
		"separator": ",",
		"named": false
	},
	"PLUS_OP": {
		"value": "+",
		"operator": "",
		"separator": ",",
		"named": false
	},
	"SHARP_OP": {
		"value": "#",
		"operator": "#",
		"separator": ",",
		"named": false
	},
	"DOT_OP": {
		"value": ".",
		"operator": ".",
		"separator": ".",
		"named": false
	},
	"SLASH_OP": {
		"value": "/",
		"operator": "/",
		"separator": "/",
		"named": false
	},
	"SEMICOLON_OP": {
		"value": ";",
		"operator": ";",
		"separator": ";",
		"named": true
	},
	"QUERY_OP": {
		"value": "?",
		"operator": "?",
		"separator": "&",
		"named": true
	},
	"FORM_OP": {
		"value": "&",
		"operator": "&",
		"separator": "&",
		"named": true
	}
};

/**
 * @name UriTemplate
 * @class Implementation of the URI Template RFC6570 (<a target="_blank" href="http://tools.ietf.org/html/rfc6570">http://tools.ietf.org/html/rfc6570</a>)
 */
UriTemplate = function() {
	var template, operators;
};

/**
 * Loads a given template
 * @memberOf UriTemplate
 * @param template to load
 */
UriTemplate.fromTemplate = function(template) {
	this.template = template;
	this.operators = [];
	this.operators[""] = operator.DEFAULT_OP;
	this.operators["+"] = operator.PLUS_OP;
	this.operators["#"] = operator.SHARP_OP;
	this.operators["."] = operator.DOT_OP;
	this.operators["/"] = operator.SLASH_OP;
	this.operators[";"] = operator.SEMICOLON_OP;
	this.operators["?"] = operator.QUERY_OP;
	this.operators["&"] = operator.FORM_OP;
};

/**
 * Checks whether a template has a given parameter
 * @memberOf UriTemplate
 * @param parameter check if a given template has a parameter
 * @return {boolean} true if it is present, false otherwise
 */
UriTemplate.hasParameter = function(parameter) {
	var templateRegex = /{[^{}]+}/g,
		varRegex = /((?:\w+))/g,
		match, vars;
	while (match = templateRegex.exec(this.template)) {
		template = match[0];
		while(vars = varRegex.exec(template)) {
			if(vars[0] == parameter)
				return true;
		}
	}
	
	return false;
};

/**
 * Converts a given loaded template into a URI containg the given values
 * @memberOf UriTemplate
 * @param values values of each parameter
 * @return {String} the converted URI
 */
UriTemplate.build = function(values) {
	var templateRegex = /{[^{}]+}/g,
		varRegex = /((?:\w+))/g,
		match, vars, 
		uri = this.template, 
		parameters = "",
		modifier,
		template,
		size, op;
	
	while (match = templateRegex.exec(this.template)) {
		template = match[0];
		op = this.operators[template.substring(1, 2)];

		parameters += op.operator;
		while(vars = varRegex.exec(template)) {
			modifier = template.charAt(vars.index + vars[0].length);
			if(modifier == '*') {
				parameters += explode(vars[0], op);
			} else if(modifier == ':') {
				size = varRegex.exec(template);
				parameters += modify(vars[0], size[0], op);
			} else {
				parameters += expand(vars[0], op);
			}
		}
		
		if (op.separator && endsWith(parameters, op.separator))
				parameters = parameters.substring(0, parameters.length - 1);

		uri = uri.replace(template, parameters);
	}
	
	return uri;
	
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	function expand(vars, op) {
		var parameters = "";
		if(values[vars] != undefined) {
			if(isSimpleType(toType(values[vars]))) {
				parameters += expandSimple(vars, op, values[vars]);
			} else if(isArray(toType(values[vars]))) {
				parameters += expandArray(vars, op, values[vars]);
			}
		}
		
		return parameters;
	}
	
	function modify(vars, size, op) {
		var parameters = "", v;
		if(values[vars] != undefined) {
			v = values[vars].substring(0, parseInt(size));
			if (op.named)
				parameters += vars + "=" + v;
			else
				parameters += v;

			parameters += op.separator;
		}

		return parameters;
	}
	
	function explode(vars, op) {
		var parameters = "";
		if(values[vars] != undefined) {
			if(isSimpleType(toType(values[vars]))) {
				parameters += expandSimple(vars, op, values[vars]);
			} else if(isArray(toType(values[vars]))) {
				parameters += explodeArray(vars, op, values[vars]);
			}
		}
		
		return parameters;
	}
	
	function expandSimple(value, op, obj) {
		var parameters = "";
		if(op.named)
			parameters += value + "=" + obj;
		else
			parameters += obj;
		
		parameters += op.separator;
		return parameters;
	}
	
	function expandArray(value, op, array) {
		var parameters = "",
			separator = ",", ob;
		if(op.named)
			parameters += value + "=";
			
		for(key in array) {
			ob = array[key];
			if(!isNaN(key)) { // an indexed array
				parameters += ob.toString() + separator;
			} else { // an associative array
				parameters += key.toString() + "," + ob.toString() + separator;
			}
		}
		
		parameters = parameters.substring(0, parameters.length - 1);
		parameters += op.separator;
		return parameters;
	}
	
	function explodeArray(value, op, array) {
		var parameters = "",
			separator = op.separator, ob;
		
		for(key in array) {
			ob = array[key];
			if(!isNaN(key)) { // an indexed array
				if (op.named) {
					parameters += value + "=" + ob.toString() + separator;
				} else {
					parameters += ob.toString() + separator;
				}
			} else { // associative array
				if (op.named) {
					parameters += key.toString() + "=" + ob.toString() + separator;
				} else {
					parameters += key.toString() + op.separator + ob.toString() + separator;
				}
			}
		}
		
		parameters = parameters.substring(0, parameters.length - 1);
		parameters += op.separator;
		return parameters;
	}
	
	function isSimpleType(value) {
		return value == "string" 
			|| value == "number" 
			|| value == "boolean";
	}
	
	function isArray(value) {
		return value == "array";
	}
	
	function toType(obj) {
 		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	}
};
