(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.cC.a7 === region.cX.a7)
	{
		return 'on line ' + region.cC.a7;
	}
	return 'on lines ' + region.cC.a7 + ' through ' + region.cX.a7;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.eh,
		impl.eI,
		impl.eE,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		af: func(record.af),
		cD: record.cD,
		ct: record.ct
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.af;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.cD;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.ct) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.eh,
		impl.eI,
		impl.eE,
		function(sendToApp, initialModel) {
			var view = impl.eK;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.eh,
		impl.eI,
		impl.eE,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.cB && impl.cB(sendToApp)
			var view = impl.eK;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.dZ);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.eG) && (_VirtualDom_doc.title = title = doc.eG);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.et;
	var onUrlRequest = impl.eu;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		cB: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.dx === next.dx
							&& curr.c2 === next.c2
							&& curr.dt.a === next.dt.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		eh: function(flags)
		{
			return A3(impl.eh, flags, _Browser_getUrl(), key);
		},
		eK: impl.eK,
		eI: impl.eI,
		eE: impl.eE
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { ef: 'hidden', d$: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { ef: 'mozHidden', d$: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { ef: 'msHidden', d$: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { ef: 'webkitHidden', d$: 'webkitvisibilitychange' }
		: { ef: 'hidden', d$: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aj: _Browser_getScene(),
		dP: {
			bF: _Browser_window.pageXOffset,
			bG: _Browser_window.pageYOffset,
			bE: _Browser_doc.documentElement.clientWidth,
			bo: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bE: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bo: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aj: {
				bE: node.scrollWidth,
				bo: node.scrollHeight
			},
			dP: {
				bF: node.scrollLeft,
				bG: node.scrollTop,
				bE: node.clientWidth,
				bo: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aj: _Browser_getScene(),
			dP: {
				bF: x,
				bG: y,
				bE: _Browser_doc.documentElement.clientWidth,
				bo: _Browser_doc.documentElement.clientHeight
			},
			d7: {
				bF: x + rect.left,
				bG: y + rect.top,
				bE: rect.width,
				bo: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.eq) { flags += 'm'; }
	if (options.d_) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _WebGL_log(/* msg */) {
  // console.log(msg);
}

var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {
  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (gl, setting) {
  gl.enable(gl.BLEND);
  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  gl.blendEquationSeparate(setting.a, setting.d);
  gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
  gl.blendColor(setting.g, setting.h, setting.i, setting.j);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (gl, setting) {
  gl.enable(gl.DEPTH_TEST);
  // a    b    c    d
  // func mask near far
  gl.depthFunc(setting.a);
  gl.depthMask(setting.b);
  gl.depthRange(setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (gl, setting) {
  gl.enable(gl.STENCIL_TEST);
  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  gl.stencilFuncSeparate(gl.FRONT, setting.d, setting.a, setting.b);
  gl.stencilOpSeparate(gl.FRONT, setting.e, setting.f, setting.g);
  gl.stencilMaskSeparate(gl.FRONT, setting.c);
  gl.stencilFuncSeparate(gl.BACK, setting.h, setting.a, setting.b);
  gl.stencilOpSeparate(gl.BACK, setting.i, setting.j, setting.k);
  gl.stencilMaskSeparate(gl.BACK, setting.c);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (gl, setting) {
  gl.enable(gl.SCISSOR_TEST);
  gl.scissor(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (gl, setting) {
  gl.colorMask(setting.a, setting.b, setting.c, setting.d);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (gl, setting) {
  gl.enable(gl.CULL_FACE);
  gl.cullFace(setting.a);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (gl, setting) {
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_COVERAGE);
  gl.sampleCoverage(setting.a, setting.b);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = F2(function (gl, setting) {
  gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
});

// eslint-disable-next-line no-unused-vars
var _WebGL_disableBlend = function (cache) {
  cache.gl.disable(cache.gl.BLEND);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableDepthTest = function (cache) {
  cache.gl.disable(cache.gl.DEPTH_TEST);
  cache.gl.depthMask(true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableStencilTest = function (cache) {
  cache.gl.disable(cache.gl.STENCIL_TEST);
  cache.gl.stencilMask(cache.STENCIL_WRITEMASK);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableScissor = function (cache) {
  cache.gl.disable(cache.gl.SCISSOR_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableColorMask = function (cache) {
  cache.gl.colorMask(true, true, true, true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableCullFace = function (cache) {
  cache.gl.disable(cache.gl.CULL_FACE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disablePolygonOffset = function (cache) {
  cache.gl.disable(cache.gl.POLYGON_OFFSET_FILL);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_COVERAGE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleAlphaToCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
};

function _WebGL_doCompile(gl, src, type) {

  var shader = gl.createShader(type);
  _WebGL_log('Created shader');

  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }

  return shader;

}

function _WebGL_doLink(gl, vshader, fshader) {

  var program = gl.createProgram();
  _WebGL_log('Created program');

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program);
  }

  return program;

}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_MAT4:
      return { size: 4, arraySize: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, arraySize: 1, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.cW;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var dataOffset = attributeInfo.size * attributeInfo.arraySize * elemSize;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * dataOffset);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size * attributeInfo.arraySize, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += dataOffset;
  }, mesh.b);

  var buffer = gl.createBuffer();
  _WebGL_log('Created attribute buffer ' + attribute.name);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer|null} buffer.indexBuffer - optional index buffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  if (mesh.a.c4 > 0) {
    _WebGL_log('Created index buffer');
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.c4);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.cW * _WebGL_listLength(mesh.b),
      indexBuffer: null,
      buffers: {}
    };
  }
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint16Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint16Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {

  var gl = model.f.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
  _WebGL_log('Drawing');

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = model.f.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = model.f.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        model.f.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = model.f.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        model.f.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        uniformSetters: _WebGL_createUniformSetters(
          gl,
          model,
          glProgram,
          Object.assign({}, entity.b.uniforms, entity.c.uniforms)
        )
      };

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      model.f.programs[progid] = program;

    }

    gl.useProgram(program.glProgram);

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = model.f.buffers.get(entity.d);

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      model.f.buffers.set(entity.d, buffer);
    }

    var numAttributes = gl.getProgramParameter(program.glProgram, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < numAttributes; i++) {
      var attribute = gl.getActiveAttrib(program.glProgram, i);

      var attribLocation = gl.getAttribLocation(program.glProgram, attribute.name);
      gl.enableVertexAttribArray(attribLocation);

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      var attributeBuffer = buffer.buffers[attribute.name];
      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

      gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer);

      if (attributeInfo.arraySize === 1) {
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      } else {
        // Point to four vec4 in case of mat4
        var offset = attributeInfo.size * 4; // float32 takes 4 bytes
        var stride = offset * attributeInfo.arraySize;
        for (var m = 0; m < attributeInfo.arraySize; m++) {
          gl.enableVertexAttribArray(attribLocation + m);
          gl.vertexAttribPointer(attribLocation + m, attributeInfo.size, attributeInfo.baseType, false, stride, offset * m);
        }
      }
    }
    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$enableSetting(gl), entity.a);

    if (buffer.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);
      gl.drawElements(entity.d.a.dm, buffer.numIndices, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(entity.d.a.dm, 0, buffer.numIndices);
    }

    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$disableSetting(model.f), entity.a);

  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var textureCounter = 0;
  function createUniformSetter(program, uniform) {
    var uniformLocation = gl.getUniformLocation(program, uniform.name);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      case gl.FLOAT:
        return function (value) {
          gl.uniform1f(uniformLocation, value);
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          gl.uniform2fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          gl.uniform3fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          gl.uniform4fv(uniformLocation, new Float32Array(value));
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = model.f.textures.get(texture);
          if (!tex) {
            _WebGL_log('Created texture');
            tex = texture.d3(gl);
            model.f.textures.set(texture, tex);
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.uniform1i(uniformLocation, currentTexture);
        };
      case gl.BOOL:
        return function (value) {
          gl.uniform1i(uniformLocation, value);
        };
      default:
        _WebGL_log('Unsupported uniform type: ' + uniform.type);
        return function () { };
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(program, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(program, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePreserveDrawingBuffer = F2(function (options, option) {
  options.contextAttributes.preserveDrawingBuffer = true;
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2($elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  _WebGL_log('Render canvas');
  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl && typeof WeakMap !== 'undefined') {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });

    model.f.gl = gl;
    model.f.shaders = [];
    model.f.programs = {};
    model.f.buffers = new WeakMap();
    model.f.textures = new WeakMap();
    // Memorize the initial stencil write mask, because
    // browsers may have different number of stencil bits
    model.f.STENCIL_WRITEMASK = gl.getParameter(gl.STENCIL_WRITEMASK);

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet
    _WebGL_rAF(function () {
      return A2(_WebGL_drawGL, model, canvas);
    });

  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { bF: a[0], bG: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.bF, r.bG]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { bF: a[0], bG: a[1], bH: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.bF, r.bG, r.bH]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { bF: a[0], bG: a[1], bH: a[2], dQ: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.bF, r.bG, r.bH, r.dQ]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.bZ;
    m[1] = r.b1;
    m[2] = r.b5;
    m[3] = r.b9;
    m[4] = r.b_;
    m[5] = r.b2;
    m[6] = r.b6;
    m[7] = r.ca;
    m[8] = r.b$;
    m[9] = r.b3;
    m[10] = r.b7;
    m[11] = r.cb;
    m[12] = r.b0;
    m[13] = r.b4;
    m[14] = r.b8;
    m[15] = r.cc;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        bZ: m[0], b1: m[1], b5: m[2], b9: m[3],
        b_: m[4], b2: m[5], b6: m[6], ca: m[7],
        b$: m[8], b3: m[9], b7: m[10], cb: m[11],
        b0: m[12], b4: m[13], b8: m[14], cc: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.k) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.n),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.n);
		} else {
			var treeLen = builder.k * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.x) : builder.x;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.k);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.n) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.n);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{x: nodeList, k: (len / $elm$core$Array$branchFactor) | 0, n: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {c1: fragment, c2: host, dr: path, dt: port_, dx: protocol, dy: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$getSource = function (s) {
	return A3($elm$parser$Parser$Advanced$Good, false, s.a, s);
};
var $elm$parser$Parser$getSource = $elm$parser$Parser$Advanced$getSource;
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $elm$core$Basics$pi = _Basics_pi;
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Angle$radians = function (numRadians) {
	return numRadians;
};
var $ianmackenzie$elm_units$Angle$degrees = function (numDegrees) {
	return $ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi * (numDegrees / 180));
};
var $ianmackenzie$elm_units$Length$meters = function (numMeters) {
	return numMeters;
};
var $ianmackenzie$elm_geometry$Geometry$Types$Vector3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector3d$meters = F3(
	function (x, y, z) {
		return {bF: x, bG: y, bH: z};
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $avh4$elm_color$Color$white = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var $ianmackenzie$elm_geometry$Vector3d$zero = {bF: 0, bG: 0, bH: 0};
var $author$project$Visualizer$noMove = {A: $avh4$elm_color$Color$white, ai: $ianmackenzie$elm_geometry$Vector3d$zero, E: $ianmackenzie$elm_geometry$Vector3d$zero};
var $ianmackenzie$elm_geometry$Vector3d$withLength = F2(
	function (_v0, _v1) {
		var a = _v0;
		var d = _v1;
		return {bF: a * d.bF, bG: a * d.bG, bH: a * d.bH};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Direction3d = $elm$core$Basics$identity;
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sin = _Basics_sin;
var $ianmackenzie$elm_geometry$Direction3d$zxY = F2(
	function (_v0, _v1) {
		var theta = _v0;
		var phi = _v1;
		var cosPhi = $elm$core$Basics$cos(phi);
		return {
			bF: cosPhi * $elm$core$Basics$sin(theta),
			bG: $elm$core$Basics$sin(phi),
			bH: cosPhi * $elm$core$Basics$cos(theta)
		};
	});
var $author$project$Visualizer$neutralPose = {
	a_: $author$project$Visualizer$noMove,
	a0: $author$project$Visualizer$noMove,
	a2: $author$project$Visualizer$noMove,
	ae: _Utils_update(
		$author$project$Visualizer$noMove,
		{
			E: A2(
				$ianmackenzie$elm_geometry$Vector3d$withLength,
				$ianmackenzie$elm_units$Length$meters(1),
				A2(
					$ianmackenzie$elm_geometry$Direction3d$zxY,
					$ianmackenzie$elm_units$Angle$degrees(45),
					$ianmackenzie$elm_units$Angle$degrees(195)))
		}),
	ba: $author$project$Visualizer$noMove,
	bc: $author$project$Visualizer$noMove,
	aj: _Utils_update(
		$author$project$Visualizer$noMove,
		{
			A: $avh4$elm_color$Color$black,
			E: A3($ianmackenzie$elm_geometry$Vector3d$meters, 0, 5, -20)
		}),
	bg: $author$project$Visualizer$noMove
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {cT: col, d2: contextStack, du: problem, dC: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.dC, s.cT, x, s.e));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.a),
			s.b) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cT: 1, e: s.e, h: s.h, b: s.b + 1, dC: s.dC + 1, a: s.a}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cT: s.cT + 1, e: s.e, h: s.h, b: newOffset, dC: s.dC, a: s.a}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.b, s.dC, s.cT, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cT: newCol, e: s.e, h: s.h, b: newOffset, dC: newRow, a: s.a});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$Visualizer$noteParser = function () {
	var isNote = function (code) {
		return (65 <= code) && (code <= 71);
	};
	return $elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$chompIf(
				A2($elm$core$Basics$composeL, isNote, $elm$core$Char$toCode)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						$elm$parser$Parser$symbol('#'),
						$elm$parser$Parser$succeed(0)
					]))));
}();
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $avh4$elm_color$Color$darkBlue = A4($avh4$elm_color$Color$RgbaSpace, 32 / 255, 74 / 255, 135 / 255, 1.0);
var $avh4$elm_color$Color$darkBrown = A4($avh4$elm_color$Color$RgbaSpace, 143 / 255, 89 / 255, 2 / 255, 1.0);
var $avh4$elm_color$Color$darkGreen = A4($avh4$elm_color$Color$RgbaSpace, 78 / 255, 154 / 255, 6 / 255, 1.0);
var $avh4$elm_color$Color$darkOrange = A4($avh4$elm_color$Color$RgbaSpace, 206 / 255, 92 / 255, 0 / 255, 1.0);
var $avh4$elm_color$Color$darkPurple = A4($avh4$elm_color$Color$RgbaSpace, 92 / 255, 53 / 255, 102 / 255, 1.0);
var $avh4$elm_color$Color$darkRed = A4($avh4$elm_color$Color$RgbaSpace, 164 / 255, 0 / 255, 0 / 255, 1.0);
var $avh4$elm_color$Color$darkYellow = A4($avh4$elm_color$Color$RgbaSpace, 196 / 255, 160 / 255, 0 / 255, 1.0);
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 9, a: a};
};
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.b, s.dC, s.cT, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return (_Utils_eq(newOffset, -1) || (0 <= A3(
			$elm$parser$Parser$Advanced$isSubChar,
			function (c) {
				return $elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			newOffset,
			s.a))) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cT: newCol, e: s.e, h: s.h, b: newOffset, dC: newRow, a: s.a});
	};
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $ianmackenzie$elm_geometry$Direction3d$unsafe = function (components) {
	return components;
};
var $ianmackenzie$elm_geometry$Direction3d$negativeX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bF: -1, bG: 0, bH: 0});
var $ianmackenzie$elm_geometry$Direction3d$negativeY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bF: 0, bG: -1, bH: 0});
var $ianmackenzie$elm_geometry$Direction3d$negativeZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bF: 0, bG: 0, bH: -1});
var $elm$parser$Parser$ExpectingFloat = {$: 5};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {cT: s.cT + (newOffset - s.b), e: s.e, h: s.h, b: newOffset, dC: s.dC, a: s.a};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.b, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.a);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.dC, s.cT - (floatOffset + s.b), invalid, s.e));
		} else {
			if (_Utils_eq(s.b, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.b, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.b, floatOffset, s.a));
						if (_v1.$ === 1) {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.b, s.a)) {
			var zeroOffset = s.b + 1;
			var baseOffset = zeroOffset + 1;
			return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.ek,
				c.ee,
				baseOffset,
				A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.a),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.ek,
				c.dp,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.a),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.ek,
				c.cO,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.a),
				s) : A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.ek,
				c.cZ,
				c.c6,
				c.c0,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.ek,
				c.cZ,
				c.c6,
				c.c0,
				A3($elm$parser$Parser$Advanced$consumeBase, 10, s.b, s.a),
				s);
		}
	};
};
var $elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				cO: $elm$core$Result$Err(invalid),
				cZ: expecting,
				c0: $elm$core$Result$Ok($elm$core$Basics$identity),
				ee: $elm$core$Result$Err(invalid),
				c6: $elm$core$Result$Ok($elm$core$Basics$toFloat),
				ek: invalid,
				dp: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$float = A2($elm$parser$Parser$Advanced$float, $elm$parser$Parser$ExpectingFloat, $elm$parser$Parser$ExpectingFloat);
var $author$project$Visualizer$numberParser = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$negate),
				$elm$parser$Parser$symbol('-')),
			$elm$parser$Parser$float),
			$elm$parser$Parser$float
		]));
var $ianmackenzie$elm_geometry$Direction3d$positiveX = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bF: 1, bG: 0, bH: 0});
var $ianmackenzie$elm_geometry$Direction3d$positiveY = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bF: 0, bG: 1, bH: 0});
var $ianmackenzie$elm_geometry$Direction3d$positiveZ = $ianmackenzie$elm_geometry$Direction3d$unsafe(
	{bF: 0, bG: 0, bH: 1});
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{cT: col, e: s0.e, h: s0.h, b: offset, dC: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.dC, s.cT, s);
	};
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $author$project$Visualizer$vectorIn = F2(
	function (dir, length) {
		return A2(
			$ianmackenzie$elm_geometry$Vector3d$withLength,
			$ianmackenzie$elm_units$Length$meters(length),
			dir);
	});
var $ianmackenzie$elm_geometry$Direction3d$x = $ianmackenzie$elm_geometry$Direction3d$positiveX;
var $ianmackenzie$elm_geometry$Direction3d$y = $ianmackenzie$elm_geometry$Direction3d$positiveY;
var $ianmackenzie$elm_geometry$Direction3d$z = $ianmackenzie$elm_geometry$Direction3d$positiveZ;
var $author$project$Visualizer$moveKeywordParser = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (dir, x) {
							return _Utils_update(
								$author$project$Visualizer$noMove,
								{
									ai: A2($author$project$Visualizer$vectorIn, dir, x)
								});
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$x),
								$elm$parser$Parser$keyword('pitch')),
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$y),
								$elm$parser$Parser$keyword('yaw')),
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$z),
								$elm$parser$Parser$keyword('roll'))
							])),
					$elm$parser$Parser$spaces)),
			$author$project$Visualizer$numberParser),
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (dir, x) {
							return _Utils_update(
								$author$project$Visualizer$noMove,
								{
									E: A2($author$project$Visualizer$vectorIn, dir, x)
								});
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$positiveY),
								$elm$parser$Parser$keyword('up')),
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$negativeY),
								$elm$parser$Parser$keyword('down')),
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$positiveX),
								$elm$parser$Parser$keyword('right')),
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$negativeX),
								$elm$parser$Parser$keyword('left')),
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$positiveZ),
								$elm$parser$Parser$keyword('forward')),
								A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed($ianmackenzie$elm_geometry$Direction3d$negativeZ),
								$elm$parser$Parser$keyword('back'))
							])),
					$elm$parser$Parser$spaces)),
			$author$project$Visualizer$numberParser),
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						function (x) {
							return _Utils_update(
								$author$project$Visualizer$noMove,
								{A: x});
						}),
					$elm$parser$Parser$keyword('fill')),
				$elm$parser$Parser$spaces),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_color$Color$darkRed),
						$elm$parser$Parser$keyword('red')),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_color$Color$darkOrange),
						$elm$parser$Parser$keyword('orange')),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_color$Color$darkYellow),
						$elm$parser$Parser$keyword('yellow')),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_color$Color$darkGreen),
						$elm$parser$Parser$keyword('green')),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_color$Color$darkBlue),
						$elm$parser$Parser$keyword('blue')),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_color$Color$darkPurple),
						$elm$parser$Parser$keyword('purple')),
						A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($avh4$elm_color$Color$darkBrown),
						$elm$parser$Parser$keyword('brown'))
					])))
		]));
var $author$project$Visualizer$moveParser = function (_v0) {
	var old = _v0.a;
	var setter = _v0.b;
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed($elm$core$Basics$apR),
					$author$project$Visualizer$moveKeywordParser),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						function (x) {
							return $elm$parser$Parser$Loop(
								_Utils_Tuple2(
									A2(setter, x, old),
									setter));
						}),
					$elm$parser$Parser$spaces)),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(old))
			]));
};
var $ianmackenzie$elm_geometry$Vector3d$plus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {bF: v1.bF + v2.bF, bG: v1.bG + v2.bG, bH: v1.bH + v2.bH};
	});
var $author$project$Visualizer$merge = F2(
	function (a, b) {
		return {
			A: _Utils_eq(b.A, $avh4$elm_color$Color$white) ? a.A : b.A,
			ai: A2($ianmackenzie$elm_geometry$Vector3d$plus, a.ai, b.ai),
			E: A2($ianmackenzie$elm_geometry$Vector3d$plus, a.E, b.E)
		};
	});
var $author$project$Visualizer$partKeywordParser = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								a_: A2($author$project$Visualizer$merge, a.a_, x)
							});
					})),
			$elm$parser$Parser$keyword('head')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								bg: A2($author$project$Visualizer$merge, a.bg, x)
							});
					})),
			$elm$parser$Parser$keyword('torso')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								a0: A2($author$project$Visualizer$merge, a.a0, x)
							});
					})),
			$elm$parser$Parser$keyword('leftarm')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								ba: A2($author$project$Visualizer$merge, a.ba, x)
							});
					})),
			$elm$parser$Parser$keyword('rightarm')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								a2: A2($author$project$Visualizer$merge, a.a2, x)
							});
					})),
			$elm$parser$Parser$keyword('leftleg')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								bc: A2($author$project$Visualizer$merge, a.bc, x)
							});
					})),
			$elm$parser$Parser$keyword('rightleg')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								aj: A2($author$project$Visualizer$merge, a.aj, x)
							});
					})),
			$elm$parser$Parser$keyword('scene')),
			A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(
				F2(
					function (x, a) {
						return _Utils_update(
							a,
							{
								ae: A2($author$project$Visualizer$merge, a.ae, x)
							});
					})),
			$elm$parser$Parser$keyword('light'))
		]));
var $author$project$Visualizer$partParser = function (old) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (setter) {
					return A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$parser$Parser$Loop),
							$elm$parser$Parser$spaces),
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$loop,
								_Utils_Tuple2(old, setter),
								$author$project$Visualizer$moveParser),
							$elm$parser$Parser$spaces));
				},
				$author$project$Visualizer$partKeywordParser),
				$elm$parser$Parser$succeed(
				$elm$parser$Parser$Done(old))
			]));
};
var $author$project$Visualizer$poseParser = function (poses) {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F3(
						function (note, pose, loop) {
							return loop(
								A3($elm$core$Dict$insert, note, pose, poses));
						})),
				A2($elm$parser$Parser$ignorer, $author$project$Visualizer$noteParser, $elm$parser$Parser$spaces)),
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$loop, $author$project$Visualizer$neutralPose, $author$project$Visualizer$partParser),
				$elm$parser$Parser$spaces)),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$parser$Parser$Done),
					$elm$parser$Parser$end),
					$elm$parser$Parser$succeed($elm$parser$Parser$Loop)
				])));
};
var $author$project$Visualizer$planParser = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$spaces),
	A2($elm$parser$Parser$loop, $elm$core$Dict$empty, $author$project$Visualizer$poseParser));
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Visualizer$danceParser = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed(
			F2(
				function (code, plan) {
					var _v0 = function () {
						var _v1 = $elm$core$Dict$values(plan);
						if (_v1.b) {
							if (_v1.b.b) {
								var a = _v1.a;
								var _v2 = _v1.b;
								var b = _v2.a;
								return _Utils_Tuple2(a, b);
							} else {
								var one = _v1.a;
								return _Utils_Tuple2(one, one);
							}
						} else {
							return _Utils_Tuple2($author$project$Visualizer$neutralPose, $author$project$Visualizer$neutralPose);
						}
					}();
					var prev = _v0.a;
					var next = _v0.b;
					return {ap: code, ar: false, P: next, a9: plan, X: prev};
				})),
		$elm$parser$Parser$getSource),
	$author$project$Visualizer$planParser);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {cT: col, du: problem, dC: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.dC, p.cT, p.du);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{cT: 1, e: _List_Nil, h: 1, b: 0, dC: 1, a: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$core$String$trimLeft = _String_trimLeft;
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Visualizer$defaultDance = function () {
	var code = $elm$core$String$trimLeft('\nC\nhead      left 0.2\ntorso     left 0.2     roll 5\nleftarm   down 0.15    left 0.15   back 1\nrightarm  forward 1    pitch -15\nrightleg  pitch 30\nscene     fill blue    back 10\n\nG\nhead      right 0.2\ntorso     right 0.2    roll -5\nrightarm  down 0.15    right 0.15  back 1\nleftarm   forward 1    pitch -15\nleftleg   pitch 30\nscene     fill purple  back 5\n\nA\nhead      up 0.5       fill green\nleftarm   up 1         left .5    roll 30\nrightarm  up 1         right .5   roll -30\nlight     down 1       fill green\n');
	return A2(
		$elm$core$Result$withDefault,
		{ap: code, ar: true, P: $author$project$Visualizer$neutralPose, a9: $elm$core$Dict$empty, X: $author$project$Visualizer$neutralPose},
		A2($elm$parser$Parser$run, $author$project$Visualizer$danceParser, code));
}();
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $truqu$elm_base64$Base64$Decode$pad = function (input) {
	var _v0 = $elm$core$String$length(input) % 4;
	switch (_v0) {
		case 3:
			return input + '=';
		case 2:
			return input + '==';
		default:
			return input;
	}
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $truqu$elm_base64$Base64$Decode$charToInt = function (_char) {
	switch (_char) {
		case 'A':
			return 0;
		case 'B':
			return 1;
		case 'C':
			return 2;
		case 'D':
			return 3;
		case 'E':
			return 4;
		case 'F':
			return 5;
		case 'G':
			return 6;
		case 'H':
			return 7;
		case 'I':
			return 8;
		case 'J':
			return 9;
		case 'K':
			return 10;
		case 'L':
			return 11;
		case 'M':
			return 12;
		case 'N':
			return 13;
		case 'O':
			return 14;
		case 'P':
			return 15;
		case 'Q':
			return 16;
		case 'R':
			return 17;
		case 'S':
			return 18;
		case 'T':
			return 19;
		case 'U':
			return 20;
		case 'V':
			return 21;
		case 'W':
			return 22;
		case 'X':
			return 23;
		case 'Y':
			return 24;
		case 'Z':
			return 25;
		case 'a':
			return 26;
		case 'b':
			return 27;
		case 'c':
			return 28;
		case 'd':
			return 29;
		case 'e':
			return 30;
		case 'f':
			return 31;
		case 'g':
			return 32;
		case 'h':
			return 33;
		case 'i':
			return 34;
		case 'j':
			return 35;
		case 'k':
			return 36;
		case 'l':
			return 37;
		case 'm':
			return 38;
		case 'n':
			return 39;
		case 'o':
			return 40;
		case 'p':
			return 41;
		case 'q':
			return 42;
		case 'r':
			return 43;
		case 's':
			return 44;
		case 't':
			return 45;
		case 'u':
			return 46;
		case 'v':
			return 47;
		case 'w':
			return 48;
		case 'x':
			return 49;
		case 'y':
			return 50;
		case 'z':
			return 51;
		case '0':
			return 52;
		case '1':
			return 53;
		case '2':
			return 54;
		case '3':
			return 55;
		case '4':
			return 56;
		case '5':
			return 57;
		case '6':
			return 58;
		case '7':
			return 59;
		case '8':
			return 60;
		case '9':
			return 61;
		case '+':
			return 62;
		case '/':
			return 63;
		default:
			return 0;
	}
};
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$fromCode = _Char_fromCode;
var $truqu$elm_base64$Base64$Decode$intToString = A2($elm$core$Basics$composeR, $elm$core$Char$fromCode, $elm$core$String$fromChar);
var $truqu$elm_base64$Base64$Decode$add = F2(
	function (_char, _v0) {
		var curr = _v0.a;
		var need = _v0.b;
		var res = _v0.c;
		var shiftAndAdd = function (_int) {
			return (63 & _int) | (curr << 6);
		};
		return (!need) ? ((!(128 & _char)) ? _Utils_Tuple3(
			0,
			0,
			_Utils_ap(
				res,
				$truqu$elm_base64$Base64$Decode$intToString(_char))) : (((224 & _char) === 192) ? _Utils_Tuple3(31 & _char, 1, res) : (((240 & _char) === 224) ? _Utils_Tuple3(15 & _char, 2, res) : _Utils_Tuple3(7 & _char, 3, res)))) : ((need === 1) ? _Utils_Tuple3(
			0,
			0,
			_Utils_ap(
				res,
				$truqu$elm_base64$Base64$Decode$intToString(
					shiftAndAdd(_char)))) : _Utils_Tuple3(
			shiftAndAdd(_char),
			need - 1,
			res));
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $truqu$elm_base64$Base64$Decode$toUTF16 = F2(
	function (_char, acc) {
		return _Utils_Tuple3(
			0,
			0,
			A2(
				$truqu$elm_base64$Base64$Decode$add,
				255 & (_char >>> 0),
				A2(
					$truqu$elm_base64$Base64$Decode$add,
					255 & (_char >>> 8),
					A2($truqu$elm_base64$Base64$Decode$add, 255 & (_char >>> 16), acc))));
	});
var $truqu$elm_base64$Base64$Decode$chomp = F2(
	function (char_, _v0) {
		var curr = _v0.a;
		var cnt = _v0.b;
		var utf8ToUtf16 = _v0.c;
		var _char = $truqu$elm_base64$Base64$Decode$charToInt(char_);
		if (cnt === 3) {
			return A2($truqu$elm_base64$Base64$Decode$toUTF16, curr | _char, utf8ToUtf16);
		} else {
			return _Utils_Tuple3((_char << ((3 - cnt) * 6)) | curr, cnt + 1, utf8ToUtf16);
		}
	});
var $elm$core$String$foldl = _String_foldl;
var $truqu$elm_base64$Base64$Decode$initial = _Utils_Tuple3(
	0,
	0,
	_Utils_Tuple3(0, 0, ''));
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$endsWith = _String_endsWith;
var $truqu$elm_base64$Base64$Decode$stripNulls = F2(
	function (input, output) {
		return A2($elm$core$String$endsWith, '==', input) ? A2($elm$core$String$dropRight, 2, output) : (A2($elm$core$String$endsWith, '=', input) ? A2($elm$core$String$dropRight, 1, output) : output);
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {bq: index, em: match, es: number, eD: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{d_: false, eq: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $truqu$elm_base64$Base64$Decode$validBase64Regex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^([A-Za-z0-9\\/+]{4})*([A-Za-z0-9\\/+]{2}[A-Za-z0-9\\/+=]{2})?$'));
var $truqu$elm_base64$Base64$Decode$validate = function (input) {
	return A2($elm$regex$Regex$contains, $truqu$elm_base64$Base64$Decode$validBase64Regex, input) ? $elm$core$Result$Ok(input) : $elm$core$Result$Err('Invalid base64');
};
var $truqu$elm_base64$Base64$Decode$wrapUp = function (_v0) {
	var _v1 = _v0.c;
	var need = _v1.b;
	var res = _v1.c;
	return (need > 0) ? $elm$core$Result$Err('Invalid UTF-16') : $elm$core$Result$Ok(res);
};
var $truqu$elm_base64$Base64$Decode$validateAndDecode = function (input) {
	return A2(
		$elm$core$Result$map,
		$truqu$elm_base64$Base64$Decode$stripNulls(input),
		A2(
			$elm$core$Result$andThen,
			A2(
				$elm$core$Basics$composeR,
				A2($elm$core$String$foldl, $truqu$elm_base64$Base64$Decode$chomp, $truqu$elm_base64$Base64$Decode$initial),
				$truqu$elm_base64$Base64$Decode$wrapUp),
			$truqu$elm_base64$Base64$Decode$validate(input)));
};
var $truqu$elm_base64$Base64$Decode$decode = A2($elm$core$Basics$composeR, $truqu$elm_base64$Base64$Decode$pad, $truqu$elm_base64$Base64$Decode$validateAndDecode);
var $truqu$elm_base64$Base64$decode = $truqu$elm_base64$Base64$Decode$decode;
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $author$project$Visualizer$hashParser = A2(
	$elm$parser$Parser$andThen,
	function (x) {
		var _v1 = $truqu$elm_base64$Base64$decode(x);
		if (_v1.$ === 1) {
			var reason = _v1.a;
			return $elm$parser$Parser$problem(reason);
		} else {
			var code = _v1.a;
			return $elm$parser$Parser$succeed(
				A2(
					$elm$core$Result$mapError,
					function (_v2) {
						return code;
					},
					A2($elm$parser$Parser$run, $author$project$Visualizer$danceParser, code)));
		}
	},
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$chompWhile(
				function (x) {
					return (x === '#') || (x === '!');
				})),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$getChompedString(
				$elm$parser$Parser$chompWhile(
					function (_v0) {
						return true;
					})),
			$elm$parser$Parser$end)));
var $author$project$Visualizer$Clock = F4(
	function (index, lastUpdated, samples, quarterNote) {
		return {bq: index, bQ: lastUpdated, cu: quarterNote, bz: samples};
	});
var $author$project$Visualizer$initialClock = A4($author$project$Visualizer$Clock, 0, 0, $elm$core$Array$empty, 1000);
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Visualizer$init = function (flags) {
	var dance = function () {
		if (A2(
			$elm$core$List$member,
			flags.bn,
			_List_fromArray(
				['', '#', '#!']))) {
			return $author$project$Visualizer$defaultDance;
		} else {
			var _v0 = A2($elm$parser$Parser$run, $author$project$Visualizer$hashParser, flags.bn);
			if (_v0.$ === 1) {
				var reason = _v0.a;
				return $author$project$Visualizer$defaultDance;
			} else {
				if (!_v0.a.$) {
					var loadedDance = _v0.a.a;
					return loadedDance;
				} else {
					var code = _v0.a.a;
					return _Utils_update(
						$author$project$Visualizer$defaultDance,
						{ap: code, ar: true});
				}
			}
		}
	}();
	return _Utils_Tuple2(
		{ao: $author$project$Visualizer$initialClock, j: dance, bo: flags.bo, bv: 0, bE: flags.bE},
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Visualizer$GotMidiMessage = function (a) {
	return {$: 1, a: a};
};
var $author$project$Visualizer$Resize = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Visualizer$midiMessage = _Platform_incomingPort(
	'midiMessage',
	A2(
		$elm$json$Json$Decode$andThen,
		function (_v0) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (_v1) {
					return $elm$json$Json$Decode$succeed(
						_Utils_Tuple2(_v0, _v1));
				},
				A2(
					$elm$json$Json$Decode$index,
					1,
					$elm$json$Json$Decode$list($elm$json$Json$Decode$int)));
		},
		A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$float)));
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {ds: pids, dK: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {cY: event, c9: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.ds,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.c9;
		var event = _v0.cY;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.dK);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Visualizer$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Visualizer$midiMessage($author$project$Visualizer$GotMidiMessage),
				$elm$browser$Browser$Events$onResize($author$project$Visualizer$Resize)
			]));
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$Visualizer$nextPose = F2(
	function (note, dance) {
		return A2(
			$elm$core$Maybe$withDefault,
			dance.P,
			A2($elm$core$Dict$get, note, dance.a9));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{x: nodeList, k: nodeListSize, n: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $author$project$Visualizer$notes = $elm$core$Array$fromList(
	_List_fromArray(
		['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']));
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $author$project$Visualizer$clockFromSamples = F3(
	function (lastUpdated, index, samples) {
		return A4(
			$author$project$Visualizer$Clock,
			index,
			lastUpdated,
			samples,
			(6 * A3($elm$core$Array$foldl, $elm$core$Basics$add, 0, samples)) / $elm$core$Array$length(samples));
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $author$project$Visualizer$samplesToKeep = (24 * 4) * 4;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $author$project$Visualizer$updateClock = F2(
	function (now, clock) {
		var diff = now - clock.bQ;
		return (_Utils_cmp(
			$elm$core$Array$length(clock.bz),
			$author$project$Visualizer$samplesToKeep) < 0) ? A3(
			$author$project$Visualizer$clockFromSamples,
			now,
			clock.bq,
			A2($elm$core$Array$push, diff, clock.bz)) : A3(
			$author$project$Visualizer$clockFromSamples,
			now,
			clock.bq + 1,
			A3(
				$elm$core$Array$set,
				A2($elm$core$Basics$modBy, $author$project$Visualizer$samplesToKeep, clock.bq),
				diff,
				clock.bz));
	});
var $author$project$Visualizer$applyMidi = F3(
	function (now, data, model) {
		var dance = model.j;
		_v0$2:
		while (true) {
			if (data.b) {
				if (!data.b.b) {
					if (data.a === 248) {
						return _Utils_update(
							model,
							{
								ao: A2($author$project$Visualizer$updateClock, now, model.ao)
							});
					} else {
						break _v0$2;
					}
				} else {
					if (data.b.b.b && (!data.b.b.b.b)) {
						var status = data.a;
						var _v1 = data.b;
						var midinote = _v1.a;
						var _v2 = _v1.b;
						if ((status >> 4) !== 9) {
							return model;
						} else {
							var _v3 = A2(
								$elm$core$Array$get,
								A2($elm$core$Basics$modBy, 12, midinote),
								$author$project$Visualizer$notes);
							if (_v3.$ === 1) {
								return model;
							} else {
								var note = _v3.a;
								return _Utils_update(
									model,
									{
										j: _Utils_update(
											dance,
											{
												P: A2($author$project$Visualizer$nextPose, note, dance),
												X: dance.P
											}),
										bv: now + model.ao.cu
									});
							}
						}
					} else {
						break _v0$2;
					}
				}
			} else {
				break _v0$2;
			}
		}
		return model;
	});
var $truqu$elm_base64$Base64$Encode$intToBase64 = function (i) {
	switch (i) {
		case 0:
			return 'A';
		case 1:
			return 'B';
		case 2:
			return 'C';
		case 3:
			return 'D';
		case 4:
			return 'E';
		case 5:
			return 'F';
		case 6:
			return 'G';
		case 7:
			return 'H';
		case 8:
			return 'I';
		case 9:
			return 'J';
		case 10:
			return 'K';
		case 11:
			return 'L';
		case 12:
			return 'M';
		case 13:
			return 'N';
		case 14:
			return 'O';
		case 15:
			return 'P';
		case 16:
			return 'Q';
		case 17:
			return 'R';
		case 18:
			return 'S';
		case 19:
			return 'T';
		case 20:
			return 'U';
		case 21:
			return 'V';
		case 22:
			return 'W';
		case 23:
			return 'X';
		case 24:
			return 'Y';
		case 25:
			return 'Z';
		case 26:
			return 'a';
		case 27:
			return 'b';
		case 28:
			return 'c';
		case 29:
			return 'd';
		case 30:
			return 'e';
		case 31:
			return 'f';
		case 32:
			return 'g';
		case 33:
			return 'h';
		case 34:
			return 'i';
		case 35:
			return 'j';
		case 36:
			return 'k';
		case 37:
			return 'l';
		case 38:
			return 'm';
		case 39:
			return 'n';
		case 40:
			return 'o';
		case 41:
			return 'p';
		case 42:
			return 'q';
		case 43:
			return 'r';
		case 44:
			return 's';
		case 45:
			return 't';
		case 46:
			return 'u';
		case 47:
			return 'v';
		case 48:
			return 'w';
		case 49:
			return 'x';
		case 50:
			return 'y';
		case 51:
			return 'z';
		case 52:
			return '0';
		case 53:
			return '1';
		case 54:
			return '2';
		case 55:
			return '3';
		case 56:
			return '4';
		case 57:
			return '5';
		case 58:
			return '6';
		case 59:
			return '7';
		case 60:
			return '8';
		case 61:
			return '9';
		case 62:
			return '+';
		default:
			return '/';
	}
};
var $truqu$elm_base64$Base64$Encode$toBase64 = function (_int) {
	return _Utils_ap(
		$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 18)),
		_Utils_ap(
			$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 12)),
			_Utils_ap(
				$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 6)),
				$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 0)))));
};
var $truqu$elm_base64$Base64$Encode$add = F2(
	function (_char, _v0) {
		var res = _v0.a;
		var count = _v0.b;
		var acc = _v0.c;
		var current = (acc << 8) | _char;
		if (count === 2) {
			return _Utils_Tuple3(
				_Utils_ap(
					res,
					$truqu$elm_base64$Base64$Encode$toBase64(current)),
				0,
				0);
		} else {
			return _Utils_Tuple3(res, count + 1, current);
		}
	});
var $truqu$elm_base64$Base64$Encode$chomp = F2(
	function (char_, acc) {
		var _char = $elm$core$Char$toCode(char_);
		return (_char < 128) ? A2($truqu$elm_base64$Base64$Encode$add, _char, acc) : ((_char < 2048) ? A2(
			$truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2($truqu$elm_base64$Base64$Encode$add, 192 | (_char >>> 6), acc)) : (((_char < 55296) || ((_char >= 57344) && (_char <= 65535))) ? A2(
			$truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				$truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2($truqu$elm_base64$Base64$Encode$add, 224 | (_char >>> 12), acc))) : A2(
			$truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				$truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2(
					$truqu$elm_base64$Base64$Encode$add,
					128 | (63 & (_char >>> 12)),
					A2($truqu$elm_base64$Base64$Encode$add, 240 | (_char >>> 18), acc))))));
	});
var $truqu$elm_base64$Base64$Encode$initial = _Utils_Tuple3('', 0, 0);
var $truqu$elm_base64$Base64$Encode$wrapUp = function (_v0) {
	var res = _v0.a;
	var cnt = _v0.b;
	var acc = _v0.c;
	switch (cnt) {
		case 1:
			return res + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 2)) + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 4)) + '=='));
		case 2:
			return res + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 10)) + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 4)) + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 2)) + '=')));
		default:
			return res;
	}
};
var $truqu$elm_base64$Base64$Encode$encode = function (input) {
	return $truqu$elm_base64$Base64$Encode$wrapUp(
		A3($elm$core$String$foldl, $truqu$elm_base64$Base64$Encode$chomp, $truqu$elm_base64$Base64$Encode$initial, input));
};
var $truqu$elm_base64$Base64$encode = $truqu$elm_base64$Base64$Encode$encode;
var $author$project$Visualizer$pure = function (a) {
	return _Utils_Tuple2(a, $elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Visualizer$setHash = _Platform_outgoingPort('setHash', $elm$json$Json$Encode$string);
var $author$project$Visualizer$update = F2(
	function (msg, model) {
		var dance = model.j;
		switch (msg.$) {
			case 0:
				var width = msg.a;
				var height = msg.b;
				return $author$project$Visualizer$pure(
					_Utils_update(
						model,
						{bo: height, bE: width}));
			case 1:
				var _v1 = msg.a;
				var now = _v1.a;
				var data = _v1.b;
				return $author$project$Visualizer$pure(
					A3($author$project$Visualizer$applyMidi, now, data, model));
			default:
				var code = msg.a;
				var _v2 = A2($elm$parser$Parser$run, $author$project$Visualizer$planParser, code);
				if (_v2.$ === 1) {
					var reason = _v2.a;
					return $author$project$Visualizer$pure(
						_Utils_update(
							model,
							{
								j: _Utils_update(
									dance,
									{ap: code, ar: true})
							}));
				} else {
					var plan = _v2.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								j: _Utils_update(
									dance,
									{ap: code, ar: false, a9: plan})
							}),
						$author$project$Visualizer$setHash(
							'#!' + $truqu$elm_base64$Base64$encode(code)));
				}
		}
	});
var $author$project$Visualizer$SetCode = function (a) {
	return {$: 2, a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$autofocus = $elm$html$Html$Attributes$boolProperty('autofocus');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$Visualizer$cubicBezier = F3(
	function (t, p0, p3) {
		var controlPoint2 = 1.15;
		var p2 = p0 + (controlPoint2 * (p3 - p0));
		var controlPoint1 = 0.85;
		var p1 = p0 + (controlPoint1 * (p3 - p0));
		return (((p0 * A2($elm$core$Basics$pow, 1 - t, 3)) + (((p1 * 3) * A2($elm$core$Basics$pow, 1 - t, 2)) * t)) + (((p2 * 3) * (1 - t)) * A2($elm$core$Basics$pow, t, 2))) + (p3 * A2($elm$core$Basics$pow, t, 3));
	});
var $author$project$Visualizer$curve = F3(
	function (model, a, b) {
		var t = A3($elm$core$Basics$clamp, 0, 1, (model.bv - model.ao.bQ) / model.ao.cu);
		return A3($author$project$Visualizer$cubicBezier, 1 - t, a, b);
	});
var $avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var $avh4$elm_color$Color$toRgba = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {dT: a, dY: b, ed: g, ex: r};
};
var $author$project$Visualizer$curveColor = F3(
	function (model, a, b) {
		var bRgba = $avh4$elm_color$Color$toRgba(b);
		var aRgba = $avh4$elm_color$Color$toRgba(a);
		return A4(
			$avh4$elm_color$Color$rgba,
			A3($author$project$Visualizer$curve, model, aRgba.ex, bRgba.ex),
			A3($author$project$Visualizer$curve, model, aRgba.ed, bRgba.ed),
			A3($author$project$Visualizer$curve, model, aRgba.dY, bRgba.dY),
			A3($author$project$Visualizer$curve, model, aRgba.dT, bRgba.dT));
	});
var $author$project$Visualizer$unQuantity = function (_v0) {
	var x = _v0;
	return x;
};
var $author$project$Visualizer$curveQuantity = F3(
	function (model, a, b) {
		return A3(
			$author$project$Visualizer$curve,
			model,
			$author$project$Visualizer$unQuantity(a),
			$author$project$Visualizer$unQuantity(b));
	});
var $ianmackenzie$elm_geometry$Vector3d$xComponent = function (_v0) {
	var v = _v0;
	return v.bF;
};
var $ianmackenzie$elm_geometry$Vector3d$yComponent = function (_v0) {
	var v = _v0;
	return v.bG;
};
var $ianmackenzie$elm_geometry$Vector3d$zComponent = function (_v0) {
	var v = _v0;
	return v.bH;
};
var $author$project$Visualizer$curveVector = F3(
	function (model, a, b) {
		return A3(
			$ianmackenzie$elm_geometry$Vector3d$meters,
			A3(
				$author$project$Visualizer$curveQuantity,
				model,
				$ianmackenzie$elm_geometry$Vector3d$xComponent(a),
				$ianmackenzie$elm_geometry$Vector3d$xComponent(b)),
			A3(
				$author$project$Visualizer$curveQuantity,
				model,
				$ianmackenzie$elm_geometry$Vector3d$yComponent(a),
				$ianmackenzie$elm_geometry$Vector3d$yComponent(b)),
			A3(
				$author$project$Visualizer$curveQuantity,
				model,
				$ianmackenzie$elm_geometry$Vector3d$zComponent(a),
				$ianmackenzie$elm_geometry$Vector3d$zComponent(b)));
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $ianmackenzie$elm_geometry$Vector3d$direction = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.bF),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.bG),
			$elm$core$Basics$abs(v.bH)));
	if (!largestComponent) {
		return $elm$core$Maybe$Nothing;
	} else {
		var scaledZ = v.bH / largestComponent;
		var scaledY = v.bG / largestComponent;
		var scaledX = v.bF / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return $elm$core$Maybe$Just(
			{bF: scaledX / scaledLength, bG: scaledY / scaledLength, bH: scaledZ / scaledLength});
	}
};
var $ianmackenzie$elm_units$Quantity$zero = 0;
var $ianmackenzie$elm_geometry$Vector3d$length = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.bF),
		A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.bG),
			$elm$core$Basics$abs(v.bH)));
	if (!largestComponent) {
		return $ianmackenzie$elm_units$Quantity$zero;
	} else {
		var scaledZ = v.bH / largestComponent;
		var scaledY = v.bG / largestComponent;
		var scaledX = v.bF / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return scaledLength * largestComponent;
	}
};
var $ianmackenzie$elm_geometry$Geometry$Types$Point3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Point3d$origin = {bF: 0, bG: 0, bH: 0};
var $ianmackenzie$elm_geometry$Axis3d$direction = function (_v0) {
	var axis = _v0;
	return axis.L;
};
var $ianmackenzie$elm_geometry$Axis3d$originPoint = function (_v0) {
	var axis = _v0;
	return axis.ew;
};
var $ianmackenzie$elm_geometry$Direction3d$unwrap = function (_v0) {
	var coordinates = _v0;
	return coordinates;
};
var $ianmackenzie$elm_geometry$Point3d$unwrap = function (_v0) {
	var coordinates = _v0;
	return coordinates;
};
var $author$project$Scene3d$Transformation$rotateAround = F2(
	function (axis, _v0) {
		var angle = _v0;
		var p0 = $ianmackenzie$elm_geometry$Point3d$unwrap(
			$ianmackenzie$elm_geometry$Axis3d$originPoint(axis));
		var halfAngle = 0.5 * angle;
		var qw = $elm$core$Basics$cos(halfAngle);
		var sinHalfAngle = $elm$core$Basics$sin(halfAngle);
		var a = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Axis3d$direction(axis));
		var qx = a.bF * sinHalfAngle;
		var wx = qw * qx;
		var xx = qx * qx;
		var qy = a.bG * sinHalfAngle;
		var wy = qw * qy;
		var xy = qx * qy;
		var yy = qy * qy;
		var a22 = 1 - (2 * (xx + yy));
		var qz = a.bH * sinHalfAngle;
		var wz = qw * qz;
		var a01 = 2 * (xy - wz);
		var a10 = 2 * (xy + wz);
		var xz = qx * qz;
		var a02 = 2 * (xz + wy);
		var a20 = 2 * (xz - wy);
		var yz = qy * qz;
		var a12 = 2 * (yz - wx);
		var a21 = 2 * (yz + wx);
		var zz = qz * qz;
		var a00 = 1 - (2 * (yy + zz));
		var a11 = 1 - (2 * (xx + zz));
		return {el: true, o: a00, p: a10, q: a20, r: a01, s: a11, t: a21, u: a02, v: a12, w: a22, B: ((p0.bF - (a00 * p0.bF)) - (a01 * p0.bG)) - (a02 * p0.bH), C: ((p0.bG - (a10 * p0.bF)) - (a11 * p0.bG)) - (a12 * p0.bH), D: ((p0.bH - (a20 * p0.bF)) - (a21 * p0.bG)) - (a22 * p0.bH), ez: 1};
	});
var $author$project$Scene3d$Types$Drawable = $elm$core$Basics$identity;
var $author$project$Scene3d$Types$Transformed = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$Scene3d$Transformation$compose = F2(
	function (t1, t2) {
		return {
			el: _Utils_eq(t1.el, t2.el),
			o: ((t1.o * t2.o) + (t1.p * t2.r)) + (t1.q * t2.u),
			p: ((t1.o * t2.p) + (t1.p * t2.s)) + (t1.q * t2.v),
			q: ((t1.o * t2.q) + (t1.p * t2.t)) + (t1.q * t2.w),
			r: ((t1.r * t2.o) + (t1.s * t2.r)) + (t1.t * t2.u),
			s: ((t1.r * t2.p) + (t1.s * t2.s)) + (t1.t * t2.v),
			t: ((t1.r * t2.q) + (t1.s * t2.t)) + (t1.t * t2.w),
			u: ((t1.u * t2.o) + (t1.v * t2.r)) + (t1.w * t2.u),
			v: ((t1.u * t2.p) + (t1.v * t2.s)) + (t1.w * t2.v),
			w: ((t1.u * t2.q) + (t1.v * t2.t)) + (t1.w * t2.w),
			B: ((t2.B + (t1.B * t2.o)) + (t1.C * t2.r)) + (t1.D * t2.u),
			C: ((t2.C + (t1.B * t2.p)) + (t1.C * t2.s)) + (t1.D * t2.v),
			D: ((t2.D + (t1.B * t2.q)) + (t1.C * t2.t)) + (t1.D * t2.w),
			ez: t1.ez * t2.ez
		};
	});
var $author$project$Scene3d$Types$EmptyNode = {$: 0};
var $author$project$Scene3d$Drawable$empty = $author$project$Scene3d$Types$EmptyNode;
var $author$project$Scene3d$Drawable$transformBy = F2(
	function (transformation, _v0) {
		var node = _v0;
		switch (node.$) {
			case 0:
				return $author$project$Scene3d$Drawable$empty;
			case 4:
				var existingTransformation = node.a;
				var underlyingNode = node.b;
				var compositeTransformation = A2($author$project$Scene3d$Transformation$compose, existingTransformation, transformation);
				return A2($author$project$Scene3d$Types$Transformed, compositeTransformation, underlyingNode);
			case 1:
				return A2($author$project$Scene3d$Types$Transformed, transformation, node);
			case 2:
				return A2($author$project$Scene3d$Types$Transformed, transformation, node);
			default:
				return A2($author$project$Scene3d$Types$Transformed, transformation, node);
		}
	});
var $author$project$Scene3d$Drawable$rotateAround = F3(
	function (axis, angle, givenDrawable) {
		return A2(
			$author$project$Scene3d$Drawable$transformBy,
			A2($author$project$Scene3d$Transformation$rotateAround, axis, angle),
			givenDrawable);
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Axis3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Axis3d$through = F2(
	function (givenPoint, givenDirection) {
		return {L: givenDirection, ew: givenPoint};
	});
var $ianmackenzie$elm_geometry$Vector3d$unwrap = function (_v0) {
	var components = _v0;
	return components;
};
var $author$project$Scene3d$Transformation$translateBy = function (displacement) {
	var v = $ianmackenzie$elm_geometry$Vector3d$unwrap(displacement);
	return {el: true, o: 1, p: 0, q: 0, r: 0, s: 1, t: 0, u: 0, v: 0, w: 1, B: v.bF, C: v.bG, D: v.bH, ez: 1};
};
var $author$project$Scene3d$Drawable$translateBy = F2(
	function (displacement, givenDrawable) {
		return A2(
			$author$project$Scene3d$Drawable$transformBy,
			$author$project$Scene3d$Transformation$translateBy(displacement),
			givenDrawable);
	});
var $author$project$Visualizer$animate = F3(
	function (model, drawable, part) {
		var prev = part(model.j.X);
		var next = part(model.j.P);
		var rotation = A3($author$project$Visualizer$curveVector, model, prev.ai, next.ai);
		var translation = A3($author$project$Visualizer$curveVector, model, prev.E, next.E);
		var color = A3($author$project$Visualizer$curveColor, model, prev.A, next.A);
		return A2(
			$author$project$Scene3d$Drawable$translateBy,
			translation,
			A3(
				$author$project$Scene3d$Drawable$rotateAround,
				A2(
					$ianmackenzie$elm_geometry$Axis3d$through,
					$ianmackenzie$elm_geometry$Point3d$origin,
					A2(
						$elm$core$Maybe$withDefault,
						$ianmackenzie$elm_geometry$Direction3d$x,
						$ianmackenzie$elm_geometry$Vector3d$direction(rotation))),
				$ianmackenzie$elm_units$Angle$degrees(
					$author$project$Visualizer$unQuantity(
						$ianmackenzie$elm_geometry$Vector3d$length(rotation))),
				drawable(color)));
	});
var $author$project$Scene3d$Types$MeshNode = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$webgl$WebGL$Internal$disableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 0:
				return _WebGL_disableBlend(cache);
			case 1:
				return _WebGL_disableDepthTest(cache);
			case 2:
				return _WebGL_disableStencilTest(cache);
			case 3:
				return _WebGL_disableScissor(cache);
			case 4:
				return _WebGL_disableColorMask(cache);
			case 5:
				return _WebGL_disableCullFace(cache);
			case 6:
				return _WebGL_disablePolygonOffset(cache);
			case 7:
				return _WebGL_disableSampleCoverage(cache);
			default:
				return _WebGL_disableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 0:
				return A2(_WebGL_enableAlpha, ctx, option);
			case 1:
				return A2(_WebGL_enableDepth, ctx, option);
			case 2:
				return A2(_WebGL_enableStencil, ctx, option);
			case 3:
				return A2(_WebGL_enableAntialias, ctx, option);
			case 4:
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (gl, setting) {
		switch (setting.$) {
			case 0:
				return A2(_WebGL_enableBlend, gl, setting);
			case 1:
				return A2(_WebGL_enableDepthTest, gl, setting);
			case 2:
				return A2(_WebGL_enableStencilTest, gl, setting);
			case 3:
				return A2(_WebGL_enableScissor, gl, setting);
			case 4:
				return A2(_WebGL_enableColorMask, gl, setting);
			case 5:
				return A2(_WebGL_enableCullFace, gl, setting);
			case 6:
				return A2(_WebGL_enablePolygonOffset, gl, setting);
			case 7:
				return A2(_WebGL_enableSampleCoverage, gl, setting);
			default:
				return A2(_WebGL_enableSampleAlphaToCoverage, gl, setting);
		}
	});
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $elm_explorations$webgl$WebGL$Settings$FaceMode = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$back = 1029;
var $elm_explorations$webgl$WebGL$Internal$CullFace = function (a) {
	return {$: 5, a: a};
};
var $elm_explorations$webgl$WebGL$Settings$cullFace = function (_v0) {
	var faceMode = _v0;
	return $elm_explorations$webgl$WebGL$Internal$CullFace(faceMode);
};
var $author$project$Scene3d$Drawable$cullBackFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$back);
var $elm_explorations$webgl$WebGL$Settings$front = 1028;
var $author$project$Scene3d$Drawable$cullFrontFaceSetting = $elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$front);
var $author$project$Scene3d$Drawable$meshSettings = F3(
	function (isRightHanded, cullBackFaces, settings) {
		return cullBackFaces ? (isRightHanded ? A2($elm$core$List$cons, $author$project$Scene3d$Drawable$cullBackFaceSetting, settings) : A2($elm$core$List$cons, $author$project$Scene3d$Drawable$cullFrontFaceSetting, settings)) : settings;
	});
var $author$project$Scene3d$Shader$physicalFragment = {
	src: '\n        precision mediump float;\n\n        uniform mat4 sceneProperties;\n        uniform mat4 ambientLighting;\n        uniform mat4 viewMatrix;\n        uniform mat4 lights12;\n        uniform mat4 lights34;\n        uniform mat4 lights56;\n        uniform mat4 lights78;\n        uniform vec3 color;\n        uniform float roughness;\n        uniform float metallic;\n\n        varying vec3 interpolatedPosition;\n        varying vec3 interpolatedNormal;\n\n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n\n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n\n        vec4 toSrgb(vec3 linearColor) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float red = gammaCorrect(linearColor.r / referenceWhite.r);\n            float green = gammaCorrect(linearColor.g / referenceWhite.g);\n            float blue = gammaCorrect(linearColor.b / referenceWhite.b);\n            return vec4(red, green, blue, 1.0);\n        }\n\n        void getDirectionToLightAndNormalIlluminance(vec4 xyz_type, vec4 rgb_radius, out vec3 directionToLight, out vec3 normalIlluminance) {\n            float lightType = xyz_type.w;\n            if (lightType == 1.0) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_radius.rgb;\n            } else if (lightType == 2.0) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - interpolatedPosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_radius.rgb / (4.0 * 3.14159265359 * distance * distance);\n            }\n        }\n\n        float safeQuotient(float numerator, float denominator) {\n            if (denominator == 0.0) {\n                return 0.0;\n            } else {\n                return numerator / denominator;\n            }\n        }\n\n        float specularD(float alphaSquared, float dotNHSquared) {\n            float tmp = dotNHSquared * (alphaSquared - 1.0) + 1.0;\n            return alphaSquared / (3.14159265359 * tmp * tmp);\n        }\n\n        float g1(float dotNV, float alphaSquared) {\n            return safeQuotient(2.0 * dotNV, dotNV + sqrt(alphaSquared + (1.0 - alphaSquared) * dotNV * dotNV));\n        }\n\n        float specularG(float dotNL, float dotNV, float alphaSquared) {\n            return g1(dotNV, alphaSquared) * g1(dotNL, alphaSquared);\n        }\n\n        vec3 fresnelColor(vec3 specularBaseColor, float dotVH) {\n            vec3 one = vec3(1.0, 1.0, 1.0);\n            float scale = exp2((-5.55473 * dotVH - 6.98316) * dotVH);\n            return specularBaseColor + (one - specularBaseColor) * scale;\n        }\n\n        vec3 brdf(vec3 normalDirection, vec3 directionToCamera, vec3 directionToLight, float alphaSquared, float dotNV, float dotNL, vec3 specularBaseColor, vec3 normalIlluminance) {\n            vec3 halfDirection = normalize(directionToCamera + directionToLight);\n            float dotVH = positiveDotProduct(directionToCamera, halfDirection);\n            float dotNH = positiveDotProduct(normalDirection, halfDirection);\n            float dotNHSquared = dotNH * dotNH;\n\n            float d = specularD(alphaSquared, dotNHSquared);\n            float g = specularG(dotNL, dotNV, alphaSquared);\n            vec3 f = fresnelColor(specularBaseColor, dotVH);\n            return safeQuotient(d * g, 4.0 * dotNL * dotNV) * f;\n        }\n\n        float vndf(float dotNV, float alphaSquared, float dotNH) {\n            return safeQuotient(g1(dotNV, alphaSquared) * dotNV * specularD(alphaSquared, dotNH * dotNH), dotNV);\n        }\n\n        float probabilityDensity(float dotNV, float alphaSquared, float dotNH, float dotVH) {\n            return safeQuotient(vndf(dotNV, alphaSquared, dotNH), 4.0 * dotVH);\n        }\n\n        vec3 sampleFacetNormal(float t1, float t2, vec3 vH, vec3 vT1, vec3 vT2, float s, float alpha) {\n            t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n            vec3 vNh = t1 * vT1 + t2 * vT2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * vH;\n            return normalize(vec3(alpha * vNh.x, alpha * vNh.y, max(0.0, vNh.z)));\n        }\n\n        vec3 cloudyLuminance(vec3 zenithLuminance, vec3 localZenithDirection, vec3 localLightDirection) {\n            float sinElevation = dot(localLightDirection, localZenithDirection);\n            return zenithLuminance * ((1.0 + sinElevation) / 2.0);\n        }\n\n        vec3 overcastSpecularSample(\n            vec3 zenithLuminance,\n            vec3 localZenithDirection,\n            vec3 localViewDirection,\n            vec3 localLightDirection,\n            vec3 localHalfDirection,\n            float alphaSquared,\n            vec3 specularBaseColor\n        ) {\n            vec3 luminance = cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection);\n            float dotVH = positiveDotProduct(localViewDirection, localHalfDirection);\n            float dotNL = localLightDirection.z;\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n        }\n\n        vec3 specularLightDirection(vec3 v, vec3 h) {\n            return (2.0 * dot(v, h)) * h - v;\n        }\n\n        vec3 ambientColor(\n            vec3 normalDirection,\n            vec3 directionToCamera,\n            float dotNV,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            float alphaSquared\n        ) {\n            float ambientType = ambientLighting[0][3];\n\n            if (ambientType == 0.0) {\n                return vec3(0.0, 0.0, 0.0);\n            }\n\n            if (ambientType == 1.0) {\n                vec3 zenithDirection = ambientLighting[0].xyz;\n                vec3 zenithLuminance = ambientLighting[1].rgb;\n                vec3 crossProduct = cross(normalDirection, directionToCamera);\n                float crossMagnitude = length(crossProduct);\n                vec3 xDirection = vec3(0.0, 0.0, 0.0);\n                vec3 yDirection = vec3(0.0, 0.0, 0.0);\n                if (crossMagnitude > 1.0e-6) {\n                    yDirection = (1.0 / crossMagnitude) * crossProduct;\n                    xDirection = cross(yDirection, normalDirection);\n                } else {\n                    vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n                    xDirection = normalize(cross(viewY, normalDirection));\n                    yDirection = cross(normalDirection, xDirection);\n                }\n                float localViewX = dot(directionToCamera, xDirection);\n                float localViewZ = dot(directionToCamera, normalDirection);\n                vec3 localViewDirection = vec3(localViewX, 0, localViewZ);\n                float localZenithX = dot(zenithDirection, xDirection);\n                float localZenithY = dot(zenithDirection, yDirection);\n                float localZenithZ = dot(zenithDirection, normalDirection);\n                vec3 localZenithDirection = vec3(localZenithX, localZenithY, localZenithZ);\n\n                vec3 vH = normalize(vec3(alpha * localViewX, 0.0, localViewZ));\n                vec3 vT1 = vec3(0.0, 1.0, 0.0);\n                vec3 vT2 = cross(vH, vT1);\n                float s = 0.5 * (1.0 + vH.z);\n                \n                vec3 localHalfDirection = vec3(0.0, 0.0, 0.0);\n                vec3 localLightDirection = vec3(0.0, 0.0, 0.0);\n                float numSamples = 13.0;\n                \n                vec3 specularSum = vec3(0.0, 0.0, 0.0);\n\n                localHalfDirection = sampleFacetNormal(0.000000, 0.000000, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.448762, 0.000000, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n\n                localHalfDirection = sampleFacetNormal(0.000000, 0.448762, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.448762, 0.000000, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.000000, -0.448762, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.748423, 0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.310007, 0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.310007, 0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.748423, 0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.748423, -0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.310007, -0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.310007, -0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.748423, -0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                vec3 diffuseSum = vec3(0.0, 0.0, 0.0);\n\n                localLightDirection = vec3(0.000000, 0.000000, 1.000000);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n\n                localLightDirection = vec3(0.606266, 0.000000, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.000000, 0.606266, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.606266, 0.000000, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.000000, -0.606266, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.873598, 0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.361856, 0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.361856, 0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.873598, 0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.873598, -0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.361856, -0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.361856, -0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n\n                localLightDirection = vec3(0.873598, -0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                return (specularSum + 2.0 * diffuseSum * diffuseBaseColor) / numSamples;\n            } else {\n                return vec3(0.0, 0.0, 0.0); \n            }\n        }\n\n        vec3 litColor(vec4 xyz_type, vec4 rgb_radius, vec3 normalDirection, vec3 directionToCamera, float dotNV, vec3 diffuseBaseColor, vec3 specularBaseColor, float alphaSquared) {\n            float lightType = xyz_type.w;\n            if (lightType == 0.0) {\n                return vec3(0.0, 0.0, 0.0);\n            }\n\n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(xyz_type, rgb_radius, directionToLight, normalIlluminance);\n\n            float dotNL = positiveDotProduct(normalDirection, directionToLight);\n            vec3 specularColor = brdf(normalDirection, directionToCamera, directionToLight, alphaSquared, dotNV, dotNL, specularBaseColor, normalIlluminance);\n            return (normalIlluminance * dotNL) * ((diffuseBaseColor / 3.14159265359) + specularColor);\n        }\n\n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal);\n            float projectionType = sceneProperties[1][3];\n            vec3 directionToCamera = vec3(0.0, 0.0, 0.0);\n            if (projectionType == 0.0) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                directionToCamera = normalize(cameraPoint - interpolatedPosition);\n            } else {\n                directionToCamera = sceneProperties[1].xyz;\n            }\n\n            float dotNV = positiveDotProduct(normalDirection, directionToCamera);\n\n            float nonmetallic = 1.0 - metallic;\n            vec3 diffuseBaseColor = nonmetallic * 0.96 * color;\n            vec3 specularBaseColor = nonmetallic * 0.04 * vec3(1.0, 1.0, 1.0) + metallic * color;\n\n            vec3 linearColor = vec3(0.0, 0.0, 0.0);\n\n            float alpha = roughness * roughness;\n            float alphaSquared = alpha * alpha;\n\n            vec3 color0 = ambientColor(normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alpha, alphaSquared);\n            vec3 color1 = litColor(lights12[0], lights12[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color2 = litColor(lights12[2], lights12[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color3 = litColor(lights34[0], lights34[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color4 = litColor(lights34[2], lights34[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color5 = litColor(lights56[0], lights56[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color6 = litColor(lights56[2], lights56[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color7 = litColor(lights78[0], lights78[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color8 = litColor(lights78[2], lights78[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n\n            gl_FragColor = toSrgb(color0 + color1 + color2 + color3 + color4 + color5 + color6 + color7 + color8);\n        }\n    ',
	attributes: {},
	uniforms: {ambientLighting: 'cL', color: 'aF', lights12: 'a3', lights34: 'a4', lights56: 'a5', lights78: 'a6', metallic: 'cg', roughness: 'cA', sceneProperties: 'ay', viewMatrix: 'aD'}
};
var $author$project$Scene3d$Shader$smoothVertex = {
	src: '\n        precision mediump float;\n\n        attribute vec3 position;\n        attribute vec3 normal;\n\n        uniform float modelScale;\n        uniform mat4 modelMatrix;\n        uniform mat4 viewMatrix;\n        uniform mat4 sceneProperties;\n\n        varying vec3 interpolatedPosition;\n        varying vec3 interpolatedNormal;\n\n        vec4 project(vec4 position) {\n            float n = sceneProperties[0][0];\n            float a = sceneProperties[0][1];\n            float kc = sceneProperties[0][2];\n            float kz = sceneProperties[0][3];\n            return vec4(\n                (kc + kz * position.z) * (position.x / a),\n                (kc + kz * position.z) * position.y,\n                (-position.z - 2.0 * n),\n                -position.z\n            );\n        }\n\n        void main () {\n            vec4 scaledPosition = vec4(modelScale * position, 1.0);\n            vec4 transformedPosition = modelMatrix * scaledPosition;\n            gl_Position = project(viewMatrix * transformedPosition);\n            interpolatedPosition = transformedPosition.xyz;\n            interpolatedNormal = (modelMatrix * vec4(normal, 0.0)).xyz;\n        }\n    ',
	attributes: {normal: 'Q', position: 'i'},
	uniforms: {modelMatrix: 'at', modelScale: 'au', sceneProperties: 'ay', viewMatrix: 'aD'}
};
var $author$project$Scene3d$Drawable$physicalMesh = F5(
	function (color, roughness, metallic, webGLMesh, cullBackFaces) {
		return $author$project$Scene3d$Types$MeshNode(
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, ambientLighting, lights, settings) {
					return A5(
						$elm_explorations$webgl$WebGL$entityWith,
						A3($author$project$Scene3d$Drawable$meshSettings, isRightHanded, cullBackFaces, settings),
						$author$project$Scene3d$Shader$smoothVertex,
						$author$project$Scene3d$Shader$physicalFragment,
						webGLMesh,
						{cL: ambientLighting, aF: color, a3: lights.a3, a4: lights.a4, a5: lights.a5, a6: lights.a6, cg: metallic, at: modelMatrix, au: modelScale, cA: roughness, ay: sceneProperties, aD: viewMatrix});
				}));
	});
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $author$project$Scene3d$Drawable$toLinear = function (color) {
	var _v0 = $avh4$elm_color$Color$toRgba(color);
	var red = _v0.ex;
	var green = _v0.ed;
	var blue = _v0.dY;
	return A3(
		$elm_explorations$linear_algebra$Math$Vector3$vec3,
		A2($elm$core$Basics$pow, red, 2.2),
		A2($elm$core$Basics$pow, green, 2.2),
		A2($elm$core$Basics$pow, blue, 2.2));
};
var $author$project$Scene3d$Drawable$physical = F2(
	function (givenMaterial, givenMesh) {
		var roughness = A3($elm$core$Basics$clamp, 0, 1, givenMaterial.cA);
		var metallic = givenMaterial.cg ? 1 : 0;
		var linearColor = $author$project$Scene3d$Drawable$toLinear(givenMaterial.cN);
		if (!givenMesh.$) {
			return $author$project$Scene3d$Drawable$empty;
		} else {
			var meshData = givenMesh.a;
			var maybeShadow = givenMesh.b;
			switch (meshData.$) {
				case 0:
					return $author$project$Scene3d$Drawable$empty;
				case 1:
					var webGLMesh = meshData.c;
					var cullBackFaces = meshData.d;
					return A5($author$project$Scene3d$Drawable$physicalMesh, linearColor, roughness, metallic, webGLMesh, cullBackFaces);
				case 2:
					return $author$project$Scene3d$Drawable$empty;
				case 3:
					var webGLMesh = meshData.c;
					var cullBackFaces = meshData.d;
					return A5($author$project$Scene3d$Drawable$physicalMesh, linearColor, roughness, metallic, webGLMesh, cullBackFaces);
				case 4:
					return $author$project$Scene3d$Drawable$empty;
				case 5:
					return $author$project$Scene3d$Drawable$empty;
				default:
					return $author$project$Scene3d$Drawable$empty;
			}
		}
	});
var $author$project$Visualizer$bodyPart = function (color) {
	return $author$project$Scene3d$Drawable$physical(
		{cN: color, cg: false, cA: 0.25});
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $ianmackenzie$elm_units$Angle$cos = function (_v0) {
	var angle = _v0;
	return $elm$core$Basics$cos(angle);
};
var $author$project$Scene3d$Mesh$CullBackFaces = 0;
var $author$project$Scene3d$Mesh$cullBackFaces = 0;
var $ianmackenzie$elm_units$Quantity$divideBy = F2(
	function (divisor, _v0) {
		var value = _v0;
		return value / divisor;
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Direction2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Direction2d$fromAngle = function (_v0) {
	var angle = _v0;
	return {
		bF: $elm$core$Basics$cos(angle),
		bG: $elm$core$Basics$sin(angle)
	};
};
var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _v0) {
		var value = _v0;
		return scale * value;
	});
var $ianmackenzie$elm_geometry$Direction3d$on = F2(
	function (_v0, _v1) {
		var sketchPlane = _v0;
		var d = _v1;
		var _v2 = sketchPlane.eU;
		var j = _v2;
		var _v3 = sketchPlane.eQ;
		var i = _v3;
		return {bF: (d.bF * i.bF) + (d.bG * j.bF), bG: (d.bF * i.bG) + (d.bG * j.bG), bH: (d.bF * i.bH) + (d.bG * j.bH)};
	});
var $ianmackenzie$elm_units$Quantity$plus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x + y;
	});
var $ianmackenzie$elm_units$Angle$sin = function (_v0) {
	var angle = _v0;
	return $elm$core$Basics$sin(angle);
};
var $author$project$Scene3d$Types$EmptyMesh = {$: 0};
var $author$project$Scene3d$Types$Smooth = F4(
	function (a, b, c, d) {
		return {$: 3, a: a, b: b, c: c, d: d};
	});
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3 = function (point) {
	var _v0 = $ianmackenzie$elm_geometry$Point3d$unwrap(point);
	var x = _v0.bF;
	var y = _v0.bG;
	var z = _v0.bH;
	return A3($elm_explorations$linear_algebra$Math$Vector3$vec3, x, y, z);
};
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3 = function (vector) {
	var _v0 = $ianmackenzie$elm_geometry$Vector3d$unwrap(vector);
	var x = _v0.bF;
	var y = _v0.bG;
	var z = _v0.bH;
	return A3($elm_explorations$linear_algebra$Math$Vector3$vec3, x, y, z);
};
var $author$project$Scene3d$Mesh$collectSmooth = F2(
	function (_v0, accumulated) {
		var position = _v0.i;
		var normal = _v0.Q;
		return A2(
			$elm$core$List$cons,
			{
				Q: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(normal),
				i: $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(position)
			},
			accumulated);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices = function (_v0) {
	var mesh = _v0;
	return mesh.K;
};
var $author$project$Scene3d$Mesh$isCullBackFaces = function (option) {
	return !option;
};
var $author$project$Scene3d$Mesh$getCullBackFaces = function (options) {
	return A2($elm$core$List$any, $author$project$Scene3d$Mesh$isCullBackFaces, options);
};
var $elm_explorations$webgl$WebGL$MeshIndexed3 = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$indexedTriangles = $elm_explorations$webgl$WebGL$MeshIndexed3(
	{cW: 1, c4: 3, dm: 4});
var $elm_explorations$linear_algebra$Math$Vector3$getX = _MJS_v3getX;
var $elm_explorations$linear_algebra$Math$Vector3$getY = _MJS_v3getY;
var $elm_explorations$linear_algebra$Math$Vector3$getZ = _MJS_v3getZ;
var $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$lessThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 1;
	});
var $ianmackenzie$elm_units$Quantity$max = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return A2($elm$core$Basics$max, x, y);
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $ianmackenzie$elm_units$Quantity$min = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return A2($elm$core$Basics$min, x, y);
	});
var $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema = function (given) {
	return (A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.df, given.di) && (A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.dg, given.dj) && A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.dh, given.dk))) ? given : {
		df: A2($ianmackenzie$elm_units$Quantity$max, given.di, given.df),
		dg: A2($ianmackenzie$elm_units$Quantity$max, given.dj, given.dg),
		dh: A2($ianmackenzie$elm_units$Quantity$max, given.dk, given.dh),
		di: A2($ianmackenzie$elm_units$Quantity$min, given.di, given.df),
		dj: A2($ianmackenzie$elm_units$Quantity$min, given.dj, given.dg),
		dk: A2($ianmackenzie$elm_units$Quantity$min, given.dk, given.dh)
	};
};
var $author$project$Scene3d$Mesh$smoothBoundsHelp = F7(
	function (minX, maxX, minY, maxY, minZ, maxZ, remaining) {
		smoothBoundsHelp:
		while (true) {
			if (remaining.b) {
				var next = remaining.a;
				var rest = remaining.b;
				var z = $elm_explorations$linear_algebra$Math$Vector3$getZ(next.i);
				var y = $elm_explorations$linear_algebra$Math$Vector3$getY(next.i);
				var x = $elm_explorations$linear_algebra$Math$Vector3$getX(next.i);
				var $temp$minX = A2($elm$core$Basics$min, minX, x),
					$temp$maxX = A2($elm$core$Basics$max, maxX, x),
					$temp$minY = A2($elm$core$Basics$min, minY, y),
					$temp$maxY = A2($elm$core$Basics$max, maxY, y),
					$temp$minZ = A2($elm$core$Basics$min, minZ, z),
					$temp$maxZ = A2($elm$core$Basics$max, maxZ, z),
					$temp$remaining = rest;
				minX = $temp$minX;
				maxX = $temp$maxX;
				minY = $temp$minY;
				maxY = $temp$maxY;
				minZ = $temp$minZ;
				maxZ = $temp$maxZ;
				remaining = $temp$remaining;
				continue smoothBoundsHelp;
			} else {
				return $ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema(
					{df: maxX, dg: maxY, dh: maxZ, di: minX, dj: minY, dk: minZ});
			}
		}
	});
var $author$project$Scene3d$Mesh$smoothBounds = F2(
	function (first, rest) {
		var z = $elm_explorations$linear_algebra$Math$Vector3$getZ(first.i);
		var y = $elm_explorations$linear_algebra$Math$Vector3$getY(first.i);
		var x = $elm_explorations$linear_algebra$Math$Vector3$getX(first.i);
		return A7($author$project$Scene3d$Mesh$smoothBoundsHelp, x, x, y, y, z, z, rest);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices = function (_v0) {
	var mesh = _v0;
	return mesh.aa;
};
var $author$project$Scene3d$Types$Mesh = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Scene3d$Mesh$withoutShadow = function (meshData) {
	return A2($author$project$Scene3d$Types$Mesh, meshData, $elm$core$Maybe$Nothing);
};
var $author$project$Scene3d$Mesh$smooth = F2(
	function (options, givenMesh) {
		var collectedVertices = A3(
			$elm$core$Array$foldr,
			$author$project$Scene3d$Mesh$collectSmooth,
			_List_Nil,
			$ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(givenMesh));
		if (!collectedVertices.b) {
			return $author$project$Scene3d$Types$EmptyMesh;
		} else {
			var first = collectedVertices.a;
			var rest = collectedVertices.b;
			var webGLMesh = A2(
				$elm_explorations$webgl$WebGL$indexedTriangles,
				collectedVertices,
				$ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(givenMesh));
			var cullBack = $author$project$Scene3d$Mesh$getCullBackFaces(options);
			var bounds = A2($author$project$Scene3d$Mesh$smoothBounds, first, rest);
			return $author$project$Scene3d$Mesh$withoutShadow(
				A4($author$project$Scene3d$Types$Smooth, bounds, givenMesh, webGLMesh, cullBack));
		}
	});
var $ianmackenzie$elm_geometry$Direction3d$toVector = function (_v0) {
	var components = _v0;
	return components;
};
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$TriangularMesh = $elm$core$Basics$identity;
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles = function (faceVertices_) {
	return {
		K: A2(
			$elm$core$List$map,
			function (i) {
				return _Utils_Tuple3(3 * i, (3 * i) + 1, (3 * i) + 2);
			},
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(faceVertices_) - 1)),
		aa: $elm$core$Array$fromList(
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					function (_v0) {
						var v1 = _v0.a;
						var v2 = _v0.b;
						var v3 = _v0.c;
						return _List_fromArray(
							[v1, v2, v3]);
					},
					faceVertices_)))
	};
};
var $ianmackenzie$elm_units$Angle$turns = function (numTurns) {
	return $ianmackenzie$elm_units$Angle$radians((2 * $elm$core$Basics$pi) * numTurns);
};
var $ianmackenzie$elm_geometry$Geometry$Types$SketchPlane3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$SketchPlane3d$unsafe = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$SketchPlane3d$xy = $ianmackenzie$elm_geometry$SketchPlane3d$unsafe(
	{ew: $ianmackenzie$elm_geometry$Point3d$origin, eQ: $ianmackenzie$elm_geometry$Direction3d$x, eU: $ianmackenzie$elm_geometry$Direction3d$y});
var $ianmackenzie$elm_geometry$Point3d$xyz = F3(
	function (_v0, _v1, _v2) {
		var x = _v0;
		var y = _v1;
		var z = _v2;
		return {bF: x, bG: y, bH: z};
	});
var $author$project$Scene3d$Shape$cylinder = function (_v0) {
	var radius = _v0.cw;
	var height = _v0.bo;
	var subdivisions = _v0.dJ;
	var wedgeAngle = A2(
		$ianmackenzie$elm_units$Quantity$divideBy,
		subdivisions,
		$ianmackenzie$elm_units$Angle$turns(1));
	var topCenter = A3($ianmackenzie$elm_geometry$Point3d$xyz, $ianmackenzie$elm_units$Quantity$zero, $ianmackenzie$elm_units$Quantity$zero, height);
	var positiveZVector = $ianmackenzie$elm_geometry$Direction3d$toVector($ianmackenzie$elm_geometry$Direction3d$positiveZ);
	var negativeZVector = $ianmackenzie$elm_geometry$Direction3d$toVector($ianmackenzie$elm_geometry$Direction3d$negativeZ);
	var wedge = function (index) {
		var startAngle = A2($ianmackenzie$elm_units$Quantity$multiplyBy, index, wedgeAngle);
		var startNormal = $ianmackenzie$elm_geometry$Direction3d$toVector(
			A2(
				$ianmackenzie$elm_geometry$Direction3d$on,
				$ianmackenzie$elm_geometry$SketchPlane3d$xy,
				$ianmackenzie$elm_geometry$Direction2d$fromAngle(startAngle)));
		var startX = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$cos(startAngle),
			radius);
		var startY = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$sin(startAngle),
			radius);
		var p2 = A3($ianmackenzie$elm_geometry$Point3d$xyz, startX, startY, height);
		var p0 = A3($ianmackenzie$elm_geometry$Point3d$xyz, startX, startY, $ianmackenzie$elm_units$Quantity$zero);
		var endAngle = A2($ianmackenzie$elm_units$Quantity$plus, wedgeAngle, startAngle);
		var endNormal = $ianmackenzie$elm_geometry$Direction3d$toVector(
			A2(
				$ianmackenzie$elm_geometry$Direction3d$on,
				$ianmackenzie$elm_geometry$SketchPlane3d$xy,
				$ianmackenzie$elm_geometry$Direction2d$fromAngle(endAngle)));
		var endX = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$cos(endAngle),
			radius);
		var endY = A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$sin(endAngle),
			radius);
		var p1 = A3($ianmackenzie$elm_geometry$Point3d$xyz, endX, endY, $ianmackenzie$elm_units$Quantity$zero);
		var p3 = A3($ianmackenzie$elm_geometry$Point3d$xyz, endX, endY, height);
		return _List_fromArray(
			[
				_Utils_Tuple3(
				{Q: negativeZVector, i: $ianmackenzie$elm_geometry$Point3d$origin},
				{Q: negativeZVector, i: p0},
				{Q: negativeZVector, i: p1}),
				_Utils_Tuple3(
				{Q: startNormal, i: p0},
				{Q: endNormal, i: p1},
				{Q: endNormal, i: p3}),
				_Utils_Tuple3(
				{Q: startNormal, i: p0},
				{Q: endNormal, i: p3},
				{Q: startNormal, i: p2}),
				_Utils_Tuple3(
				{Q: positiveZVector, i: topCenter},
				{Q: positiveZVector, i: p2},
				{Q: positiveZVector, i: p3})
			]);
	};
	var wedges = A2(
		$elm$core$List$map,
		wedge,
		A2($elm$core$List$range, 0, subdivisions - 1));
	var triangularMesh = $ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(
		$elm$core$List$concat(wedges));
	return A2(
		$author$project$Scene3d$Mesh$smooth,
		_List_fromArray(
			[$author$project$Scene3d$Mesh$cullBackFaces]),
		triangularMesh);
};
var $author$project$Scene3d$Types$Group = function (a) {
	return {$: 3, a: a};
};
var $author$project$Scene3d$Drawable$collectNodes = F2(
	function (drawables, accumulated) {
		collectNodes:
		while (true) {
			if (!drawables.b) {
				return accumulated;
			} else {
				var node = drawables.a;
				var rest = drawables.b;
				var $temp$drawables = rest,
					$temp$accumulated = A2($elm$core$List$cons, node, accumulated);
				drawables = $temp$drawables;
				accumulated = $temp$accumulated;
				continue collectNodes;
			}
		}
	});
var $author$project$Scene3d$Drawable$group = function (drawables) {
	return $author$project$Scene3d$Types$Group(
		A2($author$project$Scene3d$Drawable$collectNodes, drawables, _List_Nil));
};
var $ianmackenzie$elm_units$Quantity$half = function (_v0) {
	var value = _v0;
	return 0.5 * value;
};
var $ianmackenzie$elm_units$Quantity$minus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x - y;
	});
var $ianmackenzie$elm_geometry$Direction3d$fromAzimuthInAndElevationFrom = F3(
	function (_v0, _v1, _v2) {
		var sketchPlane = _v0;
		var azimuth = _v1;
		var elevation = _v2;
		var sketchZ = $elm$core$Basics$sin(elevation);
		var cosElevation = $elm$core$Basics$cos(elevation);
		var sketchX = cosElevation * $elm$core$Basics$cos(azimuth);
		var sketchY = cosElevation * $elm$core$Basics$sin(azimuth);
		var _v3 = sketchPlane.eU;
		var j = _v3;
		var _v4 = sketchPlane.eQ;
		var i = _v4;
		var kx = (i.bG * j.bH) - (i.bH * j.bG);
		var ky = (i.bH * j.bF) - (i.bF * j.bH);
		var kz = (i.bF * j.bG) - (i.bG * j.bF);
		return {bF: ((sketchX * i.bF) + (sketchY * j.bF)) + (sketchZ * kx), bG: ((sketchX * i.bG) + (sketchY * j.bG)) + (sketchZ * ky), bH: ((sketchX * i.bH) + (sketchY * j.bH)) + (sketchZ * kz)};
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed = F2(
	function (vertices_, faceIndices_) {
		var numVertices = $elm$core$Array$length(vertices_);
		var validIndices = function (_v0) {
			var i = _v0.a;
			var j = _v0.b;
			var k = _v0.c;
			return ((i >= 0) && (_Utils_cmp(i, numVertices) < 0)) && (((j >= 0) && (_Utils_cmp(j, numVertices) < 0)) && ((k >= 0) && (_Utils_cmp(k, numVertices) < 0)));
		};
		return A2($elm$core$List$all, validIndices, faceIndices_) ? {K: faceIndices_, aa: vertices_} : {
			K: A2($elm$core$List$filter, validIndices, faceIndices_),
			aa: vertices_
		};
	});
var $ianmackenzie$elm_units$Quantity$interpolateFrom = F3(
	function (_v0, _v1, parameter) {
		var start = _v0;
		var end = _v1;
		return (parameter <= 0.5) ? (start + (parameter * (end - start))) : (end + ((1 - parameter) * (start - end)));
	});
var $ianmackenzie$elm_1d_parameter$Parameter1d$range = F5(
	function (startIndex, index, divisor, _function, accumulated) {
		range:
		while (true) {
			var newValue = _function(index / divisor);
			var newAccumulated = A2($elm$core$List$cons, newValue, accumulated);
			if (_Utils_eq(index, startIndex)) {
				return newAccumulated;
			} else {
				var $temp$startIndex = startIndex,
					$temp$index = index - 1,
					$temp$divisor = divisor,
					$temp$function = _function,
					$temp$accumulated = newAccumulated;
				startIndex = $temp$startIndex;
				index = $temp$index;
				divisor = $temp$divisor;
				_function = $temp$function;
				accumulated = $temp$accumulated;
				continue range;
			}
		}
	});
var $ianmackenzie$elm_1d_parameter$Parameter1d$leading = F2(
	function (n, _function) {
		return (n < 1) ? _List_Nil : A5($ianmackenzie$elm_1d_parameter$Parameter1d$range, 0, n - 1, n, _function, _List_Nil);
	});
var $ianmackenzie$elm_1d_parameter$Parameter1d$steps = F2(
	function (n, _function) {
		return (n < 1) ? _List_Nil : A5($ianmackenzie$elm_1d_parameter$Parameter1d$range, 0, n, n, _function, _List_Nil);
	});
var $author$project$Scene3d$Shape$sphere = function (_v0) {
	var radius = _v0.cw;
	var subdivisions = _v0.dJ;
	var n = subdivisions;
	var thetaStartIndices = A2($elm$core$List$range, 0, n - 1);
	var thetaValues = A2(
		$ianmackenzie$elm_1d_parameter$Parameter1d$leading,
		n,
		A2(
			$ianmackenzie$elm_units$Quantity$interpolateFrom,
			$ianmackenzie$elm_units$Quantity$zero,
			$ianmackenzie$elm_units$Angle$turns(1)));
	var m = $elm$core$Basics$ceiling(n / 2);
	var phiStartIndices = A2($elm$core$List$range, 0, m - 1);
	var phiValues = A2(
		$ianmackenzie$elm_1d_parameter$Parameter1d$steps,
		m,
		A2(
			$ianmackenzie$elm_units$Quantity$interpolateFrom,
			$ianmackenzie$elm_units$Angle$degrees(90),
			$ianmackenzie$elm_units$Angle$degrees(-90)));
	var pointsAndNormals = $elm$core$Array$fromList(
		$elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (theta) {
					return A2(
						$elm$core$List$map,
						function (phi) {
							return {
								Q: $ianmackenzie$elm_geometry$Direction3d$toVector(
									A3($ianmackenzie$elm_geometry$Direction3d$fromAzimuthInAndElevationFrom, $ianmackenzie$elm_geometry$SketchPlane3d$xy, theta, phi)),
								i: A3(
									$ianmackenzie$elm_geometry$Point3d$xyz,
									A2(
										$ianmackenzie$elm_units$Quantity$multiplyBy,
										$ianmackenzie$elm_units$Angle$cos(phi) * $ianmackenzie$elm_units$Angle$cos(theta),
										radius),
									A2(
										$ianmackenzie$elm_units$Quantity$multiplyBy,
										$ianmackenzie$elm_units$Angle$cos(phi) * $ianmackenzie$elm_units$Angle$sin(theta),
										radius),
									A2(
										$ianmackenzie$elm_units$Quantity$multiplyBy,
										$ianmackenzie$elm_units$Angle$sin(phi),
										radius))
							};
						},
						phiValues);
				},
				thetaValues)));
	var linearIndex = F2(
		function (i, j) {
			return (A2($elm$core$Basics$modBy, n, i) * (m + 1)) + j;
		});
	var faces = $elm$core$List$concat(
		A2(
			$elm$core$List$map,
			function (i) {
				return $elm$core$List$concat(
					A2(
						$elm$core$List$map,
						function (j) {
							var topRightIndex = A2(linearIndex, i + 1, j);
							var topLeftIndex = A2(linearIndex, i, j);
							var bottomRightIndex = A2(linearIndex, i + 1, j + 1);
							var bottomLeftIndex = A2(linearIndex, i, j + 1);
							return _List_fromArray(
								[
									_Utils_Tuple3(bottomLeftIndex, bottomRightIndex, topRightIndex),
									_Utils_Tuple3(bottomLeftIndex, topRightIndex, topLeftIndex)
								]);
						},
						phiStartIndices));
			},
			thetaStartIndices));
	return A2(
		$author$project$Scene3d$Mesh$smooth,
		_List_fromArray(
			[$author$project$Scene3d$Mesh$cullBackFaces]),
		A2($ianmackenzie$elm_triangular_mesh$TriangularMesh$indexed, pointsAndNormals, faces));
};
var $ianmackenzie$elm_units$Quantity$sum = function (quantities) {
	return A3($elm$core$List$foldl, $ianmackenzie$elm_units$Quantity$plus, $ianmackenzie$elm_units$Quantity$zero, quantities);
};
var $author$project$Scene3d$Drawable$translateIn = F3(
	function (direction, distance, drawable) {
		return A2(
			$author$project$Scene3d$Drawable$translateBy,
			A2($ianmackenzie$elm_geometry$Vector3d$withLength, distance, direction),
			drawable);
	});
var $ianmackenzie$elm_units$Quantity$twice = function (_v0) {
	var value = _v0;
	return 2 * value;
};
var $ianmackenzie$elm_geometry$Axis3d$x = A2($ianmackenzie$elm_geometry$Axis3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$x);
var $author$project$Visualizer$pill = F3(
	function (radius, length, offset) {
		var height = A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_units$Quantity$twice(radius),
			length);
		var trunk = $author$project$Scene3d$Shape$cylinder(
			{bo: height, cw: radius, dJ: 72});
		var halfHeight = $ianmackenzie$elm_units$Quantity$half(height);
		var end = $author$project$Scene3d$Shape$sphere(
			{cw: radius, dJ: 72});
		return {
			aq: function (color) {
				return A3(
					$author$project$Scene3d$Drawable$rotateAround,
					$ianmackenzie$elm_geometry$Axis3d$x,
					$ianmackenzie$elm_units$Angle$degrees(90),
					$author$project$Scene3d$Drawable$group(
						_List_fromArray(
							[
								A3(
								$author$project$Scene3d$Drawable$translateIn,
								$ianmackenzie$elm_geometry$Direction3d$negativeZ,
								halfHeight,
								A2($author$project$Visualizer$bodyPart, color, end)),
								A3(
								$author$project$Scene3d$Drawable$translateIn,
								$ianmackenzie$elm_geometry$Direction3d$positiveZ,
								halfHeight,
								A2($author$project$Visualizer$bodyPart, color, end)),
								A3(
								$author$project$Scene3d$Drawable$translateIn,
								$ianmackenzie$elm_geometry$Direction3d$negativeZ,
								halfHeight,
								A2($author$project$Visualizer$bodyPart, color, trunk))
							])));
			},
			aC: A2(
				$author$project$Scene3d$Drawable$translateIn,
				$ianmackenzie$elm_geometry$Direction3d$negativeY,
				$ianmackenzie$elm_units$Quantity$sum(
					_List_fromArray(
						[offset, radius, halfHeight])))
		};
	});
var $author$project$Visualizer$var = {
	cM: $ianmackenzie$elm_units$Length$meters(2.0),
	aI: $ianmackenzie$elm_units$Length$meters(0.85),
	da: $ianmackenzie$elm_units$Length$meters(2.8),
	aL: $ianmackenzie$elm_units$Length$meters(0.375),
	ep: $ianmackenzie$elm_units$Length$meters(0.85),
	az: $ianmackenzie$elm_units$Length$meters(0.075),
	cE: $ianmackenzie$elm_units$Length$meters(2.5)
};
var $author$project$Visualizer$arm = A3(
	$author$project$Visualizer$pill,
	$author$project$Visualizer$var.aL,
	$author$project$Visualizer$var.cM,
	A2($ianmackenzie$elm_units$Quantity$plus, $author$project$Visualizer$var.az, $author$project$Visualizer$var.aI));
var $author$project$Visualizer$torsoRadius = $ianmackenzie$elm_units$Quantity$half(
	A2($ianmackenzie$elm_units$Quantity$plus, $author$project$Visualizer$var.aI, $author$project$Visualizer$var.aL));
var $author$project$Visualizer$armOffset = $ianmackenzie$elm_units$Quantity$sum(
	_List_fromArray(
		[$author$project$Visualizer$torsoRadius, $author$project$Visualizer$var.az, $author$project$Visualizer$var.aL]));
var $author$project$Visualizer$backgroundFragmentShader = {
	src: '\n        precision mediump float;\n        uniform vec4 backgroundColor;\n        void main() { gl_FragColor = backgroundColor; }\n    ',
	attributes: {},
	uniforms: {backgroundColor: 'dX'}
};
var $elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangles = $elm_explorations$webgl$WebGL$Mesh3(
	{cW: 3, c4: 0, dm: 4});
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $author$project$Visualizer$backgroundMesh = function () {
	var vertex = F2(
		function (x, y) {
			return {
				i: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, y)
			};
		});
	return $elm_explorations$webgl$WebGL$triangles(
		_List_fromArray(
			[
				_Utils_Tuple3(
				A2(vertex, -1, -1),
				A2(vertex, 1, -1),
				A2(vertex, 1, 1)),
				_Utils_Tuple3(
				A2(vertex, -1, -1),
				A2(vertex, 1, 1),
				A2(vertex, -1, 1))
			]));
}();
var $author$project$Visualizer$backgroundVertexShader = {
	src: '\n        precision mediump float;\n        attribute vec2 position;\n        void main() { gl_Position = vec4(position.x, position.y, 0.0, 1.0); }\n    ',
	attributes: {position: 'i'},
	uniforms: {}
};
var $elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_v0) {
	var write = _v0.cI;
	var near = _v0.ch;
	var far = _v0.bN;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$DepthTest$default = $elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{bN: 1, ch: 0, cI: true});
var $elm_explorations$webgl$WebGL$entity = $elm_explorations$webgl$WebGL$entityWith(
	_List_fromArray(
		[$elm_explorations$webgl$WebGL$Settings$DepthTest$default]));
var $elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var $author$project$Visualizer$backgroundEntity = function (model) {
	return A4(
		$elm_explorations$webgl$WebGL$entity,
		$author$project$Visualizer$backgroundVertexShader,
		$author$project$Visualizer$backgroundFragmentShader,
		$author$project$Visualizer$backgroundMesh,
		{
			dX: function () {
				var _v0 = $avh4$elm_color$Color$toRgba(
					A3($author$project$Visualizer$curveColor, model, model.j.X.aj.A, model.j.P.aj.A));
				var red = _v0.ex;
				var green = _v0.ed;
				var blue = _v0.dY;
				var alpha = _v0.dT;
				return A4($elm_explorations$linear_algebra$Math$Vector4$vec4, red, green, blue, alpha);
			}()
		});
};
var $author$project$Scene3d$Chromaticity$Chromaticity = $elm$core$Basics$identity;
var $author$project$Scene3d$Chromaticity$daylight = {bF: 0.31271, bG: 0.32902};
var $author$project$Scene3d$Types$Light = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Illuminance$inLux = function (_v0) {
	var numLux = _v0;
	return numLux;
};
var $ianmackenzie$elm_geometry$Direction3d$reverse = function (_v0) {
	var d = _v0;
	return {bF: -d.bF, bG: -d.bG, bH: -d.bH};
};
var $author$project$Scene3d$Color$Xyz = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$Scene3d$Chromaticity$toXyz = function (_v0) {
	var x = _v0.bF;
	var y = _v0.bG;
	return A3($author$project$Scene3d$Color$Xyz, x / y, 1, ((1 - x) - y) / y);
};
var $author$project$Scene3d$Color$LinearRgb = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$Scene3d$Color$xyzToLinearRgb = function (_v0) {
	var bigX = _v0.a;
	var bigY = _v0.b;
	var bigZ = _v0.c;
	return A3($author$project$Scene3d$Color$LinearRgb, ((3.2406 * bigX) - (1.5372 * bigY)) - (0.4986 * bigZ), (((-0.9689) * bigX) + (1.8758 * bigY)) + (0.0415 * bigZ), ((0.0557 * bigX) - (0.204 * bigY)) + (1.057 * bigZ));
};
var $author$project$Scene3d$Chromaticity$toLinearRgb = function (chromaticity) {
	return $author$project$Scene3d$Color$xyzToLinearRgb(
		$author$project$Scene3d$Chromaticity$toXyz(chromaticity));
};
var $author$project$Scene3d$Light$directional = F3(
	function (chromaticity, illuminance, direction) {
		var lux = $ianmackenzie$elm_units$Illuminance$inLux(illuminance);
		var _v0 = $ianmackenzie$elm_geometry$Direction3d$unwrap(
			$ianmackenzie$elm_geometry$Direction3d$reverse(direction));
		var x = _v0.bF;
		var y = _v0.bG;
		var z = _v0.bH;
		var _v1 = $author$project$Scene3d$Chromaticity$toLinearRgb(chromaticity);
		var r = _v1.a;
		var g = _v1.b;
		var b = _v1.c;
		return {bK: b * lux, bO: g * lux, cv: r * lux, cw: 0, cF: 1, bF: x, bG: y, bH: z};
	});
var $author$project$Scene3d$Color$linearRgbToXyz = function (_v0) {
	var linearR = _v0.a;
	var linearG = _v0.b;
	var linearB = _v0.c;
	return A3($author$project$Scene3d$Color$Xyz, ((0.4124 * linearR) + (0.3576 * linearG)) + (0.1805 * linearB), ((0.2126 * linearR) + (0.7152 * linearG)) + (0.0722 * linearB), ((0.0193 * linearR) + (0.1192 * linearG)) + (0.9505 * linearB));
};
var $author$project$Scene3d$Color$inverseGamma = function (u) {
	return A3(
		$elm$core$Basics$clamp,
		0,
		1,
		(u <= 0.04045) ? (u / 12.92) : A2($elm$core$Basics$pow, (u + 0.055) / 1.055, 2.4));
};
var $author$project$Scene3d$Color$toLinearRgb = function (color) {
	var srgb = $avh4$elm_color$Color$toRgba(color);
	return A3(
		$author$project$Scene3d$Color$LinearRgb,
		$author$project$Scene3d$Color$inverseGamma(srgb.ex),
		$author$project$Scene3d$Color$inverseGamma(srgb.ed),
		$author$project$Scene3d$Color$inverseGamma(srgb.dY));
};
var $author$project$Scene3d$Color$toXyz = function (color) {
	return $author$project$Scene3d$Color$linearRgbToXyz(
		$author$project$Scene3d$Color$toLinearRgb(color));
};
var $author$project$Scene3d$Chromaticity$fromColor = function (color) {
	var _v0 = $author$project$Scene3d$Color$toXyz(color);
	var bigX = _v0.a;
	var bigY = _v0.b;
	var bigZ = _v0.c;
	var sum = (bigX + bigY) + bigZ;
	return {bF: bigX / sum, bG: bigY / sum};
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Scene3d$Exposure$Exposure = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
	var value = _v0;
	return $elm$core$Basics$abs(value);
};
var $author$project$Scene3d$Exposure$fromMaxLuminance = function (givenMaxLuminance) {
	return {
		ce: $ianmackenzie$elm_units$Quantity$abs(givenMaxLuminance)
	};
};
var $author$project$Visualizer$headMesh = $author$project$Scene3d$Shape$sphere(
	{cw: $author$project$Visualizer$var.aI, dJ: 72});
var $author$project$Visualizer$head = function (color) {
	return A2($author$project$Visualizer$bodyPart, color, $author$project$Visualizer$headMesh);
};
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $author$project$Visualizer$leg = A3(
	$author$project$Visualizer$pill,
	$author$project$Visualizer$var.aL,
	$author$project$Visualizer$var.da,
	$ianmackenzie$elm_units$Quantity$sum(
		_List_fromArray(
			[$author$project$Visualizer$var.aI, $author$project$Visualizer$var.az, $author$project$Visualizer$var.cE, $author$project$Visualizer$var.az])));
var $author$project$Visualizer$legOffset = A2($ianmackenzie$elm_units$Quantity$plus, $author$project$Visualizer$var.az, $author$project$Visualizer$var.aL);
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector3d$cross = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {bF: (v1.bG * v2.bH) - (v1.bH * v2.bG), bG: (v1.bH * v2.bF) - (v1.bF * v2.bH), bH: (v1.bF * v2.bG) - (v1.bG * v2.bF)};
	});
var $ianmackenzie$elm_geometry$Vector3d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		return {bF: p2.bF - p1.bF, bG: p2.bG - p1.bG, bH: p2.bH - p1.bH};
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$dot = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return ((v1.bF * v2.bF) + (v1.bG * v2.bG)) + (v1.bH * v2.bH);
	});
var $ianmackenzie$elm_units$Quantity$greaterThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > 0;
	});
var $ianmackenzie$elm_units$Quantity$lessThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 0;
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $ianmackenzie$elm_geometry$Vector3d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {bF: v1.bF - v2.bF, bG: v1.bG - v2.bG, bH: v1.bH - v2.bH};
	});
var $ianmackenzie$elm_geometry$Vector3d$projectionIn = F2(
	function (_v0, _v1) {
		var d = _v0;
		var v = _v1;
		var projectedLength = ((v.bF * d.bF) + (v.bG * d.bG)) + (v.bH * d.bH);
		return {bF: d.bF * projectedLength, bG: d.bG * projectedLength, bH: d.bH * projectedLength};
	});
var $ianmackenzie$elm_geometry$Vector3d$reverse = function (_v0) {
	var v = _v0;
	return {bF: -v.bF, bG: -v.bG, bH: -v.bH};
};
var $ianmackenzie$elm_geometry$Direction3d$orthonormalize = F3(
	function (xVector, xyVector, xyzVector) {
		return A2(
			$elm$core$Maybe$andThen,
			function (xDirection) {
				var yVector = A2(
					$ianmackenzie$elm_geometry$Vector3d$minus,
					A2($ianmackenzie$elm_geometry$Vector3d$projectionIn, xDirection, xyVector),
					xyVector);
				return A2(
					$elm$core$Maybe$andThen,
					function (yDirection) {
						var rightHandedZVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, xyVector, xVector);
						var tripleProduct = A2($ianmackenzie$elm_geometry$Vector3d$dot, xyzVector, rightHandedZVector);
						var zVector = A2($ianmackenzie$elm_units$Quantity$greaterThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? rightHandedZVector : (A2($ianmackenzie$elm_units$Quantity$lessThan, $ianmackenzie$elm_units$Quantity$zero, tripleProduct) ? $ianmackenzie$elm_geometry$Vector3d$reverse(rightHandedZVector) : $ianmackenzie$elm_geometry$Vector3d$zero);
						return A2(
							$elm$core$Maybe$map,
							function (zDirection) {
								return _Utils_Tuple3(xDirection, yDirection, zDirection);
							},
							$ianmackenzie$elm_geometry$Vector3d$direction(zVector));
					},
					$ianmackenzie$elm_geometry$Vector3d$direction(yVector));
			},
			$ianmackenzie$elm_geometry$Vector3d$direction(xVector));
	});
var $ianmackenzie$elm_geometry$Direction3d$perpendicularTo = function (_v0) {
	var d = _v0;
	var absZ = $elm$core$Basics$abs(d.bH);
	var absY = $elm$core$Basics$abs(d.bG);
	var absX = $elm$core$Basics$abs(d.bF);
	if (_Utils_cmp(absX, absY) < 1) {
		if (_Utils_cmp(absX, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.bH * d.bH) + (d.bG * d.bG));
			return {bF: 0, bG: (-d.bH) / scale, bH: d.bG / scale};
		} else {
			var scale = $elm$core$Basics$sqrt((d.bG * d.bG) + (d.bF * d.bF));
			return {bF: (-d.bG) / scale, bG: d.bF / scale, bH: 0};
		}
	} else {
		if (_Utils_cmp(absY, absZ) < 1) {
			var scale = $elm$core$Basics$sqrt((d.bH * d.bH) + (d.bF * d.bF));
			return {bF: d.bH / scale, bG: 0, bH: (-d.bF) / scale};
		} else {
			var scale = $elm$core$Basics$sqrt((d.bF * d.bF) + (d.bG * d.bG));
			return {bF: (-d.bG) / scale, bG: d.bF / scale, bH: 0};
		}
	}
};
var $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis = function (direction) {
	var xDirection = $ianmackenzie$elm_geometry$Direction3d$perpendicularTo(direction);
	var _v0 = xDirection;
	var dX = _v0;
	var _v1 = direction;
	var d = _v1;
	var yDirection = {bF: (d.bG * dX.bH) - (d.bH * dX.bG), bG: (d.bH * dX.bF) - (d.bF * dX.bH), bH: (d.bF * dX.bG) - (d.bG * dX.bF)};
	return _Utils_Tuple2(xDirection, yDirection);
};
var $ianmackenzie$elm_geometry$Geometry$Types$Frame3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Frame3d$unsafe = function (properties) {
	return properties;
};
var $ianmackenzie$elm_geometry$Frame3d$withZDirection = F2(
	function (givenZDirection, givenOrigin) {
		var _v0 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(givenZDirection);
		var computedXDirection = _v0.a;
		var computedYDirection = _v0.b;
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{ew: givenOrigin, eQ: computedXDirection, eU: computedYDirection, eW: givenZDirection});
	});
var $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt = function (_arguments) {
	var zVector = A2($ianmackenzie$elm_geometry$Vector3d$from, _arguments.ec, _arguments.eb);
	var yVector = $ianmackenzie$elm_geometry$Direction3d$toVector(_arguments.eH);
	var xVector = A2($ianmackenzie$elm_geometry$Vector3d$cross, zVector, yVector);
	var _v0 = A3($ianmackenzie$elm_geometry$Direction3d$orthonormalize, zVector, yVector, xVector);
	if (!_v0.$) {
		var _v1 = _v0.a;
		var normalizedZDirection = _v1.a;
		var normalizedYDirection = _v1.b;
		var normalizedXDirection = _v1.c;
		return $ianmackenzie$elm_geometry$Frame3d$unsafe(
			{ew: _arguments.eb, eQ: normalizedXDirection, eU: normalizedYDirection, eW: normalizedZDirection});
	} else {
		var _v2 = $ianmackenzie$elm_geometry$Vector3d$direction(zVector);
		if (!_v2.$) {
			var zDirection = _v2.a;
			return A2($ianmackenzie$elm_geometry$Frame3d$withZDirection, zDirection, _arguments.eb);
		} else {
			var _v3 = $ianmackenzie$elm_geometry$Direction3d$perpendicularBasis(_arguments.eH);
			var arbitraryZDirection = _v3.a;
			var arbitraryXDirection = _v3.b;
			return $ianmackenzie$elm_geometry$Frame3d$unsafe(
				{ew: _arguments.eb, eQ: arbitraryXDirection, eU: _arguments.eH, eW: arbitraryZDirection});
		}
	}
};
var $ianmackenzie$elm_units$Illuminance$lux = function (numLux) {
	return numLux;
};
var $ianmackenzie$elm_geometry$Point3d$meters = F3(
	function (x, y, z) {
		return {bF: x, bG: y, bH: z};
	});
var $ianmackenzie$elm_geometry$Vector3d$mirrorAcross = F2(
	function (_v0, _v1) {
		var plane = _v0;
		var v = _v1;
		var _v2 = plane.$7;
		var n = _v2;
		var a00 = 1 - ((2 * n.bF) * n.bF);
		var a01 = ((-2) * n.bF) * n.bG;
		var a02 = ((-2) * n.bF) * n.bH;
		var a11 = 1 - ((2 * n.bG) * n.bG);
		var a12 = ((-2) * n.bG) * n.bH;
		var a22 = 1 - ((2 * n.bH) * n.bH);
		return {bF: ((a00 * v.bF) + (a01 * v.bG)) + (a02 * v.bH), bG: ((a01 * v.bF) + (a11 * v.bG)) + (a12 * v.bH), bH: ((a02 * v.bF) + (a12 * v.bG)) + (a22 * v.bH)};
	});
var $ianmackenzie$elm_units$Quantity$negate = function (_v0) {
	var value = _v0;
	return -value;
};
var $ianmackenzie$elm_units$Luminance$nits = function (numNits) {
	return numNits;
};
var $author$project$Scene3d$SingleShadowedPass = function (a) {
	return {$: 1, a: a};
};
var $author$project$Scene3d$SingleUnshadowedPass = function (a) {
	return {$: 0, a: a};
};
var $author$project$Scene3d$disabledLight = {bK: 0, bO: 0, cv: 0, cw: 0, cF: 0, bF: 0, bG: 0, bH: 0};
var $elm_explorations$linear_algebra$Math$Matrix4$fromRecord = _MJS_m4x4fromRecord;
var $author$project$Scene3d$lightPair = F2(
	function (_v0, _v1) {
		var first = _v0;
		var second = _v1;
		return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{bZ: first.bF, b_: first.cv, b$: second.bF, b0: second.cv, b1: first.bG, b2: first.bO, b3: second.bG, b4: second.bO, b5: first.bH, b6: first.bK, b7: second.bH, b8: second.bK, b9: first.cF, ca: first.cw, cb: second.cF, cc: second.cw});
	});
var $author$project$Scene3d$oneLight = F2(
	function (light, _v0) {
		var castsShadows = _v0.cP;
		var lightMatrices = {
			a3: A2($author$project$Scene3d$lightPair, light, $author$project$Scene3d$disabledLight),
			a4: A2($author$project$Scene3d$lightPair, $author$project$Scene3d$disabledLight, $author$project$Scene3d$disabledLight),
			a5: A2($author$project$Scene3d$lightPair, $author$project$Scene3d$disabledLight, $author$project$Scene3d$disabledLight),
			a6: A2($author$project$Scene3d$lightPair, $author$project$Scene3d$disabledLight, $author$project$Scene3d$disabledLight)
		};
		return castsShadows ? $author$project$Scene3d$SingleShadowedPass(lightMatrices) : $author$project$Scene3d$SingleUnshadowedPass(lightMatrices);
	});
var $author$project$Scene3d$Types$AmbientLighting = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Luminance$inNits = function (_v0) {
	var numNits = _v0;
	return numNits;
};
var $author$project$Scene3d$Light$overcast = function (_v0) {
	var zenithDirection = _v0.eX;
	var chromaticity = _v0.d0;
	var zenithLuminance = _v0.eY;
	var lz = $ianmackenzie$elm_units$Luminance$inNits(zenithLuminance);
	var _v1 = $ianmackenzie$elm_geometry$Direction3d$unwrap(zenithDirection);
	var x = _v1.bF;
	var y = _v1.bG;
	var z = _v1.bH;
	var _v2 = $author$project$Scene3d$Chromaticity$toLinearRgb(chromaticity);
	var r = _v2.a;
	var g = _v2.b;
	var b = _v2.c;
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{bZ: x, b_: r * lz, b$: 0, b0: 0, b1: y, b2: g * lz, b3: 0, b4: 0, b5: z, b6: b * lz, b7: 0, b8: 0, b9: 1, ca: 0, cb: 0, cc: 0});
};
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Camera3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_geometry$Point3d$along = F2(
	function (_v0, _v1) {
		var axis = _v0;
		var distance = _v1;
		var _v2 = axis.ew;
		var p0 = _v2;
		var _v3 = axis.L;
		var d = _v3;
		return {bF: p0.bF + (distance * d.bF), bG: p0.bG + (distance * d.bG), bH: p0.bH + (distance * d.bH)};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Plane3d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Plane3d$through = F2(
	function (givenPoint, givenNormalDirection) {
		return {$7: givenNormalDirection, ew: givenPoint};
	});
var $ianmackenzie$elm_geometry$Frame3d$zAxis = function (_v0) {
	var frame = _v0;
	return A2($ianmackenzie$elm_geometry$Axis3d$through, frame.ew, frame.eW);
};
var $ianmackenzie$elm_geometry$Frame3d$zDirection = function (_v0) {
	var properties = _v0;
	return properties.eW;
};
var $ianmackenzie$elm_3d_camera$Camera3d$offsetClipPlane = F2(
	function (_v0, depth) {
		var frame = _v0;
		return A2(
			$ianmackenzie$elm_geometry$Plane3d$through,
			A2(
				$ianmackenzie$elm_geometry$Point3d$along,
				$ianmackenzie$elm_geometry$Frame3d$zAxis(frame),
				$ianmackenzie$elm_units$Quantity$negate(depth)),
			$ianmackenzie$elm_geometry$Direction3d$reverse(
				$ianmackenzie$elm_geometry$Frame3d$zDirection(frame)));
	});
var $elm$core$Basics$tan = _Basics_tan;
var $ianmackenzie$elm_units$Angle$tan = function (_v0) {
	var angle = _v0;
	return $elm$core$Basics$tan(angle);
};
var $ianmackenzie$elm_3d_camera$Camera3d$perspective = function (_arguments) {
	var halfFieldOfView = $ianmackenzie$elm_units$Quantity$half(
		$ianmackenzie$elm_units$Quantity$abs(_arguments.eJ));
	var frustumSlope = $ianmackenzie$elm_units$Angle$tan(halfFieldOfView);
	var absoluteClipDepth = $ianmackenzie$elm_units$Quantity$abs(_arguments.d1);
	return {
		d1: absoluteClipDepth,
		bM: A2($ianmackenzie$elm_3d_camera$Camera3d$offsetClipPlane, _arguments.eL, absoluteClipDepth),
		by: $ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective(frustumSlope),
		eL: _arguments.eL
	};
};
var $ianmackenzie$elm_units$Pixels$pixels = function (numPixels) {
	return numPixels;
};
var $elm$core$Basics$round = _Basics_round;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Scene3d$ambientLightingDisabled = $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
	{bZ: 0, b_: 0, b$: 0, b0: 0, b1: 0, b2: 0, b3: 0, b4: 0, b5: 0, b6: 0, b7: 0, b8: 0, b9: 0, ca: 0, cb: 0, cc: 0});
var $author$project$Scene3d$call = F3(
	function (renderPasses, lightMatrices, settings) {
		return A2(
			$elm$core$List$map,
			function (renderPass) {
				return A2(renderPass, lightMatrices, settings);
			},
			renderPasses);
	});
var $author$project$Scene3d$Transformation$modelMatrix = function (transformation) {
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{bZ: transformation.o, b_: transformation.r, b$: transformation.u, b0: transformation.B, b1: transformation.p, b2: transformation.s, b3: transformation.v, b4: transformation.C, b5: transformation.q, b6: transformation.t, b7: transformation.w, b8: transformation.D, b9: 0, ca: 0, cb: 0, cc: 1});
};
var $author$project$Scene3d$createRenderPass = F5(
	function (sceneProperties, viewMatrix, ambientLighting, transformation, drawFunction) {
		return A6(
			drawFunction,
			sceneProperties,
			transformation.ez,
			$author$project$Scene3d$Transformation$modelMatrix(transformation),
			transformation.el,
			viewMatrix,
			ambientLighting);
	});
var $author$project$Scene3d$collectRenderPasses = F6(
	function (sceneProperties, viewMatrix, ambientLighting, currentTransformation, node, accumulated) {
		collectRenderPasses:
		while (true) {
			switch (node.$) {
				case 0:
					return accumulated;
				case 4:
					var transformation = node.a;
					var childNode = node.b;
					var $temp$sceneProperties = sceneProperties,
						$temp$viewMatrix = viewMatrix,
						$temp$ambientLighting = ambientLighting,
						$temp$currentTransformation = A2($author$project$Scene3d$Transformation$compose, transformation, currentTransformation),
						$temp$node = childNode,
						$temp$accumulated = accumulated;
					sceneProperties = $temp$sceneProperties;
					viewMatrix = $temp$viewMatrix;
					ambientLighting = $temp$ambientLighting;
					currentTransformation = $temp$currentTransformation;
					node = $temp$node;
					accumulated = $temp$accumulated;
					continue collectRenderPasses;
				case 1:
					var meshDrawFunction = node.a;
					var updatedMeshes = A2(
						$elm$core$List$cons,
						A5($author$project$Scene3d$createRenderPass, sceneProperties, viewMatrix, ambientLighting, currentTransformation, meshDrawFunction),
						accumulated.O);
					return {O: updatedMeshes, ak: accumulated.ak};
				case 2:
					var shadowDrawFunction = node.a;
					var updatedShadows = A2(
						$elm$core$List$cons,
						A5($author$project$Scene3d$createRenderPass, sceneProperties, viewMatrix, ambientLighting, currentTransformation, shadowDrawFunction),
						accumulated.ak);
					return {O: accumulated.O, ak: updatedShadows};
				default:
					var childNodes = node.a;
					return A3(
						$elm$core$List$foldl,
						A4($author$project$Scene3d$collectRenderPasses, sceneProperties, viewMatrix, ambientLighting, currentTransformation),
						accumulated,
						childNodes);
			}
		}
	});
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Test = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$always = 519;
var $elm_explorations$webgl$WebGL$Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$colorMask = $elm_explorations$webgl$WebGL$Internal$ColorMask;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$Operation = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$decrementWrap = 34056;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$incrementWrap = 34055;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$keep = 7680;
var $elm_explorations$webgl$WebGL$Internal$StencilTest = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {$: 2, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j, k: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate = F3(
	function (_v0, options1, options2) {
		var ref = _v0.cx;
		var mask = _v0.cd;
		var writeMask = _v0.cJ;
		var expandTest = F2(
			function (_v2, fn) {
				var expandedTest = _v2;
				return fn(expandedTest);
			});
		var expandOp = F2(
			function (_v1, fn) {
				var op = _v1;
				return fn(op);
			});
		var expand = function (options) {
			return A2(
				$elm$core$Basics$composeR,
				expandTest(options.bB),
				A2(
					$elm$core$Basics$composeR,
					expandOp(options.bl),
					A2(
						$elm$core$Basics$composeR,
						expandOp(options.bI),
						expandOp(options.bJ))));
		};
		return A2(
			expand,
			options2,
			A2(
				expand,
				options1,
				A3($elm_explorations$webgl$WebGL$Internal$StencilTest, ref, mask, writeMask)));
	});
var $author$project$Scene3d$createShadowStencil = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$less(
		{bN: 1, ch: 0, cI: false}),
		A4($elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false),
		A3(
		$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
		{cd: 255, cx: 1, cJ: 255},
		{bl: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, bB: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, bI: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, bJ: $elm_explorations$webgl$WebGL$Settings$StencilTest$incrementWrap},
		{bl: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, bB: $elm_explorations$webgl$WebGL$Settings$StencilTest$always, bI: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, bJ: $elm_explorations$webgl$WebGL$Settings$StencilTest$decrementWrap})
	]);
var $author$project$Scene3d$depthTestDefault = _List_fromArray(
	[$elm_explorations$webgl$WebGL$Settings$DepthTest$default]);
var $ianmackenzie$elm_geometry$Frame3d$originPoint = function (_v0) {
	var properties = _v0;
	return properties.ew;
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint = function (_v0) {
	var frame = _v0;
	return $ianmackenzie$elm_geometry$Frame3d$originPoint(frame);
};
var $author$project$Scene3d$getPointSize = function (options) {
	var update = F2(
		function (option, oldValue) {
			if (option.$ === 1) {
				var newValue = option.a;
				return newValue;
			} else {
				return oldValue;
			}
		});
	var defaultValue = 1.0;
	return A3($elm$core$List$foldl, update, defaultValue, options);
};
var $elm_explorations$linear_algebra$Math$Vector4$getW = _MJS_v4getW;
var $elm_explorations$linear_algebra$Math$Vector4$getX = _MJS_v4getX;
var $elm_explorations$linear_algebra$Math$Vector4$getZ = _MJS_v4getZ;
var $author$project$Scene3d$Transformation$identity = {el: true, o: 1, p: 0, q: 0, r: 0, s: 1, t: 0, u: 0, v: 0, w: 1, B: 0, C: 0, D: 0, ez: 1};
var $elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual = function (_v0) {
	var write = _v0.cI;
	var near = _v0.ch;
	var far = _v0.bN;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 515, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$notEqual = 517;
var $elm_explorations$webgl$WebGL$Settings$StencilTest$test = function (stencilTest) {
	return A3(
		$elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
		{cd: stencilTest.cd, cx: stencilTest.cx, cJ: stencilTest.cJ},
		{bl: stencilTest.bl, bB: stencilTest.bB, bI: stencilTest.bI, bJ: stencilTest.bJ},
		{bl: stencilTest.bl, bB: stencilTest.bB, bI: stencilTest.bI, bJ: stencilTest.bJ});
};
var $author$project$Scene3d$insideStencil = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
		{bN: 1, ch: 0, cI: true}),
		$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
		{bl: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cd: 255, cx: 0, bB: $elm_explorations$webgl$WebGL$Settings$StencilTest$notEqual, cJ: 0, bI: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, bJ: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep})
	]);
var $author$project$Scene3d$lightingDisabled = {
	a3: A2($author$project$Scene3d$lightPair, $author$project$Scene3d$disabledLight, $author$project$Scene3d$disabledLight),
	a4: A2($author$project$Scene3d$lightPair, $author$project$Scene3d$disabledLight, $author$project$Scene3d$disabledLight),
	a5: A2($author$project$Scene3d$lightPair, $author$project$Scene3d$disabledLight, $author$project$Scene3d$disabledLight),
	a6: A2($author$project$Scene3d$lightPair, $author$project$Scene3d$disabledLight, $author$project$Scene3d$disabledLight)
};
var $author$project$Scene3d$Exposure$maxLuminance = function (_v0) {
	var exposure = _v0;
	return exposure.ce;
};
var $elm_explorations$webgl$WebGL$Settings$StencilTest$equal = 514;
var $author$project$Scene3d$outsideStencil = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
		{bN: 1, ch: 0, cI: true}),
		$elm_explorations$webgl$WebGL$Settings$StencilTest$test(
		{bl: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cd: 255, cx: 0, bB: $elm_explorations$webgl$WebGL$Settings$StencilTest$equal, cJ: 0, bI: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep, bJ: $elm_explorations$webgl$WebGL$Settings$StencilTest$keep})
	]);
var $ianmackenzie$elm_3d_camera$Camera3d$projectionParameters = F2(
	function (_v0, _v1) {
		var screenAspectRatio = _v0.eA;
		var camera = _v1;
		var _v2 = camera.d1;
		var n = _v2;
		var _v3 = camera.by;
		if (!_v3.$) {
			var frustumSlope = _v3.a;
			return A4($elm_explorations$linear_algebra$Math$Vector4$vec4, n, screenAspectRatio, 1 / frustumSlope, 0);
		} else {
			var viewportHeight = _v3.a;
			return A4($elm_explorations$linear_algebra$Math$Vector4$vec4, n, screenAspectRatio, 0, (-2) / viewportHeight);
		}
	});
var $ianmackenzie$elm_units$Quantity$ratio = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return x / y;
	});
var $ianmackenzie$elm_geometry$Frame3d$atOrigin = {ew: $ianmackenzie$elm_geometry$Point3d$origin, eQ: $ianmackenzie$elm_geometry$Direction3d$x, eU: $ianmackenzie$elm_geometry$Direction3d$y, eW: $ianmackenzie$elm_geometry$Direction3d$z};
var $ianmackenzie$elm_geometry$Direction3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var d = _v1;
		var _v2 = frame.eW;
		var k = _v2;
		var _v3 = frame.eU;
		var j = _v3;
		var _v4 = frame.eQ;
		var i = _v4;
		return {bF: ((d.bF * i.bF) + (d.bG * i.bG)) + (d.bH * i.bH), bG: ((d.bF * j.bF) + (d.bG * j.bG)) + (d.bH * j.bH), bH: ((d.bF * k.bF) + (d.bG * k.bG)) + (d.bH * k.bH)};
	});
var $ianmackenzie$elm_geometry$Point3d$relativeTo = F2(
	function (_v0, _v1) {
		var frame = _v0;
		var p = _v1;
		var _v2 = frame.ew;
		var p0 = _v2;
		var deltaX = p.bF - p0.bF;
		var deltaY = p.bG - p0.bG;
		var deltaZ = p.bH - p0.bH;
		var _v3 = frame.eW;
		var k = _v3;
		var _v4 = frame.eU;
		var j = _v4;
		var _v5 = frame.eQ;
		var i = _v5;
		return {bF: ((deltaX * i.bF) + (deltaY * i.bG)) + (deltaZ * i.bH), bG: ((deltaX * j.bF) + (deltaY * j.bG)) + (deltaZ * j.bH), bH: ((deltaX * k.bF) + (deltaY * k.bG)) + (deltaZ * k.bH)};
	});
var $ianmackenzie$elm_geometry$Frame3d$xDirection = function (_v0) {
	var properties = _v0;
	return properties.eQ;
};
var $ianmackenzie$elm_geometry$Frame3d$yDirection = function (_v0) {
	var properties = _v0;
	return properties.eU;
};
var $ianmackenzie$elm_geometry$Frame3d$relativeTo = F2(
	function (otherFrame, frame) {
		return {
			ew: A2(
				$ianmackenzie$elm_geometry$Point3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
			eQ: A2(
				$ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$xDirection(frame)),
			eU: A2(
				$ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$yDirection(frame)),
			eW: A2(
				$ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				$ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
		};
	});
var $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4 = function (frame) {
	var p = $ianmackenzie$elm_geometry$Point3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = $ianmackenzie$elm_geometry$Direction3d$unwrap(
		$ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{bZ: i.bF, b_: j.bF, b$: k.bF, b0: p.bF, b1: i.bG, b2: j.bG, b3: k.bG, b4: p.bG, b5: i.bH, b6: j.bH, b7: k.bH, b8: p.bH, b9: 0, ca: 0, cb: 0, cc: 1});
};
var $ianmackenzie$elm_3d_camera$Viewpoint3d$viewMatrix = function (_v0) {
	var frame = _v0;
	return $ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4(
		A2($ianmackenzie$elm_geometry$Frame3d$relativeTo, frame, $ianmackenzie$elm_geometry$Frame3d$atOrigin));
};
var $ianmackenzie$elm_3d_camera$Camera3d$viewpoint = function (_v0) {
	var camera = _v0;
	return camera.eL;
};
var $ianmackenzie$elm_3d_camera$Camera3d$viewMatrix = function (camera) {
	return $ianmackenzie$elm_3d_camera$Viewpoint3d$viewMatrix(
		$ianmackenzie$elm_3d_camera$Camera3d$viewpoint(camera));
};
var $author$project$Scene3d$toEntities = F3(
	function (options, _v0, drawables) {
		var ambientLighting = _v0.cL;
		var lights = _v0.de;
		var camera = _v0.bL;
		var exposure = _v0.c_;
		var whiteBalance = _v0.dR;
		var width = _v0.bE;
		var height = _v0.bo;
		var viewMatrix = $ianmackenzie$elm_3d_camera$Camera3d$viewMatrix(camera);
		var maxLuminance = $ianmackenzie$elm_units$Luminance$inNits(
			$author$project$Scene3d$Exposure$maxLuminance(exposure));
		var givenPointSize = $author$project$Scene3d$getPointSize(options);
		var eyePoint = $ianmackenzie$elm_geometry$Point3d$unwrap(
			$ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(
				$ianmackenzie$elm_3d_camera$Camera3d$viewpoint(camera)));
		var aspectRatio = A2($ianmackenzie$elm_units$Quantity$ratio, width, height);
		var projectionParameters = A2(
			$ianmackenzie$elm_3d_camera$Camera3d$projectionParameters,
			{eA: aspectRatio},
			camera);
		var clipDistance = $elm_explorations$linear_algebra$Math$Vector4$getX(projectionParameters);
		var kc = $elm_explorations$linear_algebra$Math$Vector4$getZ(projectionParameters);
		var kz = $elm_explorations$linear_algebra$Math$Vector4$getW(projectionParameters);
		var projectionType = (!kz) ? 0 : 1;
		var ambientLightingMatrix = function () {
			if (!ambientLighting.$) {
				var matrix = ambientLighting.a;
				return matrix;
			} else {
				return $author$project$Scene3d$ambientLightingDisabled;
			}
		}();
		var _v1 = $author$project$Scene3d$Drawable$group(drawables);
		var rootNode = _v1;
		var _v2 = $author$project$Scene3d$Chromaticity$toLinearRgb(whiteBalance);
		var r = _v2.a;
		var g = _v2.b;
		var b = _v2.c;
		var sceneProperties = $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{bZ: clipDistance, b_: eyePoint.bF, b$: maxLuminance * r, b0: 0, b1: aspectRatio, b2: eyePoint.bG, b3: maxLuminance * g, b4: 0, b5: kc, b6: eyePoint.bH, b7: maxLuminance * b, b8: 0, b9: kz, ca: projectionType, cb: givenPointSize, cc: 0});
		var renderPasses = A6(
			$author$project$Scene3d$collectRenderPasses,
			sceneProperties,
			viewMatrix,
			ambientLightingMatrix,
			$author$project$Scene3d$Transformation$identity,
			rootNode,
			{O: _List_Nil, ak: _List_Nil});
		switch (lights.$) {
			case 0:
				var lightMatrices = lights.a;
				return A3($author$project$Scene3d$call, renderPasses.O, lightMatrices, $author$project$Scene3d$depthTestDefault);
			case 1:
				var lightMatrices = lights.a;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3($author$project$Scene3d$call, renderPasses.O, $author$project$Scene3d$lightingDisabled, $author$project$Scene3d$depthTestDefault),
							A3($author$project$Scene3d$call, renderPasses.ak, lightMatrices, $author$project$Scene3d$createShadowStencil),
							A3($author$project$Scene3d$call, renderPasses.O, lightMatrices, $author$project$Scene3d$outsideStencil)
						]));
			default:
				var allLightMatrices = lights.a;
				var unshadowedLightMatrices = lights.b;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A3($author$project$Scene3d$call, renderPasses.O, allLightMatrices, $author$project$Scene3d$depthTestDefault),
							A3($author$project$Scene3d$call, renderPasses.ak, allLightMatrices, $author$project$Scene3d$createShadowStencil),
							A3($author$project$Scene3d$call, renderPasses.O, unshadowedLightMatrices, $author$project$Scene3d$insideStencil)
						]));
		}
	});
var $elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var $author$project$Visualizer$torso = A3(
	$author$project$Visualizer$pill,
	$author$project$Visualizer$torsoRadius,
	$author$project$Visualizer$var.cE,
	A2($ianmackenzie$elm_units$Quantity$plus, $author$project$Visualizer$var.az, $author$project$Visualizer$var.aI));
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $ianmackenzie$elm_geometry$Plane3d$zx = A2($ianmackenzie$elm_geometry$Plane3d$through, $ianmackenzie$elm_geometry$Point3d$origin, $ianmackenzie$elm_geometry$Direction3d$y);
var $author$project$Visualizer$viewSubject = function (model) {
	var lightDirection = A2(
		$elm$core$Maybe$withDefault,
		$ianmackenzie$elm_geometry$Direction3d$x,
		$ianmackenzie$elm_geometry$Vector3d$direction(
			A2(
				$ianmackenzie$elm_geometry$Vector3d$mirrorAcross,
				$ianmackenzie$elm_geometry$Plane3d$zx,
				A3($author$project$Visualizer$curveVector, model, model.j.X.ae.E, model.j.P.ae.E))));
	var lightColor = A3($author$project$Visualizer$curveColor, model, model.j.X.ae.A, model.j.P.ae.A);
	var light = A3(
		$author$project$Scene3d$Light$directional,
		$author$project$Scene3d$Chromaticity$fromColor(lightColor),
		$ianmackenzie$elm_units$Illuminance$lux(10000),
		lightDirection);
	var cameraPlacement = A3($author$project$Visualizer$curveVector, model, model.j.X.aj.E, model.j.P.aj.E);
	var eyePoint = A3(
		$ianmackenzie$elm_geometry$Point3d$xyz,
		$ianmackenzie$elm_geometry$Vector3d$xComponent(cameraPlacement),
		$ianmackenzie$elm_geometry$Vector3d$yComponent(cameraPlacement),
		$ianmackenzie$elm_units$Quantity$negate(
			$ianmackenzie$elm_geometry$Vector3d$zComponent(cameraPlacement)));
	var viewpoint = $ianmackenzie$elm_3d_camera$Viewpoint3d$lookAt(
		{
			eb: eyePoint,
			ec: A3($ianmackenzie$elm_geometry$Point3d$meters, 0, -2, 0),
			eH: $ianmackenzie$elm_geometry$Direction3d$y
		});
	var camera = $ianmackenzie$elm_3d_camera$Camera3d$perspective(
		{
			d1: $ianmackenzie$elm_units$Length$meters(0.1),
			eJ: $ianmackenzie$elm_units$Angle$degrees(30),
			eL: viewpoint
		});
	var ambientLighting = $author$project$Scene3d$Light$overcast(
		{
			d0: $author$project$Scene3d$Chromaticity$daylight,
			eX: $ianmackenzie$elm_geometry$Direction3d$z,
			eY: $ianmackenzie$elm_units$Luminance$nits(5000)
		});
	return A3(
		$elm_explorations$webgl$WebGL$toHtmlWith,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$width(
				$elm$core$Basics$round(model.bE)),
				$elm$html$Html$Attributes$height(
				$elm$core$Basics$round(model.bo)),
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$elm$core$String$fromFloat(model.bE) + 'px'),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$elm$core$String$fromFloat(model.bo) + 'px'),
				A2($elm$html$Html$Attributes$style, 'display', 'block')
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Visualizer$backgroundEntity(model),
			A3(
				$author$project$Scene3d$toEntities,
				_List_Nil,
				{
					cL: $elm$core$Maybe$Just(ambientLighting),
					bL: camera,
					c_: $author$project$Scene3d$Exposure$fromMaxLuminance(
						$ianmackenzie$elm_units$Luminance$nits(10000)),
					bo: $ianmackenzie$elm_units$Pixels$pixels(model.bo),
					de: A2(
						$author$project$Scene3d$oneLight,
						light,
						{cP: false}),
					dR: $author$project$Scene3d$Chromaticity$daylight,
					bE: $ianmackenzie$elm_units$Pixels$pixels(model.bE)
				},
				_List_fromArray(
					[
						A3(
						$author$project$Visualizer$animate,
						model,
						$author$project$Visualizer$head,
						function ($) {
							return $.a_;
						}),
						$author$project$Visualizer$torso.aC(
						A3(
							$author$project$Visualizer$animate,
							model,
							$author$project$Visualizer$torso.aq,
							function ($) {
								return $.bg;
							})),
						A3(
						$author$project$Scene3d$Drawable$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$negativeX,
						$author$project$Visualizer$armOffset,
						$author$project$Visualizer$arm.aC(
							A3(
								$author$project$Visualizer$animate,
								model,
								$author$project$Visualizer$arm.aq,
								function ($) {
									return $.a0;
								}))),
						A3(
						$author$project$Scene3d$Drawable$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$positiveX,
						$author$project$Visualizer$armOffset,
						$author$project$Visualizer$arm.aC(
							A3(
								$author$project$Visualizer$animate,
								model,
								$author$project$Visualizer$arm.aq,
								function ($) {
									return $.ba;
								}))),
						A3(
						$author$project$Scene3d$Drawable$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$negativeX,
						$author$project$Visualizer$legOffset,
						$author$project$Visualizer$leg.aC(
							A3(
								$author$project$Visualizer$animate,
								model,
								$author$project$Visualizer$leg.aq,
								function ($) {
									return $.a2;
								}))),
						A3(
						$author$project$Scene3d$Drawable$translateIn,
						$ianmackenzie$elm_geometry$Direction3d$positiveX,
						$author$project$Visualizer$legOffset,
						$author$project$Visualizer$leg.aC(
							A3(
								$author$project$Visualizer$animate,
								model,
								$author$project$Visualizer$leg.aq,
								function ($) {
									return $.bc;
								})))
					]))));
};
var $author$project$Visualizer$view = function (model) {
	return A2(
		$elm$html$Html$main_,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$Visualizer$viewSubject(model),
				A2(
				$elm$html$Html$textarea,
				_List_fromArray(
					[
						$elm$html$Html$Events$onInput($author$project$Visualizer$SetCode),
						$elm$html$Html$Attributes$autofocus(true),
						$elm$html$Html$Attributes$spellcheck(false),
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('error', model.j.ar)
							]))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(model.j.ap)
					]))
			]));
};
var $author$project$Visualizer$main = $elm$browser$Browser$element(
	{eh: $author$project$Visualizer$init, eE: $author$project$Visualizer$subscriptions, eI: $author$project$Visualizer$update, eK: $author$project$Visualizer$view});
_Platform_export({'Visualizer':{'init':$author$project$Visualizer$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (height) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (hash) {
							return $elm$json$Json$Decode$succeed(
								{bn: hash, bo: height, bE: width});
						},
						A2($elm$json$Json$Decode$field, 'hash', $elm$json$Json$Decode$string));
				},
				A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$float));
		},
		A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$float)))(0)}});}(this));