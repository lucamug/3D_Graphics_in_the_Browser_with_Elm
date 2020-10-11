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
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



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
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
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
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
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
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
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
	if (region.d7.b0 === region.eH.b0)
	{
		return 'on line ' + region.d7.b0;
	}
	return 'on lines ' + region.d7.b0 + ' through ' + region.eH.b0;
}



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



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
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
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
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
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
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
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
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
				? elm$core$Result$Ok(decoder.c)
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
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

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
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

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
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
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
		impl.ht,
		impl.iP,
		impl.ir,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
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

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

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
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
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
		aO: func(record.aO),
		d8: record.d8,
		dZ: record.dZ
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
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
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

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.aO;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.d8;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.dZ) && event.preventDefault(),
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
var _WebGL_disableBlend = function (gl) {
  gl.disable(gl.BLEND);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableDepthTest = function (gl) {
  gl.disable(gl.DEPTH_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableStencilTest = function (gl) {
  gl.disable(gl.STENCIL_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableScissor = function (gl) {
  gl.disable(gl.SCISSOR_TEST);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableColorMask = function (gl) {
  gl.colorMask(true, true, true, true);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableCullFace = function (gl) {
  gl.disable(gl.CULL_FACE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disablePolygonOffset = function (gl) {
  gl.disable(gl.POLYGON_OFFSET_FILL);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleCoverage = function (gl) {
  gl.disable(gl.SAMPLE_COVERAGE);
};

// eslint-disable-next-line no-unused-vars
var _WebGL_disableSampleAlphaToCoverage = function (gl) {
  gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
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
  var elemSize = mesh.a.ap;

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
 *  @return {WebGLBuffer} buffer.indexBuffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  _WebGL_log('Created index buffer');
  var indexBuffer = gl.createBuffer();
  var indices = (mesh.a.ar === 0)
    ? _WebGL_makeSequentialBuffer(mesh.a.ap * _WebGL_listLength(mesh.b))
    : _WebGL_makeIndexedBuffer(mesh.c, mesh.a.ar);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return {
    numIndices: indices.length,
    indexBuffer: indexBuffer,
    buffers: {}
  };
}

/**
 *  Create an indices array and fill it with 0..n
 *
 *  @param {Number} numIndices The number of indices
 *  @return {Uint16Array} indices
 */
function _WebGL_makeSequentialBuffer(numIndices) {
  var indices = new Uint16Array(numIndices);
  for (var i = 0; i < numIndices; i++) {
    indices[i] = i;
  }
  return indices;
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

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);

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
    _WebGL_listEach(function (setting) {
      return A2(elm_explorations$webgl$WebGL$Internal$enableSetting, gl, setting);
    }, entity.a);

    gl.drawElements(entity.d.a.aw, buffer.numIndices, gl.UNSIGNED_SHORT, 0);

    _WebGL_listEach(function (setting) {
      return A2(elm_explorations$webgl$WebGL$Internal$disableSetting, gl, setting);
    }, entity.a);

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
            tex = texture.eB(gl);
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
    return A2(elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
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
    return { el: a[0], em: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.el, r.em]);
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
    return { el: a[0], em: a[1], en: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.el, r.em, r.en]);
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
    return { el: a[0], em: a[1], en: a[2], f2: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.el, r.em, r.en, r.f2]);
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
    m[0] = r.dt;
    m[1] = r.dx;
    m[2] = r.dB;
    m[3] = r.dF;
    m[4] = r.du;
    m[5] = r.dy;
    m[6] = r.dC;
    m[7] = r.dG;
    m[8] = r.dv;
    m[9] = r.dz;
    m[10] = r.dD;
    m[11] = r.dH;
    m[12] = r.dw;
    m[13] = r.dA;
    m[14] = r.dE;
    m[15] = r.dI;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        dt: m[0], dx: m[1], dB: m[2], dF: m[3],
        du: m[4], dy: m[5], dC: m[6], dG: m[7],
        dv: m[8], dz: m[9], dD: m[10], dH: m[11],
        dw: m[12], dA: m[13], dE: m[14], dI: m[15]
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
        return elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return elm$core$Maybe$Just(r);
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



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.P.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done(elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done(elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.P.b, xhr)); });
		elm$core$Maybe$isJust(request.ab) && _Http_track(router, xhr, request.ab.a);

		try {
			xhr.open(request.R, request.iQ, true);
		} catch (e) {
			return done(elm$http$Http$BadUrl_(request.iQ));
		}

		_Http_configureRequest(xhr, request);

		request.gv.a && xhr.setRequestHeader('Content-Type', request.gv.a);
		xhr.send(request.gv.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.H; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.U.a || 0;
	xhr.responseType = request.P.d;
	xhr.withCredentials = request.bh;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? elm$http$Http$GoodStatus_ : elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		iQ: xhr.responseURL,
		fP: xhr.status,
		il: xhr.statusText,
		H: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return elm$core$Dict$empty;
	}

	var headers = elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Sending({
			ic: event.loaded,
			d6: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Receiving({
			h1: event.loaded,
			d6: event.lengthComputable ? elm$core$Maybe$Just(event.total) : elm$core$Maybe$Nothing
		}))));
	});
}

function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}

// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.fc) { flags += 'm'; }
	if (options.eu) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
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
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
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
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
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




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.ht,
		impl.iP,
		impl.ir,
		function(sendToApp, initialModel) {
			var view = impl.iS;
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
		impl.ht,
		impl.iP,
		impl.ir,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.b8 && impl.b8(sendToApp)
			var view = impl.iS;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.gv);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.iK) && (_VirtualDom_doc.title = title = doc.iK);
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
	var onUrlChange = impl.hQ;
	var onUrlRequest = impl.hR;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		b8: function(sendToApp)
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
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.fy === next.fy
							&& curr.eR === next.eR
							&& curr.fv.a === next.fv.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		ht: function(flags)
		{
			return A3(impl.ht, flags, _Browser_getUrl(), key);
		},
		iS: impl.iS,
		iP: impl.iP,
		ir: impl.ir
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
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
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hl: 'hidden', gL: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hl: 'mozHidden', gL: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hl: 'msHidden', gL: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hl: 'webkitHidden', gL: 'webkitvisibilitychange' }
		: { hl: 'hidden', gL: 'visibilitychange' };
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
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
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
		fI: _Browser_getScene(),
		f1: {
			el: _Browser_window.pageXOffset,
			em: _Browser_window.pageYOffset,
			iW: _Browser_doc.documentElement.clientWidth,
			hj: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		iW: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		hj: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			fI: {
				iW: node.scrollWidth,
				hj: node.scrollHeight
			},
			f1: {
				el: node.scrollLeft,
				em: node.scrollTop,
				iW: node.clientWidth,
				hj: node.clientHeight
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
			fI: _Browser_getScene(),
			f1: {
				el: x,
				em: y,
				iW: _Browser_doc.documentElement.clientWidth,
				hj: _Browser_doc.documentElement.clientHeight
			},
			g4: {
				el: x + rect.left,
				em: y + rect.top,
				iW: rect.width,
				hj: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
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
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
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
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$initialSeed = function (x) {
	var _n0 = NoRedInk$elm_random_pcg_extended$Internal$Pcg$next(
		A2(NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return NoRedInk$elm_random_pcg_extended$Internal$Pcg$next(
		A2(NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed, state2, incr));
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$Seed = elm$core$Basics$identity;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
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
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.i) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.n),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.n);
		} else {
			var treeLen = builder.i * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.x) : builder.x;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.i);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.n) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.n);
		}
	});
var elm$core$Basics$True = 0;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{x: nodeList, i: nodeListSize, n: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$initialSeed = F2(
	function (baseSeed, extendedSeed) {
		return {
			aF: NoRedInk$elm_random_pcg_extended$Internal$Pcg$initialSeed(baseSeed),
			ae: elm$core$Array$fromList(extendedSeed)
		};
	});
var author$project$RALConfig$ClassicGlossy = 0;
var author$project$RALConfig$ClassicSemiMatte = 2;
var author$project$RALConfig$RALColor = F4(
	function (category, name, code, diffuseColor) {
		return {c6: category, bk: code, aI: diffuseColor, fd: name};
	});
var author$project$Scene3d$Types$Drawable = elm$core$Basics$identity;
var author$project$Scene3d$Types$EmptyNode = {$: 0};
var author$project$Scene3d$Drawable$empty = author$project$Scene3d$Types$EmptyNode;
var elm_explorations$webgl$WebGL$Settings$FaceMode = elm$core$Basics$identity;
var elm_explorations$webgl$WebGL$Settings$back = 1029;
var elm_explorations$webgl$WebGL$Internal$CullFace = function (a) {
	return {$: 5, a: a};
};
var elm_explorations$webgl$WebGL$Settings$cullFace = function (_n0) {
	var faceMode = _n0;
	return elm_explorations$webgl$WebGL$Internal$CullFace(faceMode);
};
var author$project$Scene3d$Drawable$cullBackFaceSetting = elm_explorations$webgl$WebGL$Settings$cullFace(elm_explorations$webgl$WebGL$Settings$back);
var elm_explorations$webgl$WebGL$Settings$front = 1028;
var author$project$Scene3d$Drawable$cullFrontFaceSetting = elm_explorations$webgl$WebGL$Settings$cullFace(elm_explorations$webgl$WebGL$Settings$front);
var author$project$Scene3d$Drawable$meshSettings = F3(
	function (isRightHanded, cullBackFaces, settings) {
		return cullBackFaces ? (isRightHanded ? A2(elm$core$List$cons, author$project$Scene3d$Drawable$cullBackFaceSetting, settings) : A2(elm$core$List$cons, author$project$Scene3d$Drawable$cullFrontFaceSetting, settings)) : settings;
	});
var author$project$Scene3d$Shader$physicalFragment = {
	src: '\n        precision mediump float;\n\n        uniform mat4 sceneProperties;\n        uniform mat4 ambientLighting;\n        uniform mat4 viewMatrix;\n        uniform mat4 lights12;\n        uniform mat4 lights34;\n        uniform mat4 lights56;\n        uniform mat4 lights78;\n        uniform vec3 color;\n        uniform float roughness;\n        uniform float metallic;\n\n        varying vec3 interpolatedPosition;\n        varying vec3 interpolatedNormal;\n\n        float positiveDotProduct(vec3 v1, vec3 v2) {\n            return clamp(dot(v1, v2), 0.0, 1.0);\n        }\n\n        float gammaCorrect(float u) {\n            if (u <= 0.0031308) {\n                return 12.92 * u;\n            } else {\n                return 1.055 * pow(u, 1.0 / 2.4) - 0.055;\n            }\n        }\n\n        vec4 toSrgb(vec3 linearColor) {\n            vec3 referenceWhite = sceneProperties[2].rgb;\n            float red = gammaCorrect(linearColor.r / referenceWhite.r);\n            float green = gammaCorrect(linearColor.g / referenceWhite.g);\n            float blue = gammaCorrect(linearColor.b / referenceWhite.b);\n            return vec4(red, green, blue, 1.0);\n        }\n\n        void getDirectionToLightAndNormalIlluminance(vec4 xyz_type, vec4 rgb_radius, out vec3 directionToLight, out vec3 normalIlluminance) {\n            float lightType = xyz_type.w;\n            if (lightType == 1.0) {\n                directionToLight = xyz_type.xyz;\n                normalIlluminance = rgb_radius.rgb;\n            } else if (lightType == 2.0) {\n                vec3 lightPosition = xyz_type.xyz;\n                vec3 displacement = lightPosition - interpolatedPosition;\n                float distance = length(displacement);\n                directionToLight = displacement / distance;\n                normalIlluminance = rgb_radius.rgb / (4.0 * 3.14159265359 * distance * distance);\n            }\n        }\n\n        float safeQuotient(float numerator, float denominator) {\n            if (denominator == 0.0) {\n                return 0.0;\n            } else {\n                return numerator / denominator;\n            }\n        }\n\n        float specularD(float alphaSquared, float dotNHSquared) {\n            float tmp = dotNHSquared * (alphaSquared - 1.0) + 1.0;\n            return alphaSquared / (3.14159265359 * tmp * tmp);\n        }\n\n        float g1(float dotNV, float alphaSquared) {\n            return safeQuotient(2.0 * dotNV, dotNV + sqrt(alphaSquared + (1.0 - alphaSquared) * dotNV * dotNV));\n        }\n\n        float specularG(float dotNL, float dotNV, float alphaSquared) {\n            return g1(dotNV, alphaSquared) * g1(dotNL, alphaSquared);\n        }\n\n        vec3 fresnelColor(vec3 specularBaseColor, float dotVH) {\n            vec3 one = vec3(1.0, 1.0, 1.0);\n            float scale = exp2((-5.55473 * dotVH - 6.98316) * dotVH);\n            return specularBaseColor + (one - specularBaseColor) * scale;\n        }\n\n        vec3 brdf(vec3 normalDirection, vec3 directionToCamera, vec3 directionToLight, float alphaSquared, float dotNV, float dotNL, vec3 specularBaseColor, vec3 normalIlluminance) {\n            vec3 halfDirection = normalize(directionToCamera + directionToLight);\n            float dotVH = positiveDotProduct(directionToCamera, halfDirection);\n            float dotNH = positiveDotProduct(normalDirection, halfDirection);\n            float dotNHSquared = dotNH * dotNH;\n\n            float d = specularD(alphaSquared, dotNHSquared);\n            float g = specularG(dotNL, dotNV, alphaSquared);\n            vec3 f = fresnelColor(specularBaseColor, dotVH);\n            return safeQuotient(d * g, 4.0 * dotNL * dotNV) * f;\n        }\n\n        float vndf(float dotNV, float alphaSquared, float dotNH) {\n            return safeQuotient(g1(dotNV, alphaSquared) * dotNV * specularD(alphaSquared, dotNH * dotNH), dotNV);\n        }\n\n        float probabilityDensity(float dotNV, float alphaSquared, float dotNH, float dotVH) {\n            return safeQuotient(vndf(dotNV, alphaSquared, dotNH), 4.0 * dotVH);\n        }\n\n        vec3 sampleFacetNormal(float t1, float t2, vec3 vH, vec3 vT1, vec3 vT2, float s, float alpha) {\n            t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n            vec3 vNh = t1 * vT1 + t2 * vT2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * vH;\n            return normalize(vec3(alpha * vNh.x, alpha * vNh.y, max(0.0, vNh.z)));\n        }\n\n        vec3 cloudyLuminance(vec3 zenithLuminance, vec3 localZenithDirection, vec3 localLightDirection) {\n            float sinElevation = dot(localLightDirection, localZenithDirection);\n            return zenithLuminance * ((1.0 + sinElevation) / 2.0);\n        }\n\n        vec3 overcastSpecularSample(\n            vec3 zenithLuminance,\n            vec3 localZenithDirection,\n            vec3 localViewDirection,\n            vec3 localLightDirection,\n            vec3 localHalfDirection,\n            float alphaSquared,\n            vec3 specularBaseColor\n        ) {\n            vec3 luminance = cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection);\n            float dotVH = positiveDotProduct(localViewDirection, localHalfDirection);\n            float dotNL = localLightDirection.z;\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n            return luminance * (fresnelColor(specularBaseColor, dotVH) * g1(dotNL, alphaSquared));\n        }\n\n        vec3 specularLightDirection(vec3 v, vec3 h) {\n            return (2.0 * dot(v, h)) * h - v;\n        }\n\n        vec3 ambientColor(\n            vec3 normalDirection,\n            vec3 directionToCamera,\n            float dotNV,\n            vec3 diffuseBaseColor,\n            vec3 specularBaseColor,\n            float alpha,\n            float alphaSquared\n        ) {\n            float ambientType = ambientLighting[0][3];\n\n            if (ambientType == 0.0) {\n                return vec3(0.0, 0.0, 0.0);\n            }\n\n            if (ambientType == 1.0) {\n                vec3 zenithDirection = ambientLighting[0].xyz;\n                vec3 zenithLuminance = ambientLighting[1].rgb;\n                vec3 crossProduct = cross(normalDirection, directionToCamera);\n                float crossMagnitude = length(crossProduct);\n                vec3 xDirection = vec3(0.0, 0.0, 0.0);\n                vec3 yDirection = vec3(0.0, 0.0, 0.0);\n                if (crossMagnitude > 1.0e-6) {\n                    yDirection = (1.0 / crossMagnitude) * crossProduct;\n                    xDirection = cross(yDirection, normalDirection);\n                } else {\n                    vec3 viewY = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);\n                    xDirection = normalize(cross(viewY, normalDirection));\n                    yDirection = cross(normalDirection, xDirection);\n                }\n                float localViewX = dot(directionToCamera, xDirection);\n                float localViewZ = dot(directionToCamera, normalDirection);\n                vec3 localViewDirection = vec3(localViewX, 0, localViewZ);\n                float localZenithX = dot(zenithDirection, xDirection);\n                float localZenithY = dot(zenithDirection, yDirection);\n                float localZenithZ = dot(zenithDirection, normalDirection);\n                vec3 localZenithDirection = vec3(localZenithX, localZenithY, localZenithZ);\n\n                vec3 vH = normalize(vec3(alpha * localViewX, 0.0, localViewZ));\n                vec3 vT1 = vec3(0.0, 1.0, 0.0);\n                vec3 vT2 = cross(vH, vT1);\n                float s = 0.5 * (1.0 + vH.z);\n                \n                vec3 localHalfDirection = vec3(0.0, 0.0, 0.0);\n                vec3 localLightDirection = vec3(0.0, 0.0, 0.0);\n                float numSamples = 13.0;\n                \n                vec3 specularSum = vec3(0.0, 0.0, 0.0);\n\n                localHalfDirection = sampleFacetNormal(0.000000, 0.000000, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.448762, 0.000000, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n\n                localHalfDirection = sampleFacetNormal(0.000000, 0.448762, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.448762, 0.000000, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.000000, -0.448762, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.748423, 0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.310007, 0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.310007, 0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.748423, 0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.748423, -0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(-0.310007, -0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.310007, -0.748423, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                localHalfDirection = sampleFacetNormal(0.748423, -0.310007, vH, vT1, vT2, s, alpha);\n                localLightDirection = specularLightDirection(localViewDirection, localHalfDirection);\n                specularSum += overcastSpecularSample(zenithLuminance, localZenithDirection, localViewDirection, localLightDirection, localHalfDirection, alphaSquared, specularBaseColor);\n                \n                vec3 diffuseSum = vec3(0.0, 0.0, 0.0);\n\n                localLightDirection = vec3(0.000000, 0.000000, 1.000000);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n\n                localLightDirection = vec3(0.606266, 0.000000, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.000000, 0.606266, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.606266, 0.000000, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.000000, -0.606266, 0.795262);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.873598, 0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.361856, 0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.361856, 0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.873598, 0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.873598, -0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(-0.361856, -0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                localLightDirection = vec3(0.361856, -0.873598, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n\n                localLightDirection = vec3(0.873598, -0.361856, 0.325402);\n                diffuseSum += cloudyLuminance(zenithLuminance, localZenithDirection, localLightDirection) * localLightDirection.z;\n                \n                return (specularSum + 2.0 * diffuseSum * diffuseBaseColor) / numSamples;\n            } else {\n                return vec3(0.0, 0.0, 0.0); \n            }\n        }\n\n        vec3 litColor(vec4 xyz_type, vec4 rgb_radius, vec3 normalDirection, vec3 directionToCamera, float dotNV, vec3 diffuseBaseColor, vec3 specularBaseColor, float alphaSquared) {\n            float lightType = xyz_type.w;\n            if (lightType == 0.0) {\n                return vec3(0.0, 0.0, 0.0);\n            }\n\n            vec3 directionToLight = vec3(0.0, 0.0, 0.0);\n            vec3 normalIlluminance = vec3(0.0, 0.0, 0.0);\n            getDirectionToLightAndNormalIlluminance(xyz_type, rgb_radius, directionToLight, normalIlluminance);\n\n            float dotNL = positiveDotProduct(normalDirection, directionToLight);\n            vec3 specularColor = brdf(normalDirection, directionToCamera, directionToLight, alphaSquared, dotNV, dotNL, specularBaseColor, normalIlluminance);\n            return (normalIlluminance * dotNL) * ((diffuseBaseColor / 3.14159265359) + specularColor);\n        }\n\n        void main() {\n            vec3 normalDirection = normalize(interpolatedNormal);\n            float projectionType = sceneProperties[1][3];\n            vec3 directionToCamera = vec3(0.0, 0.0, 0.0);\n            if (projectionType == 0.0) {\n                vec3 cameraPoint = sceneProperties[1].xyz;\n                directionToCamera = normalize(cameraPoint - interpolatedPosition);\n            } else {\n                directionToCamera = sceneProperties[1].xyz;\n            }\n\n            float dotNV = positiveDotProduct(normalDirection, directionToCamera);\n\n            float nonmetallic = 1.0 - metallic;\n            vec3 diffuseBaseColor = nonmetallic * 0.96 * color;\n            vec3 specularBaseColor = nonmetallic * 0.04 * vec3(1.0, 1.0, 1.0) + metallic * color;\n\n            vec3 linearColor = vec3(0.0, 0.0, 0.0);\n\n            float alpha = roughness * roughness;\n            float alphaSquared = alpha * alpha;\n\n            vec3 color0 = ambientColor(normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alpha, alphaSquared);\n            vec3 color1 = litColor(lights12[0], lights12[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color2 = litColor(lights12[2], lights12[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color3 = litColor(lights34[0], lights34[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color4 = litColor(lights34[2], lights34[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color5 = litColor(lights56[0], lights56[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color6 = litColor(lights56[2], lights56[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color7 = litColor(lights78[0], lights78[1], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n            vec3 color8 = litColor(lights78[2], lights78[3], normalDirection, directionToCamera, dotNV, diffuseBaseColor, specularBaseColor, alphaSquared);\n\n            gl_FragColor = toSrgb(color0 + color1 + color2 + color3 + color4 + color5 + color6 + color7 + color8);\n        }\n    ',
	attributes: {},
	uniforms: {ambientLighting: 'gj', color: 'c8', lights12: 'bY', lights34: 'bZ', lights56: 'b_', lights78: 'b$', metallic: 'e5', roughness: 'fG', sceneProperties: 'bb', viewMatrix: 'bf'}
};
var author$project$Scene3d$Shader$smoothVertex = {
	src: '\n        precision mediump float;\n\n        attribute vec3 position;\n        attribute vec3 normal;\n\n        uniform float modelScale;\n        uniform mat4 modelMatrix;\n        uniform mat4 viewMatrix;\n        uniform mat4 sceneProperties;\n\n        varying vec3 interpolatedPosition;\n        varying vec3 interpolatedNormal;\n\n        vec4 project(vec4 position) {\n            float n = sceneProperties[0][0];\n            float a = sceneProperties[0][1];\n            float kc = sceneProperties[0][2];\n            float kz = sceneProperties[0][3];\n            return vec4(\n                (kc + kz * position.z) * (position.x / a),\n                (kc + kz * position.z) * position.y,\n                (-position.z - 2.0 * n),\n                -position.z\n            );\n        }\n\n        void main () {\n            vec4 scaledPosition = vec4(modelScale * position, 1.0);\n            vec4 transformedPosition = modelMatrix * scaledPosition;\n            gl_Position = project(viewMatrix * transformedPosition);\n            interpolatedPosition = transformedPosition.xyz;\n            interpolatedNormal = (modelMatrix * vec4(normal, 0.0)).xyz;\n        }\n    ',
	attributes: {normal: 'Z', position: 'f'},
	uniforms: {modelMatrix: 'a3', modelScale: 'a4', sceneProperties: 'bb', viewMatrix: 'bf'}
};
var author$project$Scene3d$Types$MeshNode = function (a) {
	return {$: 1, a: a};
};
var elm$core$Basics$False = 1;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{x: nodeList, i: (len / elm$core$Array$branchFactor) | 0, n: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
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
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
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
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
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
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
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
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
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
var elm_explorations$webgl$WebGL$Internal$disableSetting = F2(
	function (gl, setting) {
		switch (setting.$) {
			case 0:
				return _WebGL_disableBlend(gl);
			case 1:
				return _WebGL_disableDepthTest(gl);
			case 2:
				return _WebGL_disableStencilTest(gl);
			case 3:
				return _WebGL_disableScissor(gl);
			case 4:
				return _WebGL_disableColorMask(gl);
			case 5:
				return _WebGL_disableCullFace(gl);
			case 6:
				return _WebGL_disablePolygonOffset(gl);
			case 7:
				return _WebGL_disableSampleCoverage(gl);
			default:
				return _WebGL_disableSampleAlphaToCoverage(gl);
		}
	});
var elm_explorations$webgl$WebGL$Internal$enableOption = F2(
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
var elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
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
var elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var author$project$Scene3d$Drawable$physicalMesh = F5(
	function (color, roughness, metallic, webGLMesh, cullBackFaces) {
		return author$project$Scene3d$Types$MeshNode(
			F8(
				function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, ambientLighting, lights, settings) {
					return A5(
						elm_explorations$webgl$WebGL$entityWith,
						A3(author$project$Scene3d$Drawable$meshSettings, isRightHanded, cullBackFaces, settings),
						author$project$Scene3d$Shader$smoothVertex,
						author$project$Scene3d$Shader$physicalFragment,
						webGLMesh,
						{gj: ambientLighting, c8: color, bY: lights.bY, bZ: lights.bZ, b_: lights.b_, b$: lights.b$, e5: metallic, a3: modelMatrix, a4: modelScale, fG: roughness, bb: sceneProperties, bf: viewMatrix});
				}));
	});
var avh4$elm_color$Color$toRgba = function (_n0) {
	var r = _n0.a;
	var g = _n0.b;
	var b = _n0.c;
	var a = _n0.d;
	return {gh: a, es: b, eN: g, fA: r};
};
var elm$core$Basics$pow = _Basics_pow;
var elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var author$project$Scene3d$Drawable$toLinear = function (color) {
	var _n0 = avh4$elm_color$Color$toRgba(color);
	var red = _n0.fA;
	var green = _n0.eN;
	var blue = _n0.es;
	return A3(
		elm_explorations$linear_algebra$Math$Vector3$vec3,
		A2(elm$core$Basics$pow, red, 2.2),
		A2(elm$core$Basics$pow, green, 2.2),
		A2(elm$core$Basics$pow, blue, 2.2));
};
var elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var author$project$Scene3d$Drawable$physical = F2(
	function (givenMaterial, givenMesh) {
		var roughness = A3(elm$core$Basics$clamp, 0, 1, givenMaterial.fG);
		var metallic = givenMaterial.e5 ? 1 : 0;
		var linearColor = author$project$Scene3d$Drawable$toLinear(givenMaterial.er);
		if (!givenMesh.$) {
			return author$project$Scene3d$Drawable$empty;
		} else {
			var meshData = givenMesh.a;
			var maybeShadow = givenMesh.b;
			switch (meshData.$) {
				case 0:
					return author$project$Scene3d$Drawable$empty;
				case 1:
					var webGLMesh = meshData.c;
					var cullBackFaces = meshData.d;
					return A5(author$project$Scene3d$Drawable$physicalMesh, linearColor, roughness, metallic, webGLMesh, cullBackFaces);
				case 2:
					return author$project$Scene3d$Drawable$empty;
				case 3:
					var webGLMesh = meshData.c;
					var cullBackFaces = meshData.d;
					return A5(author$project$Scene3d$Drawable$physicalMesh, linearColor, roughness, metallic, webGLMesh, cullBackFaces);
				case 4:
					return author$project$Scene3d$Drawable$empty;
				case 5:
					return author$project$Scene3d$Drawable$empty;
				default:
					return author$project$Scene3d$Drawable$empty;
			}
		}
	});
var author$project$Scene3d$Transformation$compose = F2(
	function (t1, t2) {
		return {
			hA: _Utils_eq(t1.hA, t2.hA),
			o: ((t1.o * t2.o) + (t1.p * t2.r)) + (t1.q * t2.u),
			p: ((t1.o * t2.p) + (t1.p * t2.s)) + (t1.q * t2.v),
			q: ((t1.o * t2.q) + (t1.p * t2.t)) + (t1.q * t2.w),
			r: ((t1.r * t2.o) + (t1.s * t2.r)) + (t1.t * t2.u),
			s: ((t1.r * t2.p) + (t1.s * t2.s)) + (t1.t * t2.v),
			t: ((t1.r * t2.q) + (t1.s * t2.t)) + (t1.t * t2.w),
			u: ((t1.u * t2.o) + (t1.v * t2.r)) + (t1.w * t2.u),
			v: ((t1.u * t2.p) + (t1.v * t2.s)) + (t1.w * t2.v),
			w: ((t1.u * t2.q) + (t1.v * t2.t)) + (t1.w * t2.w),
			E: ((t2.E + (t1.E * t2.o)) + (t1.F * t2.r)) + (t1.G * t2.u),
			F: ((t2.F + (t1.E * t2.p)) + (t1.F * t2.s)) + (t1.G * t2.v),
			G: ((t2.G + (t1.E * t2.q)) + (t1.F * t2.t)) + (t1.G * t2.w),
			h5: t1.h5 * t2.h5
		};
	});
var author$project$Scene3d$Types$Transformed = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var author$project$Scene3d$Drawable$transformBy = F2(
	function (transformation, _n0) {
		var node = _n0;
		switch (node.$) {
			case 0:
				return author$project$Scene3d$Drawable$empty;
			case 4:
				var existingTransformation = node.a;
				var underlyingNode = node.b;
				var compositeTransformation = A2(author$project$Scene3d$Transformation$compose, existingTransformation, transformation);
				return A2(author$project$Scene3d$Types$Transformed, compositeTransformation, underlyingNode);
			case 1:
				return A2(author$project$Scene3d$Types$Transformed, transformation, node);
			case 2:
				return A2(author$project$Scene3d$Types$Transformed, transformation, node);
			default:
				return A2(author$project$Scene3d$Types$Transformed, transformation, node);
		}
	});
var ianmackenzie$elm_geometry$Direction3d$unwrap = function (_n0) {
	var coordinates = _n0;
	return coordinates;
};
var ianmackenzie$elm_geometry$Direction3d$xComponent = function (_n0) {
	var d = _n0;
	return d.el;
};
var ianmackenzie$elm_geometry$Direction3d$yComponent = function (_n0) {
	var d = _n0;
	return d.em;
};
var ianmackenzie$elm_geometry$Direction3d$zComponent = function (_n0) {
	var d = _n0;
	return d.en;
};
var ianmackenzie$elm_geometry$Frame3d$isRightHanded = function (_n0) {
	var frame = _n0;
	var i = ianmackenzie$elm_geometry$Direction3d$zComponent(frame.i4);
	var h = ianmackenzie$elm_geometry$Direction3d$yComponent(frame.i4);
	var g = ianmackenzie$elm_geometry$Direction3d$xComponent(frame.i4);
	var f = ianmackenzie$elm_geometry$Direction3d$zComponent(frame.i2);
	var e = ianmackenzie$elm_geometry$Direction3d$yComponent(frame.i2);
	var d = ianmackenzie$elm_geometry$Direction3d$xComponent(frame.i2);
	var c = ianmackenzie$elm_geometry$Direction3d$zComponent(frame.i_);
	var b = ianmackenzie$elm_geometry$Direction3d$yComponent(frame.i_);
	var a = ianmackenzie$elm_geometry$Direction3d$xComponent(frame.i_);
	return (((((((a * e) * i) + ((b * f) * g)) + ((c * d) * h)) - ((c * e) * g)) - ((b * d) * i)) - ((a * f) * h)) > 0;
};
var ianmackenzie$elm_geometry$Frame3d$originPoint = function (_n0) {
	var properties = _n0;
	return properties.hT;
};
var ianmackenzie$elm_geometry$Frame3d$xDirection = function (_n0) {
	var properties = _n0;
	return properties.i_;
};
var ianmackenzie$elm_geometry$Frame3d$yDirection = function (_n0) {
	var properties = _n0;
	return properties.i2;
};
var ianmackenzie$elm_geometry$Frame3d$zDirection = function (_n0) {
	var properties = _n0;
	return properties.i4;
};
var ianmackenzie$elm_geometry$Point3d$unwrap = function (_n0) {
	var coordinates = _n0;
	return coordinates;
};
var author$project$Scene3d$Transformation$placeIn = function (frame) {
	var p0 = ianmackenzie$elm_geometry$Point3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = ianmackenzie$elm_geometry$Direction3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = ianmackenzie$elm_geometry$Direction3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = ianmackenzie$elm_geometry$Direction3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return {
		hA: ianmackenzie$elm_geometry$Frame3d$isRightHanded(frame),
		o: i.el,
		p: i.em,
		q: i.en,
		r: j.el,
		s: j.em,
		t: j.en,
		u: k.el,
		v: k.em,
		w: k.en,
		E: p0.el,
		F: p0.em,
		G: p0.en,
		h5: 1
	};
};
var author$project$Scene3d$Drawable$placeIn = F2(
	function (frame, givenDrawable) {
		return A2(
			author$project$Scene3d$Drawable$transformBy,
			author$project$Scene3d$Transformation$placeIn(frame),
			givenDrawable);
	});
var author$project$Scene3d$Mesh$CullBackFaces = 0;
var author$project$Scene3d$Mesh$cullBackFaces = 0;
var ianmackenzie$elm_geometry$Triangle3d$vertices = function (_n0) {
	var triangleVertices = _n0;
	return triangleVertices;
};
var ianmackenzie$elm_geometry$Geometry$Types$Vector3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Vector3d$cross = F2(
	function (_n0, _n1) {
		var v2 = _n0;
		var v1 = _n1;
		return {el: (v1.em * v2.en) - (v1.en * v2.em), em: (v1.en * v2.el) - (v1.el * v2.en), en: (v1.el * v2.em) - (v1.em * v2.el)};
	});
var ianmackenzie$elm_geometry$Vector3d$from = F2(
	function (_n0, _n1) {
		var p1 = _n0;
		var p2 = _n1;
		return {el: p2.el - p1.el, em: p2.em - p1.em, en: p2.en - p1.en};
	});
var ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3 = function (point) {
	var _n0 = ianmackenzie$elm_geometry$Point3d$unwrap(point);
	var x = _n0.el;
	var y = _n0.em;
	var z = _n0.en;
	return A3(elm_explorations$linear_algebra$Math$Vector3$vec3, x, y, z);
};
var ianmackenzie$elm_geometry$Vector3d$unwrap = function (_n0) {
	var components = _n0;
	return components;
};
var ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3 = function (vector) {
	var _n0 = ianmackenzie$elm_geometry$Vector3d$unwrap(vector);
	var x = _n0.el;
	var y = _n0.em;
	var z = _n0.en;
	return A3(elm_explorations$linear_algebra$Math$Vector3$vec3, x, y, z);
};
var author$project$Scene3d$Mesh$facetAttributes = function (triangle) {
	var _n0 = ianmackenzie$elm_geometry$Triangle3d$vertices(triangle);
	var p1 = _n0.a;
	var p2 = _n0.b;
	var p3 = _n0.c;
	var e1 = A2(ianmackenzie$elm_geometry$Vector3d$from, p1, p2);
	var e2 = A2(ianmackenzie$elm_geometry$Vector3d$from, p2, p3);
	var normal = ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(
		A2(ianmackenzie$elm_geometry$Vector3d$cross, e2, e1));
	return _Utils_Tuple3(
		{
			Z: normal,
			f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p1)
		},
		{
			Z: normal,
			f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p2)
		},
		{
			Z: normal,
			f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(p3)
		});
};
var author$project$Scene3d$Mesh$isCullBackFaces = function (option) {
	return !option;
};
var elm$core$List$any = F2(
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
var author$project$Scene3d$Mesh$getCullBackFaces = function (options) {
	return A2(elm$core$List$any, author$project$Scene3d$Mesh$isCullBackFaces, options);
};
var author$project$Scene3d$Types$Mesh = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Scene3d$Mesh$withoutShadow = function (meshData) {
	return A2(author$project$Scene3d$Types$Mesh, meshData, elm$core$Maybe$Nothing);
};
var author$project$Scene3d$Types$EmptyMesh = {$: 0};
var author$project$Scene3d$Types$Facets = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var elm$core$List$foldrHelper = F4(
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
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
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
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm_explorations$webgl$WebGL$triangles = elm_explorations$webgl$WebGL$Mesh3(
	{ap: 3, ar: 0, aw: 4});
var ianmackenzie$elm_geometry$BoundingBox3d$extrema = function (_n0) {
	var boundingBoxExtrema = _n0;
	return boundingBoxExtrema;
};
var ianmackenzie$elm_geometry$Geometry$Types$BoundingBox3d = elm$core$Basics$identity;
var ianmackenzie$elm_units$Quantity$Quantity = elm$core$Basics$identity;
var ianmackenzie$elm_units$Quantity$max = F2(
	function (_n0, _n1) {
		var x = _n0;
		var y = _n1;
		return A2(elm$core$Basics$max, x, y);
	});
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var ianmackenzie$elm_units$Quantity$min = F2(
	function (_n0, _n1) {
		var x = _n0;
		var y = _n1;
		return A2(elm$core$Basics$min, x, y);
	});
var ianmackenzie$elm_geometry$BoundingBox3d$hullOfHelp = F8(
	function (currentMinX, currentMaxX, currentMinY, currentMaxY, currentMinZ, currentMaxZ, getBoundingBox, items) {
		hullOfHelp:
		while (true) {
			if (items.b) {
				var next = items.a;
				var rest = items.b;
				var b = ianmackenzie$elm_geometry$BoundingBox3d$extrema(
					getBoundingBox(next));
				var $temp$currentMinX = A2(ianmackenzie$elm_units$Quantity$min, b.e6, currentMinX),
					$temp$currentMaxX = A2(ianmackenzie$elm_units$Quantity$max, b.e2, currentMaxX),
					$temp$currentMinY = A2(ianmackenzie$elm_units$Quantity$min, b.e7, currentMinY),
					$temp$currentMaxY = A2(ianmackenzie$elm_units$Quantity$max, b.e3, currentMaxY),
					$temp$currentMinZ = A2(ianmackenzie$elm_units$Quantity$min, b.e8, currentMinZ),
					$temp$currentMaxZ = A2(ianmackenzie$elm_units$Quantity$max, b.e4, currentMaxZ),
					$temp$getBoundingBox = getBoundingBox,
					$temp$items = rest;
				currentMinX = $temp$currentMinX;
				currentMaxX = $temp$currentMaxX;
				currentMinY = $temp$currentMinY;
				currentMaxY = $temp$currentMaxY;
				currentMinZ = $temp$currentMinZ;
				currentMaxZ = $temp$currentMaxZ;
				getBoundingBox = $temp$getBoundingBox;
				items = $temp$items;
				continue hullOfHelp;
			} else {
				return {e2: currentMaxX, e3: currentMaxY, e4: currentMaxZ, e6: currentMinX, e7: currentMinY, e8: currentMinZ};
			}
		}
	});
var ianmackenzie$elm_geometry$BoundingBox3d$hullOf = F3(
	function (getBoundingBox, first, rest) {
		var b1 = ianmackenzie$elm_geometry$BoundingBox3d$extrema(
			getBoundingBox(first));
		return A8(ianmackenzie$elm_geometry$BoundingBox3d$hullOfHelp, b1.e6, b1.e2, b1.e7, b1.e3, b1.e8, b1.e4, getBoundingBox, rest);
	});
var ianmackenzie$elm_units$Quantity$lessThanOrEqualTo = F2(
	function (_n0, _n1) {
		var y = _n0;
		var x = _n1;
		return _Utils_cmp(x, y) < 1;
	});
var ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema = function (given) {
	return (A2(ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.e2, given.e6) && (A2(ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.e3, given.e7) && A2(ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, given.e4, given.e8))) ? given : {
		e2: A2(ianmackenzie$elm_units$Quantity$max, given.e6, given.e2),
		e3: A2(ianmackenzie$elm_units$Quantity$max, given.e7, given.e3),
		e4: A2(ianmackenzie$elm_units$Quantity$max, given.e8, given.e4),
		e6: A2(ianmackenzie$elm_units$Quantity$min, given.e6, given.e2),
		e7: A2(ianmackenzie$elm_units$Quantity$min, given.e7, given.e3),
		e8: A2(ianmackenzie$elm_units$Quantity$min, given.e8, given.e4)
	};
};
var ianmackenzie$elm_geometry$Point3d$xCoordinate = function (_n0) {
	var p = _n0;
	return p.el;
};
var ianmackenzie$elm_geometry$Point3d$yCoordinate = function (_n0) {
	var p = _n0;
	return p.em;
};
var ianmackenzie$elm_geometry$Point3d$zCoordinate = function (_n0) {
	var p = _n0;
	return p.en;
};
var ianmackenzie$elm_geometry$Triangle3d$boundingBox = function (triangle) {
	var _n0 = ianmackenzie$elm_geometry$Triangle3d$vertices(triangle);
	var p1 = _n0.a;
	var p2 = _n0.b;
	var p3 = _n0.c;
	var x1 = ianmackenzie$elm_geometry$Point3d$xCoordinate(p1);
	var y1 = ianmackenzie$elm_geometry$Point3d$yCoordinate(p1);
	var z1 = ianmackenzie$elm_geometry$Point3d$zCoordinate(p1);
	var x2 = ianmackenzie$elm_geometry$Point3d$xCoordinate(p2);
	var y2 = ianmackenzie$elm_geometry$Point3d$yCoordinate(p2);
	var z2 = ianmackenzie$elm_geometry$Point3d$zCoordinate(p2);
	var x3 = ianmackenzie$elm_geometry$Point3d$xCoordinate(p3);
	var y3 = ianmackenzie$elm_geometry$Point3d$yCoordinate(p3);
	var z3 = ianmackenzie$elm_geometry$Point3d$zCoordinate(p3);
	return ianmackenzie$elm_geometry$BoundingBox3d$fromExtrema(
		{
			e2: A2(
				ianmackenzie$elm_units$Quantity$max,
				x1,
				A2(ianmackenzie$elm_units$Quantity$max, x2, x3)),
			e3: A2(
				ianmackenzie$elm_units$Quantity$max,
				y1,
				A2(ianmackenzie$elm_units$Quantity$max, y2, y3)),
			e4: A2(
				ianmackenzie$elm_units$Quantity$max,
				z1,
				A2(ianmackenzie$elm_units$Quantity$max, z2, z3)),
			e6: A2(
				ianmackenzie$elm_units$Quantity$min,
				x1,
				A2(ianmackenzie$elm_units$Quantity$min, x2, x3)),
			e7: A2(
				ianmackenzie$elm_units$Quantity$min,
				y1,
				A2(ianmackenzie$elm_units$Quantity$min, y2, y3)),
			e8: A2(
				ianmackenzie$elm_units$Quantity$min,
				z1,
				A2(ianmackenzie$elm_units$Quantity$min, z2, z3))
		});
};
var author$project$Scene3d$Mesh$facets = F2(
	function (options, givenTriangles) {
		if (!givenTriangles.b) {
			return author$project$Scene3d$Types$EmptyMesh;
		} else {
			var first = givenTriangles.a;
			var rest = givenTriangles.b;
			var webGLMesh = elm_explorations$webgl$WebGL$triangles(
				A2(elm$core$List$map, author$project$Scene3d$Mesh$facetAttributes, givenTriangles));
			var cullBack = author$project$Scene3d$Mesh$getCullBackFaces(options);
			var bounds = A3(ianmackenzie$elm_geometry$BoundingBox3d$hullOf, ianmackenzie$elm_geometry$Triangle3d$boundingBox, first, rest);
			return author$project$Scene3d$Mesh$withoutShadow(
				A4(author$project$Scene3d$Types$Facets, bounds, givenTriangles, webGLMesh, cullBack));
		}
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var ianmackenzie$elm_geometry$Geometry$Types$Point3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Point3d$xyz = F3(
	function (_n0, _n1, _n2) {
		var x = _n0;
		var y = _n1;
		var z = _n2;
		return {el: x, em: y, en: z};
	});
var ianmackenzie$elm_geometry$Geometry$Types$Triangle3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Triangle3d$from = F3(
	function (p1, p2, p3) {
		return _Utils_Tuple3(p1, p2, p3);
	});
var ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _n0) {
		var value = _n0;
		return scale * value;
	});
var author$project$Scene3d$Shape$block = F3(
	function (x, y, z) {
		var minZ = A2(ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, z);
		var minY = A2(ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, y);
		var minX = A2(ianmackenzie$elm_units$Quantity$multiplyBy, -0.5, x);
		var p0 = A3(ianmackenzie$elm_geometry$Point3d$xyz, minX, minY, minZ);
		var maxZ = A2(ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, z);
		var p4 = A3(ianmackenzie$elm_geometry$Point3d$xyz, minX, minY, maxZ);
		var maxY = A2(ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, y);
		var p3 = A3(ianmackenzie$elm_geometry$Point3d$xyz, minX, maxY, minZ);
		var p7 = A3(ianmackenzie$elm_geometry$Point3d$xyz, minX, maxY, maxZ);
		var maxX = A2(ianmackenzie$elm_units$Quantity$multiplyBy, 0.5, x);
		var p1 = A3(ianmackenzie$elm_geometry$Point3d$xyz, maxX, minY, minZ);
		var p2 = A3(ianmackenzie$elm_geometry$Point3d$xyz, maxX, maxY, minZ);
		var p5 = A3(ianmackenzie$elm_geometry$Point3d$xyz, maxX, minY, maxZ);
		var p6 = A3(ianmackenzie$elm_geometry$Point3d$xyz, maxX, maxY, maxZ);
		return A2(
			author$project$Scene3d$Mesh$facets,
			_List_fromArray(
				[author$project$Scene3d$Mesh$cullBackFaces]),
			_List_fromArray(
				[
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p0, p2, p1),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p0, p3, p2),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p4, p5, p6),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p4, p6, p7),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p1, p2, p6),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p1, p6, p5),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p0, p7, p3),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p0, p4, p7),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p0, p1, p5),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p0, p5, p4),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p3, p6, p2),
					A3(ianmackenzie$elm_geometry$Triangle3d$from, p3, p7, p6)
				]));
	});
var avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var avh4$elm_color$Color$white = A4(avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var ianmackenzie$elm_geometry$Geometry$Types$Direction3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Direction3d$unsafe = function (components) {
	return components;
};
var ianmackenzie$elm_geometry$Direction3d$positiveX = ianmackenzie$elm_geometry$Direction3d$unsafe(
	{el: 1, em: 0, en: 0});
var ianmackenzie$elm_geometry$Direction3d$x = ianmackenzie$elm_geometry$Direction3d$positiveX;
var ianmackenzie$elm_geometry$Direction3d$positiveY = ianmackenzie$elm_geometry$Direction3d$unsafe(
	{el: 0, em: 1, en: 0});
var ianmackenzie$elm_geometry$Direction3d$y = ianmackenzie$elm_geometry$Direction3d$positiveY;
var ianmackenzie$elm_geometry$Direction3d$positiveZ = ianmackenzie$elm_geometry$Direction3d$unsafe(
	{el: 0, em: 0, en: 1});
var ianmackenzie$elm_geometry$Direction3d$z = ianmackenzie$elm_geometry$Direction3d$positiveZ;
var ianmackenzie$elm_geometry$Geometry$Types$Frame3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Frame3d$unsafe = function (properties) {
	return properties;
};
var ianmackenzie$elm_geometry$Frame3d$atPoint = function (point) {
	return ianmackenzie$elm_geometry$Frame3d$unsafe(
		{hT: point, i_: ianmackenzie$elm_geometry$Direction3d$x, i2: ianmackenzie$elm_geometry$Direction3d$y, i4: ianmackenzie$elm_geometry$Direction3d$z});
};
var ianmackenzie$elm_geometry$Point3d$meters = F3(
	function (x, y, z) {
		return {el: x, em: y, en: z};
	});
var ianmackenzie$elm_units$Length$meters = function (numMeters) {
	return numMeters;
};
var ianmackenzie$elm_units$Length$centimeters = function (numCentimeters) {
	return ianmackenzie$elm_units$Length$meters(1.0e-2 * numCentimeters);
};
var author$project$RALConfig$floor = function () {
	var floorMesh = A3(
		author$project$Scene3d$Shape$block,
		ianmackenzie$elm_units$Length$meters(3),
		ianmackenzie$elm_units$Length$meters(3),
		ianmackenzie$elm_units$Length$centimeters(1));
	return A2(
		author$project$Scene3d$Drawable$placeIn,
		ianmackenzie$elm_geometry$Frame3d$atPoint(
			A3(ianmackenzie$elm_geometry$Point3d$meters, 0, 0, -1.0e-2)),
		A2(
			author$project$Scene3d$Drawable$physical,
			{er: avh4$elm_color$Color$white, e5: false, fG: 0.25},
			floorMesh));
}();
var author$project$Scene3d$Transformation$translateBy = function (displacement) {
	var v = ianmackenzie$elm_geometry$Vector3d$unwrap(displacement);
	return {hA: true, o: 1, p: 0, q: 0, r: 0, s: 1, t: 0, u: 0, v: 0, w: 1, E: v.el, F: v.em, G: v.en, h5: 1};
};
var author$project$Scene3d$Drawable$translateBy = F2(
	function (displacement, givenDrawable) {
		return A2(
			author$project$Scene3d$Drawable$transformBy,
			author$project$Scene3d$Transformation$translateBy(displacement),
			givenDrawable);
	});
var ianmackenzie$elm_geometry$Vector3d$withLength = F2(
	function (_n0, _n1) {
		var a = _n0;
		var d = _n1;
		return {el: a * d.el, em: a * d.em, en: a * d.en};
	});
var author$project$Scene3d$Drawable$translateIn = F3(
	function (direction, distance, drawable) {
		return A2(
			author$project$Scene3d$Drawable$translateBy,
			A2(ianmackenzie$elm_geometry$Vector3d$withLength, distance, direction),
			drawable);
	});
var author$project$Scene3d$Drawable$collectNodes = F2(
	function (drawables, accumulated) {
		collectNodes:
		while (true) {
			if (!drawables.b) {
				return accumulated;
			} else {
				var node = drawables.a;
				var rest = drawables.b;
				var $temp$drawables = rest,
					$temp$accumulated = A2(elm$core$List$cons, node, accumulated);
				drawables = $temp$drawables;
				accumulated = $temp$accumulated;
				continue collectNodes;
			}
		}
	});
var author$project$Scene3d$Types$Group = function (a) {
	return {$: 3, a: a};
};
var author$project$Scene3d$Drawable$group = function (drawables) {
	return author$project$Scene3d$Types$Group(
		A2(author$project$Scene3d$Drawable$collectNodes, drawables, _List_Nil));
};
var author$project$Scene3d$Shader$shadowFragment = {
	src: '\n        precision mediump float;\n        \n        void main () {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var author$project$Scene3d$Shader$shadowVertex = {
	src: '\n        precision mediump float;\n\n        attribute vec3 position;\n        attribute vec3 normal;\n\n        uniform float modelScale;\n        uniform mat4 modelMatrix;\n        uniform mat4 viewMatrix;\n        uniform mat4 sceneProperties;\n        uniform mat4 lights;\n\n        vec4 project(vec4 position) {\n            float n = sceneProperties[0][0];\n            float a = sceneProperties[0][1];\n            float kc = sceneProperties[0][2];\n            float kz = sceneProperties[0][3];\n            return vec4(\n                (kc + kz * position.z) * (position.x / a),\n                (kc + kz * position.z) * position.y,\n                (-position.z - 2.0 * n),\n                -position.z\n            );\n        }\n        \n        vec3 getDirectionToLight(vec4 xyz_type, vec4 rgb_radius) {\n            float lightType = xyz_type.w;\n            if (lightType == 1.0) {\n                return xyz_type.xyz;\n            } else if (lightType == 2.0) {\n                vec3 lightPosition = xyz_type.xyz;\n                return normalize(lightPosition - position);\n            }\n        }\n\n        void main () {\n            vec4 scaledPosition = vec4(modelScale * position, 1.0);\n            vec4 transformedPosition = modelMatrix * scaledPosition;\n            vec3 transformedNormal = (modelMatrix * vec4(normal, 0.0)).xyz;\n            vec4 xyz_type = lights[0];\n            vec4 rgb_radius = lights[1];\n            vec3 directionToLight = getDirectionToLight(xyz_type, rgb_radius);\n            vec3 offset = vec3(0.0, 0.0, 0.0);\n            if (dot(directionToLight, transformedNormal) <= 0.0) {\n                offset = -1.0e9 * directionToLight;\n            }\n            vec4 offsetPosition = transformedPosition + vec4(offset, 0.0);\n            gl_Position = project(viewMatrix * offsetPosition);\n        }\n    ',
	attributes: {normal: 'Z', position: 'f'},
	uniforms: {lights: 'hD', modelMatrix: 'a3', modelScale: 'a4', sceneProperties: 'bb', viewMatrix: 'bf'}
};
var author$project$Scene3d$Drawable$shadowDrawFunction = function (maybeShadow) {
	if (maybeShadow.$ === 1) {
		return elm$core$Maybe$Nothing;
	} else {
		var givenShadow = maybeShadow.a;
		if (!givenShadow.$) {
			return elm$core$Maybe$Nothing;
		} else {
			var webGLMesh = givenShadow.b;
			return elm$core$Maybe$Just(
				F8(
					function (sceneProperties, modelScale, modelMatrix, isRightHanded, viewMatrix, ambientLighting, lights, settings) {
						return A5(
							elm_explorations$webgl$WebGL$entityWith,
							settings,
							author$project$Scene3d$Shader$shadowVertex,
							author$project$Scene3d$Shader$shadowFragment,
							webGLMesh,
							{hD: lights.bY, a3: modelMatrix, a4: modelScale, bb: sceneProperties, bf: viewMatrix});
					}));
		}
	}
};
var author$project$Scene3d$Types$ShadowNode = function (a) {
	return {$: 2, a: a};
};
var author$project$Scene3d$Drawable$shadow = function (givenMesh) {
	if (!givenMesh.$) {
		return author$project$Scene3d$Drawable$empty;
	} else {
		var meshData = givenMesh.a;
		var maybeShadow = givenMesh.b;
		var _n1 = author$project$Scene3d$Drawable$shadowDrawFunction(maybeShadow);
		if (!_n1.$) {
			var drawFunction = _n1.a;
			return author$project$Scene3d$Types$ShadowNode(drawFunction);
		} else {
			return author$project$Scene3d$Drawable$empty;
		}
	}
};
var author$project$Scene3d$Drawable$withShadow = F2(
	function (shadowMesh, drawable) {
		return author$project$Scene3d$Drawable$group(
			_List_fromArray(
				[
					drawable,
					author$project$Scene3d$Drawable$shadow(shadowMesh)
				]));
	});
var author$project$Scene3d$Mesh$edgeKey = F3(
	function (numVertices, i, j) {
		return (_Utils_cmp(i, j) < 0) ? ((i * numVertices) + j) : ((j * numVertices) + i);
	});
var ianmackenzie$elm_geometry$Vector3d$zero = {el: 0, em: 0, en: 0};
var author$project$Scene3d$Mesh$updateShadowEdge = F6(
	function (i, j, pi, pj, normalVector, currentEntry) {
		if (currentEntry.$ === 1) {
			return (_Utils_cmp(i, j) < 0) ? elm$core$Maybe$Just(
				{X: pj, ag: normalVector, ai: ianmackenzie$elm_geometry$Vector3d$zero, aa: pi}) : elm$core$Maybe$Just(
				{X: pi, ag: ianmackenzie$elm_geometry$Vector3d$zero, ai: normalVector, aa: pj});
		} else {
			var currentEdge = currentEntry.a;
			return (_Utils_cmp(i, j) < 0) ? (_Utils_eq(currentEdge.ag, ianmackenzie$elm_geometry$Vector3d$zero) ? (_Utils_eq(currentEdge.ai, ianmackenzie$elm_geometry$Vector3d$zero) ? currentEntry : elm$core$Maybe$Just(
				{X: currentEdge.X, ag: normalVector, ai: currentEdge.ai, aa: currentEdge.aa})) : elm$core$Maybe$Just(
				{X: currentEdge.X, ag: ianmackenzie$elm_geometry$Vector3d$zero, ai: ianmackenzie$elm_geometry$Vector3d$zero, aa: currentEdge.aa})) : (_Utils_eq(currentEdge.ai, ianmackenzie$elm_geometry$Vector3d$zero) ? (_Utils_eq(currentEdge.ag, ianmackenzie$elm_geometry$Vector3d$zero) ? currentEntry : elm$core$Maybe$Just(
				{X: currentEdge.X, ag: currentEdge.ag, ai: normalVector, aa: currentEdge.aa})) : elm$core$Maybe$Just(
				{X: currentEdge.X, ag: ianmackenzie$elm_geometry$Vector3d$zero, ai: ianmackenzie$elm_geometry$Vector3d$zero, aa: currentEdge.aa}));
		}
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
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
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === -1) {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === -1) {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$core$Basics$sqrt = _Basics_sqrt;
var ianmackenzie$elm_geometry$Vector3d$normalize = function (_n0) {
	var v = _n0;
	var largestComponent = A2(
		elm$core$Basics$max,
		elm$core$Basics$abs(v.el),
		A2(
			elm$core$Basics$max,
			elm$core$Basics$abs(v.em),
			elm$core$Basics$abs(v.en)));
	if (!largestComponent) {
		return ianmackenzie$elm_geometry$Vector3d$zero;
	} else {
		var scaledZ = v.en / largestComponent;
		var scaledY = v.em / largestComponent;
		var scaledX = v.el / largestComponent;
		var scaledLength = elm$core$Basics$sqrt(((scaledX * scaledX) + (scaledY * scaledY)) + (scaledZ * scaledZ));
		return {el: scaledX / scaledLength, em: scaledY / scaledLength, en: scaledZ / scaledLength};
	}
};
var author$project$Scene3d$Mesh$buildShadowEdges = F4(
	function (numVertices, faceIndices, faceVertices, edgeDictionary) {
		buildShadowEdges:
		while (true) {
			if (faceIndices.b) {
				var _n1 = faceIndices.a;
				var i = _n1.a;
				var j = _n1.b;
				var k = _n1.c;
				var remainingFaceIndices = faceIndices.b;
				if (faceVertices.b) {
					var _n3 = faceVertices.a;
					var p1 = _n3.a;
					var p2 = _n3.b;
					var p3 = _n3.c;
					var remainingFaceVertices = faceVertices.b;
					var normal = ianmackenzie$elm_geometry$Vector3d$normalize(
						A2(
							ianmackenzie$elm_geometry$Vector3d$cross,
							A2(ianmackenzie$elm_geometry$Vector3d$from, p1, p3),
							A2(ianmackenzie$elm_geometry$Vector3d$from, p1, p2)));
					var updatedEdgeDictionary = _Utils_eq(normal, ianmackenzie$elm_geometry$Vector3d$zero) ? edgeDictionary : A3(
						elm$core$Dict$update,
						A3(author$project$Scene3d$Mesh$edgeKey, numVertices, k, i),
						A5(author$project$Scene3d$Mesh$updateShadowEdge, k, i, p3, p1, normal),
						A3(
							elm$core$Dict$update,
							A3(author$project$Scene3d$Mesh$edgeKey, numVertices, j, k),
							A5(author$project$Scene3d$Mesh$updateShadowEdge, j, k, p2, p3, normal),
							A3(
								elm$core$Dict$update,
								A3(author$project$Scene3d$Mesh$edgeKey, numVertices, i, j),
								A5(author$project$Scene3d$Mesh$updateShadowEdge, i, j, p1, p2, normal),
								edgeDictionary)));
					var $temp$numVertices = numVertices,
						$temp$faceIndices = remainingFaceIndices,
						$temp$faceVertices = remainingFaceVertices,
						$temp$edgeDictionary = updatedEdgeDictionary;
					numVertices = $temp$numVertices;
					faceIndices = $temp$faceIndices;
					faceVertices = $temp$faceVertices;
					edgeDictionary = $temp$edgeDictionary;
					continue buildShadowEdges;
				} else {
					return _List_Nil;
				}
			} else {
				return elm$core$Dict$values(edgeDictionary);
			}
		}
	});
var author$project$Scene3d$Mesh$collectShadowFaces = F2(
	function (_n0, accumulated) {
		var startPoint = _n0.aa;
		var endPoint = _n0.X;
		var leftNormal = _n0.ag;
		var rightNormal = _n0.ai;
		var secondFace = _Utils_Tuple3(
			{
				Z: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(leftNormal),
				f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(endPoint)
			},
			{
				Z: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(leftNormal),
				f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(startPoint)
			},
			{
				Z: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(rightNormal),
				f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(startPoint)
			});
		var firstFace = _Utils_Tuple3(
			{
				Z: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(rightNormal),
				f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(startPoint)
			},
			{
				Z: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(rightNormal),
				f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(endPoint)
			},
			{
				Z: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Vector3d$toVec3(leftNormal),
				f: ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Point3d$toVec3(endPoint)
			});
		return A2(
			elm$core$List$cons,
			firstFace,
			A2(elm$core$List$cons, secondFace, accumulated));
	});
var author$project$Scene3d$Types$Shadow = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices = function (_n0) {
	var mesh = _n0;
	return mesh.Q;
};
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		if (ma.$ === 1) {
			return elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 1) {
					return elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					return elm$core$Maybe$Just(
						A3(func, a, b, c));
				}
			}
		}
	});
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices = function (_n0) {
	var mesh = _n0;
	return mesh.aC;
};
var ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex = F2(
	function (index, mesh) {
		return A2(
			elm$core$Array$get,
			index,
			ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(mesh));
	});
var ianmackenzie$elm_triangular_mesh$TriangularMesh$faceVertices = function (mesh) {
	var toFace = function (_n0) {
		var i = _n0.a;
		var j = _n0.b;
		var k = _n0.c;
		return A4(
			elm$core$Maybe$map3,
			F3(
				function (firstVertex, secondVertex, thirdVertex) {
					return _Utils_Tuple3(firstVertex, secondVertex, thirdVertex);
				}),
			A2(ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, i, mesh),
			A2(ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, j, mesh),
			A2(ianmackenzie$elm_triangular_mesh$TriangularMesh$vertex, k, mesh));
	};
	return A2(
		elm$core$List$filterMap,
		toFace,
		ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(mesh));
};
var author$project$Scene3d$Mesh$shadowImpl = F2(
	function (boundingBox, triangularMesh) {
		var numVertices = elm$core$Array$length(
			ianmackenzie$elm_triangular_mesh$TriangularMesh$vertices(triangularMesh));
		var faceVertices = ianmackenzie$elm_triangular_mesh$TriangularMesh$faceVertices(triangularMesh);
		var faceIndices = ianmackenzie$elm_triangular_mesh$TriangularMesh$faceIndices(triangularMesh);
		var shadowEdges = A4(author$project$Scene3d$Mesh$buildShadowEdges, numVertices, faceIndices, faceVertices, elm$core$Dict$empty);
		var shadowVolumeFaces = A3(elm$core$List$foldl, author$project$Scene3d$Mesh$collectShadowFaces, _List_Nil, shadowEdges);
		return A2(
			author$project$Scene3d$Types$Shadow,
			shadowEdges,
			elm_explorations$webgl$WebGL$triangles(shadowVolumeFaces));
	});
var author$project$Scene3d$Types$EmptyShadow = {$: 0};
var elm$core$Elm$JsArray$map = _JsArray_map;
var elm$core$Array$map = F2(
	function (func, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return elm$core$Array$SubTree(
					A2(elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return elm$core$Array$Leaf(
					A2(elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2(elm$core$Elm$JsArray$map, helper, tree),
			A2(elm$core$Elm$JsArray$map, func, tail));
	});
var ianmackenzie$elm_triangular_mesh$TriangularMesh$TriangularMesh = elm$core$Basics$identity;
var ianmackenzie$elm_triangular_mesh$TriangularMesh$mapVertices = F2(
	function (_function, _n0) {
		var mesh = _n0;
		return {
			Q: mesh.Q,
			aC: A2(elm$core$Array$map, _function, mesh.aC)
		};
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles = function (faceVertices_) {
	return {
		Q: A2(
			elm$core$List$map,
			function (i) {
				return _Utils_Tuple3(3 * i, (3 * i) + 1, (3 * i) + 2);
			},
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(faceVertices_) - 1)),
		aC: elm$core$Array$fromList(
			elm$core$List$concat(
				A2(
					elm$core$List$map,
					function (_n0) {
						var v1 = _n0.a;
						var v2 = _n0.b;
						var v3 = _n0.c;
						return _List_fromArray(
							[v1, v2, v3]);
					},
					faceVertices_)))
	};
};
var author$project$Scene3d$Mesh$createShadow = function (meshData) {
	switch (meshData.$) {
		case 0:
			var boundingBox = meshData.a;
			var meshTriangles = meshData.b;
			var vertexTriples = A2(elm$core$List$map, ianmackenzie$elm_geometry$Triangle3d$vertices, meshTriangles);
			return A2(
				author$project$Scene3d$Mesh$shadowImpl,
				boundingBox,
				ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(vertexTriples));
		case 1:
			var boundingBox = meshData.a;
			var meshTriangles = meshData.b;
			var vertexTriples = A2(elm$core$List$map, ianmackenzie$elm_geometry$Triangle3d$vertices, meshTriangles);
			return A2(
				author$project$Scene3d$Mesh$shadowImpl,
				boundingBox,
				ianmackenzie$elm_triangular_mesh$TriangularMesh$triangles(vertexTriples));
		case 2:
			var boundingBox = meshData.a;
			var triangularMesh = meshData.b;
			return A2(author$project$Scene3d$Mesh$shadowImpl, boundingBox, triangularMesh);
		case 3:
			var boundingBox = meshData.a;
			var triangularMesh = meshData.b;
			return A2(
				author$project$Scene3d$Mesh$shadowImpl,
				boundingBox,
				A2(
					ianmackenzie$elm_triangular_mesh$TriangularMesh$mapVertices,
					function ($) {
						return $.f;
					},
					triangularMesh));
		case 4:
			return author$project$Scene3d$Types$EmptyShadow;
		case 5:
			return author$project$Scene3d$Types$EmptyShadow;
		default:
			return author$project$Scene3d$Types$EmptyShadow;
	}
};
var author$project$Scene3d$Mesh$enableShadows = function (mesh) {
	if (mesh.$ === 1) {
		if (mesh.b.$ === 1) {
			var meshData = mesh.a;
			var _n1 = mesh.b;
			return A2(
				author$project$Scene3d$Types$Mesh,
				meshData,
				elm$core$Maybe$Just(
					author$project$Scene3d$Mesh$createShadow(meshData)));
		} else {
			var meshData = mesh.a;
			var shadow = mesh.b.a;
			return A2(
				author$project$Scene3d$Types$Mesh,
				meshData,
				elm$core$Maybe$Just(shadow));
		}
	} else {
		return author$project$Scene3d$Types$EmptyMesh;
	}
};
var ianmackenzie$elm_geometry$Direction3d$negativeX = ianmackenzie$elm_geometry$Direction3d$unsafe(
	{el: -1, em: 0, en: 0});
var ianmackenzie$elm_geometry$Direction3d$negativeY = ianmackenzie$elm_geometry$Direction3d$unsafe(
	{el: 0, em: -1, en: 0});
var ianmackenzie$elm_geometry$Point3d$origin = {el: 0, em: 0, en: 0};
var ianmackenzie$elm_units$Length$inMeters = function (_n0) {
	var numMeters = _n0;
	return numMeters;
};
var ianmackenzie$elm_units$Length$inCentimeters = function (length) {
	return 100 * ianmackenzie$elm_units$Length$inMeters(length);
};
var author$project$RALConfig$populateWorld = F4(
	function (color, w, d, h) {
		var w2 = ianmackenzie$elm_units$Length$centimeters(
			ianmackenzie$elm_units$Length$inCentimeters(w) / 2.0);
		var mat = {er: color, e5: true, fG: 0.1};
		var h2 = ianmackenzie$elm_units$Length$centimeters(
			ianmackenzie$elm_units$Length$inCentimeters(h) / 2.0);
		var frame = ianmackenzie$elm_geometry$Frame3d$atPoint(ianmackenzie$elm_geometry$Point3d$origin);
		var d2 = ianmackenzie$elm_units$Length$centimeters(
			ianmackenzie$elm_units$Length$inCentimeters(d) / 2.0);
		var blockMesh = author$project$Scene3d$Mesh$enableShadows(
			A3(author$project$Scene3d$Shape$block, w, d, h));
		var drawnItem = A3(
			author$project$Scene3d$Drawable$translateIn,
			ianmackenzie$elm_geometry$Direction3d$positiveZ,
			h2,
			A3(
				author$project$Scene3d$Drawable$translateIn,
				ianmackenzie$elm_geometry$Direction3d$negativeY,
				d2,
				A3(
					author$project$Scene3d$Drawable$translateIn,
					ianmackenzie$elm_geometry$Direction3d$negativeX,
					w2,
					A2(
						author$project$Scene3d$Drawable$placeIn,
						frame,
						A2(
							author$project$Scene3d$Drawable$withShadow,
							blockMesh,
							A2(author$project$Scene3d$Drawable$physical, mat, blockMesh))))));
		return A2(
			elm$core$List$cons,
			author$project$RALConfig$floor,
			_List_fromArray(
				[drawnItem]));
	});
var elm$core$String$indexes = _String_indexes;
var author$project$RALConfig$supportsArKit = function (ua) {
	return (elm$core$List$length(
		A2(elm$core$String$indexes, 'Safari', ua)) > 0) && ((elm$core$List$length(
		A2(elm$core$String$indexes, 'OS 12 ', ua)) > 0) || (elm$core$List$length(
		A2(elm$core$String$indexes, 'OS 13 ', ua)) > 0));
};
var avh4$elm_color$Color$rgb = F3(
	function (r, g, b) {
		return A4(avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Basics$pi = _Basics_pi;
var ianmackenzie$elm_units$Angle$radians = function (numRadians) {
	return numRadians;
};
var ianmackenzie$elm_units$Angle$degrees = function (numDegrees) {
	return ianmackenzie$elm_units$Angle$radians(elm$core$Basics$pi * (numDegrees / 180));
};
var author$project$RALConfig$init = function (flags) {
	var startWidth = ianmackenzie$elm_units$Length$meters(1.0);
	var startSeed = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$initialSeed, flags.d3, flags.d4);
	var startRAL = A4(
		author$project$RALConfig$RALColor,
		0,
		'Verkehrsweiß',
		'9016',
		A3(avh4$elm_color$Color$rgb, 0.95, 0.94, 0.92));
	var startPalette = _List_fromArray(
		[
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Beige',
			'1001',
			A3(avh4$elm_color$Color$rgb, 0.82, 0.69, 0.52)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Hellelfenbein',
			'1015',
			A3(avh4$elm_color$Color$rgb, 0.9, 0.82, 0.71)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Rapsgelb',
			'1021',
			A3(avh4$elm_color$Color$rgb, 0.96, 0.71, 0.0)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Verkehrsgelb',
			'1023',
			A3(avh4$elm_color$Color$rgb, 0.97, 0.71, 0.0)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Rotorange',
			'2001',
			A3(avh4$elm_color$Color$rgb, 0.73, 0.28, 0.11)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Hellrotorange',
			'2008',
			A3(avh4$elm_color$Color$rgb, 0.93, 0.42, 0.13)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Rubinrot',
			'3003',
			A3(avh4$elm_color$Color$rgb, 0.53, 0.1, 0.13)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Purpurot',
			'3004',
			A3(avh4$elm_color$Color$rgb, 0.42, 0.11, 0.14)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Rotviolett',
			'4002',
			A3(avh4$elm_color$Color$rgb, 0.55, 0.24, 0.29)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Bordeauxviolett',
			'4004',
			A3(avh4$elm_color$Color$rgb, 0.4, 0.12, 0.22)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Ultramarin',
			'5002',
			A3(avh4$elm_color$Color$rgb, 0.0, 0.22, 0.48)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Brillantblau',
			'5007',
			A3(avh4$elm_color$Color$rgb, 0.22, 0.42, 0.55)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Moosgrün',
			'6005',
			A3(avh4$elm_color$Color$rgb, 7.0e-2, 0.26, 0.2)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Tannengrün',
			'6009',
			A3(avh4$elm_color$Color$rgb, 0.15, 0.21, 0.16)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Resedagrün',
			'6011',
			A3(avh4$elm_color$Color$rgb, 0.42, 0.49, 0.35)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Silbergrau',
			'7001',
			A3(avh4$elm_color$Color$rgb, 0.55, 0.59, 0.62)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Anthrazitgrau',
			'7016',
			A3(avh4$elm_color$Color$rgb, 0.22, 0.24, 0.26)),
			A4(
			author$project$RALConfig$RALColor,
			2,
			'Staubgrau',
			'7037',
			A3(avh4$elm_color$Color$rgb, 0.48, 0.48, 0.48)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Sepiabraun',
			'8014',
			A3(avh4$elm_color$Color$rgb, 0.29, 0.21, 0.15)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Graubraun',
			'8019',
			A3(avh4$elm_color$Color$rgb, 0.24, 0.21, 0.21)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Cremeweiß',
			'9001',
			A3(avh4$elm_color$Color$rgb, 0.91, 0.88, 0.82)),
			A4(
			author$project$RALConfig$RALColor,
			2,
			'Signalschwarz',
			'9004',
			A3(avh4$elm_color$Color$rgb, 0.17, 0.17, 0.17)),
			A4(
			author$project$RALConfig$RALColor,
			2,
			'Tiefschwarz',
			'9005',
			A3(avh4$elm_color$Color$rgb, 5.0e-2, 5.0e-2, 6.0e-2)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Weißaluminium',
			'9006',
			A3(avh4$elm_color$Color$rgb, 0.63, 0.63, 0.63)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Graualuminium',
			'9007',
			A3(avh4$elm_color$Color$rgb, 0.53, 0.52, 0.51)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Reinweiß',
			'9010',
			A3(avh4$elm_color$Color$rgb, 0.95, 0.93, 0.88)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Graphitschwarz',
			'9011',
			A3(avh4$elm_color$Color$rgb, 0.15, 0.16, 0.17)),
			A4(
			author$project$RALConfig$RALColor,
			0,
			'Verkehrsweiß',
			'9016',
			A3(avh4$elm_color$Color$rgb, 0.95, 0.94, 0.92))
		]);
	var startHeight = ianmackenzie$elm_units$Length$meters(1.0);
	var startDepth = ianmackenzie$elm_units$Length$meters(1.0);
	return _Utils_Tuple2(
		{
			aE: ianmackenzie$elm_units$Angle$degrees(235),
			ci: 'http://quicklook.ar-launchpad.com',
			bJ: startDepth,
			bK: startHeight,
			bL: startWidth,
			c8: startRAL.aI,
			cw: startSeed,
			c9: elm$core$Maybe$Nothing,
			bl: 4.0,
			ad: '',
			aJ: ianmackenzie$elm_units$Angle$degrees(30),
			eX: elm$core$Maybe$Nothing,
			br: false,
			b1: 0.0,
			b2: 0.0,
			b4: startPalette,
			cT: startRAL.bk,
			fS: author$project$RALConfig$supportsArKit(flags.ee),
			bA: false,
			am: _List_Nil,
			c_: A4(author$project$RALConfig$populateWorld, startRAL.aI, startWidth, startDepth, startHeight)
		},
		elm$core$Platform$Cmd$none);
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$RALConfig$subscriptions = function (model) {
	return elm$core$Platform$Sub$batch(_List_Nil);
};
var NoRedInk$elm_random_general$Random$General$step = F2(
	function (_n0, seed) {
		var gen = _n0;
		return gen(seed);
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step = NoRedInk$elm_random_general$Random$General$step;
var NoRedInk$elm_random_general$Random$General$Generator = elm$core$Basics$identity;
var NoRedInk$elm_random_general$Random$General$map = F2(
	function (func, _n0) {
		var genA = _n0;
		return function (seed0) {
			var _n1 = genA(seed0);
			var a = _n1.a;
			var seed1 = _n1.b;
			return _Utils_Tuple2(
				func(a),
				seed1);
		};
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map = NoRedInk$elm_random_general$Random$General$map;
var NoRedInk$elm_uuid$Prng$Uuid$Uuid = elm$core$Basics$identity;
var NoRedInk$elm_random_general$Random$General$listHelp = F4(
	function (list_, n, generate, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(list_, seed);
			} else {
				var _n0 = generate(seed);
				var value = _n0.a;
				var newSeed = _n0.b;
				var $temp$list_ = A2(elm$core$List$cons, value, list_),
					$temp$n = n - 1,
					$temp$generate = generate,
					$temp$seed = newSeed;
				list_ = $temp$list_;
				n = $temp$n;
				generate = $temp$generate;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var NoRedInk$elm_random_general$Random$General$list = F2(
	function (n, _n0) {
		var generate = _n0;
		return function (seed) {
			return A4(NoRedInk$elm_random_general$Random$General$listHelp, _List_Nil, n, generate, seed);
		};
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$list = NoRedInk$elm_random_general$Random$General$list;
var NoRedInk$elm_random_general$Random$General$int = F3(
	function (_n0, a, b) {
		var c = _n0;
		return function (seed0) {
			var _n1 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _n1.a;
			var hi = _n1.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & c.b6(seed0)) >>> 0) + lo,
					c.b3(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = c.b6(seed);
						var seedN = c.b3(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var NoRedInk$elm_random_general$Random$General$Config = elm$core$Basics$identity;
var NoRedInk$elm_random_general$Random$General$makeConfig = F2(
	function (next, peel) {
		return {b3: next, b6: peel};
	});
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_n0.$) {
			var subTree = _n0.a;
			var newSub = A4(elm$core$Array$setHelp, shift - elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _n0.a;
			var newLeaf = A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, values);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, tail)) : A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4(elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtensionHelp = F3(
	function (index, prev, arr) {
		incrementExtensionHelp:
		while (true) {
			if (!prev) {
				var _n0 = A2(elm$core$Array$get, index, arr);
				if (!_n0.$) {
					var elem = _n0.a;
					var newElem = (elem + 1013904223) >>> 0;
					var $temp$index = index + 1,
						$temp$prev = newElem,
						$temp$arr = A3(elm$core$Array$set, index, newElem, arr);
					index = $temp$index;
					prev = $temp$prev;
					arr = $temp$arr;
					continue incrementExtensionHelp;
				} else {
					return arr;
				}
			} else {
				return arr;
			}
		}
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtension = function (arr) {
	return A3(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtensionHelp, 0, 0, arr);
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$next = function (_n0) {
	var s = _n0;
	var newBase = NoRedInk$elm_random_pcg_extended$Internal$Pcg$next(s.aF);
	var baseState = newBase.a;
	return {
		aF: newBase,
		ae: (!baseState) ? NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtension(s.ae) : s.ae
	};
};
var elm$core$Bitwise$xor = _Bitwise_xor;
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$config = A2(NoRedInk$elm_random_general$Random$General$makeConfig, NoRedInk$elm_random_pcg_extended$Internal$Pcg$next, NoRedInk$elm_random_pcg_extended$Internal$Pcg$peel);
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$int = NoRedInk$elm_random_general$Random$General$int(NoRedInk$elm_random_pcg_extended$Internal$Pcg$config);
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$peel = function (_n0) {
	var s = _n0;
	var baseOut = NoRedInk$elm_random_pcg_extended$Internal$Pcg$peel(s.aF);
	var _n1 = A2(
		NoRedInk$elm_random_general$Random$General$step,
		A2(
			NoRedInk$elm_random_pcg_extended$Internal$Pcg$int,
			0,
			elm$core$Array$length(s.ae) - 1),
		s.aF);
	var randIndex = _n1.a;
	var extension = A2(
		elm$core$Maybe$withDefault,
		0,
		A2(elm$core$Array$get, randIndex, s.ae));
	return (baseOut ^ extension) >>> 0;
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$config = A2(NoRedInk$elm_random_general$Random$General$makeConfig, NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$next, NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$peel);
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$int = NoRedInk$elm_random_general$Random$General$int(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$config);
var NoRedInk$elm_uuid$Prng$Uuid$hexGenerator = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$int, 0, 15);
var elm$core$Bitwise$or = _Bitwise_or;
var NoRedInk$elm_uuid$Prng$Uuid$Barebones$limitDigitRange8ToB = function (digit) {
	return (digit & 3) | 8;
};
var elm$core$Char$fromCode = _Char_fromCode;
var NoRedInk$elm_uuid$Prng$Uuid$Barebones$hexDigits = function () {
	var mapChars = F2(
		function (offset, digit) {
			return elm$core$Char$fromCode(digit + offset);
		});
	return elm$core$Array$fromList(
		_Utils_ap(
			A2(
				elm$core$List$map,
				mapChars(48),
				A2(elm$core$List$range, 0, 9)),
			A2(
				elm$core$List$map,
				mapChars(97),
				A2(elm$core$List$range, 0, 5))));
}();
var NoRedInk$elm_uuid$Prng$Uuid$Barebones$mapToHex = function (index) {
	var maybeResult = A2(elm$core$Array$get, index, NoRedInk$elm_uuid$Prng$Uuid$Barebones$hexDigits);
	if (maybeResult.$ === 1) {
		return 'x';
	} else {
		var result = maybeResult.a;
		return result;
	}
};
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var elm$core$String$fromList = _String_fromList;
var NoRedInk$elm_uuid$Prng$Uuid$Barebones$toUuidString = function (thirtyOneHexDigits) {
	return elm$core$String$concat(
		_List_fromArray(
			[
				elm$core$String$fromList(
				A2(
					elm$core$List$map,
					NoRedInk$elm_uuid$Prng$Uuid$Barebones$mapToHex,
					A2(elm$core$List$take, 8, thirtyOneHexDigits))),
				'-',
				elm$core$String$fromList(
				A2(
					elm$core$List$map,
					NoRedInk$elm_uuid$Prng$Uuid$Barebones$mapToHex,
					A2(
						elm$core$List$take,
						4,
						A2(elm$core$List$drop, 8, thirtyOneHexDigits)))),
				'-',
				'4',
				elm$core$String$fromList(
				A2(
					elm$core$List$map,
					NoRedInk$elm_uuid$Prng$Uuid$Barebones$mapToHex,
					A2(
						elm$core$List$take,
						3,
						A2(elm$core$List$drop, 12, thirtyOneHexDigits)))),
				'-',
				elm$core$String$fromList(
				A2(
					elm$core$List$map,
					NoRedInk$elm_uuid$Prng$Uuid$Barebones$mapToHex,
					A2(
						elm$core$List$map,
						NoRedInk$elm_uuid$Prng$Uuid$Barebones$limitDigitRange8ToB,
						A2(
							elm$core$List$take,
							1,
							A2(elm$core$List$drop, 15, thirtyOneHexDigits))))),
				elm$core$String$fromList(
				A2(
					elm$core$List$map,
					NoRedInk$elm_uuid$Prng$Uuid$Barebones$mapToHex,
					A2(
						elm$core$List$take,
						3,
						A2(elm$core$List$drop, 16, thirtyOneHexDigits)))),
				'-',
				elm$core$String$fromList(
				A2(
					elm$core$List$map,
					NoRedInk$elm_uuid$Prng$Uuid$Barebones$mapToHex,
					A2(
						elm$core$List$take,
						12,
						A2(elm$core$List$drop, 19, thirtyOneHexDigits))))
			]));
};
var NoRedInk$elm_uuid$Prng$Uuid$stringGenerator = A2(
	NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map,
	NoRedInk$elm_uuid$Prng$Uuid$Barebones$toUuidString,
	A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$list, 31, NoRedInk$elm_uuid$Prng$Uuid$hexGenerator));
var NoRedInk$elm_uuid$Prng$Uuid$generator = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map, elm$core$Basics$identity, NoRedInk$elm_uuid$Prng$Uuid$stringGenerator);
var elm$core$String$fromFloat = _String_fromNumber;
var author$project$RALConfig$exportPoints = function (points) {
	var pointList = A2(
		elm$core$List$map,
		function (_n0) {
			var x = _n0.a;
			var y = _n0.b;
			var z = _n0.c;
			return '(' + (elm$core$String$fromFloat(x) + (', ' + (elm$core$String$fromFloat(y) + (', ' + (elm$core$String$fromFloat(z) + ')')))));
		},
		points);
	return '[' + (A2(elm$core$String$join, ', ', pointList) + ']');
};
var ianmackenzie$elm_geometry$Point3d$toRecord = F2(
	function (fromQuantity, point) {
		return {
			el: fromQuantity(
				ianmackenzie$elm_geometry$Point3d$xCoordinate(point)),
			em: fromQuantity(
				ianmackenzie$elm_geometry$Point3d$yCoordinate(point)),
			en: fromQuantity(
				ianmackenzie$elm_geometry$Point3d$zCoordinate(point))
		};
	});
var author$project$RALConfig$exportBlock = F6(
	function (name, ralCode, lw, ld, lh, pos) {
		var w = ianmackenzie$elm_units$Length$inCentimeters(lw);
		var v = A2(ianmackenzie$elm_geometry$Point3d$toRecord, ianmackenzie$elm_units$Length$inCentimeters, pos);
		var vStr = elm$core$String$fromFloat(v.el) + (', ' + (elm$core$String$fromFloat(v.en) + (', ' + elm$core$String$fromFloat(v.em))));
		var h = ianmackenzie$elm_units$Length$inCentimeters(lh);
		var d = ianmackenzie$elm_units$Length$inCentimeters(ld);
		var extendStr = '[(0, 0, 0), (' + (elm$core$String$fromFloat(w) + (', ' + (elm$core$String$fromFloat(h) + (', ' + (elm$core$String$fromFloat(d) + ')]')))));
		var vert = _List_fromArray(
			[
				_Utils_Tuple3(w, h, d),
				_Utils_Tuple3(w, h, 0),
				_Utils_Tuple3(0, h, 0),
				_Utils_Tuple3(0, h, d),
				_Utils_Tuple3(w, 0, d),
				_Utils_Tuple3(w, 0, 0),
				_Utils_Tuple3(0, 0, 0),
				_Utils_Tuple3(0, 0, d)
			]);
		return '\r\ndef Xform ' + ('\"' + (name + ('\"' + ('\r\n{\r\n    matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (' + (vStr + (', 1) )\r\n    uniform token[] xformOpOrder = ["xformOp:transform"]\r\n\r\n    def Xform "Geom"\r\n    {\r\n        matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )\r\n        uniform token[] xformOpOrder = ["xformOp:transform"]\r\n\r\n        def Mesh "WoodTextured"\r\n        {\r\n            matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )\r\n            uniform token[] xformOpOrder = ["xformOp:transform"]\r\n            float3[] extent = ' + (extendStr + ('\r\n            int[] faceVertexCounts = [4, 4, 4, 4, 4, 4]\r\n            int[] faceVertexIndices = [0, 1, 2, 3, 4, 7, 6, 5, 0, 4, 5, 1, 1, 5, 6, 2, 2, 6, 7, 3, 4, 0, 3, 7]\r\n            rel material:binding = </ral/Materials/RAL_' + (ralCode + ('>\r\n            point3f[] points = ' + (author$project$RALConfig$exportPoints(vert) + '\r\n            normal3f[] primvars:normals = [(-0, 1, -0), (-0, -1, 0), (1, -0, -0), (-0, 0, -1), (-1, 0, 0), (0, -0, 1)] (\r\n                interpolation = "faceVarying"\r\n            )\r\n            int[] primvars:normals:indices = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5]\r\n            uniform token subdivisionScheme = "none"\r\n        }\r\n    }\r\n}\r\n')))))))))));
	});
var author$project$RALConfig$usdMaterialForRAL = F2(
	function (superScope, ral) {
		var matName = 'RAL_' + ral.bk;
		var col = avh4$elm_color$Color$toRgba(ral.aI);
		var rgbStr = '(' + (elm$core$String$fromFloat(col.fA) + (', ' + (elm$core$String$fromFloat(col.eN) + (', ' + (elm$core$String$fromFloat(col.es) + ')')))));
		var _n0 = function () {
			var _n1 = ral.c6;
			switch (_n1) {
				case 1:
					return _Utils_Tuple2('0.85', '0.2');
				case 0:
					return _Utils_Tuple2('0.75', '0.5');
				case 2:
					return _Utils_Tuple2('0.35', '0.7');
				default:
					return _Utils_Tuple2('0.35', '0.7');
			}
		}();
		var metallic = _n0.a;
		var roughness = _n0.b;
		return '    \r\n        def Material ' + ('\"' + (matName + ('\"' + ('\r\n        {\r\n            token outputs:surface.connect = </' + (superScope + ('/Materials/' + (matName + ('/surfaceShader.outputs:surface>\r\n\r\n            def Shader "surfaceShader"\r\n            {\r\n                uniform token info:id = "UsdPreviewSurface"\r\n                color3f inputs:diffuseColor = ' + (rgbStr + ('\r\n                color3f inputs:emissiveColor = (0, 0, 0)\r\n                float inputs:metallic = ' + (metallic + ('\r\n                float inputs:occlusion = 0\r\n                float inputs:opacity = ' + (elm$core$String$fromFloat(col.gh) + ('\r\n                float inputs:roughness = ' + (roughness + '\r\n                token outputs:surface\r\n            }\r\n        }\r\n')))))))))))))));
	});
var author$project$RALConfig$usdMaterials = F2(
	function (superScope, rals) {
		var header = '\r\n    def Scope "Materials"\r\n    {\r\n';
		var footer = '    }\r\n';
		return _Utils_ap(
			header,
			_Utils_ap(
				elm$core$String$concat(
					A2(
						elm$core$List$map,
						function (r) {
							return A2(author$project$RALConfig$usdMaterialForRAL, superScope, r);
						},
						rals)),
				footer));
	});
var author$project$RALConfig$exportScene = function (model) {
	var prolog = '#usda 1.0\r\n(\r\n    customLayerData = {\r\n        string creator = "Web based configurator 0.90beta"\r\n    }\r\n    defaultPrim = "ral"\r\n    metersPerUnit = 0.01\r\n    upAxis = "Y"\r\n)\r\n\r\ndef Xform "ral" (\r\n    assetInfo = {\r\n        string name = "ral"\r\n    }\r\n    kind = "component"\r\n)\r\n{\r\n    def Scope "Geom"\r\n    {\r\n        def Xform "myRAL_tex"\r\n        {\r\n            matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )\r\n            uniform token[] xformOpOrder = ["xformOp:transform"]\r\n\r\n            def Xform "Geom"\r\n            {\r\n                matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )\r\n                uniform token[] xformOpOrder = ["xformOp:transform"]\r\n\r\n                def Xform "RAL_set"\r\n                {\r\n                    matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) )\r\n                    uniform token[] xformOpOrder = ["xformOp:transform"]\r\n\r\n                    def Xform "RAL_grp"\r\n                    {\r\n';
	var place = {
		el: (-ianmackenzie$elm_units$Length$inCentimeters(model.bL)) / 2.0,
		em: (-ianmackenzie$elm_units$Length$inCentimeters(model.bJ)) / 2.0,
		en: (-ianmackenzie$elm_units$Length$inCentimeters(model.bK)) / 2.0
	};
	var exportedItems = _List_fromArray(
		[
			_List_fromArray(
			[
				A6(author$project$RALConfig$exportBlock, 'RALsample', model.cT, model.bL, model.bJ, model.bK, ianmackenzie$elm_geometry$Point3d$origin)
			])
		]);
	var epilog = '\r\n                        matrix4d xformOp:transform = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (' + (elm$core$String$fromFloat(place.el) + (', ' + (elm$core$String$fromFloat(place.en) + (', ' + (elm$core$String$fromFloat(place.em) + ', 1) )\r\n                        uniform token[] xformOpOrder = ["xformOp:transform"]\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }')))));
	var endScope = '\r\n}\r\n';
	return _Utils_ap(
		prolog,
		_Utils_ap(
			A2(
				elm$core$String$join,
				'',
				elm$core$List$concat(exportedItems)),
			_Utils_ap(
				epilog,
				_Utils_ap(
					A2(author$project$RALConfig$usdMaterials, 'ral', model.b4),
					endScope))));
};
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$RALConfig$ralByCode = F2(
	function (code, colors) {
		return elm$core$List$head(
			A2(
				elm$core$List$filterMap,
				function (c) {
					return _Utils_eq(c.bk, code) ? elm$core$Maybe$Just(c) : elm$core$Maybe$Nothing;
				},
				colors));
	});
var NoRedInk$elm_uuid$Prng$Uuid$toString = function (_n0) {
	var internalString = _n0;
	return internalString;
};
var author$project$RALConfig$GotUrl = function (a) {
	return {$: 10, a: a};
};
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$RALConfig$urlDecoder = elm$json$Json$Decode$string;
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var elm$http$Http$NetworkError_ = {$: 2};
var elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$Timeout_ = {$: 1};
var elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			elm$core$Basics$identity,
			A2(elm$core$Basics$composeR, toResult, toMsg));
	});
var elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$NetworkError = {$: 2};
var elm$http$Http$Timeout = {$: 1};
var elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadUrl(url));
			case 1:
				return elm$core$Result$Err(elm$http$Http$Timeout);
			case 2:
				return elm$core$Result$Err(elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadStatus(metadata.fP));
			default:
				var body = response.b;
				return A2(
					elm$core$Result$mapError,
					elm$http$Http$BadBody,
					toResult(body));
		}
	});
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			elm$http$Http$expectStringResponse,
			toMsg,
			elm$http$Http$resolve(
				function (string) {
					return A2(
						elm$core$Result$mapError,
						elm$json$Json$Decode$errorToString,
						A2(elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var elm$url$Url$Builder$toQueryPair = function (_n0) {
	var key = _n0.a;
	var value = _n0.b;
	return key + ('=' + value);
};
var elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			elm$core$String$join,
			'&',
			A2(elm$core$List$map, elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2(elm$core$String$join, '/', pathSegments) + elm$url$Url$Builder$toQuery(parameters)));
	});
var elm$url$Url$percentEncode = _Url_percentEncode;
var elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$url$Url$Builder$string = F2(
	function (key, value) {
		return A2(
			elm$url$Url$Builder$QueryParameter,
			elm$url$Url$percentEncode(key),
			elm$url$Url$percentEncode(value));
	});
var elm$http$Http$emptyBody = _Http_emptyBody;
var elm$http$Http$expectString = function (toMsg) {
	return A2(
		elm$http$Http$expectStringResponse,
		toMsg,
		elm$http$Http$resolve(elm$core$Result$Ok));
};
var lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl = F2(
	function (method, url) {
		return {
			gv: elm$http$Http$emptyBody,
			P: elm$http$Http$expectString(
				function (_n0) {
					return 0;
				}),
			H: _List_Nil,
			R: method,
			U: elm$core$Maybe$Nothing,
			iQ: url,
			bE: false
		};
	});
var lukewestby$elm_http_builder$HttpBuilder$post = lukewestby$elm_http_builder$HttpBuilder$requestWithMethodAndUrl('POST');
var elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$http$Http$State = F2(
	function (reqs, subs) {
		return {fC: reqs, fR: subs};
	});
var elm$http$Http$init = elm$core$Task$succeed(
	A2(elm$http$Http$State, elm$core$Dict$empty, _List_Nil));
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _n2 = A2(elm$core$Dict$get, tracker, reqs);
					if (_n2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _n2.a;
						return A2(
							elm$core$Task$andThen,
							function (_n3) {
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2(elm$core$Dict$remove, tracker, reqs));
							},
							elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						elm$core$Task$andThen,
						function (pid) {
							var _n4 = req.ab;
							if (_n4.$ === 1) {
								return A3(elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _n4.a;
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3(elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			elm$core$Task$andThen,
			function (reqs) {
				return elm$core$Task$succeed(
					A2(elm$http$Http$State, reqs, subs));
			},
			A3(elm$http$Http$updateReqs, router, cmds, state.fC));
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _n0) {
		var actualTracker = _n0.a;
		var toMsg = _n0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? elm$core$Maybe$Just(
			A2(
				elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : elm$core$Maybe$Nothing;
	});
var elm$http$Http$onSelfMsg = F3(
	function (router, _n0, state) {
		var tracker = _n0.a;
		var progress = _n0.b;
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$filterMap,
					A3(elm$http$Http$maybeSend, router, tracker, progress),
					state.fR)));
	});
var elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return elm$http$Http$Request(
				{
					bh: r.bh,
					gv: r.gv,
					P: A2(_Http_mapExpect, func, r.P),
					H: r.H,
					R: r.R,
					U: r.U,
					ab: r.ab,
					iQ: r.iQ
				});
		}
	});
var elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$http$Http$subMap = F2(
	function (func, _n0) {
		var tracker = _n0.a;
		var toMsg = _n0.b;
		return A2(
			elm$http$Http$MySub,
			tracker,
			A2(elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager(elm$http$Http$init, elm$http$Http$onEffects, elm$http$Http$onSelfMsg, elm$http$Http$cmdMap, elm$http$Http$subMap);
var elm$http$Http$command = _Platform_leaf('Http');
var elm$http$Http$subscription = _Platform_leaf('Http');
var elm$http$Http$request = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{bh: false, gv: r.gv, P: r.P, H: r.H, R: r.R, U: r.U, ab: r.ab, iQ: r.iQ}));
};
var elm$http$Http$riskyRequest = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{bh: true, gv: r.gv, P: r.P, H: r.H, R: r.R, U: r.U, ab: r.ab, iQ: r.iQ}));
};
var lukewestby$elm_http_builder$HttpBuilder$request = function (builder) {
	var req = builder.bE ? elm$http$Http$riskyRequest : elm$http$Http$request;
	return req(
		{gv: builder.gv, P: builder.P, H: builder.H, R: builder.R, U: builder.U, ab: elm$core$Maybe$Nothing, iQ: builder.iQ});
};
var lukewestby$elm_http_builder$HttpBuilder$withExpect = F2(
	function (expect, builder) {
		return {gv: builder.gv, P: expect, H: builder.H, R: builder.R, U: builder.U, iQ: builder.iQ, bE: builder.bE};
	});
var elm$http$Http$stringBody = _Http_pair;
var lukewestby$elm_http_builder$HttpBuilder$withBody = F2(
	function (body, builder) {
		return _Utils_update(
			builder,
			{gv: body});
	});
var lukewestby$elm_http_builder$HttpBuilder$withStringBody = F2(
	function (contentType, value) {
		return lukewestby$elm_http_builder$HttpBuilder$withBody(
			A2(elm$http$Http$stringBody, contentType, value));
	});
var lukewestby$elm_http_builder$HttpBuilder$withTimeout = F2(
	function (timeout, builder) {
		return _Utils_update(
			builder,
			{
				U: elm$core$Maybe$Just(timeout)
			});
	});
var author$project$RALConfig$requestUSDZ = F3(
	function (base, uuid, usda) {
		return lukewestby$elm_http_builder$HttpBuilder$request(
			A2(
				lukewestby$elm_http_builder$HttpBuilder$withExpect,
				A2(elm$http$Http$expectJson, author$project$RALConfig$GotUrl, author$project$RALConfig$urlDecoder),
				A2(
					lukewestby$elm_http_builder$HttpBuilder$withTimeout,
					10000,
					A3(
						lukewestby$elm_http_builder$HttpBuilder$withStringBody,
						'text/plain',
						usda,
						lukewestby$elm_http_builder$HttpBuilder$post(
							A3(
								elm$url$Url$Builder$crossOrigin,
								base,
								_List_fromArray(
									['USDZerveApp', 'api', 'Model']),
								_List_fromArray(
									[
										A2(
										elm$url$Url$Builder$string,
										'uuid',
										NoRedInk$elm_uuid$Prng$Uuid$toString(uuid)),
										A2(elm$url$Url$Builder$string, 'productKey', 'SecretKey'),
										A2(elm$url$Url$Builder$string, 'procedure', 'usda2z')
									])))))));
	});
var author$project$RALConfig$touchDistance = F2(
	function (a, b) {
		var _n0 = b.an;
		var x2 = _n0.a;
		var y2 = _n0.b;
		var _n1 = a.an;
		var x1 = _n1.a;
		var y1 = _n1.b;
		return elm$core$Basics$sqrt(
			A2(elm$core$Basics$pow, x2 - x1, 2.0) + A2(elm$core$Basics$pow, y2 - y1, 2.0));
	});
var ianmackenzie$elm_units$Quantity$clamp = F3(
	function (_n0, _n1, _n2) {
		var lower = _n0;
		var upper = _n1;
		var value = _n2;
		return (_Utils_cmp(lower, upper) < 1) ? A3(elm$core$Basics$clamp, lower, upper, value) : A3(elm$core$Basics$clamp, upper, lower, value);
	});
var ianmackenzie$elm_units$Quantity$minus = F2(
	function (_n0, _n1) {
		var y = _n0;
		var x = _n1;
		return x - y;
	});
var ianmackenzie$elm_units$Quantity$plus = F2(
	function (_n0, _n1) {
		var y = _n0;
		var x = _n1;
		return x + y;
	});
var author$project$RALConfig$update = F2(
	function (message, model) {
		switch (message.$) {
			case 4:
				var touches = message.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bA: true, am: touches}),
					elm$core$Platform$Cmd$none);
			case 6:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bA: false, am: _List_Nil}),
					elm$core$Platform$Cmd$none);
			case 7:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bA: false, am: _List_Nil}),
					elm$core$Platform$Cmd$none);
			case 5:
				var touches = message.a;
				if (model.bA) {
					var _n1 = _Utils_Tuple2(touches, model.am);
					_n1$2:
					while (true) {
						if (_n1.a.b) {
							if (!_n1.a.b.b) {
								if (_n1.b.b && (!_n1.b.b.b)) {
									var _n2 = _n1.a;
									var endPos = _n2.a;
									var _n3 = _n1.b;
									var startPos = _n3.a;
									var _n4 = endPos.an;
									var x = _n4.a;
									var y = _n4.b;
									var _n5 = startPos.an;
									var startX = _n5.a;
									var startY = _n5.b;
									var pan = x - startX;
									var newAzimuth = A2(
										ianmackenzie$elm_units$Quantity$minus,
										ianmackenzie$elm_units$Angle$degrees(pan),
										model.aE);
									var tilt = y - startY;
									var newElevation = A3(
										ianmackenzie$elm_units$Quantity$clamp,
										ianmackenzie$elm_units$Angle$degrees(10),
										ianmackenzie$elm_units$Angle$degrees(85),
										A2(
											ianmackenzie$elm_units$Quantity$plus,
											ianmackenzie$elm_units$Angle$degrees(tilt),
											model.aJ));
									return _Utils_Tuple2(
										_Utils_update(
											model,
											{aE: newAzimuth, aJ: newElevation, am: touches}),
										elm$core$Platform$Cmd$none);
								} else {
									break _n1$2;
								}
							} else {
								if ((((!_n1.a.b.b.b) && _n1.b.b) && _n1.b.b.b) && (!_n1.b.b.b.b)) {
									var _n6 = _n1.a;
									var endA = _n6.a;
									var _n7 = _n6.b;
									var endB = _n7.a;
									var _n8 = _n1.b;
									var startA = _n8.a;
									var _n9 = _n8.b;
									var startB = _n9.a;
									var distStart = A2(author$project$RALConfig$touchDistance, startA, startB);
									var distEnd = A2(author$project$RALConfig$touchDistance, endA, endB);
									var quot = (distStart / distEnd) - 1.0;
									if ((quot > 5.0e-3) || (_Utils_cmp(quot, -5.0e-3) < 0)) {
										var newDistance = model.bl * (1.0 + quot);
										return _Utils_Tuple2(
											_Utils_update(
												model,
												{bl: newDistance, am: touches}),
											elm$core$Platform$Cmd$none);
									} else {
										var c = 3;
										var _n10 = endA.an;
										var x = _n10.a;
										var y = _n10.b;
										var _n11 = startA.an;
										var startX = _n11.a;
										var startY = _n11.b;
										var panX = (x - startX) / c;
										var panY = (-(y - startY)) / c;
										return _Utils_Tuple2(
											_Utils_update(
												model,
												{am: touches}),
											elm$core$Platform$Cmd$none);
									}
								} else {
									break _n1$2;
								}
							}
						} else {
							break _n1$2;
						}
					}
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{am: touches}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 0:
				var _n12 = message.a;
				var startX = _n12.a;
				var starY = _n12.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{br: true, b1: startX, b2: starY}),
					elm$core$Platform$Cmd$none);
			case 2:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{br: false}),
					elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{br: false}),
					elm$core$Platform$Cmd$none);
			case 1:
				var _n13 = message.a;
				var x = _n13.a;
				var y = _n13.b;
				if (model.br) {
					var dy = model.b2 - y;
					var newElevation = A3(
						ianmackenzie$elm_units$Quantity$clamp,
						ianmackenzie$elm_units$Angle$degrees(10),
						ianmackenzie$elm_units$Angle$degrees(85),
						A2(
							ianmackenzie$elm_units$Quantity$minus,
							ianmackenzie$elm_units$Angle$degrees(dy),
							model.aJ));
					var dx = model.b1 - x;
					var newAzimuth = A2(
						ianmackenzie$elm_units$Quantity$plus,
						ianmackenzie$elm_units$Angle$degrees(dx),
						model.aE);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{aE: newAzimuth, aJ: newElevation, b1: x, b2: y}),
						elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 8:
				var _n14 = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step, NoRedInk$elm_uuid$Prng$Uuid$generator, model.cw);
				var newUuid = _n14.a;
				var newSeed = _n14.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cw: newSeed,
							c9: elm$core$Maybe$Just(newUuid),
							ad: model.ci + '/models/myRAL.usdz#allowContentScaling=0'
						}),
					A3(
						author$project$RALConfig$requestUSDZ,
						model.ci,
						newUuid,
						author$project$RALConfig$exportScene(model)));
			case 10:
				if (!message.a.$) {
					var url = message.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ad: url + '#allowContentScaling=0'}),
						elm$core$Platform$Cmd$none);
				} else {
					var err = message.a.a;
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				}
			case 9:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{ad: ''}),
					elm$core$Platform$Cmd$none);
			default:
				var code = message.a;
				return _Utils_Tuple2(
					function () {
						var _n15 = A2(author$project$RALConfig$ralByCode, code, model.b4);
						if (!_n15.$) {
							var newColor = _n15.a;
							return _Utils_update(
								model,
								{
									c8: newColor.aI,
									ad: '',
									cT: code,
									c_: A4(author$project$RALConfig$populateWorld, newColor.aI, model.bL, model.bJ, model.bK)
								});
						} else {
							return model;
						}
					}(),
					elm$core$Platform$Cmd$none);
		}
	});
var author$project$RALConfig$CancelMoveList = function (a) {
	return {$: 7, a: a};
};
var author$project$RALConfig$ClearDownloadUrl = {$: 9};
var author$project$RALConfig$EndMove = function (a) {
	return {$: 2, a: a};
};
var author$project$RALConfig$EndMoveList = function (a) {
	return {$: 6, a: a};
};
var author$project$RALConfig$Export = {$: 8};
var author$project$RALConfig$Move = function (a) {
	return {$: 1, a: a};
};
var author$project$RALConfig$MoveList = function (a) {
	return {$: 5, a: a};
};
var author$project$RALConfig$SelectRAL = function (a) {
	return {$: 11, a: a};
};
var author$project$RALConfig$StartMove = function (a) {
	return {$: 0, a: a};
};
var author$project$RALConfig$StartMoveList = function (a) {
	return {$: 4, a: a};
};
var author$project$Scene3d$Chromaticity$Chromaticity = elm$core$Basics$identity;
var author$project$Scene3d$Chromaticity$daylight = {el: 0.31271, em: 0.32902};
var author$project$Scene3d$Color$Xyz = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var author$project$Scene3d$Chromaticity$toXyz = function (_n0) {
	var x = _n0.el;
	var y = _n0.em;
	return A3(author$project$Scene3d$Color$Xyz, x / y, 1, ((1 - x) - y) / y);
};
var author$project$Scene3d$Color$LinearRgb = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var author$project$Scene3d$Color$xyzToLinearRgb = function (_n0) {
	var bigX = _n0.a;
	var bigY = _n0.b;
	var bigZ = _n0.c;
	return A3(author$project$Scene3d$Color$LinearRgb, ((3.2406 * bigX) - (1.5372 * bigY)) - (0.4986 * bigZ), (((-0.9689) * bigX) + (1.8758 * bigY)) + (4.15e-2 * bigZ), ((5.57e-2 * bigX) - (0.204 * bigY)) + (1.057 * bigZ));
};
var author$project$Scene3d$Chromaticity$toLinearRgb = function (chromaticity) {
	return author$project$Scene3d$Color$xyzToLinearRgb(
		author$project$Scene3d$Chromaticity$toXyz(chromaticity));
};
var author$project$Scene3d$Types$AmbientLighting = elm$core$Basics$identity;
var elm_explorations$linear_algebra$Math$Matrix4$fromRecord = _MJS_m4x4fromRecord;
var ianmackenzie$elm_units$Luminance$inNits = function (_n0) {
	var numNits = _n0;
	return numNits;
};
var author$project$Scene3d$Light$overcast = function (_n0) {
	var zenithDirection = _n0.i5;
	var chromaticity = _n0.gN;
	var zenithLuminance = _n0.i6;
	var lz = ianmackenzie$elm_units$Luminance$inNits(zenithLuminance);
	var _n1 = ianmackenzie$elm_geometry$Direction3d$unwrap(zenithDirection);
	var x = _n1.el;
	var y = _n1.em;
	var z = _n1.en;
	var _n2 = author$project$Scene3d$Chromaticity$toLinearRgb(chromaticity);
	var r = _n2.a;
	var g = _n2.b;
	var b = _n2.c;
	return elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{dt: x, du: r * lz, dv: 0, dw: 0, dx: y, dy: g * lz, dz: 0, dA: 0, dB: z, dC: b * lz, dD: 0, dE: 0, dF: 1, dG: 0, dH: 0, dI: 0});
};
var ianmackenzie$elm_units$Luminance$nits = function (numNits) {
	return numNits;
};
var author$project$RALConfig$ambientLighting = author$project$Scene3d$Light$overcast(
	{
		gN: author$project$Scene3d$Chromaticity$daylight,
		i5: ianmackenzie$elm_geometry$Direction3d$positiveZ,
		i6: ianmackenzie$elm_units$Luminance$nits(12000)
	});
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$elm_ui$Element$htmlAttribute = mdgriffith$elm_ui$Internal$Model$Attr;
var author$project$RALConfig$centerText = mdgriffith$elm_ui$Element$htmlAttribute(
	A2(elm$html$Html$Attributes$style, 'text-align', 'center'));
var mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var mdgriffith$elm_ui$Element$fromRgb = function (clr) {
	return A4(mdgriffith$elm_ui$Internal$Model$Rgba, clr.fA, clr.eN, clr.es, clr.gh);
};
var mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var mdgriffith$elm_ui$Internal$Flag$padding = mdgriffith$elm_ui$Internal$Flag$flag(2);
var mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 7, a: a, b: b, c: c, d: d, e: e};
	});
var mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var mdgriffith$elm_ui$Element$padding = function (x) {
	return A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + elm$core$String$fromInt(x),
			x,
			x,
			x,
			x));
};
var mdgriffith$elm_ui$Internal$Flag$bgColor = mdgriffith$elm_ui$Internal$Flag$flag(8);
var mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var elm$core$Basics$round = _Basics_round;
var mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return elm$core$String$fromInt(
		elm$core$Basics$round(x * 255));
};
var mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var mdgriffith$elm_ui$Internal$Flag$borderRound = mdgriffith$elm_ui$Internal$Flag$flag(17);
var mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + elm$core$String$fromInt(radius),
			'border-radius',
			elm$core$String$fromInt(radius) + 'px'));
};
var mdgriffith$elm_ui$Internal$Flag$fontColor = mdgriffith$elm_ui$Internal$Flag$flag(14);
var mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var author$project$RALConfig$buttonStyle = F2(
	function (bg, fg) {
		return _List_fromArray(
			[
				mdgriffith$elm_ui$Element$Background$color(
				mdgriffith$elm_ui$Element$fromRgb(
					avh4$elm_color$Color$toRgba(bg))),
				mdgriffith$elm_ui$Element$Font$color(
				mdgriffith$elm_ui$Element$fromRgb(
					avh4$elm_color$Color$toRgba(fg))),
				mdgriffith$elm_ui$Element$Border$rounded(4),
				mdgriffith$elm_ui$Element$padding(4),
				author$project$RALConfig$centerText
			]);
	});
var mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4(mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var author$project$RALConfig$darkGray = A3(mdgriffith$elm_ui$Element$rgb255, 60, 60, 60);
var author$project$RALConfig$selectedColor = A3(mdgriffith$elm_ui$Element$rgb255, 120, 120, 120);
var author$project$Scene3d$Types$Light = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Direction3d$reverse = function (_n0) {
	var d = _n0;
	return {el: -d.el, em: -d.em, en: -d.en};
};
var ianmackenzie$elm_units$Illuminance$inLux = function (_n0) {
	var numLux = _n0;
	return numLux;
};
var author$project$Scene3d$Light$directional = F3(
	function (chromaticity, illuminance, direction) {
		var lux = ianmackenzie$elm_units$Illuminance$inLux(illuminance);
		var _n0 = ianmackenzie$elm_geometry$Direction3d$unwrap(
			ianmackenzie$elm_geometry$Direction3d$reverse(direction));
		var x = _n0.el;
		var y = _n0.em;
		var z = _n0.en;
		var _n1 = author$project$Scene3d$Chromaticity$toLinearRgb(chromaticity);
		var r = _n1.a;
		var g = _n1.b;
		var b = _n1.c;
		return {c4: b * lux, df: g * lux, d_: r * lux, d$: 0, ea: 1, el: x, em: y, en: z};
	});
var ianmackenzie$elm_geometry$Geometry$Types$Axis3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Axis3d$through = F2(
	function (givenPoint, givenDirection) {
		return {W: givenDirection, hT: givenPoint};
	});
var ianmackenzie$elm_geometry$Axis3d$x = A2(ianmackenzie$elm_geometry$Axis3d$through, ianmackenzie$elm_geometry$Point3d$origin, ianmackenzie$elm_geometry$Direction3d$x);
var ianmackenzie$elm_geometry$Axis3d$z = A2(ianmackenzie$elm_geometry$Axis3d$through, ianmackenzie$elm_geometry$Point3d$origin, ianmackenzie$elm_geometry$Direction3d$z);
var ianmackenzie$elm_geometry$Direction3d$negativeZ = ianmackenzie$elm_geometry$Direction3d$unsafe(
	{el: 0, em: 0, en: -1});
var elm$core$Basics$cos = _Basics_cos;
var elm$core$Basics$sin = _Basics_sin;
var ianmackenzie$elm_geometry$Direction3d$rotateAround = F3(
	function (_n0, _n1, _n2) {
		var axis = _n0;
		var angle = _n1;
		var d = _n2;
		var halfAngle = 0.5 * angle;
		var qw = elm$core$Basics$cos(halfAngle);
		var sinHalfAngle = elm$core$Basics$sin(halfAngle);
		var _n3 = axis.W;
		var a = _n3;
		var qx = a.el * sinHalfAngle;
		var qwx = qw * qx;
		var qxx = qx * qx;
		var qy = a.em * sinHalfAngle;
		var qwy = qw * qy;
		var qxy = qx * qy;
		var qyy = qy * qy;
		var a22 = 1 - (2 * (qxx + qyy));
		var qz = a.en * sinHalfAngle;
		var qwz = qw * qz;
		var a01 = 2 * (qxy - qwz);
		var a10 = 2 * (qxy + qwz);
		var qxz = qx * qz;
		var a02 = 2 * (qxz + qwy);
		var a20 = 2 * (qxz - qwy);
		var qyz = qy * qz;
		var a12 = 2 * (qyz - qwx);
		var a21 = 2 * (qyz + qwx);
		var qzz = qz * qz;
		var a00 = 1 - (2 * (qyy + qzz));
		var a11 = 1 - (2 * (qxx + qzz));
		return {el: ((a00 * d.el) + (a01 * d.em)) + (a02 * d.en), em: ((a10 * d.el) + (a11 * d.em)) + (a12 * d.en), en: ((a20 * d.el) + (a21 * d.em)) + (a22 * d.en)};
	});
var ianmackenzie$elm_units$Illuminance$lux = function (numLux) {
	return numLux;
};
var author$project$RALConfig$sunlight = A3(
	author$project$Scene3d$Light$directional,
	author$project$Scene3d$Chromaticity$daylight,
	ianmackenzie$elm_units$Illuminance$lux(16000),
	A3(
		ianmackenzie$elm_geometry$Direction3d$rotateAround,
		ianmackenzie$elm_geometry$Axis3d$z,
		ianmackenzie$elm_units$Angle$degrees(-20),
		A3(
			ianmackenzie$elm_geometry$Direction3d$rotateAround,
			ianmackenzie$elm_geometry$Axis3d$x,
			ianmackenzie$elm_units$Angle$degrees(20),
			ianmackenzie$elm_geometry$Direction3d$negativeZ)));
var author$project$RALConfig$touchList = function (touchEvent) {
	return touchEvent.iN;
};
var author$project$Scene3d$SingleShadowedPass = function (a) {
	return {$: 1, a: a};
};
var author$project$Scene3d$SingleUnshadowedPass = function (a) {
	return {$: 0, a: a};
};
var author$project$Scene3d$disabledLight = {c4: 0, df: 0, d_: 0, d$: 0, ea: 0, el: 0, em: 0, en: 0};
var author$project$Scene3d$lightPair = F2(
	function (_n0, _n1) {
		var first = _n0;
		var second = _n1;
		return elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{dt: first.el, du: first.d_, dv: second.el, dw: second.d_, dx: first.em, dy: first.df, dz: second.em, dA: second.df, dB: first.en, dC: first.c4, dD: second.en, dE: second.c4, dF: first.ea, dG: first.d$, dH: second.ea, dI: second.d$});
	});
var author$project$Scene3d$oneLight = F2(
	function (light, _n0) {
		var castsShadows = _n0.gK;
		var lightMatrices = {
			bY: A2(author$project$Scene3d$lightPair, light, author$project$Scene3d$disabledLight),
			bZ: A2(author$project$Scene3d$lightPair, author$project$Scene3d$disabledLight, author$project$Scene3d$disabledLight),
			b_: A2(author$project$Scene3d$lightPair, author$project$Scene3d$disabledLight, author$project$Scene3d$disabledLight),
			b$: A2(author$project$Scene3d$lightPair, author$project$Scene3d$disabledLight, author$project$Scene3d$disabledLight)
		};
		return castsShadows ? author$project$Scene3d$SingleShadowedPass(lightMatrices) : author$project$Scene3d$SingleUnshadowedPass(lightMatrices);
	});
var avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4(avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var author$project$Scene3d$getClearColor = function (options) {
	var update = F2(
		function (option, oldValue) {
			if (!option.$) {
				var newValue = option.a;
				return newValue;
			} else {
				return oldValue;
			}
		});
	var defaultValue = A4(avh4$elm_color$Color$rgba, 1.0, 1.0, 1.0, 0.0);
	return A3(elm$core$List$foldl, update, defaultValue, options);
};
var author$project$Scene3d$ambientLightingDisabled = elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
	{dt: 0, du: 0, dv: 0, dw: 0, dx: 0, dy: 0, dz: 0, dA: 0, dB: 0, dC: 0, dD: 0, dE: 0, dF: 0, dG: 0, dH: 0, dI: 0});
var author$project$Scene3d$call = F3(
	function (renderPasses, lightMatrices, settings) {
		return A2(
			elm$core$List$map,
			function (renderPass) {
				return A2(renderPass, lightMatrices, settings);
			},
			renderPasses);
	});
var author$project$Scene3d$Transformation$modelMatrix = function (transformation) {
	return elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{dt: transformation.o, du: transformation.r, dv: transformation.u, dw: transformation.E, dx: transformation.p, dy: transformation.s, dz: transformation.v, dA: transformation.F, dB: transformation.q, dC: transformation.t, dD: transformation.w, dE: transformation.G, dF: 0, dG: 0, dH: 0, dI: 1});
};
var author$project$Scene3d$createRenderPass = F5(
	function (sceneProperties, viewMatrix, ambientLighting, transformation, drawFunction) {
		return A6(
			drawFunction,
			sceneProperties,
			transformation.h5,
			author$project$Scene3d$Transformation$modelMatrix(transformation),
			transformation.hA,
			viewMatrix,
			ambientLighting);
	});
var author$project$Scene3d$collectRenderPasses = F6(
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
						$temp$currentTransformation = A2(author$project$Scene3d$Transformation$compose, transformation, currentTransformation),
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
						elm$core$List$cons,
						A5(author$project$Scene3d$createRenderPass, sceneProperties, viewMatrix, ambientLighting, currentTransformation, meshDrawFunction),
						accumulated.Y);
					return {Y: updatedMeshes, aS: accumulated.aS};
				case 2:
					var shadowDrawFunction = node.a;
					var updatedShadows = A2(
						elm$core$List$cons,
						A5(author$project$Scene3d$createRenderPass, sceneProperties, viewMatrix, ambientLighting, currentTransformation, shadowDrawFunction),
						accumulated.aS);
					return {Y: accumulated.Y, aS: updatedShadows};
				default:
					var childNodes = node.a;
					return A3(
						elm$core$List$foldl,
						A4(author$project$Scene3d$collectRenderPasses, sceneProperties, viewMatrix, ambientLighting, currentTransformation),
						accumulated,
						childNodes);
			}
		}
	});
var elm_explorations$webgl$WebGL$Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var elm_explorations$webgl$WebGL$Settings$colorMask = elm_explorations$webgl$WebGL$Internal$ColorMask;
var elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_n0) {
	var write = _n0.ej;
	var near = _n0.dN;
	var far = _n0.dd;
	return A4(elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var elm_explorations$webgl$WebGL$Settings$StencilTest$Test = elm$core$Basics$identity;
var elm_explorations$webgl$WebGL$Settings$StencilTest$always = 519;
var elm_explorations$webgl$WebGL$Settings$StencilTest$Operation = elm$core$Basics$identity;
var elm_explorations$webgl$WebGL$Settings$StencilTest$decrementWrap = 34056;
var elm_explorations$webgl$WebGL$Settings$StencilTest$incrementWrap = 34055;
var elm_explorations$webgl$WebGL$Settings$StencilTest$keep = 7680;
var elm_explorations$webgl$WebGL$Internal$StencilTest = function (a) {
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
var elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate = F3(
	function (_n0, options1, options2) {
		var ref = _n0.d0;
		var mask = _n0.dJ;
		var writeMask = _n0.ek;
		var expandTest = F2(
			function (_n2, fn) {
				var expandedTest = _n2;
				return fn(expandedTest);
			});
		var expandOp = F2(
			function (_n1, fn) {
				var op = _n1;
				return fn(op);
			});
		var expand = function (options) {
			return A2(
				elm$core$Basics$composeR,
				expandTest(options.cW),
				A2(
					elm$core$Basics$composeR,
					expandOp(options.cz),
					A2(
						elm$core$Basics$composeR,
						expandOp(options.c$),
						expandOp(options.c0))));
		};
		return A2(
			expand,
			options2,
			A2(
				expand,
				options1,
				A3(elm_explorations$webgl$WebGL$Internal$StencilTest, ref, mask, writeMask)));
	});
var author$project$Scene3d$createShadowStencil = _List_fromArray(
	[
		elm_explorations$webgl$WebGL$Settings$DepthTest$less(
		{dd: 1, dN: 0, ej: false}),
		A4(elm_explorations$webgl$WebGL$Settings$colorMask, false, false, false, false),
		A3(
		elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
		{dJ: 255, d0: 1, ek: 255},
		{cz: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cW: elm_explorations$webgl$WebGL$Settings$StencilTest$always, c$: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, c0: elm_explorations$webgl$WebGL$Settings$StencilTest$incrementWrap},
		{cz: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, cW: elm_explorations$webgl$WebGL$Settings$StencilTest$always, c$: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, c0: elm_explorations$webgl$WebGL$Settings$StencilTest$decrementWrap})
	]);
var elm_explorations$webgl$WebGL$Settings$DepthTest$default = elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{dd: 1, dN: 0, ej: true});
var author$project$Scene3d$depthTestDefault = _List_fromArray(
	[elm_explorations$webgl$WebGL$Settings$DepthTest$default]);
var author$project$Scene3d$getPointSize = function (options) {
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
	return A3(elm$core$List$foldl, update, defaultValue, options);
};
var elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual = function (_n0) {
	var write = _n0.ej;
	var near = _n0.dN;
	var far = _n0.dd;
	return A4(elm_explorations$webgl$WebGL$Internal$DepthTest, 515, write, near, far);
};
var elm_explorations$webgl$WebGL$Settings$StencilTest$notEqual = 517;
var elm_explorations$webgl$WebGL$Settings$StencilTest$test = function (stencilTest) {
	return A3(
		elm_explorations$webgl$WebGL$Settings$StencilTest$testSeparate,
		{dJ: stencilTest.dJ, d0: stencilTest.d0, ek: stencilTest.ek},
		{cz: stencilTest.cz, cW: stencilTest.cW, c$: stencilTest.c$, c0: stencilTest.c0},
		{cz: stencilTest.cz, cW: stencilTest.cW, c$: stencilTest.c$, c0: stencilTest.c0});
};
var author$project$Scene3d$insideStencil = _List_fromArray(
	[
		elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
		{dd: 1, dN: 0, ej: true}),
		elm_explorations$webgl$WebGL$Settings$StencilTest$test(
		{cz: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, dJ: 255, d0: 0, cW: elm_explorations$webgl$WebGL$Settings$StencilTest$notEqual, ek: 0, c$: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, c0: elm_explorations$webgl$WebGL$Settings$StencilTest$keep})
	]);
var author$project$Scene3d$lightingDisabled = {
	bY: A2(author$project$Scene3d$lightPair, author$project$Scene3d$disabledLight, author$project$Scene3d$disabledLight),
	bZ: A2(author$project$Scene3d$lightPair, author$project$Scene3d$disabledLight, author$project$Scene3d$disabledLight),
	b_: A2(author$project$Scene3d$lightPair, author$project$Scene3d$disabledLight, author$project$Scene3d$disabledLight),
	b$: A2(author$project$Scene3d$lightPair, author$project$Scene3d$disabledLight, author$project$Scene3d$disabledLight)
};
var elm_explorations$webgl$WebGL$Settings$StencilTest$equal = 514;
var author$project$Scene3d$outsideStencil = _List_fromArray(
	[
		elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
		{dd: 1, dN: 0, ej: true}),
		elm_explorations$webgl$WebGL$Settings$StencilTest$test(
		{cz: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, dJ: 255, d0: 0, cW: elm_explorations$webgl$WebGL$Settings$StencilTest$equal, ek: 0, c$: elm_explorations$webgl$WebGL$Settings$StencilTest$keep, c0: elm_explorations$webgl$WebGL$Settings$StencilTest$keep})
	]);
var author$project$Scene3d$Exposure$maxLuminance = function (_n0) {
	var exposure = _n0;
	return exposure.dK;
};
var author$project$Scene3d$Transformation$identity = {hA: true, o: 1, p: 0, q: 0, r: 0, s: 1, t: 0, u: 0, v: 0, w: 1, E: 0, F: 0, G: 0, h5: 1};
var elm_explorations$linear_algebra$Math$Vector4$getW = _MJS_v4getW;
var elm_explorations$linear_algebra$Math$Vector4$getX = _MJS_v4getX;
var elm_explorations$linear_algebra$Math$Vector4$getZ = _MJS_v4getZ;
var elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var ianmackenzie$elm_3d_camera$Camera3d$projectionParameters = F2(
	function (_n0, _n1) {
		var screenAspectRatio = _n0.h6;
		var camera = _n1;
		var _n2 = camera.gP;
		var n = _n2;
		var _n3 = camera.cS;
		if (!_n3.$) {
			var frustumSlope = _n3.a;
			return A4(elm_explorations$linear_algebra$Math$Vector4$vec4, n, screenAspectRatio, 1 / frustumSlope, 0);
		} else {
			var viewportHeight = _n3.a;
			return A4(elm_explorations$linear_algebra$Math$Vector4$vec4, n, screenAspectRatio, 0, (-2) / viewportHeight);
		}
	});
var ianmackenzie$elm_3d_camera$Camera3d$viewpoint = function (_n0) {
	var camera = _n0;
	return camera.iT;
};
var ianmackenzie$elm_geometry$Frame3d$atOrigin = {hT: ianmackenzie$elm_geometry$Point3d$origin, i_: ianmackenzie$elm_geometry$Direction3d$x, i2: ianmackenzie$elm_geometry$Direction3d$y, i4: ianmackenzie$elm_geometry$Direction3d$z};
var ianmackenzie$elm_geometry$Direction3d$relativeTo = F2(
	function (_n0, _n1) {
		var frame = _n0;
		var d = _n1;
		var _n2 = frame.i4;
		var k = _n2;
		var _n3 = frame.i2;
		var j = _n3;
		var _n4 = frame.i_;
		var i = _n4;
		return {el: ((d.el * i.el) + (d.em * i.em)) + (d.en * i.en), em: ((d.el * j.el) + (d.em * j.em)) + (d.en * j.en), en: ((d.el * k.el) + (d.em * k.em)) + (d.en * k.en)};
	});
var ianmackenzie$elm_geometry$Point3d$relativeTo = F2(
	function (_n0, _n1) {
		var frame = _n0;
		var p = _n1;
		var _n2 = frame.hT;
		var p0 = _n2;
		var deltaX = p.el - p0.el;
		var deltaY = p.em - p0.em;
		var deltaZ = p.en - p0.en;
		var _n3 = frame.i4;
		var k = _n3;
		var _n4 = frame.i2;
		var j = _n4;
		var _n5 = frame.i_;
		var i = _n5;
		return {el: ((deltaX * i.el) + (deltaY * i.em)) + (deltaZ * i.en), em: ((deltaX * j.el) + (deltaY * j.em)) + (deltaZ * j.en), en: ((deltaX * k.el) + (deltaY * k.em)) + (deltaZ * k.en)};
	});
var ianmackenzie$elm_geometry$Frame3d$relativeTo = F2(
	function (otherFrame, frame) {
		return {
			hT: A2(
				ianmackenzie$elm_geometry$Point3d$relativeTo,
				otherFrame,
				ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
			i_: A2(
				ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				ianmackenzie$elm_geometry$Frame3d$xDirection(frame)),
			i2: A2(
				ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				ianmackenzie$elm_geometry$Frame3d$yDirection(frame)),
			i4: A2(
				ianmackenzie$elm_geometry$Direction3d$relativeTo,
				otherFrame,
				ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
		};
	});
var ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4 = function (frame) {
	var p = ianmackenzie$elm_geometry$Point3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$originPoint(frame));
	var k = ianmackenzie$elm_geometry$Direction3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$zDirection(frame));
	var j = ianmackenzie$elm_geometry$Direction3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$yDirection(frame));
	var i = ianmackenzie$elm_geometry$Direction3d$unwrap(
		ianmackenzie$elm_geometry$Frame3d$xDirection(frame));
	return elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		{dt: i.el, du: j.el, dv: k.el, dw: p.el, dx: i.em, dy: j.em, dz: k.em, dA: p.em, dB: i.en, dC: j.en, dD: k.en, dE: p.en, dF: 0, dG: 0, dH: 0, dI: 1});
};
var ianmackenzie$elm_3d_camera$Viewpoint3d$viewMatrix = function (_n0) {
	var frame = _n0;
	return ianmackenzie$elm_geometry_linear_algebra_interop$Geometry$Interop$LinearAlgebra$Frame3d$toMat4(
		A2(ianmackenzie$elm_geometry$Frame3d$relativeTo, frame, ianmackenzie$elm_geometry$Frame3d$atOrigin));
};
var ianmackenzie$elm_3d_camera$Camera3d$viewMatrix = function (camera) {
	return ianmackenzie$elm_3d_camera$Viewpoint3d$viewMatrix(
		ianmackenzie$elm_3d_camera$Camera3d$viewpoint(camera));
};
var ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint = function (_n0) {
	var frame = _n0;
	return ianmackenzie$elm_geometry$Frame3d$originPoint(frame);
};
var ianmackenzie$elm_units$Quantity$ratio = F2(
	function (_n0, _n1) {
		var x = _n0;
		var y = _n1;
		return x / y;
	});
var author$project$Scene3d$toEntities = F3(
	function (options, _n0, drawables) {
		var ambientLighting = _n0.gj;
		var lights = _n0.hD;
		var camera = _n0.gI;
		var exposure = _n0.g7;
		var whiteBalance = _n0.iV;
		var width = _n0.iW;
		var height = _n0.hj;
		var viewMatrix = ianmackenzie$elm_3d_camera$Camera3d$viewMatrix(camera);
		var maxLuminance = ianmackenzie$elm_units$Luminance$inNits(
			author$project$Scene3d$Exposure$maxLuminance(exposure));
		var givenPointSize = author$project$Scene3d$getPointSize(options);
		var eyePoint = ianmackenzie$elm_geometry$Point3d$unwrap(
			ianmackenzie$elm_3d_camera$Viewpoint3d$eyePoint(
				ianmackenzie$elm_3d_camera$Camera3d$viewpoint(camera)));
		var aspectRatio = A2(ianmackenzie$elm_units$Quantity$ratio, width, height);
		var projectionParameters = A2(
			ianmackenzie$elm_3d_camera$Camera3d$projectionParameters,
			{h6: aspectRatio},
			camera);
		var clipDistance = elm_explorations$linear_algebra$Math$Vector4$getX(projectionParameters);
		var kc = elm_explorations$linear_algebra$Math$Vector4$getZ(projectionParameters);
		var kz = elm_explorations$linear_algebra$Math$Vector4$getW(projectionParameters);
		var projectionType = (!kz) ? 0 : 1;
		var ambientLightingMatrix = function () {
			if (!ambientLighting.$) {
				var matrix = ambientLighting.a;
				return matrix;
			} else {
				return author$project$Scene3d$ambientLightingDisabled;
			}
		}();
		var _n1 = author$project$Scene3d$Drawable$group(drawables);
		var rootNode = _n1;
		var _n2 = author$project$Scene3d$Chromaticity$toLinearRgb(whiteBalance);
		var r = _n2.a;
		var g = _n2.b;
		var b = _n2.c;
		var sceneProperties = elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
			{dt: clipDistance, du: eyePoint.el, dv: maxLuminance * r, dw: 0, dx: aspectRatio, dy: eyePoint.em, dz: maxLuminance * g, dA: 0, dB: kc, dC: eyePoint.en, dD: maxLuminance * b, dE: 0, dF: kz, dG: projectionType, dH: givenPointSize, dI: 0});
		var renderPasses = A6(
			author$project$Scene3d$collectRenderPasses,
			sceneProperties,
			viewMatrix,
			ambientLightingMatrix,
			author$project$Scene3d$Transformation$identity,
			rootNode,
			{Y: _List_Nil, aS: _List_Nil});
		switch (lights.$) {
			case 0:
				var lightMatrices = lights.a;
				return A3(author$project$Scene3d$call, renderPasses.Y, lightMatrices, author$project$Scene3d$depthTestDefault);
			case 1:
				var lightMatrices = lights.a;
				return elm$core$List$concat(
					_List_fromArray(
						[
							A3(author$project$Scene3d$call, renderPasses.Y, author$project$Scene3d$lightingDisabled, author$project$Scene3d$depthTestDefault),
							A3(author$project$Scene3d$call, renderPasses.aS, lightMatrices, author$project$Scene3d$createShadowStencil),
							A3(author$project$Scene3d$call, renderPasses.Y, lightMatrices, author$project$Scene3d$outsideStencil)
						]));
			default:
				var allLightMatrices = lights.a;
				var unshadowedLightMatrices = lights.b;
				return elm$core$List$concat(
					_List_fromArray(
						[
							A3(author$project$Scene3d$call, renderPasses.Y, allLightMatrices, author$project$Scene3d$depthTestDefault),
							A3(author$project$Scene3d$call, renderPasses.aS, allLightMatrices, author$project$Scene3d$createShadowStencil),
							A3(author$project$Scene3d$call, renderPasses.Y, unshadowedLightMatrices, author$project$Scene3d$insideStencil)
						]));
		}
	});
var elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		elm$core$String$fromInt(n));
};
var elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 0, a: a};
};
var elm_explorations$webgl$WebGL$alpha = elm_explorations$webgl$WebGL$Internal$Alpha;
var elm_explorations$webgl$WebGL$Internal$Antialias = {$: 3};
var elm_explorations$webgl$WebGL$antialias = elm_explorations$webgl$WebGL$Internal$Antialias;
var elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var elm_explorations$webgl$WebGL$clearColor = elm_explorations$webgl$WebGL$Internal$ClearColor;
var elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 1, a: a};
};
var elm_explorations$webgl$WebGL$depth = elm_explorations$webgl$WebGL$Internal$Depth;
var elm_explorations$webgl$WebGL$Internal$Stencil = function (a) {
	return {$: 2, a: a};
};
var elm_explorations$webgl$WebGL$stencil = elm_explorations$webgl$WebGL$Internal$Stencil;
var elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var ianmackenzie$elm_units$Pixels$inPixels = function (_n0) {
	var numPixels = _n0;
	return numPixels;
};
var author$project$Scene3d$render = F3(
	function (options, _arguments, drawables) {
		var widthInPixels = ianmackenzie$elm_units$Pixels$inPixels(_arguments.iW);
		var heightInPixels = ianmackenzie$elm_units$Pixels$inPixels(_arguments.hj);
		var givenClearColor = avh4$elm_color$Color$toRgba(
			author$project$Scene3d$getClearColor(options));
		var webGLOptions = _List_fromArray(
			[
				elm_explorations$webgl$WebGL$depth(1),
				elm_explorations$webgl$WebGL$stencil(0),
				elm_explorations$webgl$WebGL$alpha(true),
				elm_explorations$webgl$WebGL$antialias,
				A4(elm_explorations$webgl$WebGL$clearColor, givenClearColor.fA, givenClearColor.eN, givenClearColor.es, givenClearColor.gh)
			]);
		return A3(
			elm_explorations$webgl$WebGL$toHtmlWith,
			webGLOptions,
			_List_fromArray(
				[
					elm$html$Html$Attributes$width(
					elm$core$Basics$round(widthInPixels)),
					elm$html$Html$Attributes$height(
					elm$core$Basics$round(heightInPixels)),
					A2(
					elm$html$Html$Attributes$style,
					'width',
					elm$core$String$fromFloat(widthInPixels) + 'px'),
					A2(
					elm$html$Html$Attributes$style,
					'height',
					elm$core$String$fromFloat(heightInPixels) + 'px'),
					A2(elm$html$Html$Attributes$style, 'display', 'block')
				]),
			A3(author$project$Scene3d$toEntities, options, _arguments, drawables));
	});
var author$project$Scene3d$Exposure$Exposure = elm$core$Basics$identity;
var author$project$Scene3d$Exposure$fromEv100 = function (ev100) {
	return {
		dK: ianmackenzie$elm_units$Luminance$nits(
			1.2 * A2(elm$core$Basics$pow, 2, ev100))
	};
};
var avh4$elm_color$Color$scaleFrom255 = function (c) {
	return c / 255;
};
var avh4$elm_color$Color$rgb255 = F3(
	function (r, g, b) {
		return A4(
			avh4$elm_color$Color$RgbaSpace,
			avh4$elm_color$Color$scaleFrom255(r),
			avh4$elm_color$Color$scaleFrom255(g),
			avh4$elm_color$Color$scaleFrom255(b),
			1.0);
	});
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$html$Html$div = _VirtualDom_node('div');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var ianmackenzie$elm_geometry$Frame3d$zAxis = function (_n0) {
	var frame = _n0;
	return A2(ianmackenzie$elm_geometry$Axis3d$through, frame.hT, frame.i4);
};
var ianmackenzie$elm_geometry$Geometry$Types$Plane3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Plane3d$through = F2(
	function (givenPoint, givenNormalDirection) {
		return {ff: givenNormalDirection, hT: givenPoint};
	});
var ianmackenzie$elm_geometry$Point3d$along = F2(
	function (_n0, _n1) {
		var axis = _n0;
		var distance = _n1;
		var _n2 = axis.hT;
		var p0 = _n2;
		var _n3 = axis.W;
		var d = _n3;
		return {el: p0.el + (distance * d.el), em: p0.em + (distance * d.em), en: p0.en + (distance * d.en)};
	});
var ianmackenzie$elm_units$Quantity$negate = function (_n0) {
	var value = _n0;
	return -value;
};
var ianmackenzie$elm_3d_camera$Camera3d$offsetClipPlane = F2(
	function (_n0, depth) {
		var frame = _n0;
		return A2(
			ianmackenzie$elm_geometry$Plane3d$through,
			A2(
				ianmackenzie$elm_geometry$Point3d$along,
				ianmackenzie$elm_geometry$Frame3d$zAxis(frame),
				ianmackenzie$elm_units$Quantity$negate(depth)),
			ianmackenzie$elm_geometry$Direction3d$reverse(
				ianmackenzie$elm_geometry$Frame3d$zDirection(frame)));
	});
var ianmackenzie$elm_3d_camera$Camera3d$Types$Camera3d = elm$core$Basics$identity;
var ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective = function (a) {
	return {$: 0, a: a};
};
var elm$core$Basics$tan = _Basics_tan;
var ianmackenzie$elm_units$Angle$tan = function (_n0) {
	var angle = _n0;
	return elm$core$Basics$tan(angle);
};
var ianmackenzie$elm_units$Quantity$abs = function (_n0) {
	var value = _n0;
	return elm$core$Basics$abs(value);
};
var ianmackenzie$elm_units$Quantity$half = function (_n0) {
	var value = _n0;
	return 0.5 * value;
};
var ianmackenzie$elm_3d_camera$Camera3d$perspective = function (_arguments) {
	var halfFieldOfView = ianmackenzie$elm_units$Quantity$half(
		ianmackenzie$elm_units$Quantity$abs(_arguments.iR));
	var frustumSlope = ianmackenzie$elm_units$Angle$tan(halfFieldOfView);
	var absoluteClipDepth = ianmackenzie$elm_units$Quantity$abs(_arguments.gP);
	return {
		gP: absoluteClipDepth,
		c7: A2(ianmackenzie$elm_3d_camera$Camera3d$offsetClipPlane, _arguments.iT, absoluteClipDepth),
		cS: ianmackenzie$elm_3d_camera$Camera3d$Types$Perspective(frustumSlope),
		iT: _arguments.iT
	};
};
var ianmackenzie$elm_3d_camera$Camera3d$Types$Viewpoint3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$Point3d$rotateAround = F3(
	function (_n0, _n1, _n2) {
		var axis = _n0;
		var angle = _n1;
		var p = _n2;
		var halfAngle = 0.5 * angle;
		var qw = elm$core$Basics$cos(halfAngle);
		var sinHalfAngle = elm$core$Basics$sin(halfAngle);
		var _n3 = axis.hT;
		var p0 = _n3;
		var deltaX = p.el - p0.el;
		var deltaY = p.em - p0.em;
		var deltaZ = p.en - p0.en;
		var _n4 = axis.W;
		var d = _n4;
		var qx = d.el * sinHalfAngle;
		var wx = qw * qx;
		var xx = qx * qx;
		var qy = d.em * sinHalfAngle;
		var wy = qw * qy;
		var xy = qx * qy;
		var yy = qy * qy;
		var a22 = 1 - (2 * (xx + yy));
		var qz = d.en * sinHalfAngle;
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
		return {el: ((p0.el + (a00 * deltaX)) + (a01 * deltaY)) + (a02 * deltaZ), em: ((p0.em + (a10 * deltaX)) + (a11 * deltaY)) + (a12 * deltaZ), en: ((p0.en + (a20 * deltaX)) + (a21 * deltaY)) + (a22 * deltaZ)};
	});
var ianmackenzie$elm_geometry$Frame3d$rotateAround = F3(
	function (axis, angle, frame) {
		return ianmackenzie$elm_geometry$Frame3d$unsafe(
			{
				hT: A3(
					ianmackenzie$elm_geometry$Point3d$rotateAround,
					axis,
					angle,
					ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
				i_: A3(
					ianmackenzie$elm_geometry$Direction3d$rotateAround,
					axis,
					angle,
					ianmackenzie$elm_geometry$Frame3d$xDirection(frame)),
				i2: A3(
					ianmackenzie$elm_geometry$Direction3d$rotateAround,
					axis,
					angle,
					ianmackenzie$elm_geometry$Frame3d$yDirection(frame)),
				i4: A3(
					ianmackenzie$elm_geometry$Direction3d$rotateAround,
					axis,
					angle,
					ianmackenzie$elm_geometry$Frame3d$zDirection(frame))
			});
	});
var ianmackenzie$elm_geometry$Frame3d$rotateAroundOwn = F3(
	function (axis, angle, frame) {
		return A3(
			ianmackenzie$elm_geometry$Frame3d$rotateAround,
			axis(frame),
			angle,
			frame);
	});
var ianmackenzie$elm_geometry$Axis3d$direction = function (_n0) {
	var axis = _n0;
	return axis.W;
};
var ianmackenzie$elm_geometry$Point3d$translateBy = F2(
	function (_n0, _n1) {
		var v = _n0;
		var p = _n1;
		return {el: p.el + v.el, em: p.em + v.em, en: p.en + v.en};
	});
var ianmackenzie$elm_geometry$Frame3d$translateBy = F2(
	function (vector, frame) {
		return ianmackenzie$elm_geometry$Frame3d$unsafe(
			{
				hT: A2(
					ianmackenzie$elm_geometry$Point3d$translateBy,
					vector,
					ianmackenzie$elm_geometry$Frame3d$originPoint(frame)),
				i_: ianmackenzie$elm_geometry$Frame3d$xDirection(frame),
				i2: ianmackenzie$elm_geometry$Frame3d$yDirection(frame),
				i4: ianmackenzie$elm_geometry$Frame3d$zDirection(frame)
			});
	});
var ianmackenzie$elm_geometry$Frame3d$translateAlongOwn = F3(
	function (axis, distance, frame) {
		var displacement = A2(
			ianmackenzie$elm_geometry$Vector3d$withLength,
			distance,
			ianmackenzie$elm_geometry$Axis3d$direction(
				axis(frame)));
		return A2(ianmackenzie$elm_geometry$Frame3d$translateBy, displacement, frame);
	});
var ianmackenzie$elm_geometry$Frame3d$xAxis = function (_n0) {
	var frame = _n0;
	return A2(ianmackenzie$elm_geometry$Axis3d$through, frame.hT, frame.i_);
};
var ianmackenzie$elm_geometry$Frame3d$yAxis = function (_n0) {
	var frame = _n0;
	return A2(ianmackenzie$elm_geometry$Axis3d$through, frame.hT, frame.i2);
};
var ianmackenzie$elm_geometry$SketchPlane3d$xDirection = function (_n0) {
	var properties = _n0;
	return properties.i_;
};
var ianmackenzie$elm_geometry$SketchPlane3d$yDirection = function (_n0) {
	var properties = _n0;
	return properties.i2;
};
var ianmackenzie$elm_geometry$Unsafe$Direction3d$unsafeCrossProduct = F2(
	function (_n0, _n1) {
		var d1 = _n0;
		var d2 = _n1;
		return {el: (d1.em * d2.en) - (d1.en * d2.em), em: (d1.en * d2.el) - (d1.el * d2.en), en: (d1.el * d2.em) - (d1.em * d2.el)};
	});
var ianmackenzie$elm_geometry$SketchPlane3d$normalDirection = function (sketchPlane) {
	return A2(
		ianmackenzie$elm_geometry$Unsafe$Direction3d$unsafeCrossProduct,
		ianmackenzie$elm_geometry$SketchPlane3d$xDirection(sketchPlane),
		ianmackenzie$elm_geometry$SketchPlane3d$yDirection(sketchPlane));
};
var ianmackenzie$elm_3d_camera$Viewpoint3d$orbit = function (_arguments) {
	var initialFrame = ianmackenzie$elm_geometry$Frame3d$unsafe(
		{
			hT: _arguments.hb,
			i_: ianmackenzie$elm_geometry$SketchPlane3d$yDirection(_arguments.hi),
			i2: ianmackenzie$elm_geometry$SketchPlane3d$normalDirection(_arguments.hi),
			i4: ianmackenzie$elm_geometry$SketchPlane3d$xDirection(_arguments.hi)
		});
	var finalFrame = A3(
		ianmackenzie$elm_geometry$Frame3d$translateAlongOwn,
		ianmackenzie$elm_geometry$Frame3d$zAxis,
		_arguments.bl,
		A3(
			ianmackenzie$elm_geometry$Frame3d$rotateAroundOwn,
			ianmackenzie$elm_geometry$Frame3d$xAxis,
			ianmackenzie$elm_units$Quantity$negate(_arguments.aJ),
			A3(ianmackenzie$elm_geometry$Frame3d$rotateAroundOwn, ianmackenzie$elm_geometry$Frame3d$yAxis, _arguments.aE, initialFrame)));
	return finalFrame;
};
var ianmackenzie$elm_geometry$Geometry$Types$SketchPlane3d = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$SketchPlane3d$unsafe = elm$core$Basics$identity;
var ianmackenzie$elm_geometry$SketchPlane3d$xy = ianmackenzie$elm_geometry$SketchPlane3d$unsafe(
	{hT: ianmackenzie$elm_geometry$Point3d$origin, i_: ianmackenzie$elm_geometry$Direction3d$x, i2: ianmackenzie$elm_geometry$Direction3d$y});
var ianmackenzie$elm_units$Pixels$pixels = function (numPixels) {
	return numPixels;
};
var mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var mdgriffith$elm_ui$Internal$Model$Left = 0;
var mdgriffith$elm_ui$Element$alignLeft = mdgriffith$elm_ui$Internal$Model$AlignX(0);
var mdgriffith$elm_ui$Internal$Model$Right = 2;
var mdgriffith$elm_ui$Element$alignRight = mdgriffith$elm_ui$Internal$Model$AlignX(2);
var mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var mdgriffith$elm_ui$Internal$Model$Top = 0;
var mdgriffith$elm_ui$Element$alignTop = mdgriffith$elm_ui$Internal$Model$AlignY(0);
var mdgriffith$elm_ui$Internal$Model$CenterX = 1;
var mdgriffith$elm_ui$Element$centerX = mdgriffith$elm_ui$Internal$Model$AlignX(1);
var mdgriffith$elm_ui$Internal$Model$CenterY = 1;
var mdgriffith$elm_ui$Element$centerY = mdgriffith$elm_ui$Internal$Model$AlignY(1);
var mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var mdgriffith$elm_ui$Element$height = mdgriffith$elm_ui$Internal$Model$Height;
var mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var mdgriffith$elm_ui$Element$shrink = mdgriffith$elm_ui$Internal$Model$Content;
var mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var mdgriffith$elm_ui$Element$width = mdgriffith$elm_ui$Internal$Model$Width;
var mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var mdgriffith$elm_ui$Internal$Model$div = mdgriffith$elm_ui$Internal$Model$Generic;
var mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Flag$none = A2(mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var mdgriffith$elm_ui$Internal$Style$classes = {f6: 'a', c1: 'atv', f9: 'ab', ga: 'cx', gb: 'cy', gc: 'acb', gd: 'accx', ge: 'accy', gf: 'acr', ep: 'al', eq: 'ar', gg: 'at', c2: 'ah', c3: 'av', gl: 's', gs: 'bh', gt: 'b', gA: 'w7', gC: 'bd', gD: 'bdt', cj: 'bn', gE: 'bs', co: 'cpe', gO: 'cp', gQ: 'cpx', gR: 'cpy', aG: 'c', cq: 'ctr', cr: 'cb', cs: 'ccx', aH: 'ccy', bN: 'cl', ct: 'cr', gW: 'ct', gY: 'cptr', gZ: 'ctxt', hc: 'fcs', de: 'focus-within', hf: 'fs', hh: 'g', dg: 'hbh', dh: 'hc', eP: 'he', di: 'hf', eQ: 'hfp', hm: 'hv', hp: 'ic', hr: 'fr', hu: 'iml', hv: 'imlp', hw: 'it', hB: 'i', e0: 'lnk', bs: 'nb', fe: 'notxt', hO: 'ol', hP: 'or', a6: 'oq', hU: 'oh', fn: 'pg', fo: 'p', hW: 'ppe', h3: 'ui', aj: 'r', h8: 'sb', h9: 'sbx', ia: 'sby', ib: 'sbt', $8: 'e', ig: 'cap', ih: 'sev', io: 'sk', T: 't', iu: 'tc', iv: 'w8', iw: 'w2', ix: 'w9', iy: 'tj', cX: 'tja', iz: 'tl', iA: 'w3', iB: 'w5', iC: 'w4', iD: 'tr', iE: 'w6', iF: 'w1', iG: 'tun', fW: 'ts', be: 'clr', iO: 'u', eg: 'wc', f3: 'we', eh: 'wf', f4: 'wfp', ei: 'wrp'};
var mdgriffith$elm_ui$Internal$Model$columnClass = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + mdgriffith$elm_ui$Internal$Style$classes.aG);
var mdgriffith$elm_ui$Internal$Model$gridClass = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + mdgriffith$elm_ui$Internal$Style$classes.hh);
var mdgriffith$elm_ui$Internal$Model$pageClass = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + mdgriffith$elm_ui$Internal$Style$classes.fn);
var mdgriffith$elm_ui$Internal$Model$paragraphClass = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + mdgriffith$elm_ui$Internal$Style$classes.fo);
var mdgriffith$elm_ui$Internal$Model$rowClass = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + mdgriffith$elm_ui$Internal$Style$classes.aj);
var mdgriffith$elm_ui$Internal$Model$singleClass = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + mdgriffith$elm_ui$Internal$Style$classes.$8);
var mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var mdgriffith$elm_ui$Internal$Model$asEl = 2;
var mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var elm$core$Basics$not = _Basics_not;
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$s = _VirtualDom_node('s');
var elm$html$Html$u = _VirtualDom_node('u');
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var mdgriffith$elm_ui$Internal$Flag$alignBottom = mdgriffith$elm_ui$Internal$Flag$flag(41);
var mdgriffith$elm_ui$Internal$Flag$alignRight = mdgriffith$elm_ui$Internal$Flag$flag(40);
var mdgriffith$elm_ui$Internal$Flag$centerX = mdgriffith$elm_ui$Internal$Flag$flag(42);
var mdgriffith$elm_ui$Internal$Flag$centerY = mdgriffith$elm_ui$Internal$Flag$flag(43);
var mdgriffith$elm_ui$Internal$Flag$heightBetween = mdgriffith$elm_ui$Internal$Flag$flag(45);
var mdgriffith$elm_ui$Internal$Flag$heightFill = mdgriffith$elm_ui$Internal$Flag$flag(37);
var mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _n0) {
		var fieldOne = _n0.a;
		var fieldTwo = _n0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var mdgriffith$elm_ui$Internal$Flag$widthBetween = mdgriffith$elm_ui$Internal$Flag$flag(44);
var mdgriffith$elm_ui$Internal$Flag$widthFill = mdgriffith$elm_ui$Internal$Flag$flag(39);
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + (elm$core$String$fromInt(min) + mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + (elm$core$String$fromInt(max) + mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 0:
			return elm$core$Maybe$Nothing;
		case 1:
			var _n1 = transform.a;
			var x = _n1.a;
			var y = _n1.b;
			var z = _n1.c;
			return elm$core$Maybe$Just(
				'mv-' + (mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _n2 = transform.a;
			var tx = _n2.a;
			var ty = _n2.b;
			var tz = _n2.c;
			var _n3 = transform.b;
			var sx = _n3.a;
			var sy = _n3.b;
			var sz = _n3.c;
			var _n4 = transform.c;
			var ox = _n4.a;
			var oy = _n4.b;
			var oz = _n4.c;
			var angle = transform.d;
			return elm$core$Maybe$Just(
				'tfrm-' + (mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + (mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$elm_ui$Internal$Model$lengthClassName, template.h4)) + ('-cols-' + (A2(
				elm$core$String$join,
				'-',
				A2(elm$core$List$map, mdgriffith$elm_ui$Internal$Model$lengthClassName, template.ao)) + ('-space-x-' + (mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ii.a) + ('-space-y-' + mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ii.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + (elm$core$String$fromInt(pos.aj) + ('-' + (elm$core$String$fromInt(pos.gS) + ('-' + (elm$core$String$fromInt(pos.iW) + ('-' + elm$core$String$fromInt(pos.hj)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				elm$core$String$join,
				' ',
				A2(
					elm$core$List$map,
					function (sty) {
						var _n1 = mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_n1 === '') {
							return '';
						} else {
							var styleName = _n1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				elm$core$Maybe$withDefault,
				'',
				mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2(elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2(elm$core$Set$insert, styleName, cache),
			A2(elm$core$List$cons, style, existing));
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm$core$Tuple$mapSecond = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$formatColor = function (_n0) {
	var red = _n0.a;
	var green = _n0.b;
	var blue = _n0.c;
	var alpha = _n0.d;
	return 'rgba(' + (elm$core$String$fromInt(
		elm$core$Basics$round(red * 255)) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(green * 255))) + ((',' + elm$core$String$fromInt(
		elm$core$Basics$round(blue * 255))) + (',' + (elm$core$String$fromFloat(alpha) + ')')))));
};
var mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		elm$core$String$join,
		' ',
		A2(
			elm$core$List$filterMap,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.eU ? elm$core$Maybe$Just('inset') : elm$core$Maybe$Nothing,
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.fg.a) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.fg.b) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.bj) + 'px'),
					elm$core$Maybe$Just(
					elm$core$String$fromFloat(shadow.d6) + 'px'),
					elm$core$Maybe$Just(
					mdgriffith$elm_ui$Internal$Model$formatColor(shadow.c8))
				])));
};
var mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			mdgriffith$elm_ui$Internal$Model$Style,
			mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.de) + ':focus-within',
			A2(
				elm$core$List$filterMap,
				elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$map,
						function (color) {
							return A2(
								mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.gB),
						A2(
						elm$core$Maybe$map,
						function (color) {
							return A2(
								mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.gq),
						A2(
						elm$core$Maybe$map,
						function (shadow) {
							return A2(
								mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										bj: shadow.bj,
										c8: shadow.c8,
										eU: false,
										fg: A2(
											elm$core$Tuple$mapSecond,
											elm$core$Basics$toFloat,
											A2(elm$core$Tuple$mapFirst, elm$core$Basics$toFloat, shadow.fg)),
										d6: shadow.d6
									}));
						},
						focus.id),
						elm$core$Maybe$Just(
						A2(mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			mdgriffith$elm_ui$Internal$Model$Style,
			mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl) + (':focus .focusable, ' + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl) + '.focusable:focus')),
			A2(
				elm$core$List$filterMap,
				elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						elm$core$Maybe$map,
						function (color) {
							return A2(
								mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.gB),
						A2(
						elm$core$Maybe$map,
						function (color) {
							return A2(
								mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.gq),
						A2(
						elm$core$Maybe$map,
						function (shadow) {
							return A2(
								mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										bj: shadow.bj,
										c8: shadow.c8,
										eU: false,
										fg: A2(
											elm$core$Tuple$mapSecond,
											elm$core$Basics$toFloat,
											A2(elm$core$Tuple$mapFirst, elm$core$Basics$toFloat, shadow.fg)),
										d6: shadow.d6
									}));
						},
						focus.id),
						elm$core$Maybe$Just(
						A2(mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 5, a: a};
};
var mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Style$Left = 3;
var mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Style$Right = 2;
var mdgriffith$elm_ui$Internal$Style$Self = elm$core$Basics$identity;
var mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var mdgriffith$elm_ui$Internal$Style$Content = elm$core$Basics$identity;
var mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var mdgriffith$elm_ui$Internal$Style$Top = 0;
var mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _n1 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gW);
		case 1:
			var _n2 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.cr);
		case 2:
			var _n3 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ct);
		case 3:
			var _n4 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.bN);
		case 4:
			var _n5 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.cs);
		default:
			var _n6 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aH);
	}
};
var mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _n1 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gg);
		case 1:
			var _n2 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.f9);
		case 2:
			var _n3 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eq);
		case 3:
			var _n4 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ep);
		case 4:
			var _n5 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ga);
		default:
			var _n6 = desc;
			return mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gb);
	}
};
var mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _n0 = values(alignment);
		var content = _n0.a;
		var indiv = _n0.b;
		return _List_fromArray(
			[
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				mdgriffith$elm_ui$Internal$Style$Child,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
				_List_fromArray(
					[
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return mdgriffith$elm_ui$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, mdgriffith$elm_ui$Internal$Style$alignments));
};
var mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		mdgriffith$elm_ui$Internal$Style$Descriptor,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.dg),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				mdgriffith$elm_ui$Internal$Style$Child,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gs),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Descriptor,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ib),
		_List_fromArray(
			[
				A2(
				mdgriffith$elm_ui$Internal$Style$Child,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.T),
				_List_fromArray(
					[
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eh),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Child,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.dh),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Child,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Child,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eh),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Child,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eg),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 1:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				mdgriffith$elm_ui$Internal$Style$Child,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
				_List_fromArray(
					[
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return mdgriffith$elm_ui$Internal$Style$Batch(
		A2(elm$core$List$concatMap, createDescription, mdgriffith$elm_ui$Internal$Style$alignments));
};
var mdgriffith$elm_ui$Internal$Style$Above = 0;
var mdgriffith$elm_ui$Internal$Style$Behind = 5;
var mdgriffith$elm_ui$Internal$Style$Below = 1;
var mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var mdgriffith$elm_ui$Internal$Style$Within = 4;
var mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _n0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
			_Utils_ap(
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.$8),
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hp))),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block')
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Class,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl) + ':focus',
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Class,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.h3),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
					mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di)),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Child,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hr),
				_List_fromArray(
					[
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.bs),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed')
							]))
					]))
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Class,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.bs),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.$8),
				mdgriffith$elm_ui$Internal$Style$elDescription),
				mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2(elm$core$List$map, fn, mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									mdgriffith$elm_ui$Internal$Style$Descriptor,
									mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.f6),
									_List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di),
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eh),
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 1:
								return A2(
									mdgriffith$elm_ui$Internal$Style$Descriptor,
									mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gt),
									_List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di),
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									mdgriffith$elm_ui$Internal$Style$Descriptor,
									mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hP),
									_List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 3:
								return A2(
									mdgriffith$elm_ui$Internal$Style$Descriptor,
									mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hO),
									_List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 4:
								return A2(
									mdgriffith$elm_ui$Internal$Style$Descriptor,
									mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hr),
									_List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									mdgriffith$elm_ui$Internal$Style$Descriptor,
									mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gs),
									_List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		mdgriffith$elm_ui$Internal$Style$Class,
		mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
		_List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ei),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.fe),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gY),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gZ),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hW),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.co),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.be),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.a6),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap(mdgriffith$elm_ui$Internal$Style$classes.hm, mdgriffith$elm_ui$Internal$Style$classes.be)) + ':hover',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap(mdgriffith$elm_ui$Internal$Style$classes.hm, mdgriffith$elm_ui$Internal$Style$classes.a6)) + ':hover',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap(mdgriffith$elm_ui$Internal$Style$classes.hc, mdgriffith$elm_ui$Internal$Style$classes.be)) + ':focus',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap(mdgriffith$elm_ui$Internal$Style$classes.hc, mdgriffith$elm_ui$Internal$Style$classes.a6)) + ':focus',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap(mdgriffith$elm_ui$Internal$Style$classes.c1, mdgriffith$elm_ui$Internal$Style$classes.be)) + ':active',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap(mdgriffith$elm_ui$Internal$Style$classes.c1, mdgriffith$elm_ui$Internal$Style$classes.a6)) + ':active',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.fW),
				_List_fromArray(
					[
						A2(
						mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							elm$core$String$join,
							', ',
							A2(
								elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.h8),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.h9),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aj),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ia),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aG),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.$8),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gO),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gQ),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gR),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eg),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.cj),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gC),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gD),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gE),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.T),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hw),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.$8),
				mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aj),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.f3),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.e0),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eQ),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eh),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.cq),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.gf,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.gd,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ga),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.gd,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ga),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.gd,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gb),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + (mdgriffith$elm_ui$Internal$Style$classes.gd + ' ~ u'),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + (mdgriffith$elm_ui$Internal$Style$classes.gf + (' ~ s.' + mdgriffith$elm_ui$Internal$Style$classes.gd)),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ih),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aG),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eP),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aG),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.di),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eh),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.f4),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.eg),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.gc,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.ge,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gb),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.ge,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gb),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + mdgriffith$elm_ui$Internal$Style$classes.ge,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gb),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + (mdgriffith$elm_ui$Internal$Style$classes.ge + ' ~ u'),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + (mdgriffith$elm_ui$Internal$Style$classes.gc + (' ~ s.' + mdgriffith$elm_ui$Internal$Style$classes.ge)),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.cq),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ih),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hh),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
									return _List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2(mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.fn),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl + ':first-child'),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(
							mdgriffith$elm_ui$Internal$Style$classes.gl + (mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + mdgriffith$elm_ui$Internal$Style$classes.gl))),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(
							mdgriffith$elm_ui$Internal$Style$classes.gl + (mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + mdgriffith$elm_ui$Internal$Style$classes.gl))),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2(mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2(mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2(mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2(mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hu),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hv),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.fo),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.fo),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2(
						mdgriffith$elm_ui$Internal$Style$Descriptor,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.dg),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gs),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.T),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.$8),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hr),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gs),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.f6),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gt),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hP),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Descriptor,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hO),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.T),
								_List_fromArray(
									[
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								mdgriffith$elm_ui$Internal$Style$Child,
								mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.$8),
								_List_fromArray(
									[
										A2(
										mdgriffith$elm_ui$Internal$Style$Child,
										mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.T),
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
											]))
									]))
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aj),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aG),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						mdgriffith$elm_ui$Internal$Style$Child,
						mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hh),
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2(mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iF),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iw),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iA),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iC),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iB),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iE),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gA),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iv),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.ix),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.hB),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.io),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iO),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iO),
					mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.io)),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iG),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iy),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.cX),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iu),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iD),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.iz),
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var mdgriffith$elm_ui$Internal$Style$commonValues = elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			elm$core$List$map,
			function (x) {
				return A2(
					mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2(elm$core$List$range, 0, 6)),
			A2(
			elm$core$List$map,
			function (i) {
				return A2(
					mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2(elm$core$List$range, 8, 32)),
			A2(
			elm$core$List$map,
			function (i) {
				return A2(
					mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2(elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2(mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + (mdgriffith$elm_ui$Internal$Style$classes.gl + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + (mdgriffith$elm_ui$Internal$Style$classes.gl + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl) + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aj) + (' > ' + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl) + (' { flex-basis: auto !important; } ' + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl) + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.aj) + (' > ' + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.gl) + (mdgriffith$elm_ui$Internal$Style$dot(mdgriffith$elm_ui$Internal$Style$classes.cq) + (' { flex-basis: auto !important; }}' + (mdgriffith$elm_ui$Internal$Style$inputTextReset + (mdgriffith$elm_ui$Internal$Style$sliderReset + (mdgriffith$elm_ui$Internal$Style$trackReset + (mdgriffith$elm_ui$Internal$Style$thumbReset + mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var mdgriffith$elm_ui$Internal$Style$Intermediate = elm$core$Basics$identity;
var mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {cp: closing, D: _List_Nil, aR: _List_Nil, ay: selector};
	});
var mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_n0, rulesToRender) {
		var parent = _n0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								aR: A2(
									elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.aR)
							});
					case 2:
						var _n2 = rule.a;
						var prop = _n2.a;
						var value = _n2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								D: A2(
									elm$core$List$cons,
									{cp: '\n}', D: _List_Nil, aR: props, ay: '@supports (' + (prop + (':' + (value + (') {' + parent.ay))))},
									rendered.D)
							});
					case 4:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								D: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.ay + (' + ' + selector), ''),
										adjRules),
									rendered.D)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								D: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.ay + (' > ' + child), ''),
										childRules),
									rendered.D)
							});
					case 3:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								D: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.ay, descriptor),
											''),
										descriptorRules),
									rendered.D)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								D: A2(
									elm$core$List$cons,
									A2(
										mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.ay, ''),
										batched),
									rendered.D)
							});
				}
			});
		return A3(elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return elm$core$String$concat(
			A2(
				elm$core$List$map,
				function (_n3) {
					var x = _n3.a;
					var y = _n3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _n2 = rule.aR;
		if (!_n2.b) {
			return '';
		} else {
			return rule.ay + ('{' + (renderValues(rule.aR) + (rule.cp + '}')));
		}
	};
	var renderIntermediate = function (_n0) {
		var rule = _n0;
		return _Utils_ap(
			renderClass(rule),
			elm$core$String$concat(
				A2(elm$core$List$map, renderIntermediate, rule.D)));
	};
	return elm$core$String$concat(
		A2(
			elm$core$List$map,
			renderIntermediate,
			A3(
				elm$core$List$foldr,
				F2(
					function (_n1, existing) {
						var name = _n1.a;
						var styleRules = _n1.b;
						return A2(
							elm$core$List$cons,
							A2(
								mdgriffith$elm_ui$Internal$Style$renderRules,
								A2(mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	mdgriffith$elm_ui$Internal$Style$overrides,
	mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap(mdgriffith$elm_ui$Internal$Style$baseSheet, mdgriffith$elm_ui$Internal$Style$commonValues)));
var mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _n0 = opts.aw;
	switch (_n0) {
		case 0:
			return A3(
				elm$virtual_dom$VirtualDom$node,
				'style',
				_List_Nil,
				_List_fromArray(
					[
						elm$virtual_dom$VirtualDom$text(mdgriffith$elm_ui$Internal$Style$rules)
					]));
		case 1:
			return elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						elm$virtual_dom$VirtualDom$property,
						'rules',
						elm$json$Json$Encode$string(mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.fd;
			return '\"' + (name + '\"');
	}
};
var mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2(elm$core$List$any, mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.f$);
	} else {
		return false;
	}
};
var mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _n0, existing) {
		var key = _n0.a;
		var val = _n0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 1) {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					elm$core$List$foldl,
					mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo) {
				case 1:
					var _n2 = options.hm;
					switch (_n2) {
						case 0:
							return _List_Nil;
						case 2:
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									elm$core$List$foldl,
									mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									elm$core$List$foldl,
									mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 0:
					var renderedProps = A3(
						elm$core$List$foldl,
						mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[selector + ('-fs:focus {' + (renderedProps + '\n}')), '.' + (mdgriffith$elm_ui$Internal$Style$classes.gl + (':focus ~ ' + (selector + ('-fs:not(.focus)  {' + (renderedProps + '\n}'))))), '.' + (mdgriffith$elm_ui$Internal$Style$classes.gl + (':focus ' + (selector + ('-fs  {' + (renderedProps + '\n}'))))), '.focusable-parent:focus ~ ' + ('.' + (mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + (selector + ('-fs {' + (renderedProps + '\n}'))))))]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							elm$core$List$foldl,
							mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + elm$core$String$fromInt(index)));
	}
};
var mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return elm$core$Maybe$Just(
			A2(
				elm$core$String$join,
				', ',
				A2(elm$core$List$map, mdgriffith$elm_ui$Internal$Model$renderVariant, font.f$)));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return elm$core$Maybe$Nothing;
		case 1:
			var _n1 = transform.a;
			var x = _n1.a;
			var y = _n1.b;
			var z = _n1.c;
			return elm$core$Maybe$Just(
				'translate3d(' + (elm$core$String$fromFloat(x) + ('px, ' + (elm$core$String$fromFloat(y) + ('px, ' + (elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _n2 = transform.a;
			var tx = _n2.a;
			var ty = _n2.b;
			var tz = _n2.c;
			var _n3 = transform.b;
			var sx = _n3.a;
			var sy = _n3.b;
			var sz = _n3.c;
			var _n4 = transform.c;
			var ox = _n4.a;
			var oy = _n4.b;
			var oz = _n4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + (elm$core$String$fromFloat(tx) + ('px, ' + (elm$core$String$fromFloat(ty) + ('px, ' + (elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + (elm$core$String$fromFloat(sx) + (', ' + (elm$core$String$fromFloat(sy) + (', ' + (elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + (elm$core$String$fromFloat(ox) + (', ' + (elm$core$String$fromFloat(oy) + (', ' + (elm$core$String$fromFloat(oz) + (', ' + (elm$core$String$fromFloat(angle) + 'rad)')))))));
			return elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4(mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
				var name = rule.a;
				var prop = rule.b;
				return A4(
					mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 12:
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					elm$core$Basics$max,
					0,
					A2(elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							elm$core$String$fromFloat(opacity))
						]));
			case 2:
				var i = rule.a;
				return A4(
					mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							elm$core$String$fromInt(i) + 'px')
						]));
			case 1:
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					elm$core$String$join,
					', ',
					A2(elm$core$List$filterMap, mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							elm$core$String$join,
							', ',
							A2(elm$core$List$map, mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2(mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2(elm$core$List$any, mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4(mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 3:
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 4:
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return (prop === 'color') ? elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'.' + _class,
							_List_fromArray(
								[
									A2(
									mdgriffith$elm_ui$Internal$Model$Property,
									prop,
									mdgriffith$elm_ui$Internal$Model$formatColor(color))
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'.' + (_class + (' .' + (mdgriffith$elm_ui$Internal$Style$classes.hv + (' .' + mdgriffith$elm_ui$Internal$Style$classes.hu)))),
							_List_fromArray(
								[
									A2(
									mdgriffith$elm_ui$Internal$Model$Property,
									prop,
									mdgriffith$elm_ui$Internal$Model$formatColor(color))
								]))
						])) : A4(
					mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = elm$core$String$fromInt(y) + 'px';
				var xPx = elm$core$String$fromInt(x) + 'px';
				var single = '.' + mdgriffith$elm_ui$Internal$Style$classes.$8;
				var row = '.' + mdgriffith$elm_ui$Internal$Style$classes.aj;
				var wrappedRow = '.' + (mdgriffith$elm_ui$Internal$Style$classes.ei + row);
				var right = '.' + mdgriffith$elm_ui$Internal$Style$classes.eq;
				var paragraph = '.' + mdgriffith$elm_ui$Internal$Style$classes.fo;
				var page = '.' + mdgriffith$elm_ui$Internal$Style$classes.fn;
				var left = '.' + mdgriffith$elm_ui$Internal$Style$classes.ep;
				var halfY = elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + mdgriffith$elm_ui$Internal$Style$classes.aG;
				var _class = '.' + cls;
				var any = '.' + mdgriffith$elm_ui$Internal$Style$classes.gl;
				return elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + (elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + (elm$core$String$fromInt(y) + 'px)')),
									A2(
									mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + (elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2(mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 7:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							elm$core$String$fromInt(top) + ('px ' + (elm$core$String$fromInt(right) + ('px ' + (elm$core$String$fromInt(bottom) + ('px ' + (elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 6:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							elm$core$String$fromInt(top) + ('px ' + (elm$core$String$fromInt(right) + ('px ' + (elm$core$String$fromInt(bottom) + ('px ' + (elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return elm$core$String$fromInt(px) + 'px';
								case 1:
									var _n2 = _Utils_Tuple2(minimum, maximum);
									if (_n2.a.$ === 1) {
										if (_n2.b.$ === 1) {
											var _n3 = _n2.a;
											var _n4 = _n2.b;
											return 'max-content';
										} else {
											var _n6 = _n2.a;
											var maxSize = _n2.b.a;
											return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_n2.b.$ === 1) {
											var minSize = _n2.a.a;
											var _n5 = _n2.b;
											return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _n2.a.a;
											var maxSize = _n2.b.a;
											return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _n7 = _Utils_Tuple2(minimum, maximum);
									if (_n7.a.$ === 1) {
										if (_n7.b.$ === 1) {
											var _n8 = _n7.a;
											var _n9 = _n7.b;
											return elm$core$String$fromInt(i) + 'fr';
										} else {
											var _n11 = _n7.a;
											var maxSize = _n7.b.a;
											return 'minmax(max-content, ' + (elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_n7.b.$ === 1) {
											var minSize = _n7.a.a;
											var _n10 = _n7.b;
											return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _n7.a.a;
											var maxSize = _n7.b.a;
											return 'minmax(' + (elm$core$String$fromInt(minSize) + ('px, ' + (elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, elm$core$Maybe$Nothing, elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.ii.a);
				var ySpacing = toGridLength(template.ii.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						elm$core$String$join,
						' ',
						A2(elm$core$List$map, toGridLength, template.h4)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						elm$core$String$join,
						ySpacing,
						A2(elm$core$List$map, toGridLength, template.ao)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						elm$core$String$join,
						ySpacing,
						A2(elm$core$List$map, toGridLength, template.ao)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.ii.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.ii.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						elm$core$String$join,
						' ',
						A2(elm$core$List$map, toGridLength, template.ao)));
				var _class = '.grid-rows-' + (A2(
					elm$core$String$join,
					'-',
					A2(elm$core$List$map, mdgriffith$elm_ui$Internal$Model$lengthClassName, template.h4)) + ('-cols-' + (A2(
					elm$core$String$join,
					'-',
					A2(elm$core$List$map, mdgriffith$elm_ui$Internal$Model$lengthClassName, template.ao)) + ('-space-x-' + (mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ii.a) + ('-space-y-' + mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ii.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + (elm$core$String$fromInt(position.aj) + ';'),
							'-ms-grid-row-span: ' + (elm$core$String$fromInt(position.hj) + ';'),
							'-ms-grid-column: ' + (elm$core$String$fromInt(position.gS) + ';'),
							'-ms-grid-column-span: ' + (elm$core$String$fromInt(position.iW) + ';')
						]));
				var modernPosition = A2(
					elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + (elm$core$String$fromInt(position.aj) + (' / ' + (elm$core$String$fromInt(position.aj + position.hj) + ';'))),
							'grid-column: ' + (elm$core$String$fromInt(position.gS) + (' / ' + (elm$core$String$fromInt(position.gS + position.iW) + ';')))
						]));
				var _class = '.grid-pos-' + (elm$core$String$fromInt(position.aj) + ('-' + (elm$core$String$fromInt(position.gS) + ('-' + (elm$core$String$fromInt(position.iW) + ('-' + elm$core$String$fromInt(position.hj)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						elm$core$Maybe$Just(_class));
				};
				return A2(elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _n12 = _Utils_Tuple2(_class, val);
				if ((!_n12.a.$) && (!_n12.b.$)) {
					var cls = _n12.a.a;
					var v = _n12.b.a;
					return A4(
						mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2(mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return elm$json$Json$Encode$object(
			A2(
				elm$core$List$map,
				function (style) {
					var styled = A3(mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_n0) {
			var name = _n0.a;
			var val = _n0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			elm$core$String$join,
			'',
			A2(elm$core$List$map, renderPair, rules)) + '}'));
	});
var mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _n0) {
		var parentAdj = _n0.a;
		var textAdjustment = _n0.b;
		return _List_fromArray(
			[
				A2(mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2(mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + (mdgriffith$elm_ui$Internal$Style$classes.T + (', .' + (name + (' .' + (modifier + (' > .' + mdgriffith$elm_ui$Internal$Style$classes.T)))))))))), textAdjustment)
			]);
	});
var mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _n0, otherFontName) {
		var full = _n0.a;
		var capital = _n0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			elm$core$String$join,
			' ',
			_Utils_ap(
				A3(mdgriffith$elm_ui$Internal$Model$fontRule, name, mdgriffith$elm_ui$Internal$Style$classes.ig, capital),
				A3(mdgriffith$elm_ui$Internal$Model$fontRule, name, mdgriffith$elm_ui$Internal$Style$classes.hf, full)));
	});
var mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + (mdgriffith$elm_ui$Internal$Style$classes.ig + (', ' + ('.' + (name + (' .' + mdgriffith$elm_ui$Internal$Style$classes.ig))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + (mdgriffith$elm_ui$Internal$Style$classes.ig + ('> .' + (mdgriffith$elm_ui$Internal$Style$classes.T + (', .' + (name + (' .' + (mdgriffith$elm_ui$Internal$Style$classes.ig + (' > .' + mdgriffith$elm_ui$Internal$Style$classes.T)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$max, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$min, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {hj: height / size, d6: size, f0: vertical};
	});
var mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.gJ, adjustment.gr, adjustment.g2, adjustment.hE]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		elm$core$Maybe$withDefault,
		adjustment.g2,
		elm$core$List$minimum(lines));
	var newBaseline = A2(
		elm$core$Maybe$withDefault,
		adjustment.gr,
		elm$core$List$minimum(
			A2(
				elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		elm$core$Maybe$withDefault,
		adjustment.gJ,
		elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		gJ: A3(mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		eM: A3(mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				elm$core$String$fromFloat(converted.hj)),
				_Utils_Tuple2(
				'vertical-align',
				elm$core$String$fromFloat(converted.f0) + 'em'),
				_Utils_Tuple2(
				'font-size',
				elm$core$String$fromFloat(converted.d6) + 'em')
			]));
};
var mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _n2 = _with.f8;
						if (_n2.$ === 1) {
							return found;
						} else {
							var adjustment = _n2.a;
							return elm$core$Maybe$Just(
								_Utils_Tuple2(
									mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.eM;
										}(
											mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.gJ;
										}(
											mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		elm$core$Maybe$Nothing,
		typefaces);
};
var mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 4) {
			var url = font.b;
			return elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_n2) {
		var name = _n2.a;
		var typefaces = _n2.b;
		var imports = A2(
			elm$core$String$join,
			'\n',
			A2(elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2(elm$core$List$map, elm$core$Tuple$first, rules);
	var fontAdjustments = function (_n1) {
		var name = _n1.a;
		var typefaces = _n1.b;
		var _n0 = mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_n0.$ === 1) {
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$map,
					mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _n0.a;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$map,
					A2(mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			elm$core$String$join,
			'\n',
			A2(elm$core$List$map, fontImports, rules)),
		A2(
			elm$core$String$join,
			'\n',
			A2(elm$core$List$map, fontAdjustments, rules)));
};
var mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 1) {
		var name = rule.a;
		var typefaces = rule.b;
		return elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					cU: _Utils_ap(
						rendered.cU,
						A3(mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, elm$core$Maybe$Nothing)),
					cc: function () {
						var _n1 = mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_n1.$ === 1) {
							return rendered.cc;
						} else {
							var topLevel = _n1.a;
							return A2(elm$core$List$cons, topLevel, rendered.cc);
						}
					}()
				};
			});
		var _n0 = A3(
			elm$core$List$foldl,
			combine,
			{cU: _List_Nil, cc: _List_Nil},
			stylesheet);
		var topLevel = _n0.cc;
		var rules = _n0.cU;
		return _Utils_ap(
			mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			elm$core$String$concat(rules));
	});
var mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _n0 = options.aw;
		switch (_n0) {
			case 0:
				return A3(
					elm$virtual_dom$VirtualDom$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							elm$virtual_dom$VirtualDom$text(
							A2(mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
						]));
			case 1:
				return A3(
					elm$virtual_dom$VirtualDom$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							elm$virtual_dom$VirtualDom$text(
							A2(mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
						]));
			default:
				return A3(
					elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							elm$virtual_dom$VirtualDom$property,
							'rules',
							A2(mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				elm$core$List$foldl,
				mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					elm$core$Set$empty,
					mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.hc)),
				styles).b);
		return _static ? A2(
			elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				elm$core$List$foldl,
				mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					elm$core$Set$empty,
					mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.hc)),
				styles).b);
		return _static ? A2(
			elm$core$List$cons,
			mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2(elm$core$List$cons, dynamicStyleSheet, children)) : A2(elm$core$List$cons, dynamicStyleSheet, children);
	});
var mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4(mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4(mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return elm$html$Html$div;
								case 'p':
									return elm$html$Html$p;
								default:
									return elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return unkeyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4(mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4(mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class(mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + mdgriffith$elm_ui$Internal$Style$classes.$8))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					elm$html$Html$u,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$elm_ui$Internal$Style$classes.gl, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.cq, mdgriffith$elm_ui$Internal$Style$classes.aH, mdgriffith$elm_ui$Internal$Style$classes.gf])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					elm$html$Html$s,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$elm_ui$Internal$Style$classes.gl, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.cq, mdgriffith$elm_ui$Internal$Style$classes.aH, mdgriffith$elm_ui$Internal$Style$classes.gd])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					elm$html$Html$s,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$elm_ui$Internal$Style$classes.gl, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.cq, mdgriffith$elm_ui$Internal$Style$classes.ge])))
						]),
					_List_fromArray(
						[html])) : (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					elm$html$Html$u,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class(
							A2(
								elm$core$String$join,
								' ',
								_List_fromArray(
									[mdgriffith$elm_ui$Internal$Style$classes.gl, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.cq, mdgriffith$elm_ui$Internal$Style$classes.gc])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var mdgriffith$elm_ui$Internal$Model$textElementClasses = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.T + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.eg + (' ' + mdgriffith$elm_ui$Internal$Style$classes.dh)))));
var mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class(mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				elm$html$Html$text(str)
			]));
};
var mdgriffith$elm_ui$Internal$Model$textElementFillClasses = mdgriffith$elm_ui$Internal$Style$classes.gl + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.T + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.eh + (' ' + mdgriffith$elm_ui$Internal$Style$classes.di)))));
var mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class(mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				elm$html$Html$text(str)
			]));
};
var mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_n8, _n9) {
				var key = _n8.a;
				var child = _n8.b;
				var htmls = _n9.a;
				var existingStyles = _n9.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.hn, mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles)) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.hn, mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, mdgriffith$elm_ui$Internal$Model$asEl) ? mdgriffith$elm_ui$Internal$Model$textElementFill(str) : mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _n6) {
				var htmls = _n6.a;
				var existingStyles = _n6.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								A2(styled.hn, mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles)) : _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								A2(styled.hn, mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								elm$core$List$cons,
								_Utils_eq(context, mdgriffith$elm_ui$Internal$Model$asEl) ? mdgriffith$elm_ui$Internal$Model$textElementFill(str) : mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _n1 = A3(
				elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _n1.a;
			var styles = _n1.b;
			var newStyles = elm$core$List$isEmpty(styles) ? rendered.ip : _Utils_ap(rendered.ip, styles);
			if (!newStyles.b) {
				return mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.a1,
						rendered.a5,
						rendered.aW,
						mdgriffith$elm_ui$Internal$Model$Keyed(
							A3(mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.aZ)),
						mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return mdgriffith$elm_ui$Internal$Model$Styled(
					{
						hn: A4(
							mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.a1,
							rendered.a5,
							rendered.aW,
							mdgriffith$elm_ui$Internal$Model$Keyed(
								A3(mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.aZ))),
						ip: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _n3 = A3(
				elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _n3.a;
			var styles = _n3.b;
			var newStyles = elm$core$List$isEmpty(styles) ? rendered.ip : _Utils_ap(rendered.ip, styles);
			if (!newStyles.b) {
				return mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.a1,
						rendered.a5,
						rendered.aW,
						mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2(mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.aZ)),
						mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return mdgriffith$elm_ui$Internal$Model$Styled(
					{
						hn: A4(
							mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.a1,
							rendered.a5,
							rendered.aW,
							mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2(mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.aZ))),
						ip: allStyles
					});
			}
		}
	});
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _n0) {
		var one = _n0.a;
		var two = _n0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2(mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2(mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var mdgriffith$elm_ui$Internal$Flag$height = mdgriffith$elm_ui$Internal$Flag$flag(7);
var mdgriffith$elm_ui$Internal$Flag$heightContent = mdgriffith$elm_ui$Internal$Flag$flag(36);
var mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_n0, _n1) {
		var one = _n0.a;
		var two = _n0.b;
		var three = _n1.a;
		var four = _n1.b;
		return A2(mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var mdgriffith$elm_ui$Internal$Flag$width = mdgriffith$elm_ui$Internal$Flag$flag(6);
var mdgriffith$elm_ui$Internal$Flag$widthContent = mdgriffith$elm_ui$Internal$Flag$flag(38);
var mdgriffith$elm_ui$Internal$Flag$xAlign = mdgriffith$elm_ui$Internal$Flag$flag(30);
var mdgriffith$elm_ui$Internal$Flag$yAlign = mdgriffith$elm_ui$Internal$Flag$flag(29);
var mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									elm$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$elm_ui$Internal$Style$classes.bs, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.f6]));
							case 1:
								return A2(
									elm$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$elm_ui$Internal$Style$classes.bs, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.gt]));
							case 2:
								return A2(
									elm$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$elm_ui$Internal$Style$classes.bs, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.hP]));
							case 3:
								return A2(
									elm$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$elm_ui$Internal$Style$classes.bs, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.hO]));
							case 4:
								return A2(
									elm$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$elm_ui$Internal$Style$classes.bs, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.hr]));
							default:
								return A2(
									elm$core$String$join,
									' ',
									_List_fromArray(
										[mdgriffith$elm_ui$Internal$Style$classes.bs, mdgriffith$elm_ui$Internal$Style$classes.$8, mdgriffith$elm_ui$Internal$Style$classes.gs]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html(mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.hn, mdgriffith$elm_ui$Internal$Model$NoStyleSheet, mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2(mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2(elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
					return A2(
						mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2(elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location === 5) {
					return A2(
						mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2(elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2(elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2(mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2(mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return mdgriffith$elm_ui$Internal$Style$classes.c2 + (' ' + mdgriffith$elm_ui$Internal$Style$classes.ep);
		case 2:
			return mdgriffith$elm_ui$Internal$Style$classes.c2 + (' ' + mdgriffith$elm_ui$Internal$Style$classes.eq);
		default:
			return mdgriffith$elm_ui$Internal$Style$classes.c2 + (' ' + mdgriffith$elm_ui$Internal$Style$classes.ga);
	}
};
var mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return mdgriffith$elm_ui$Internal$Style$classes.c3 + (' ' + mdgriffith$elm_ui$Internal$Style$classes.gg);
		case 2:
			return mdgriffith$elm_ui$Internal$Style$classes.c3 + (' ' + mdgriffith$elm_ui$Internal$Style$classes.f9);
		default:
			return mdgriffith$elm_ui$Internal$Style$classes.c3 + (' ' + mdgriffith$elm_ui$Internal$Style$classes.gb);
	}
};
var mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return A4(
							mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4(mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4(mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4(mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 0:
			var px = h.a;
			var val = elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				mdgriffith$elm_ui$Internal$Flag$none,
				mdgriffith$elm_ui$Internal$Style$classes.eP + (' ' + name),
				_List_fromArray(
					[
						A3(mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$heightContent, mdgriffith$elm_ui$Internal$Flag$none),
				mdgriffith$elm_ui$Internal$Style$classes.dh,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$heightFill, mdgriffith$elm_ui$Internal$Flag$none),
				mdgriffith$elm_ui$Internal$Style$classes.di,
				_List_Nil) : _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$heightFill, mdgriffith$elm_ui$Internal$Flag$none),
				mdgriffith$elm_ui$Internal$Style$classes.eQ + (' height-fill-' + elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						mdgriffith$elm_ui$Internal$Model$Single,
						mdgriffith$elm_ui$Internal$Style$classes.gl + ('.' + (mdgriffith$elm_ui$Internal$Style$classes.aG + (' > ' + mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + elm$core$String$fromInt(portion))))),
						'flex-grow',
						elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + elm$core$String$fromInt(minSize);
			var style = A3(
				mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				elm$core$String$fromInt(minSize) + 'px');
			var _n1 = mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _n1.a;
			var newAttrs = _n1.b;
			var newStyle = _n1.c;
			return _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2(elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + elm$core$String$fromInt(maxSize);
			var style = A3(
				mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				elm$core$String$fromInt(maxSize) + 'px');
			var _n2 = mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _n2.a;
			var newAttrs = _n2.b;
			var newStyle = _n2.c;
			return _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2(elm$core$List$cons, style, newStyle));
	}
};
var mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				mdgriffith$elm_ui$Internal$Flag$none,
				mdgriffith$elm_ui$Internal$Style$classes.f3 + (' width-px-' + elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + elm$core$String$fromInt(px),
						'width',
						elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$widthContent, mdgriffith$elm_ui$Internal$Flag$none),
				mdgriffith$elm_ui$Internal$Style$classes.eg,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$widthFill, mdgriffith$elm_ui$Internal$Flag$none),
				mdgriffith$elm_ui$Internal$Style$classes.eh,
				_List_Nil) : _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$widthFill, mdgriffith$elm_ui$Internal$Flag$none),
				mdgriffith$elm_ui$Internal$Style$classes.f4 + (' width-fill-' + elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						mdgriffith$elm_ui$Internal$Model$Single,
						mdgriffith$elm_ui$Internal$Style$classes.gl + ('.' + (mdgriffith$elm_ui$Internal$Style$classes.aj + (' > ' + mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + elm$core$String$fromInt(portion))))),
						'flex-grow',
						elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + elm$core$String$fromInt(minSize);
			var style = A3(
				mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				elm$core$String$fromInt(minSize) + 'px');
			var _n1 = mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _n1.a;
			var newAttrs = _n1.b;
			var newStyle = _n1.c;
			return _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2(elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + elm$core$String$fromInt(maxSize);
			var style = A3(
				mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				elm$core$String$fromInt(maxSize) + 'px');
			var _n2 = mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _n2.a;
			var newAttrs = _n2.b;
			var newStyle = _n2.c;
			return _Utils_Tuple3(
				A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2(elm$core$List$cons, style, newStyle));
	}
};
var mdgriffith$elm_ui$Internal$Flag$borderWidth = mdgriffith$elm_ui$Internal$Flag$flag(27);
var mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 3) {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _n1 = mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_n1.$ === 1) {
					return {
						aW: A2(
							elm$core$List$cons,
							elm$html$Html$Attributes$class(classes),
							attrs),
						aZ: children,
						a1: has,
						a5: node,
						ip: styles
					};
				} else {
					var _class = _n1.a;
					return {
						aW: A2(
							elm$core$List$cons,
							elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						aZ: children,
						a1: has,
						a5: node,
						ip: A2(
							elm$core$List$cons,
							mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 3:
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2(mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2(mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 1:
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2(elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 4:
						var flag = attribute.a;
						var style = attribute.b;
						if (A2(mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2(mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2(mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2(mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2(elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 10:
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2(mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2(mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 7:
						var width = attribute.a;
						if (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 0:
									var px = width.a;
									var $temp$classes = (mdgriffith$elm_ui$Internal$Style$classes.f3 + (' width-px-' + elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										elm$core$List$cons,
										A3(
											mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + elm$core$String$fromInt(px),
											'width',
											elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = classes + (' ' + mdgriffith$elm_ui$Internal$Style$classes.eg),
										$temp$node = node,
										$temp$has = A2(
										mdgriffith$elm_ui$Internal$Flag$add,
										mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + mdgriffith$elm_ui$Internal$Style$classes.eh),
											$temp$node = node,
											$temp$has = A2(
											mdgriffith$elm_ui$Internal$Flag$add,
											mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.f4 + (' width-fill-' + elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											mdgriffith$elm_ui$Internal$Flag$add,
											mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											elm$core$List$cons,
											A3(
												mdgriffith$elm_ui$Internal$Model$Single,
												mdgriffith$elm_ui$Internal$Style$classes.gl + ('.' + (mdgriffith$elm_ui$Internal$Style$classes.aj + (' > ' + mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + elm$core$String$fromInt(portion))))),
												'flex-grow',
												elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _n4 = mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _n4.a;
									var newClass = _n4.b;
									var newStyles = _n4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 8:
						var height = attribute.a;
						if (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 0:
									var px = height.a;
									var val = elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = mdgriffith$elm_ui$Internal$Style$classes.eP + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										elm$core$List$cons,
										A3(mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = mdgriffith$elm_ui$Internal$Style$classes.dh + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										mdgriffith$elm_ui$Internal$Flag$add,
										mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = mdgriffith$elm_ui$Internal$Style$classes.di + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											mdgriffith$elm_ui$Internal$Flag$add,
											mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.eQ + (' height-fill-' + elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											mdgriffith$elm_ui$Internal$Flag$add,
											mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											elm$core$List$cons,
											A3(
												mdgriffith$elm_ui$Internal$Model$Single,
												mdgriffith$elm_ui$Internal$Style$classes.gl + ('.' + (mdgriffith$elm_ui$Internal$Style$classes.aG + (' > ' + mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + elm$core$String$fromInt(portion))))),
												'flex-grow',
												elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _n6 = mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _n6.a;
									var newClass = _n6.b;
									var newStyles = _n6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
								var $temp$classes = classes,
									$temp$node = A2(mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 1:
								var $temp$classes = classes,
									$temp$node = A2(mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 2:
								var $temp$classes = classes,
									$temp$node = A2(mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 3:
								var $temp$classes = classes,
									$temp$node = A2(mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 4:
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2(mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2(mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 9:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'role', 'paragraph'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 8:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 5:
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 6:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									elm$core$List$cons,
									A2(elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.ip);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3(mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 6:
						var x = attribute.a;
						if (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x) {
									case 1:
										return A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
										return A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2(mdgriffith$elm_ui$Internal$Flag$present, mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y) {
									case 1:
										return A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
										return A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2(mdgriffith$elm_ui$Internal$Flag$add, mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
var mdgriffith$elm_ui$Internal$Model$untransformed = mdgriffith$elm_ui$Internal$Model$Untransformed;
var mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				mdgriffith$elm_ui$Internal$Flag$none,
				mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				elm$core$List$reverse(attributes)));
	});
var mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return mdgriffith$elm_ui$Internal$Model$Attr(
		elm$html$Html$Attributes$class(cls));
};
var mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			mdgriffith$elm_ui$Internal$Model$element,
			mdgriffith$elm_ui$Internal$Model$asColumn,
			mdgriffith$elm_ui$Internal$Model$div,
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.gW + (' ' + mdgriffith$elm_ui$Internal$Style$classes.bN)),
				A2(
					elm$core$List$cons,
					mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$shrink),
					A2(
						elm$core$List$cons,
						mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$shrink),
						attrs))),
			mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var elm$html$Html$Attributes$download = function (fileName) {
	return A2(elm$html$Html$Attributes$stringProperty, 'download', fileName);
};
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var mdgriffith$elm_ui$Element$downloadAs = F2(
	function (attrs, _n0) {
		var url = _n0.iQ;
		var filename = _n0.g8;
		var label = _n0.dk;
		return A4(
			mdgriffith$elm_ui$Internal$Model$element,
			mdgriffith$elm_ui$Internal$Model$asEl,
			mdgriffith$elm_ui$Internal$Model$NodeName('a'),
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Internal$Model$Attr(
					elm$html$Html$Attributes$href(url)),
				A2(
					elm$core$List$cons,
					mdgriffith$elm_ui$Internal$Model$Attr(
						elm$html$Html$Attributes$download(filename)),
					A2(
						elm$core$List$cons,
						mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$shrink),
						A2(
							elm$core$List$cons,
							mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$shrink),
							A2(
								elm$core$List$cons,
								mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.cs),
								A2(
									elm$core$List$cons,
									mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.aH),
									attrs)))))),
			mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			mdgriffith$elm_ui$Internal$Model$element,
			mdgriffith$elm_ui$Internal$Model$asEl,
			mdgriffith$elm_ui$Internal$Model$div,
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$shrink),
					attrs)),
			mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$elm_ui$Element$fill = mdgriffith$elm_ui$Internal$Model$Fill(1);
var mdgriffith$elm_ui$Element$fillPortion = mdgriffith$elm_ui$Internal$Model$Fill;
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var mdgriffith$elm_ui$Internal$Model$unstyled = A2(elm$core$Basics$composeL, mdgriffith$elm_ui$Internal$Model$Unstyled, elm$core$Basics$always);
var mdgriffith$elm_ui$Element$html = mdgriffith$elm_ui$Internal$Model$unstyled;
var elm$html$Html$Attributes$alt = elm$html$Html$Attributes$stringProperty('alt');
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var mdgriffith$elm_ui$Element$image = F2(
	function (attrs, _n0) {
		var src = _n0.fO;
		var description = _n0.eE;
		var imageAttributes = A2(
			elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 7:
						return true;
					case 8:
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A4(
			mdgriffith$elm_ui$Internal$Model$element,
			mdgriffith$elm_ui$Internal$Model$asEl,
			mdgriffith$elm_ui$Internal$Model$div,
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.hp),
				attrs),
			mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A4(
						mdgriffith$elm_ui$Internal$Model$element,
						mdgriffith$elm_ui$Internal$Model$asEl,
						mdgriffith$elm_ui$Internal$Model$NodeName('img'),
						_Utils_ap(
							_List_fromArray(
								[
									mdgriffith$elm_ui$Internal$Model$Attr(
									elm$html$Html$Attributes$src(src)),
									mdgriffith$elm_ui$Internal$Model$Attr(
									elm$html$Html$Attributes$alt(description))
								]),
							imageAttributes),
						mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 0};
var mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 3) {
			return mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2(mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var mdgriffith$elm_ui$Internal$Model$InFront = 4;
var mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2(mdgriffith$elm_ui$Element$createNearby, 4, element);
};
var mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var mdgriffith$elm_ui$Internal$Model$Layout = 0;
var mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	gq: elm$core$Maybe$Nothing,
	gB: elm$core$Maybe$Nothing,
	id: elm$core$Maybe$Just(
		{
			bj: 0,
			c8: A4(mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			fg: _Utils_Tuple2(0, 0),
			d6: 3
		})
};
var mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _n4 = record.hm;
					if (_n4.$ === 1) {
						return _Utils_update(
							record,
							{
								hm: elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _n5 = record.hc;
					if (_n5.$ === 1) {
						return _Utils_update(
							record,
							{
								hc: elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _n6 = record.aw;
					if (_n6.$ === 1) {
						return _Utils_update(
							record,
							{
								aw: elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			hc: function () {
				var _n0 = record.hc;
				if (_n0.$ === 1) {
					return mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _n0.a;
					return focusable;
				}
			}(),
			hm: function () {
				var _n1 = record.hm;
				if (_n1.$ === 1) {
					return 1;
				} else {
					var hoverable = _n1.a;
					return hoverable;
				}
			}(),
			aw: function () {
				var _n2 = record.aw;
				if (_n2.$ === 1) {
					return 0;
				} else {
					var actualMode = _n2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			elm$core$List$foldr,
			combine,
			{hc: elm$core$Maybe$Nothing, hm: elm$core$Maybe$Nothing, aw: elm$core$Maybe$Nothing},
			options));
};
var mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html(mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.ip;
				var html = el.a.hn;
				return A2(
					html,
					mode(styles),
					mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _n0 = options.aw;
			if (_n0 === 1) {
				return mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				mdgriffith$elm_ui$Internal$Model$element,
				mdgriffith$elm_ui$Internal$Model$asEl,
				mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var mdgriffith$elm_ui$Internal$Flag$fontFamily = mdgriffith$elm_ui$Internal$Flag$flag(5);
var mdgriffith$elm_ui$Internal$Flag$fontSize = mdgriffith$elm_ui$Internal$Flag$flag(4);
var mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var elm$core$String$toLower = _String_toLower;
var elm$core$String$words = _String_words;
var mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							elm$core$String$join,
							'-',
							elm$core$String$words(
								elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							elm$core$String$join,
							'-',
							elm$core$String$words(
								elm$core$String$toLower(name)));
					default:
						var name = font.a.fd;
						return A2(
							elm$core$String$join,
							'-',
							elm$core$String$words(
								elm$core$String$toLower(name)));
				}
			}());
	});
var mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			mdgriffith$elm_ui$Internal$Model$StyleClass,
			mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-color-' + mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4(mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4(mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			mdgriffith$elm_ui$Internal$Model$StyleClass,
			mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				mdgriffith$elm_ui$Internal$Model$Colored,
				'font-color-' + mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4(mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4(mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			mdgriffith$elm_ui$Internal$Model$StyleClass,
			mdgriffith$elm_ui$Internal$Flag$fontSize,
			mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			mdgriffith$elm_ui$Internal$Model$StyleClass,
			mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3(elm$core$List$foldl, mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_n0, attrs, child) {
		var options = _n0.fl;
		return A3(
			mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[mdgriffith$elm_ui$Internal$Style$classes.h3, mdgriffith$elm_ui$Internal$Style$classes.gl, mdgriffith$elm_ui$Internal$Style$classes.$8]))),
				_Utils_ap(mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var mdgriffith$elm_ui$Element$layout = mdgriffith$elm_ui$Element$layoutWith(
	{fl: _List_Nil});
var mdgriffith$elm_ui$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var mdgriffith$elm_ui$Element$maximum = F2(
	function (i, l) {
		return A2(mdgriffith$elm_ui$Internal$Model$Max, i, l);
	});
var mdgriffith$elm_ui$Internal$Model$Empty = {$: 3};
var mdgriffith$elm_ui$Element$none = mdgriffith$elm_ui$Internal$Model$Empty;
var mdgriffith$elm_ui$Internal$Flag$spacing = mdgriffith$elm_ui$Internal$Flag$flag(3);
var mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + (elm$core$String$fromInt(x) + ('-' + elm$core$String$fromInt(y)));
	});
var mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2(mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 9};
var mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			mdgriffith$elm_ui$Internal$Model$element,
			mdgriffith$elm_ui$Internal$Model$asParagraph,
			mdgriffith$elm_ui$Internal$Model$div,
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Internal$Model$Describe(mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					elm$core$List$cons,
					mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
					A2(
						elm$core$List$cons,
						mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var mdgriffith$elm_ui$Internal$Flag$cursor = mdgriffith$elm_ui$Internal$Flag$flag(21);
var mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var mdgriffith$elm_ui$Element$pointer = A2(mdgriffith$elm_ui$Internal$Model$Class, mdgriffith$elm_ui$Internal$Flag$cursor, mdgriffith$elm_ui$Internal$Style$classes.gY);
var mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
};
var mdgriffith$elm_ui$Element$px = mdgriffith$elm_ui$Internal$Model$Px;
var mdgriffith$elm_ui$Element$rgba = mdgriffith$elm_ui$Internal$Model$Rgba;
var mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var mdgriffith$elm_ui$Internal$Model$asRow = 0;
var mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			mdgriffith$elm_ui$Internal$Model$element,
			mdgriffith$elm_ui$Internal$Model$asRow,
			mdgriffith$elm_ui$Internal$Model$div,
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.bN + (' ' + mdgriffith$elm_ui$Internal$Style$classes.aH)),
				A2(
					elm$core$List$cons,
					mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$shrink),
					A2(
						elm$core$List$cons,
						mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$shrink),
						attrs))),
			mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var mdgriffith$elm_ui$Internal$Flag$overflow = mdgriffith$elm_ui$Internal$Flag$flag(20);
var mdgriffith$elm_ui$Element$scrollbarY = A2(mdgriffith$elm_ui$Internal$Model$Class, mdgriffith$elm_ui$Internal$Flag$overflow, mdgriffith$elm_ui$Internal$Style$classes.ia);
var mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var mdgriffith$elm_ui$Element$text = function (content) {
	return mdgriffith$elm_ui$Internal$Model$Text(content);
};
var mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + (elm$core$String$fromInt(top) + ('-' + (elm$core$String$fromInt(right) + ('-' + (elm$core$String$fromInt(bottom) + ('-' + elm$core$String$fromInt(left)))))));
	});
var mdgriffith$elm_ui$Element$paddingEach = function (_n0) {
	var top = _n0.fV;
	var right = _n0.fF;
	var bottom = _n0.et;
	var left = _n0.eY;
	return (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) ? A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + elm$core$String$fromInt(top),
			top,
			top,
			top,
			top)) : A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			A4(mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
			top,
			right,
			bottom,
			left));
};
var mdgriffith$elm_ui$Internal$Model$Padding = F5(
	function (a, b, c, d, e) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e};
	});
var mdgriffith$elm_ui$Internal$Model$Spaced = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding = function (attrs) {
	return A3(
		elm$core$List$foldr,
		F2(
			function (attr, _n0) {
				var pad = _n0.a;
				var spacing = _n0.b;
				return _Utils_Tuple2(
					function () {
						if (!pad.$) {
							var x = pad.a;
							return pad;
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 7)) {
								var _n3 = attr.b;
								var name = _n3.a;
								var t = _n3.b;
								var r = _n3.c;
								var b = _n3.d;
								var l = _n3.e;
								return elm$core$Maybe$Just(
									A5(mdgriffith$elm_ui$Internal$Model$Padding, name, t, r, b, l));
							} else {
								return elm$core$Maybe$Nothing;
							}
						}
					}(),
					function () {
						if (!spacing.$) {
							var x = spacing.a;
							return spacing;
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 5)) {
								var _n6 = attr.b;
								var name = _n6.a;
								var x = _n6.b;
								var y = _n6.c;
								return elm$core$Maybe$Just(
									A3(mdgriffith$elm_ui$Internal$Model$Spaced, name, x, y));
							} else {
								return elm$core$Maybe$Nothing;
							}
						}
					}());
			}),
		_Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Maybe$Nothing),
		attrs);
};
var mdgriffith$elm_ui$Element$wrappedRow = F2(
	function (attrs, children) {
		var _n0 = mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding(attrs);
		var padded = _n0.a;
		var spaced = _n0.b;
		if (spaced.$ === 1) {
			return A4(
				mdgriffith$elm_ui$Internal$Model$element,
				mdgriffith$elm_ui$Internal$Model$asRow,
				mdgriffith$elm_ui$Internal$Model$div,
				A2(
					elm$core$List$cons,
					mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.bN + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.aH + (' ' + mdgriffith$elm_ui$Internal$Style$classes.ei)))),
					A2(
						elm$core$List$cons,
						mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$shrink),
						A2(
							elm$core$List$cons,
							mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$shrink),
							attrs))),
				mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
		} else {
			var _n2 = spaced.a;
			var spaceName = _n2.a;
			var x = _n2.b;
			var y = _n2.c;
			var newPadding = function () {
				if (!padded.$) {
					var _n5 = padded.a;
					var name = _n5.a;
					var t = _n5.b;
					var r = _n5.c;
					var b = _n5.d;
					var l = _n5.e;
					return ((_Utils_cmp(r, (x / 2) | 0) > -1) && (_Utils_cmp(b, (y / 2) | 0) > -1)) ? elm$core$Maybe$Just(
						mdgriffith$elm_ui$Element$paddingEach(
							{et: b - ((y / 2) | 0), eY: l - ((x / 2) | 0), fF: r - ((x / 2) | 0), fV: t - ((y / 2) | 0)})) : elm$core$Maybe$Nothing;
				} else {
					return elm$core$Maybe$Nothing;
				}
			}();
			if (!newPadding.$) {
				var pad = newPadding.a;
				return A4(
					mdgriffith$elm_ui$Internal$Model$element,
					mdgriffith$elm_ui$Internal$Model$asRow,
					mdgriffith$elm_ui$Internal$Model$div,
					A2(
						elm$core$List$cons,
						mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.bN + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.aH + (' ' + mdgriffith$elm_ui$Internal$Style$classes.ei)))),
						A2(
							elm$core$List$cons,
							mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$shrink),
							A2(
								elm$core$List$cons,
								mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$shrink),
								_Utils_ap(
									attrs,
									_List_fromArray(
										[pad]))))),
					mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
			} else {
				var halfY = -(y / 2);
				var halfX = -(x / 2);
				return A4(
					mdgriffith$elm_ui$Internal$Model$element,
					mdgriffith$elm_ui$Internal$Model$asEl,
					mdgriffith$elm_ui$Internal$Model$div,
					attrs,
					mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								mdgriffith$elm_ui$Internal$Model$element,
								mdgriffith$elm_ui$Internal$Model$asRow,
								mdgriffith$elm_ui$Internal$Model$div,
								A2(
									elm$core$List$cons,
									mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.bN + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.aH + (' ' + mdgriffith$elm_ui$Internal$Style$classes.ei)))),
									A2(
										elm$core$List$cons,
										mdgriffith$elm_ui$Internal$Model$Attr(
											A2(
												elm$html$Html$Attributes$style,
												'margin',
												elm$core$String$fromFloat(halfY) + ('px' + (' ' + (elm$core$String$fromFloat(halfX) + 'px'))))),
										A2(
											elm$core$List$cons,
											mdgriffith$elm_ui$Internal$Model$Attr(
												A2(
													elm$html$Html$Attributes$style,
													'width',
													'calc(100% + ' + (elm$core$String$fromInt(x) + 'px)'))),
											A2(
												elm$core$List$cons,
												mdgriffith$elm_ui$Internal$Model$Attr(
													A2(
														elm$html$Html$Attributes$style,
														'height',
														'calc(100% + ' + (elm$core$String$fromInt(y) + 'px)'))),
												A2(
													elm$core$List$cons,
													A2(
														mdgriffith$elm_ui$Internal$Model$StyleClass,
														mdgriffith$elm_ui$Internal$Flag$spacing,
														A3(mdgriffith$elm_ui$Internal$Model$SpacingStyle, spaceName, x, y)),
													_List_Nil))))),
								mdgriffith$elm_ui$Internal$Model$Unkeyed(children))
							])));
			}
		}
	});
var mdgriffith$elm_ui$Internal$Flag$borderStyle = mdgriffith$elm_ui$Internal$Flag$flag(11);
var mdgriffith$elm_ui$Element$Border$dashed = A2(mdgriffith$elm_ui$Internal$Model$Class, mdgriffith$elm_ui$Internal$Flag$borderStyle, mdgriffith$elm_ui$Internal$Style$classes.gC);
var mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 6, a: a, b: b, c: c, d: d, e: e};
	});
var mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		mdgriffith$elm_ui$Internal$Model$StyleClass,
		mdgriffith$elm_ui$Internal$Flag$fontSize,
		mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		elm$core$String$fromInt(n));
};
var mdgriffith$elm_ui$Element$Events$onClick = A2(elm$core$Basics$composeL, mdgriffith$elm_ui$Internal$Model$Attr, elm$html$Html$Events$onClick);
var mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
		var _n1 = attr.b;
		var _n2 = _n1.a;
		return true;
	} else {
		return false;
	}
};
var mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2(elm$core$List$any, mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? mdgriffith$elm_ui$Internal$Model$NoAttribute : mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$field = _Json_decodeField;
var mdgriffith$elm_ui$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? elm$json$Json$Decode$succeed(msg) : elm$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			elm$json$Json$Decode$andThen,
			decode,
			A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string));
		return mdgriffith$elm_ui$Internal$Model$Attr(
			A2(
				elm$html$Html$Events$preventDefaultOn,
				'keyup',
				A2(
					elm$json$Json$Decode$map,
					function (fired) {
						return _Utils_Tuple2(fired, true);
					},
					isKey)));
	});
var mdgriffith$elm_ui$Element$Input$onEnter = function (msg) {
	return A2(mdgriffith$elm_ui$Element$Input$onKey, mdgriffith$elm_ui$Element$Input$enter, msg);
};
var mdgriffith$elm_ui$Internal$Model$Button = {$: 8};
var mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _n0) {
		var onPress = _n0.fj;
		var label = _n0.dk;
		return A4(
			mdgriffith$elm_ui$Internal$Model$element,
			mdgriffith$elm_ui$Internal$Model$asEl,
			mdgriffith$elm_ui$Internal$Model$div,
			A2(
				elm$core$List$cons,
				mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$shrink),
				A2(
					elm$core$List$cons,
					mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$shrink),
					A2(
						elm$core$List$cons,
						mdgriffith$elm_ui$Internal$Model$htmlClass(mdgriffith$elm_ui$Internal$Style$classes.cs + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.aH + (' ' + (mdgriffith$elm_ui$Internal$Style$classes.ib + (' ' + mdgriffith$elm_ui$Internal$Style$classes.fe)))))),
						A2(
							elm$core$List$cons,
							mdgriffith$elm_ui$Element$pointer,
							A2(
								elm$core$List$cons,
								mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									elm$core$List$cons,
									mdgriffith$elm_ui$Internal$Model$Describe(mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										elm$core$List$cons,
										mdgriffith$elm_ui$Internal$Model$Attr(
											elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 1) {
												return A2(
													elm$core$List$cons,
													mdgriffith$elm_ui$Internal$Model$Attr(
														elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													elm$core$List$cons,
													mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														elm$core$List$cons,
														mdgriffith$elm_ui$Element$Input$onEnter(msg),
														attrs));
											}
										}()))))))),
			mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions = {dZ: true, d8: false};
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var elm$json$Json$Decode$map6 = _Json_map6;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event = F6(
	function (keys, button, clientPos, offsetPos, pagePos, screenPos) {
		return {gH: button, an: clientPos, hC: keys, hN: offsetPos, hV: pagePos, h7: screenPos};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$BackButton = 4;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ErrorButton = 0;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ForwardButton = 5;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MainButton = 1;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MiddleButton = 2;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$SecondButton = 3;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId = function (id) {
	switch (id) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		default:
			return 0;
	}
};
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder = A2(
	elm$json$Json$Decode$map,
	mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId,
	A2(elm$json$Json$Decode$field, 'button', elm$json$Json$Decode$int));
var elm$json$Json$Decode$float = _Json_decodeFloat;
var mpizenberg$elm_pointer_events$Internal$Decode$clientPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'clientX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'clientY', elm$json$Json$Decode$float));
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$json$Json$Decode$map3 = _Json_map3;
var mpizenberg$elm_pointer_events$Internal$Decode$Keys = F3(
	function (alt, ctrl, shift) {
		return {gi: alt, gX: ctrl, ie: shift};
	});
var mpizenberg$elm_pointer_events$Internal$Decode$keys = A4(
	elm$json$Json$Decode$map3,
	mpizenberg$elm_pointer_events$Internal$Decode$Keys,
	A2(elm$json$Json$Decode$field, 'altKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'ctrlKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'shiftKey', elm$json$Json$Decode$bool));
var mpizenberg$elm_pointer_events$Internal$Decode$offsetPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'offsetX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'offsetY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$pagePos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'pageX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'pageY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$screenPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'screenX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'screenY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder = A7(elm$json$Json$Decode$map6, mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event, mpizenberg$elm_pointer_events$Internal$Decode$keys, mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder, mpizenberg$elm_pointer_events$Internal$Decode$clientPos, mpizenberg$elm_pointer_events$Internal$Decode$offsetPos, mpizenberg$elm_pointer_events$Internal$Decode$pagePos, mpizenberg$elm_pointer_events$Internal$Decode$screenPos);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions = F3(
	function (event, options, tag) {
		return A2(
			elm$html$Html$Events$custom,
			event,
			A2(
				elm$json$Json$Decode$map,
				function (ev) {
					return {
						aO: tag(ev),
						dZ: options.dZ,
						d8: options.d8
					};
				},
				mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder));
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onDown = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mousedown', mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onMove = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mousemove', mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onUp = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mouseup', mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions = {dZ: true, d8: false};
var elm$json$Json$Decode$map4 = _Json_map4;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Event = F4(
	function (keys, changedTouches, targetTouches, touches) {
		return {gM: changedTouches, hC: keys, it: targetTouches, iN: touches};
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Touch = F4(
	function (identifier, clientPos, pagePos, screenPos) {
		return {an: clientPos, ho: identifier, hV: pagePos, h7: screenPos};
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder = A5(
	elm$json$Json$Decode$map4,
	mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Touch,
	A2(elm$json$Json$Decode$field, 'identifier', elm$json$Json$Decode$int),
	mpizenberg$elm_pointer_events$Internal$Decode$clientPos,
	mpizenberg$elm_pointer_events$Internal$Decode$pagePos,
	mpizenberg$elm_pointer_events$Internal$Decode$screenPos);
var mpizenberg$elm_pointer_events$Internal$Decode$all = A2(
	elm$core$List$foldr,
	elm$json$Json$Decode$map2(elm$core$List$cons),
	elm$json$Json$Decode$succeed(_List_Nil));
var mpizenberg$elm_pointer_events$Internal$Decode$dynamicListOf = function (itemDecoder) {
	var decodeOne = function (n) {
		return A2(
			elm$json$Json$Decode$field,
			elm$core$String$fromInt(n),
			itemDecoder);
	};
	var decodeN = function (n) {
		return mpizenberg$elm_pointer_events$Internal$Decode$all(
			A2(
				elm$core$List$map,
				decodeOne,
				A2(elm$core$List$range, 0, n - 1)));
	};
	return A2(
		elm$json$Json$Decode$andThen,
		decodeN,
		A2(elm$json$Json$Decode$field, 'length', elm$json$Json$Decode$int));
};
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder = mpizenberg$elm_pointer_events$Internal$Decode$dynamicListOf;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$eventDecoder = A5(
	elm$json$Json$Decode$map4,
	mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Event,
	mpizenberg$elm_pointer_events$Internal$Decode$keys,
	A2(
		elm$json$Json$Decode$field,
		'changedTouches',
		mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder(mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)),
	A2(
		elm$json$Json$Decode$field,
		'targetTouches',
		mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder(mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)),
	A2(
		elm$json$Json$Decode$field,
		'touches',
		mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder(mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)));
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions = F3(
	function (event, options, tag) {
		return A2(
			elm$html$Html$Events$custom,
			event,
			A2(
				elm$json$Json$Decode$map,
				function (ev) {
					return {
						aO: tag(ev),
						dZ: options.dZ,
						d8: options.d8
					};
				},
				mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$eventDecoder));
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onCancel = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchcancel', mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onEnd = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchend', mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onMove = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchmove', mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onStart = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchstart', mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var pablohirafuji$elm_qrcode$QRCode$Quartile = 2;
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var pablohirafuji$elm_qrcode$QRCode$QRCode = elm$core$Basics$identity;
var pablohirafuji$elm_qrcode$QRCode$ECLevel$H = 3;
var pablohirafuji$elm_qrcode$QRCode$ECLevel$L = 0;
var pablohirafuji$elm_qrcode$QRCode$ECLevel$M = 1;
var pablohirafuji$elm_qrcode$QRCode$ECLevel$Q = 2;
var pablohirafuji$elm_qrcode$QRCode$convertEC = function (ec) {
	switch (ec) {
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
var pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound = {$: 0};
var pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow = {$: 7};
var pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar = {$: 2};
var pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar = {$: 1};
var pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char = {$: 3};
var pablohirafuji$elm_qrcode$QRCode$LogTableException = function (a) {
	return {$: 4, a: a};
};
var pablohirafuji$elm_qrcode$QRCode$PolynomialModException = {$: 6};
var pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException = {$: 5};
var pablohirafuji$elm_qrcode$QRCode$convertError = function (e) {
	switch (e.$) {
		case 0:
			return pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound;
		case 1:
			return pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar;
		case 2:
			return pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar;
		case 3:
			return pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char;
		case 4:
			var n = e.a;
			return pablohirafuji$elm_qrcode$QRCode$LogTableException(n);
		case 5:
			return pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException;
		case 6:
			return pablohirafuji$elm_qrcode$QRCode$PolynomialModException;
		default:
			return pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow;
	}
};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte = 236;
var pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte = 17;
var pablohirafuji$elm_qrcode$QRCode$Encode$addFiller = F2(
	function (capacity, bytes) {
		var fillerLength = ((capacity / 8) | 0) - elm$core$List$length(bytes);
		var ns = elm$core$List$concat(
			A2(
				elm$core$List$repeat,
				(fillerLength / 2) | 0,
				_List_fromArray(
					[pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte, pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte])));
		return (!A2(elm$core$Basics$modBy, 2, fillerLength)) ? _Utils_ap(bytes, ns) : _Utils_ap(
			bytes,
			_Utils_ap(
				ns,
				_List_fromArray(
					[pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte])));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator = F3(
	function (capacity, bitsCount, bits) {
		return _Utils_ap(
			bits,
			_List_fromArray(
				[
					_Utils_Tuple2(
					0,
					A2(elm$core$Basics$min, 4, capacity - bitsCount))
				]));
	});
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3 = function (_n0) {
	bitsToBytes3:
	while (true) {
		var _n1 = _n0.a;
		var bits = _n1.a;
		var length = _n1.b;
		var bytes = _n0.b;
		if (length >= 8) {
			var remLength = length - 8;
			var remBits = bits & ((1 << remLength) - 1);
			var _byte = bits >> remLength;
			var $temp$_n0 = _Utils_Tuple2(
				_Utils_Tuple2(remBits, remLength),
				A2(elm$core$List$cons, _byte, bytes));
			_n0 = $temp$_n0;
			continue bitsToBytes3;
		} else {
			return _Utils_Tuple2(
				_Utils_Tuple2(bits, length),
				bytes);
		}
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2 = F2(
	function (_n0, _n1) {
		var curBits = _n0.a;
		var curLength = _n0.b;
		var _n2 = _n1.a;
		var remBits = _n2.a;
		var remLength = _n2.b;
		var bytes = _n1.b;
		var lengthSum = curLength + remLength;
		var bitsSum = curBits | (remBits << curLength);
		return pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3(
			_Utils_Tuple2(
				_Utils_Tuple2(bitsSum, lengthSum),
				bytes));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1 = F2(
	function (bits, _n0) {
		bitsToBytes1:
		while (true) {
			var _n1 = _n0.a;
			var remBits = _n1.a;
			var remLength = _n1.b;
			var bytes = _n0.b;
			if (bits.b) {
				var head = bits.a;
				var tail = bits.b;
				var $temp$bits = tail,
					$temp$_n0 = A2(
					pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2,
					head,
					_Utils_Tuple2(
						_Utils_Tuple2(remBits, remLength),
						bytes));
				bits = $temp$bits;
				_n0 = $temp$_n0;
				continue bitsToBytes1;
			} else {
				return (!remLength) ? elm$core$List$reverse(bytes) : elm$core$List$reverse(
					A2(elm$core$List$cons, remBits << (8 - remLength), bytes));
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes = function (bits) {
	return A2(
		pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1,
		bits,
		_Utils_Tuple2(
			_Utils_Tuple2(0, 0),
			_List_Nil));
};
var elm$core$String$length = _String_length;
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8 = 3;
var pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength = F2(
	function (mode, version) {
		if (version <= 9) {
			switch (mode) {
				case 0:
					return 10;
				case 1:
					return 9;
				case 2:
					return 8;
				default:
					return 8;
			}
		} else {
			if (version <= 26) {
				switch (mode) {
					case 0:
						return 12;
					case 1:
						return 11;
					case 2:
						return 16;
					default:
						return 16;
				}
			} else {
				switch (mode) {
					case 0:
						return 14;
					case 1:
						return 13;
					case 2:
						return 16;
					default:
						return 16;
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator = F2(
	function (_n0, bits) {
		var groupInfo = _n0.a0;
		var inputStr = _n0.dj;
		var mode = _n0.aw;
		var length = A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.ef);
		var charCount = (mode === 3) ? elm$core$List$length(bits) : elm$core$String$length(inputStr);
		return _Utils_Tuple2(charCount, length);
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator = function (mode) {
	switch (mode) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 4;
		default:
			return 4;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits = function (_n0) {
	var bits = _n0.a;
	var model = _n0.b;
	return _Utils_Tuple2(
		model,
		A2(
			pablohirafuji$elm_qrcode$QRCode$Encode$addFiller,
			model.a0.cn,
			pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes(
				A3(
					pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator,
					model.a0.cn,
					model.c5,
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator(model.aw),
							4),
						A2(
							elm$core$List$cons,
							A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator, model, bits),
							bits))))));
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Helpers$transpose = function (ll) {
	transpose:
	while (true) {
		if (!ll.b) {
			return _List_Nil;
		} else {
			if (!ll.a.b) {
				var xss = ll.b;
				var $temp$ll = xss;
				ll = $temp$ll;
				continue transpose;
			} else {
				var _n1 = ll.a;
				var x = _n1.a;
				var xs = _n1.b;
				var xss = ll.b;
				var tails = A2(elm$core$List$filterMap, elm$core$List$tail, xss);
				var heads = A2(elm$core$List$filterMap, elm$core$List$head, xss);
				return A2(
					elm$core$List$cons,
					A2(elm$core$List$cons, x, heads),
					pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(
						A2(elm$core$List$cons, xs, tails)));
			}
		}
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose = function (_n0) {
	var model = _n0.a;
	var dataBlocks = _n0.b;
	var ecBlocks = _n0.c;
	return _Utils_Tuple2(
		model,
		elm$core$List$concat(
			_Utils_ap(
				pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(dataBlocks),
				pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(ecBlocks))));
};
var elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var elm_community$list_extra$List$Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2(elm$core$List$drop, step, xs);
		var okayXs = elm$core$List$length(xs) > 0;
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayXs) ? A2(
			elm$core$List$cons,
			A2(elm$core$List$take, size, xs),
			A3(elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var elm_community$list_extra$List$Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return elm$core$Result$Ok(v);
		} else {
			return elm$core$Result$Err(err);
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('0', 0),
			_Utils_Tuple2('1', 1),
			_Utils_Tuple2('2', 2),
			_Utils_Tuple2('3', 3),
			_Utils_Tuple2('4', 4),
			_Utils_Tuple2('5', 5),
			_Utils_Tuple2('6', 6),
			_Utils_Tuple2('7', 7),
			_Utils_Tuple2('8', 8),
			_Utils_Tuple2('9', 9),
			_Utils_Tuple2('A', 10),
			_Utils_Tuple2('B', 11),
			_Utils_Tuple2('C', 12),
			_Utils_Tuple2('D', 13),
			_Utils_Tuple2('E', 14),
			_Utils_Tuple2('F', 15),
			_Utils_Tuple2('G', 16),
			_Utils_Tuple2('H', 17),
			_Utils_Tuple2('I', 18),
			_Utils_Tuple2('J', 19),
			_Utils_Tuple2('K', 20),
			_Utils_Tuple2('L', 21),
			_Utils_Tuple2('M', 22),
			_Utils_Tuple2('N', 23),
			_Utils_Tuple2('O', 24),
			_Utils_Tuple2('P', 25),
			_Utils_Tuple2('Q', 26),
			_Utils_Tuple2('R', 27),
			_Utils_Tuple2('S', 28),
			_Utils_Tuple2('T', 29),
			_Utils_Tuple2('U', 30),
			_Utils_Tuple2('V', 31),
			_Utils_Tuple2('W', 32),
			_Utils_Tuple2('X', 33),
			_Utils_Tuple2('Y', 34),
			_Utils_Tuple2('Z', 35),
			_Utils_Tuple2(' ', 36),
			_Utils_Tuple2('$', 37),
			_Utils_Tuple2('%', 38),
			_Utils_Tuple2('*', 39),
			_Utils_Tuple2('+', 40),
			_Utils_Tuple2('-', 41),
			_Utils_Tuple2('.', 42),
			_Utils_Tuple2('/', 43),
			_Utils_Tuple2(':', 44)
		]));
var pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar = {$: 2};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode = function (_char) {
	return A2(
		elm$core$Result$fromMaybe,
		pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar,
		A2(elm$core$Dict$get, _char, pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary = function (chars) {
	_n0$2:
	while (true) {
		if (chars.b) {
			if (chars.b.b) {
				if (!chars.b.b.b) {
					var firstChar = chars.a;
					var _n1 = chars.b;
					var secondChar = _n1.a;
					return A3(
						elm$core$Result$map2,
						F2(
							function (firstCode, secondCode) {
								return _Utils_Tuple2((firstCode * 45) + secondCode, 11);
							}),
						pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(firstChar),
						pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(secondChar));
				} else {
					break _n0$2;
				}
			} else {
				var _char = chars.a;
				return A2(
					elm$core$Result$map,
					function (a) {
						return _Utils_Tuple2(a, 6);
					},
					pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(_char));
			}
		} else {
			break _n0$2;
		}
	}
	return elm$core$Result$Err(pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar);
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode = function (str) {
	return A3(
		elm$core$List$foldr,
		elm$core$Result$map2(elm$core$List$cons),
		elm$core$Result$Ok(_List_Nil),
		A2(
			elm$core$List$map,
			pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary,
			A2(
				elm_community$list_extra$List$Extra$greedyGroupsOf,
				2,
				elm$core$String$toList(str))));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode = function (str) {
	return elm$core$Result$Ok(
		A2(
			elm$core$List$map,
			function (a) {
				return _Utils_Tuple2(
					elm$core$Char$toCode(a),
					8);
			},
			elm$core$String$toList(str)));
};
var elm$core$String$toInt = _String_toInt;
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength = function (str) {
	var _n0 = elm$core$String$length(str);
	switch (_n0) {
		case 1:
			return 4;
		case 2:
			return 7;
		default:
			return 10;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar = {$: 1};
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp = function (chars) {
	var str = elm$core$String$fromList(chars);
	return A2(
		elm$core$Result$fromMaybe,
		pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar,
		A2(
			elm$core$Maybe$map,
			function (a) {
				return _Utils_Tuple2(
					a,
					pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength(str));
			},
			elm$core$String$toInt(str)));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode = function (str) {
	return A3(
		elm$core$List$foldr,
		elm$core$Result$map2(elm$core$List$cons),
		elm$core$Result$Ok(_List_Nil),
		A2(
			elm$core$List$map,
			pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp,
			A2(
				elm_community$list_extra$List$Extra$greedyGroupsOf,
				3,
				elm$core$String$toList(str))));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63 = elm$core$Bitwise$and(63);
var pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char = {$: 3};
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp = F2(
	function (chars, list) {
		if (chars.b) {
			var _char = chars.a;
			var charsTail = chars.b;
			return A3(
				pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$utf8ToByte,
				list,
				charsTail,
				elm$core$Char$toCode(_char));
		} else {
			return elm$core$Result$Ok(
				elm$core$List$reverse(list));
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$utf8ToByte = F3(
	function (list, remainStr, charCode) {
		if (charCode < 128) {
			return A2(
				pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
				remainStr,
				A2(elm$core$List$cons, charCode, list));
		} else {
			if (charCode < 2048) {
				return A2(
					pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
					remainStr,
					A2(
						elm$core$List$cons,
						128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charCode),
						A2(elm$core$List$cons, 192 | (charCode >> 6), list)));
			} else {
				if ((charCode < 55296) || (charCode >= 57344)) {
					return A2(
						pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
						remainStr,
						A2(
							elm$core$List$cons,
							128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charCode),
							A2(
								elm$core$List$cons,
								128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charCode >> 6),
								A2(elm$core$List$cons, 224 | (charCode >> 12), list))));
				} else {
					if (remainStr.b) {
						var _char = remainStr.a;
						var strTail = remainStr.b;
						var nextCharCode = elm$core$Char$toCode(_char);
						var charC = 65536 + ((1023 & nextCharCode) | ((1023 & charCode) << 10));
						var byte4 = 128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charC);
						var byte3 = 128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charC >> 6);
						var byte2 = 128 | pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$and63(charC >> 12);
						var byte1 = 240 | (charC >> 18);
						return A2(
							pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
							strTail,
							A2(
								elm$core$List$cons,
								byte4,
								A2(
									elm$core$List$cons,
									byte3,
									A2(
										elm$core$List$cons,
										byte2,
										A2(elm$core$List$cons, byte1, list)))));
					} else {
						return elm$core$Result$Err(pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char);
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode = function (str) {
	return A2(
		elm$core$Result$map,
		elm$core$List$map(
			function (a) {
				return _Utils_Tuple2(a, 8);
			}),
		A2(
			pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encodeHelp,
			elm$core$String$toList(str),
			_List_Nil));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$encoder = function (mode) {
	switch (mode) {
		case 0:
			return pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode;
		case 1:
			return pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode;
		case 2:
			return pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode;
		default:
			return pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode;
	}
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable = elm$core$Array$fromList(
	_List_fromArray(
		[1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 1]));
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp = function (index) {
	return A2(
		elm$core$Maybe$withDefault,
		0,
		A2(
			elm$core$Array$get,
			A2(elm$core$Basics$modBy, 255, index),
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable));
};
var pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException = {$: 5};
var pablohirafuji$elm_qrcode$QRCode$Error$LogTableException = function (a) {
	return {$: 4, a: a};
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable = elm$core$Array$fromList(
	_List_fromArray(
		[0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175]));
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog = function (index) {
	return (index < 1) ? elm$core$Result$Err(
		pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index)) : A2(
		elm$core$Result$fromMaybe,
		pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index),
		A2(elm$core$Array$get, index - 1, pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable));
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset = function (_n0) {
	getOffset:
	while (true) {
		var num = _n0.a;
		var offset = _n0.b;
		if (num.b) {
			var head = num.a;
			var tail = num.b;
			if (!head) {
				var $temp$_n0 = _Utils_Tuple2(tail, offset + 1);
				_n0 = $temp$_n0;
				continue getOffset;
			} else {
				return offset;
			}
		} else {
			return offset;
		}
	}
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial = F2(
	function (num, shift) {
		var offset = pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset(
			_Utils_Tuple2(num, 0));
		var numArray = elm$core$Array$fromList(num);
		return A2(
			elm$core$Array$initialize,
			(elm$core$List$length(num) - offset) + shift,
			function (index) {
				return A2(
					elm$core$Maybe$withDefault,
					0,
					A2(elm$core$Array$get, index + offset, numArray));
			});
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply = F2(
	function (poly1, poly2) {
		var valuesArray = A2(
			elm$core$List$indexedMap,
			F2(
				function (index1, value1) {
					return A2(
						elm$core$List$indexedMap,
						F2(
							function (index2, value2) {
								return _Utils_Tuple3(index1 + index2, value1, value2);
							}),
						elm$core$Array$toList(poly2));
				}),
			elm$core$Array$toList(poly1));
		var process__ = F3(
			function (indexSum, num_, exp) {
				return A2(
					elm$core$Result$fromMaybe,
					pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException,
					A2(
						elm$core$Maybe$map,
						elm$core$Bitwise$xor(exp),
						A2(elm$core$Array$get, indexSum, num_)));
			});
		var process_ = F2(
			function (_n0, num_) {
				var indexSum = _n0.a;
				var value1 = _n0.b;
				var value2 = _n0.c;
				return A2(
					elm$core$Result$map,
					function (r) {
						return A3(elm$core$Array$set, indexSum, r, num_);
					},
					A2(
						elm$core$Result$andThen,
						A2(process__, indexSum, num_),
						A2(
							elm$core$Result$map,
							pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
							A3(
								elm$core$Result$map2,
								elm$core$Basics$add,
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value1),
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
			});
		var process = F2(
			function (args, numResult) {
				return A2(
					elm$core$Result$andThen,
					process_(args),
					numResult);
			});
		var num = A2(
			elm$core$Array$initialize,
			(elm$core$Array$length(poly1) + elm$core$Array$length(poly2)) - 1,
			elm$core$Basics$always(0));
		return A2(
			elm$core$Result$map,
			function (a) {
				return A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
			},
			A2(
				elm$core$Result$map,
				elm$core$Array$toList,
				A3(
					elm$core$List$foldl,
					process,
					elm$core$Result$Ok(num),
					elm$core$List$concat(valuesArray))));
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial = function (ecLength) {
	var generate = F2(
		function (count, polyResult) {
			generate:
			while (true) {
				if (_Utils_cmp(count, ecLength) < 0) {
					var $temp$count = count + 1,
						$temp$polyResult = A2(
						elm$core$Result$andThen,
						function (a) {
							return A2(
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply,
								a,
								A2(
									pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
									_List_fromArray(
										[
											1,
											pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp(count)
										]),
									0));
						},
						polyResult);
					count = $temp$count;
					polyResult = $temp$polyResult;
					continue generate;
				} else {
					return polyResult;
				}
			}
		});
	return A2(
		generate,
		0,
		elm$core$Result$Ok(
			A2(
				pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
				_List_fromArray(
					[1]),
				0)));
};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___ = F2(
	function (ecLength, modPoly) {
		return elm$core$Array$toList(
			A2(
				elm$core$Array$initialize,
				ecLength,
				function (index) {
					var modIndex = (index + elm$core$Array$length(modPoly)) - ecLength;
					return (modIndex >= 0) ? A2(
						elm$core$Maybe$withDefault,
						0,
						A2(elm$core$Array$get, modIndex, modPoly)) : 0;
				}));
	});
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Array$foldl = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldl,
			func,
			A3(elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			x: _List_Nil,
			i: 0,
			n: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.i * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						x: A2(elm$core$List$cons, mappedLeaf, builder.x),
						i: builder.i + 1,
						n: builder.n
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException = {$: 6};
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod = F2(
	function (poly1, poly2) {
		if ((elm$core$Array$length(poly1) - elm$core$Array$length(poly2)) < 0) {
			return elm$core$Result$Ok(poly1);
		} else {
			var helper_ = F3(
				function (index2, poly1_, exp) {
					return A2(
						elm$core$Result$fromMaybe,
						pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2(
							elm$core$Maybe$map,
							elm$core$Bitwise$xor(exp),
							A2(elm$core$Array$get, index2, poly1_)));
				});
			var getHead = function (poly) {
				return A2(
					elm$core$Result$andThen,
					pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog,
					A2(
						elm$core$Result$fromMaybe,
						pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2(elm$core$Array$get, 0, poly)));
			};
			var ratio = A3(
				elm$core$Result$map2,
				elm$core$Basics$sub,
				getHead(poly1),
				getHead(poly2));
			var helper = F2(
				function (_n0, poly1_) {
					var index2 = _n0.a;
					var value2 = _n0.b;
					return A2(
						elm$core$Result$map,
						function (r) {
							return A3(elm$core$Array$set, index2, r, poly1_);
						},
						A2(
							elm$core$Result$andThen,
							A2(helper_, index2, poly1_),
							A2(
								elm$core$Result$map,
								pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
								A3(
									elm$core$Result$map2,
									elm$core$Basics$add,
									ratio,
									pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
				});
			var numFold = F2(
				function (args, poly1Result) {
					return A2(
						elm$core$Result$andThen,
						helper(args),
						poly1Result);
				});
			var numResult = A3(
				elm$core$Array$foldl,
				numFold,
				elm$core$Result$Ok(poly1),
				A2(
					elm$core$Array$indexedMap,
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}),
					poly2));
			return A2(
				elm$core$Result$andThen,
				function (a) {
					return A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod, a, poly2);
				},
				A2(
					elm$core$Result$map,
					function (a) {
						return A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
					},
					A2(elm$core$Result$map, elm$core$Array$toList, numResult)));
		}
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__ = F2(
	function (rsPoly, dataCodewords) {
		return A2(
			elm$core$Result$map,
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___(
				elm$core$Array$length(rsPoly) - 1),
			A2(
				pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod,
				A2(
					pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
					dataCodewords,
					elm$core$Array$length(rsPoly) - 1),
				rsPoly));
	});
var pablohirafuji$elm_qrcode$QRCode$Helpers$listResult = F3(
	function (fun, listb, lista) {
		if (lista.b) {
			var head = lista.a;
			var tail = lista.b;
			return A2(
				elm$core$Result$andThen,
				function (a) {
					return A3(pablohirafuji$elm_qrcode$QRCode$Helpers$listResult, fun, a, tail);
				},
				A2(
					elm$core$Result$map,
					function (r) {
						return A2(elm$core$List$cons, r, listb);
					},
					fun(head)));
		} else {
			return elm$core$Result$Ok(
				elm$core$List$reverse(listb));
		}
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_ = F2(
	function (byteBlocks, rsPoly) {
		return A3(
			pablohirafuji$elm_qrcode$QRCode$Helpers$listResult,
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__(rsPoly),
			_List_Nil,
			byteBlocks);
	});
var pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get = F2(
	function (ecPerBlock, byteBlocks) {
		return A2(
			elm$core$Result$andThen,
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_(byteBlocks),
			pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial(ecPerBlock));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection = function (_n0) {
	var model = _n0.a;
	var dataBlocks = _n0.b;
	return A2(
		elm$core$Result$map,
		function (c) {
			return _Utils_Tuple3(model, dataBlocks, c);
		},
		A2(pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get, model.a0.g3, dataBlocks));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric = 1;
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte = 2;
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric = 0;
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {hs: index, hF: match, hM: number, iq: submatches};
	});
var elm$regex$Regex$contains = _Regex_contains;
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric = A2(
	elm$regex$Regex$fromStringWith,
	{eu: false, fc: false},
	'^[0-9A-Z $%*+\\-.\\/:]+$');
var pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid = function (input) {
	return A2(
		elm$core$Maybe$withDefault,
		false,
		A2(
			elm$core$Maybe$map,
			function (r) {
				return A2(elm$regex$Regex$contains, r, input);
			},
			pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit = A2(
	elm$regex$Regex$fromStringWith,
	{eu: false, fc: false},
	'^[\\u0000-\\u00ff]+$');
var pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid = function (input) {
	return A2(
		elm$core$Maybe$withDefault,
		false,
		A2(
			elm$core$Maybe$map,
			function (r) {
				return A2(elm$regex$Regex$contains, r, input);
			},
			pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber = A2(
	elm$regex$Regex$fromStringWith,
	{eu: false, fc: false},
	'^[0-9]+$');
var pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid = function (input) {
	return A2(
		elm$core$Maybe$withDefault,
		false,
		A2(
			elm$core$Maybe$map,
			function (r) {
				return A2(elm$regex$Regex$contains, r, input);
			},
			pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber));
};
var pablohirafuji$elm_qrcode$QRCode$Encode$selectMode = function (input) {
	return pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid(input) ? 0 : (pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid(input) ? 1 : (pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid(input) ? 2 : 3));
};
var elm$core$List$sortBy = _List_sortBy;
var pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity = F3(
	function (mode, dataLength, _n0) {
		var version = _n0.ef;
		var capacity = _n0.cn;
		return _Utils_cmp(
			A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, version) + dataLength,
			capacity) < 1;
	});
var pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow = {$: 7};
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity = function (_n0) {
	var blockCount = _n0.a;
	var bytePerBlock = _n0.b;
	return blockCount * bytePerBlock;
};
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity = F2(
	function (group1, maybeGroup2) {
		if (!maybeGroup2.$) {
			var block2 = maybeGroup2.a;
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1) + pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(block2);
		} else {
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1);
		}
	});
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo = F4(
	function (version, ecPerBlock, group1, maybeGroup2) {
		return {
			cn: A2(pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity, group1, maybeGroup2) * 8,
			g3: ecPerBlock,
			eO: group1,
			hI: maybeGroup2,
			ef: version
		};
	});
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		17,
		_Utils_Tuple2(1, 9),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		28,
		_Utils_Tuple2(1, 16),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		22,
		_Utils_Tuple2(2, 13),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		16,
		_Utils_Tuple2(4, 9),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		22,
		_Utils_Tuple2(2, 11),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 12))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		28,
		_Utils_Tuple2(4, 15),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		26,
		_Utils_Tuple2(4, 13),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 14))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		26,
		_Utils_Tuple2(4, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		24,
		_Utils_Tuple2(4, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		28,
		_Utils_Tuple2(6, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		24,
		_Utils_Tuple2(3, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(8, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		28,
		_Utils_Tuple2(7, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(12, 11),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 12))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(11, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(11, 12),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 13))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		30,
		_Utils_Tuple2(3, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(2, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(17, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(2, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(19, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(9, 13),
		elm$core$Maybe$Just(
			_Utils_Tuple2(16, 14))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(15, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		30,
		_Utils_Tuple2(19, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		24,
		_Utils_Tuple2(34, 13),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(16, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(30, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(22, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		30,
		_Utils_Tuple2(33, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(12, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(11, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(31, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(19, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(26, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(23, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(25, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(23, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(19, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(35, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(11, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(59, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(22, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(41, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(2, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(64, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(24, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(42, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(32, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(10, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(67, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(20, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(61, 16)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		7,
		_Utils_Tuple2(1, 19),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		10,
		_Utils_Tuple2(1, 34),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		15,
		_Utils_Tuple2(1, 55),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		20,
		_Utils_Tuple2(1, 80),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		26,
		_Utils_Tuple2(1, 108),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		18,
		_Utils_Tuple2(2, 68),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		20,
		_Utils_Tuple2(2, 78),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		24,
		_Utils_Tuple2(2, 97),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		30,
		_Utils_Tuple2(2, 116),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		18,
		_Utils_Tuple2(2, 68),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 69))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		20,
		_Utils_Tuple2(4, 81),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		24,
		_Utils_Tuple2(2, 92),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 93))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		26,
		_Utils_Tuple2(4, 107),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		30,
		_Utils_Tuple2(3, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		22,
		_Utils_Tuple2(5, 87),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 88))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(5, 98),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 99))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 107),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		30,
		_Utils_Tuple2(5, 120),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 121))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		28,
		_Utils_Tuple2(3, 113),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 114))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(3, 107),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(4, 116),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 117))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(2, 111),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 112))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(4, 121),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 122))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(6, 117),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		26,
		_Utils_Tuple2(8, 106),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 107))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(10, 114),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 115))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 122),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(3, 117),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 118))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(7, 116),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 117))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(5, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(13, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(3, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(17, 115),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(17, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(13, 115),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 116))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(12, 121),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 122))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(6, 121),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 122))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(17, 122),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(4, 122),
		elm$core$Maybe$Just(
			_Utils_Tuple2(18, 123))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(20, 117),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(19, 118),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 119)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		10,
		_Utils_Tuple2(1, 16),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		16,
		_Utils_Tuple2(1, 28),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		26,
		_Utils_Tuple2(1, 44),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		18,
		_Utils_Tuple2(2, 32),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		24,
		_Utils_Tuple2(2, 43),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		16,
		_Utils_Tuple2(4, 27),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(4, 31),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(2, 38),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 39))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		22,
		_Utils_Tuple2(3, 36),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		26,
		_Utils_Tuple2(4, 43),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 44))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		30,
		_Utils_Tuple2(1, 50),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 51))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		22,
		_Utils_Tuple2(6, 36),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(8, 37),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 38))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(4, 40),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 41))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(5, 41),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 42))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		28,
		_Utils_Tuple2(7, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(10, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		26,
		_Utils_Tuple2(9, 43),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 44))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(3, 44),
		elm$core$Maybe$Just(
			_Utils_Tuple2(11, 45))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		26,
		_Utils_Tuple2(3, 41),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 42))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		26,
		_Utils_Tuple2(17, 42),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(17, 46),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		28,
		_Utils_Tuple2(4, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		28,
		_Utils_Tuple2(6, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		28,
		_Utils_Tuple2(8, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(13, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(19, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		28,
		_Utils_Tuple2(22, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		28,
		_Utils_Tuple2(3, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(23, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		28,
		_Utils_Tuple2(21, 45),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 46))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		28,
		_Utils_Tuple2(19, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		28,
		_Utils_Tuple2(2, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(29, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		28,
		_Utils_Tuple2(10, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		28,
		_Utils_Tuple2(14, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(21, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		28,
		_Utils_Tuple2(14, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		28,
		_Utils_Tuple2(12, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(26, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		28,
		_Utils_Tuple2(6, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(34, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		28,
		_Utils_Tuple2(29, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		28,
		_Utils_Tuple2(13, 46),
		elm$core$Maybe$Just(
			_Utils_Tuple2(32, 47))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		28,
		_Utils_Tuple2(40, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 48))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		28,
		_Utils_Tuple2(18, 47),
		elm$core$Maybe$Just(
			_Utils_Tuple2(31, 48)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ = _List_fromArray(
	[
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		13,
		_Utils_Tuple2(1, 13),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		22,
		_Utils_Tuple2(1, 22),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		18,
		_Utils_Tuple2(2, 17),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		26,
		_Utils_Tuple2(2, 24),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		18,
		_Utils_Tuple2(2, 15),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		24,
		_Utils_Tuple2(4, 19),
		elm$core$Maybe$Nothing),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(2, 14),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(4, 18),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 19))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		20,
		_Utils_Tuple2(4, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		24,
		_Utils_Tuple2(6, 19),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		28,
		_Utils_Tuple2(4, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		26,
		_Utils_Tuple2(4, 20),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 21))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		24,
		_Utils_Tuple2(8, 20),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 21))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		20,
		_Utils_Tuple2(11, 16),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 17))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		30,
		_Utils_Tuple2(5, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(15, 19),
		elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(15, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(17, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(17, 21),
		elm$core$Maybe$Just(
			_Utils_Tuple2(4, 22))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		30,
		_Utils_Tuple2(15, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(5, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(17, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		30,
		_Utils_Tuple2(7, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(11, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(11, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(7, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(28, 22),
		elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 23),
		elm$core$Maybe$Just(
			_Utils_Tuple2(26, 24))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(4, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(31, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(1, 23),
		elm$core$Maybe$Just(
			_Utils_Tuple2(37, 24))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(15, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(25, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(42, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(1, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(10, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(35, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(29, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(19, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(44, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(39, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(46, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(49, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(48, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(43, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(34, 24),
		elm$core$Maybe$Just(
			_Utils_Tuple2(34, 25)))
	]);
var pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData = function (ecLevel) {
	switch (ecLevel) {
		case 0:
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL;
		case 1:
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM;
		case 2:
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ;
		default:
			return pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$getVersion = F3(
	function (ecLevel, mode, dataLength) {
		return A2(
			elm$core$Result$fromMaybe,
			pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow,
			elm$core$List$head(
				A2(
					elm$core$List$sortBy,
					function ($) {
						return $.cn;
					},
					A2(
						elm$core$List$filter,
						A2(pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity, mode, dataLength),
						pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData(ecLevel)))));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel = F5(
	function (inputStr, ecLevel, mode, partialBitsCount, groupInfo) {
		return {
			c5: partialBitsCount + A2(pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.ef),
			eG: ecLevel,
			a0: groupInfo,
			dj: inputStr,
			aw: mode
		};
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion = F4(
	function (inputStr, ecLevel, mode, encodedStr) {
		var partialBitsCount = 4 + A3(
			elm$core$List$foldl,
			F2(
				function (a, b) {
					return a.b + b;
				}),
			0,
			encodedStr);
		return A2(
			elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(encodedStr, b);
			},
			A2(
				elm$core$Result$map,
				A4(pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel, inputStr, ecLevel, mode, partialBitsCount),
				A3(pablohirafuji$elm_qrcode$QRCode$Encode$getVersion, ecLevel, mode, partialBitsCount)));
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$breakList = F3(
	function (checkFinish, _n0, _n1) {
		breakList:
		while (true) {
			var times = _n0.a;
			var itemCount = _n0.b;
			var byteList = _n1.a;
			var progress = _n1.b;
			if (times > 0) {
				var remainList = A2(elm$core$List$drop, itemCount, byteList);
				var block = A2(elm$core$List$take, itemCount, byteList);
				var $temp$checkFinish = checkFinish,
					$temp$_n0 = _Utils_Tuple2(times - 1, itemCount),
					$temp$_n1 = _Utils_Tuple2(
					remainList,
					A2(elm$core$List$cons, block, progress));
				checkFinish = $temp$checkFinish;
				_n0 = $temp$_n0;
				_n1 = $temp$_n1;
				continue breakList;
			} else {
				if (checkFinish && (elm$core$List$length(byteList) > 0)) {
					return elm$core$Result$Err(pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow);
				} else {
					return elm$core$Result$Ok(
						_Utils_Tuple2(byteList, progress));
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks = function (_n0) {
	var model = _n0.a;
	var groupInfo = model.a0;
	var byteList = _n0.b;
	var _n1 = groupInfo.hI;
	if (!_n1.$) {
		var group2 = _n1.a;
		return A2(
			elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				elm$core$Result$map,
				A2(elm$core$Basics$composeR, elm$core$Tuple$second, elm$core$List$reverse),
				A2(
					elm$core$Result$andThen,
					A2(pablohirafuji$elm_qrcode$QRCode$Encode$breakList, true, group2),
					A3(
						pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
						false,
						groupInfo.eO,
						_Utils_Tuple2(byteList, _List_Nil)))));
	} else {
		return A2(
			elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				elm$core$Result$map,
				A2(elm$core$Basics$composeR, elm$core$Tuple$second, elm$core$List$reverse),
				A3(
					pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
					true,
					groupInfo.eO,
					_Utils_Tuple2(byteList, _List_Nil))));
	}
};
var pablohirafuji$elm_qrcode$QRCode$Encode$encode = F2(
	function (inputStr, ecLevel) {
		var mode = pablohirafuji$elm_qrcode$QRCode$Encode$selectMode(inputStr);
		return A2(
			elm$core$Result$map,
			pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose,
			A2(
				elm$core$Result$andThen,
				pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection,
				A2(
					elm$core$Result$andThen,
					pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks,
					A2(
						elm$core$Result$map,
						pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits,
						A2(
							elm$core$Result$andThen,
							A3(pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion, inputStr, ecLevel, mode),
							A2(pablohirafuji$elm_qrcode$QRCode$Encode$encoder, mode, inputStr))))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex = F3(
	function (size, row, col) {
		return (size * row) + col;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy = F4(
	function (row, col, size, matrix) {
		var _n0 = A2(
			elm$core$Array$get,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			matrix);
		if ((!_n0.$) && (!_n0.a.$)) {
			return true;
		} else {
			return false;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule = function (placement) {
	var row = placement.aj;
	var col = placement.gS;
	var isRight = placement.as;
	var isUp = placement.bW;
	return isRight ? _Utils_update(
		placement,
		{gS: col - 1, as: false}) : (isUp ? _Utils_update(
		placement,
		{gS: col + 1, as: true, aj: row - 1}) : _Utils_update(
		placement,
		{gS: col + 1, as: true, aj: row + 1}));
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor = F2(
	function (_byte, offset) {
		return (1 & (_byte >> (7 - offset))) === 1;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule = F3(
	function (_n0, _byte, offset) {
		var size = _n0.d6;
		var row = _n0.aj;
		var col = _n0.gS;
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			elm$core$Maybe$Just(
				_Utils_Tuple2(
					false,
					A2(pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor, _byte, offset))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule = F4(
	function (placement, bytes, offset, matrix) {
		addDataModule:
		while (true) {
			var size = placement.d6;
			var row = placement.aj;
			var col = placement.gS;
			if (!bytes.b) {
				return matrix;
			} else {
				var head = bytes.a;
				var tail = bytes.b;
				if (offset >= 8) {
					var $temp$placement = placement,
						$temp$bytes = tail,
						$temp$offset = 0,
						$temp$matrix = matrix;
					placement = $temp$placement;
					bytes = $temp$bytes;
					offset = $temp$offset;
					matrix = $temp$matrix;
					continue addDataModule;
				} else {
					if (col === 6) {
						var $temp$placement = _Utils_update(
							placement,
							{gS: col - 1, as: true}),
							$temp$bytes = bytes,
							$temp$offset = offset,
							$temp$matrix = matrix;
						placement = $temp$placement;
						bytes = $temp$bytes;
						offset = $temp$offset;
						matrix = $temp$matrix;
						continue addDataModule;
					} else {
						if (row < 0) {
							var $temp$placement = _Utils_update(
								placement,
								{gS: col - 2, as: true, bW: false, aj: 0}),
								$temp$bytes = bytes,
								$temp$offset = offset,
								$temp$matrix = matrix;
							placement = $temp$placement;
							bytes = $temp$bytes;
							offset = $temp$offset;
							matrix = $temp$matrix;
							continue addDataModule;
						} else {
							if (_Utils_cmp(row, size) > -1) {
								var $temp$placement = _Utils_update(
									placement,
									{gS: col - 2, as: true, bW: true, aj: size - 1}),
									$temp$bytes = bytes,
									$temp$offset = offset,
									$temp$matrix = matrix;
								placement = $temp$placement;
								bytes = $temp$bytes;
								offset = $temp$offset;
								matrix = $temp$matrix;
								continue addDataModule;
							} else {
								if (A4(pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy, row, col, size, matrix)) {
									var $temp$placement = pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset,
										$temp$matrix = matrix;
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								} else {
									var $temp$placement = pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset + 1,
										$temp$matrix = A4(pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule, placement, head, offset, matrix);
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								}
							}
						}
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement = function (size) {
	return {gS: size + 1, as: true, bW: true, aj: size + 1, d6: size};
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$addData = F3(
	function (size, bytes, matrix) {
		return A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule,
			pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement(size),
			bytes,
			0,
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound = {$: 0};
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData = elm$core$Array$fromList(
	_List_fromArray(
		[
			_List_Nil,
			_List_fromArray(
			[6, 18]),
			_List_fromArray(
			[6, 22]),
			_List_fromArray(
			[6, 26]),
			_List_fromArray(
			[6, 30]),
			_List_fromArray(
			[6, 34]),
			_List_fromArray(
			[6, 22, 38]),
			_List_fromArray(
			[6, 24, 42]),
			_List_fromArray(
			[6, 26, 46]),
			_List_fromArray(
			[6, 28, 50]),
			_List_fromArray(
			[6, 30, 54]),
			_List_fromArray(
			[6, 32, 58]),
			_List_fromArray(
			[6, 34, 62]),
			_List_fromArray(
			[6, 26, 46, 66]),
			_List_fromArray(
			[6, 26, 48, 70]),
			_List_fromArray(
			[6, 26, 50, 74]),
			_List_fromArray(
			[6, 30, 54, 78]),
			_List_fromArray(
			[6, 30, 56, 82]),
			_List_fromArray(
			[6, 30, 58, 86]),
			_List_fromArray(
			[6, 34, 62, 90]),
			_List_fromArray(
			[6, 28, 50, 72, 94]),
			_List_fromArray(
			[6, 26, 50, 74, 98]),
			_List_fromArray(
			[6, 30, 54, 78, 102]),
			_List_fromArray(
			[6, 28, 54, 80, 106]),
			_List_fromArray(
			[6, 32, 58, 84, 110]),
			_List_fromArray(
			[6, 30, 58, 86, 114]),
			_List_fromArray(
			[6, 34, 62, 90, 118]),
			_List_fromArray(
			[6, 26, 50, 74, 98, 122]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126]),
			_List_fromArray(
			[6, 26, 52, 78, 104, 130]),
			_List_fromArray(
			[6, 30, 56, 82, 108, 134]),
			_List_fromArray(
			[6, 34, 60, 86, 112, 138]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142]),
			_List_fromArray(
			[6, 34, 62, 90, 118, 146]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126, 150]),
			_List_fromArray(
			[6, 24, 50, 76, 102, 128, 154]),
			_List_fromArray(
			[6, 28, 54, 80, 106, 132, 158]),
			_List_fromArray(
			[6, 32, 58, 84, 110, 136, 162]),
			_List_fromArray(
			[6, 26, 54, 82, 110, 138, 166]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142, 170])
		]));
var pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord = F2(
	function (rows, cols) {
		return A3(
			elm$core$List$foldl,
			F2(
				function (row, list) {
					return A3(
						elm$core$List$foldl,
						F2(
							function (col, list_) {
								return A2(
									elm$core$List$cons,
									_Utils_Tuple2(row, col),
									list_);
							}),
						list,
						cols);
				}),
			_List_Nil,
			rows);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign = F2(
	function (size, _n0) {
		var row = _n0.a;
		var col = _n0.b;
		return ((row > 10) || ((10 < col) && (_Utils_cmp(col, size - 10) < 0))) && ((_Utils_cmp(row, size - 10) < 0) || (col > 10));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange = A2(elm$core$List$range, -2, 2);
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor = F2(
	function (row, col) {
		return (_Utils_eq(row, -2) || ((row === 2) || (_Utils_eq(col, -2) || ((col === 2) || ((!row) && (!col)))))) ? elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule = F4(
	function (size, rowPos, colPos, _n0) {
		var row = _n0.a;
		var col = _n0.b;
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row + rowPos, col + colPos),
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor, row, col));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment = F3(
	function (size, _n0, matrix) {
		var row = _n0.a;
		var col = _n0.b;
		return A3(
			elm$core$List$foldl,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule, size, row, col),
			matrix,
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange, pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments = F3(
	function (size, locations, matrix) {
		return A3(
			elm$core$List$foldl,
			pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment(size),
			matrix,
			A2(
				elm$core$List$filter,
				pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign(size),
				A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, locations, locations)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern = F3(
	function (version, size, matrix) {
		return A2(
			elm$core$Result$map,
			function (a) {
				return A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments, size, a, matrix);
			},
			A2(
				elm$core$Result$fromMaybe,
				pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound,
				A2(elm$core$Array$get, version - 1, pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule = F2(
	function (version, size) {
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, (4 * version) + 9, 8),
			elm$core$Maybe$Just(
				_Utils_Tuple2(true, true)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange = A2(elm$core$List$range, 0, 8);
var pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor = F2(
	function (row, col) {
		return ((1 <= row) && ((row <= 7) && ((col === 1) || (col === 7)))) || (((1 <= col) && ((col <= 7) && ((row === 1) || (row === 7)))) || ((3 <= row) && ((row <= 5) && ((3 <= col) && (col <= 5)))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder = F5(
	function (size, rowOffset, colOffset, _n0, matrix) {
		var row = _n0.a;
		var col = _n0.b;
		var finalRow = row + rowOffset;
		var finalCol = col + colOffset;
		return ((finalRow < 0) || ((finalCol < 0) || ((_Utils_cmp(finalRow, size) > -1) || (_Utils_cmp(finalCol, size) > -1)))) ? matrix : A3(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, finalRow, finalCol),
			elm$core$Maybe$Just(
				_Utils_Tuple2(
					true,
					A2(pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor, row, col))),
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern = F4(
	function (size, rowOffset, colOffset, matrix) {
		return A3(
			elm$core$List$foldl,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder, size, rowOffset, colOffset),
			matrix,
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange, pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor = F2(
	function (maybeModule, isChange) {
		if (isChange) {
			if ((!maybeModule.$) && (!maybeModule.a.a)) {
				var _n1 = maybeModule.a;
				var isDark = _n1.b;
				return elm$core$Maybe$Just(
					_Utils_Tuple2(false, !isDark));
			} else {
				return maybeModule;
			}
		} else {
			return maybeModule;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord = F2(
	function (size, index) {
		return _Utils_Tuple2(
			(index / size) | 0,
			A2(elm$core$Basics$modBy, size, index));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction = F4(
	function (_function, size, index, maybeModule) {
		return A2(
			pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor,
			maybeModule,
			_function(
				A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord, size, index)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction = function (mask) {
	switch (mask) {
		case 0:
			return function (_n1) {
				var row = _n1.a;
				var col = _n1.b;
				return !A2(elm$core$Basics$modBy, 2, row + col);
			};
		case 1:
			return function (_n2) {
				var row = _n2.a;
				return !A2(elm$core$Basics$modBy, 2, row);
			};
		case 2:
			return function (_n3) {
				var col = _n3.b;
				return !A2(elm$core$Basics$modBy, 3, col);
			};
		case 3:
			return function (_n4) {
				var row = _n4.a;
				var col = _n4.b;
				return !A2(elm$core$Basics$modBy, 3, row + col);
			};
		case 4:
			return function (_n5) {
				var row = _n5.a;
				var col = _n5.b;
				return !A2(
					elm$core$Basics$modBy,
					2,
					elm$core$Basics$floor(row / 2) + elm$core$Basics$floor(col / 3));
			};
		case 5:
			return function (_n6) {
				var row = _n6.a;
				var col = _n6.b;
				return !(A2(elm$core$Basics$modBy, 2, row * col) + A2(elm$core$Basics$modBy, 3, row * col));
			};
		case 6:
			return function (_n7) {
				var row = _n7.a;
				var col = _n7.b;
				return !A2(
					elm$core$Basics$modBy,
					2,
					A2(elm$core$Basics$modBy, 2, row * col) + A2(elm$core$Basics$modBy, 3, row * col));
			};
		default:
			return function (_n8) {
				var row = _n8.a;
				var col = _n8.b;
				return !A2(
					elm$core$Basics$modBy,
					2,
					A2(elm$core$Basics$modBy, 3, row * col) + A2(elm$core$Basics$modBy, 2, row + col));
			};
	}
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask = F3(
	function (size, mask, matrix) {
		return A2(
			elm$core$Array$indexedMap,
			A2(
				pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction,
				pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction(mask),
				size),
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$breakList = F3(
	function (width, list, acc) {
		breakList:
		while (true) {
			if (!list.b) {
				return elm$core$List$reverse(acc);
			} else {
				var $temp$width = width,
					$temp$list = A2(elm$core$List$drop, width, list),
					$temp$acc = A2(
					elm$core$List$cons,
					A2(elm$core$List$take, width, list),
					acc);
				width = $temp$width;
				list = $temp$list;
				acc = $temp$acc;
				continue breakList;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule = A2(
	elm$core$Basics$composeR,
	elm$core$Maybe$map(elm$core$Tuple$second),
	elm$core$Maybe$withDefault(false));
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_ = F2(
	function (simplifiedList, _n0) {
		rule1Score_:
		while (true) {
			var last = _n0.a;
			var partialScore = _n0.b;
			var score = _n0.c;
			if (!simplifiedList.b) {
				return (partialScore >= 5) ? ((score + partialScore) - 2) : score;
			} else {
				var head = simplifiedList.a;
				var tail = simplifiedList.b;
				if (_Utils_eq(last, head)) {
					var $temp$simplifiedList = tail,
						$temp$_n0 = _Utils_Tuple3(last, partialScore + 1, score);
					simplifiedList = $temp$simplifiedList;
					_n0 = $temp$_n0;
					continue rule1Score_;
				} else {
					if (partialScore >= 5) {
						var $temp$simplifiedList = tail,
							$temp$_n0 = _Utils_Tuple3(head, 0, (score + partialScore) - 2);
						simplifiedList = $temp$simplifiedList;
						_n0 = $temp$_n0;
						continue rule1Score_;
					} else {
						var $temp$simplifiedList = tail,
							$temp$_n0 = _Utils_Tuple3(head, 0, score);
						simplifiedList = $temp$simplifiedList;
						_n0 = $temp$_n0;
						continue rule1Score_;
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score = A2(
	elm$core$Basics$composeR,
	elm$core$List$map(
		function (a) {
			return A2(
				pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_,
				a,
				_Utils_Tuple3(false, 0, 0));
		}),
	elm$core$List$sum);
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_ = F4(
	function (row1, row2, maybeLast, score) {
		rule2Score_:
		while (true) {
			if (!row1.b) {
				return score;
			} else {
				var head = row1.a;
				var tail = row1.b;
				if (!row2.b) {
					return score;
				} else {
					var head2 = row2.a;
					var tail2 = row2.b;
					if (_Utils_eq(head, head2)) {
						if (_Utils_eq(
							elm$core$Maybe$Just(head),
							maybeLast)) {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = elm$core$Maybe$Just(head),
								$temp$score = score + 3;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						} else {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = elm$core$Maybe$Just(head),
								$temp$score = score;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						}
					} else {
						var $temp$row1 = tail,
							$temp$row2 = tail2,
							$temp$maybeLast = elm$core$Maybe$Nothing,
							$temp$score = score;
						row1 = $temp$row1;
						row2 = $temp$row2;
						maybeLast = $temp$maybeLast;
						score = $temp$score;
						continue rule2Score_;
					}
				}
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score = F2(
	function (list, score) {
		rule2Score:
		while (true) {
			if (list.b && list.b.b) {
				var head1 = list.a;
				var _n1 = list.b;
				var head2 = _n1.a;
				var tail = _n1.b;
				var $temp$list = tail,
					$temp$score = score + A4(pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_, head1, head2, elm$core$Maybe$Nothing, 0);
				list = $temp$list;
				score = $temp$score;
				continue rule2Score;
			} else {
				return score;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_ = F2(
	function (simplifiedList, score) {
		rule3Score_:
		while (true) {
			_n0$3:
			while (true) {
				if (!simplifiedList.b) {
					return score;
				} else {
					if (!simplifiedList.a) {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && (!simplifiedList.b.b.a)) && simplifiedList.b.b.b.b) && (!simplifiedList.b.b.b.a)) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.b.b.a) {
							var _n1 = simplifiedList.b;
							var _n2 = _n1.b;
							var _n3 = _n2.b;
							var _n4 = _n3.b;
							var _n5 = _n4.b;
							var _n6 = _n5.b;
							var _n7 = _n6.b;
							var _n8 = _n7.b;
							var _n9 = _n8.b;
							var _n10 = _n9.b;
							var tail = _n10.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _n0$3;
						}
					} else {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && simplifiedList.b.b.a) && simplifiedList.b.b.b.b) && simplifiedList.b.b.b.a) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.b.a)) {
							var _n11 = simplifiedList.b;
							var _n12 = _n11.b;
							var _n13 = _n12.b;
							var _n14 = _n13.b;
							var _n15 = _n14.b;
							var _n16 = _n15.b;
							var _n17 = _n16.b;
							var _n18 = _n17.b;
							var _n19 = _n18.b;
							var _n20 = _n19.b;
							var tail = _n20.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _n0$3;
						}
					}
				}
			}
			var head = simplifiedList.a;
			var tail = simplifiedList.b;
			var $temp$simplifiedList = tail,
				$temp$score = score;
			simplifiedList = $temp$simplifiedList;
			score = $temp$score;
			continue rule3Score_;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score = A2(elm$core$List$foldl, pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_, 0);
var pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score = F2(
	function (size, simplifiedList) {
		var moduleCount = size * size;
		var darkCount = elm$core$List$length(
			A2(elm$core$List$filter, elm$core$Basics$identity, simplifiedList));
		var darkPerc = elm$core$Basics$round((100 * darkCount) / moduleCount);
		var remOf5 = darkPerc % 5;
		var nextMult5 = elm$core$Basics$round(
			elm$core$Basics$abs((darkPerc + (5 - remOf5)) - 50) / 5);
		var prevMult5 = elm$core$Basics$round(
			elm$core$Basics$abs((darkPerc - remOf5) - 50) / 5);
		return A2(elm$core$Basics$min, prevMult5, nextMult5) * 10;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore = F2(
	function (size, matrix) {
		var list = A2(
			elm$core$List$map,
			pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule,
			elm$core$Array$toList(matrix));
		var rowList = A3(pablohirafuji$elm_qrcode$QRCode$Matrix$breakList, size, list, _List_Nil);
		var transposedRowList = pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(rowList);
		return function (b) {
			return _Utils_Tuple2(rowList, b);
		}(
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score, size, list) + (pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(transposedRowList) + (pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(rowList) + (A2(pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score, rowList, 0) + (pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(transposedRowList) + pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(rowList))))));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt = function (ecLevel) {
	switch (ecLevel) {
		case 0:
			return 1;
		case 1:
			return 0;
		case 2:
			return 3;
		default:
			return 2;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit = function (_int) {
	var helper = F2(
		function (digit, int_) {
			helper:
			while (true) {
				if (int_) {
					var $temp$digit = digit + 1,
						$temp$int_ = int_ >>> 1;
					digit = $temp$digit;
					int_ = $temp$int_;
					continue helper;
				} else {
					return digit;
				}
			}
		});
	return A2(helper, 0, _int);
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt = function (mask) {
	switch (mask) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		case 6:
			return 6;
		default:
			return 7;
	}
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo = F2(
	function (ecLevel, mask) {
		var g15Mask = 21522;
		var g15Int = 1335;
		var g15Digit = pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g15Int);
		var formatInfoInt = pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt(mask) | (pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt(ecLevel) << 3);
		var helper = function (d_) {
			helper:
			while (true) {
				if ((pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit) >= 0) {
					var $temp$d_ = d_ ^ (g15Int << (pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit));
					d_ = $temp$d_;
					continue helper;
				} else {
					return g15Mask ^ (d_ | (formatInfoInt << 10));
				}
			}
		};
		var d = formatInfoInt << 10;
		return helper(d);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal = F2(
	function (size, count) {
		return (count < 8) ? _Utils_Tuple2(8, (size - count) - 1) : ((count < 9) ? _Utils_Tuple2(8, 15 - count) : _Utils_Tuple2(8, (15 - count) - 1));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical = F2(
	function (size, count) {
		return (count < 6) ? _Utils_Tuple2(count, 8) : ((count < 8) ? _Utils_Tuple2(count + 1, 8) : _Utils_Tuple2((size - 15) + count, 8));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule = F4(
	function (size, isBlack, row, col) {
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setFormatInfo_:
		while (true) {
			if (count < 15) {
				var isBlack = isBlackFn(count);
				var _n0 = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical, size, count);
				var x2 = _n0.a;
				var y2 = _n0.b;
				var _n1 = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal, size, count);
				var x1 = _n1.a;
				var y1 = _n1.b;
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A5(
					pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule,
					size,
					isBlack,
					x2,
					y2,
					A5(pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule, size, isBlack, x1, y1, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setFormatInfo_;
			} else {
				return matrix;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo = F4(
	function (ecLevel, size, mask, matrix) {
		var isBlack = F2(
			function (bits_, count) {
				return (1 & (bits_ >> count)) === 1;
			});
		var bits = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo, ecLevel, mask);
		return A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			isBlack(bits),
			0,
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_ = F5(
	function (ecLevel, size, matrix, mask, _n0) {
		var minSMatrix = _n0.a;
		var minScore = _n0.b;
		var maskedMatrix = A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo,
			ecLevel,
			size,
			mask,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask, size, mask, matrix));
		var _n1 = A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore, size, maskedMatrix);
		var maskSMatrix = _n1.a;
		var maskScore = _n1.b;
		return ((_Utils_cmp(minScore, maskScore) < 0) && (!_Utils_eq(minScore, -1))) ? _Utils_Tuple2(minSMatrix, minScore) : _Utils_Tuple2(maskSMatrix, maskScore);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern0 = 0;
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern1 = 1;
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern2 = 2;
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern3 = 3;
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern4 = 4;
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern5 = 5;
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern6 = 6;
var pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern7 = 7;
var pablohirafuji$elm_qrcode$QRCode$Matrix$patternList = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7]);
var pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask = F3(
	function (ecLevel, size, matrix) {
		return A3(
			elm$core$List$foldl,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_, ecLevel, size, matrix),
			_Utils_Tuple2(_List_Nil, -1),
			pablohirafuji$elm_qrcode$QRCode$Matrix$patternList).a;
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo = F2(
	function (size, matrix) {
		return A4(
			pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			elm$core$Basics$always(true),
			0,
			matrix);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo = function (version) {
	var g18Int = 7973;
	var g18Digit = pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g18Int);
	var helper = function (d_) {
		helper:
		while (true) {
			if ((pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit) >= 0) {
				var $temp$d_ = d_ ^ (g18Int << (pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit));
				d_ = $temp$d_;
				continue helper;
			} else {
				return d_ | (version << 12);
			}
		}
	};
	var d = version << 12;
	return helper(d);
};
var pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule = F3(
	function (size, isBlack, _n0) {
		var row = _n0.a;
		var col = _n0.b;
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setVersionInfo_:
		while (true) {
			if (count < 18) {
				var topRight = _Utils_Tuple2(
					elm$core$Basics$floor(count / 3),
					((A2(elm$core$Basics$modBy, 3, count) + size) - 8) - 3);
				var isBlack = isBlackFn(count);
				var bottomLeft = _Utils_Tuple2(
					((A2(elm$core$Basics$modBy, 3, count) + size) - 8) - 3,
					elm$core$Basics$floor(count / 3));
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A4(
					pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule,
					size,
					isBlack,
					bottomLeft,
					A4(pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule, size, isBlack, topRight, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setVersionInfo_;
			} else {
				return matrix;
			}
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo = F3(
	function (version, size, matrix) {
		if (version >= 7) {
			var isBlack = F2(
				function (bits_, count) {
					return (1 & (bits_ >> count)) === 1;
				});
			var bits = pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo(version);
			return A4(
				pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_,
				size,
				isBlack(bits),
				0,
				matrix);
		} else {
			return matrix;
		}
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor = F2(
	function (row, col) {
		return (!A2(elm$core$Basics$modBy, 2, row + col)) ? elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming = F3(
	function (size, row, col) {
		return A2(
			elm$core$Array$set,
			A3(pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor, row, col));
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern = F2(
	function (size, matrix) {
		var range = A2(elm$core$List$range, 8, size - 9);
		return A3(
			elm$core$List$foldl,
			function (b) {
				return A3(pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, b, 6);
			},
			A3(
				elm$core$List$foldl,
				A2(pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, 6),
				matrix,
				range),
			range);
	});
var pablohirafuji$elm_qrcode$QRCode$Matrix$apply = function (_n0) {
	var ecLevel = _n0.a.eG;
	var groupInfo = _n0.a.a0;
	var bytes = _n0.b;
	var version = groupInfo.ef;
	var size = ((version - 1) * 4) + 21;
	return A2(
		elm$core$Result$map,
		A2(pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask, ecLevel, size),
		A2(
			elm$core$Result$map,
			A2(pablohirafuji$elm_qrcode$QRCode$Matrix$addData, size, bytes),
			A3(
				pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern,
				version,
				size,
				A2(
					pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern,
					size,
					A3(
						pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule,
						version,
						size,
						A3(
							pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo,
							version,
							size,
							A2(
								pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo,
								size,
								A4(
									pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
									size,
									-1,
									size - 8,
									A4(
										pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
										size,
										size - 8,
										-1,
										A4(
											pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
											size,
											-1,
											-1,
											A2(
												elm$core$Array$initialize,
												size * size,
												elm$core$Basics$always(elm$core$Maybe$Nothing))))))))))));
};
var pablohirafuji$elm_qrcode$QRCode$encodeWith = F2(
	function (ecLevel, input) {
		return A2(
			elm$core$Result$mapError,
			pablohirafuji$elm_qrcode$QRCode$convertError,
			A2(
				elm$core$Result$map,
				elm$core$Basics$identity,
				A2(
					elm$core$Result$andThen,
					pablohirafuji$elm_qrcode$QRCode$Matrix$apply,
					A2(
						pablohirafuji$elm_qrcode$QRCode$Encode$encode,
						input,
						pablohirafuji$elm_qrcode$QRCode$convertEC(ecLevel)))));
	});
var pablohirafuji$elm_qrcode$QRCode$encode = pablohirafuji$elm_qrcode$QRCode$encodeWith(2);
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$shapeRendering = _VirtualDom_attribute('shape-rendering');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize = 5;
var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$rectView = F2(
	function (row, col) {
		return A2(
			elm$svg$Svg$rect,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$y(
					elm$core$String$fromInt(row * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$x(
					elm$core$String$fromInt(col * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$width(
					elm$core$String$fromInt(pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$height(
					elm$core$String$fromInt(pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize)),
					elm$svg$Svg$Attributes$fill('black')
				]),
			_List_Nil);
	});
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleView = F4(
	function (quietZoneSize, rowIndex, colIndex, isDark) {
		return isDark ? elm$core$Maybe$Just(
			A2(pablohirafuji$elm_qrcode$QRCode$Render$Svg$rectView, rowIndex + quietZoneSize, colIndex + quietZoneSize)) : elm$core$Maybe$Nothing;
	});
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewBase = F2(
	function (quietZoneSize, matrix) {
		var quietZone = (2 * quietZoneSize) * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize;
		var sizePx = elm$core$String$fromInt(
			(elm$core$List$length(matrix) * pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleSize) + quietZone);
		return A2(
			elm$svg$Svg$svg,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$width(sizePx),
					elm$svg$Svg$Attributes$height(sizePx),
					elm$svg$Svg$Attributes$viewBox('0 0 ' + (sizePx + (' ' + sizePx))),
					elm$svg$Svg$Attributes$shapeRendering('crispEdges')
				]),
			A2(
				elm$core$List$filterMap,
				elm$core$Basics$identity,
				elm$core$List$concat(
					A2(
						elm$core$List$indexedMap,
						F2(
							function (rowIndex, row) {
								return A2(
									elm$core$List$indexedMap,
									A2(pablohirafuji$elm_qrcode$QRCode$Render$Svg$moduleView, quietZoneSize, rowIndex),
									row);
							}),
						matrix))));
	});
var pablohirafuji$elm_qrcode$QRCode$Render$Svg$view = function (matrix) {
	return A2(pablohirafuji$elm_qrcode$QRCode$Render$Svg$viewBase, 4, matrix);
};
var pablohirafuji$elm_qrcode$QRCode$toSvg = function (_n0) {
	var qrCode = _n0;
	return pablohirafuji$elm_qrcode$QRCode$Render$Svg$view(qrCode);
};
var author$project$RALConfig$view = function (model) {
	var viewpoint = ianmackenzie$elm_3d_camera$Viewpoint3d$orbit(
		{
			aE: model.aE,
			bl: ianmackenzie$elm_units$Length$meters(model.bl),
			aJ: model.aJ,
			hb: A3(ianmackenzie$elm_geometry$Point3d$meters, 0, 0, 0),
			hi: ianmackenzie$elm_geometry$SketchPlane3d$xy
		});
	var camera = ianmackenzie$elm_3d_camera$Camera3d$perspective(
		{
			gP: ianmackenzie$elm_units$Length$meters(0.1),
			iR: ianmackenzie$elm_units$Angle$degrees(45),
			iT: viewpoint
		});
	return A2(
		mdgriffith$elm_ui$Element$layout,
		_List_fromArray(
			[
				mdgriffith$elm_ui$Element$Font$size(18),
				mdgriffith$elm_ui$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, 'overflow', 'hidden')),
				mdgriffith$elm_ui$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, 'width', '100%')),
				mdgriffith$elm_ui$Element$htmlAttribute(
				A2(elm$html$Html$Attributes$style, 'height', '100%'))
			]),
		A2(
			mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					mdgriffith$elm_ui$Element$inFront(
					(model.ad !== '') ? A2(
						mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								mdgriffith$elm_ui$Element$width(
								mdgriffith$elm_ui$Element$px(300)),
								mdgriffith$elm_ui$Element$padding(10),
								mdgriffith$elm_ui$Element$Background$color(
								A4(mdgriffith$elm_ui$Element$rgba, 1, 1, 1, 1)),
								mdgriffith$elm_ui$Element$centerY,
								mdgriffith$elm_ui$Element$centerX,
								mdgriffith$elm_ui$Element$Border$dashed,
								mdgriffith$elm_ui$Element$Border$width(2),
								mdgriffith$elm_ui$Element$Font$size(16),
								author$project$RALConfig$centerText,
								mdgriffith$elm_ui$Element$pointer
							]),
						_List_fromArray(
							[
								A2(
								mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										mdgriffith$elm_ui$Element$alignTop,
										mdgriffith$elm_ui$Element$alignRight,
										mdgriffith$elm_ui$Element$Font$size(32)
									]),
								mdgriffith$elm_ui$Element$text('×')),
								mdgriffith$elm_ui$Element$html(
								A2(
									elm$html$Html$div,
									_List_fromArray(
										[
											A2(elm$html$Html$Attributes$style, 'width', '280px'),
											A2(elm$html$Html$Attributes$style, 'height', '240px'),
											elm$html$Html$Events$onClick(author$project$RALConfig$ClearDownloadUrl)
										]),
									_List_fromArray(
										[
											A2(
											elm$core$Result$withDefault,
											elm$html$Html$text('Error while encoding to QRCode.'),
											A2(
												elm$core$Result$map,
												pablohirafuji$elm_qrcode$QRCode$toSvg,
												pablohirafuji$elm_qrcode$QRCode$encode(model.ad)))
										]))),
								A2(
								mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[mdgriffith$elm_ui$Element$centerX]),
								mdgriffith$elm_ui$Element$text('Scan this QRCode with an iPhone')),
								A2(
								mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[mdgriffith$elm_ui$Element$centerX]),
								mdgriffith$elm_ui$Element$text('or iPad running iOS12 or newer.'))
							])) : mdgriffith$elm_ui$Element$none),
					mdgriffith$elm_ui$Element$inFront(
					A2(
						mdgriffith$elm_ui$Element$row,
						_List_fromArray(
							[
								mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
								mdgriffith$elm_ui$Element$spacing(6),
								mdgriffith$elm_ui$Element$centerX
							]),
						_List_fromArray(
							[
								A2(
								mdgriffith$elm_ui$Element$column,
								_List_fromArray(
									[
										mdgriffith$elm_ui$Element$alignRight,
										mdgriffith$elm_ui$Element$alignTop,
										mdgriffith$elm_ui$Element$padding(6),
										mdgriffith$elm_ui$Element$spacing(6)
									]),
								_List_fromArray(
									[
										(model.ad === '') ? A2(
										mdgriffith$elm_ui$Element$row,
										_List_fromArray(
											[
												mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
												mdgriffith$elm_ui$Element$padding(10),
												mdgriffith$elm_ui$Element$spacing(10),
												mdgriffith$elm_ui$Element$centerX
											]),
										_List_fromArray(
											[
												A2(
												mdgriffith$elm_ui$Element$Input$button,
												_List_Nil,
												{
													dk: A2(
														mdgriffith$elm_ui$Element$paragraph,
														_List_fromArray(
															[
																mdgriffith$elm_ui$Element$Background$color(author$project$RALConfig$selectedColor),
																mdgriffith$elm_ui$Element$Font$color(author$project$RALConfig$darkGray),
																mdgriffith$elm_ui$Element$Border$rounded(4),
																mdgriffith$elm_ui$Element$padding(8),
																mdgriffith$elm_ui$Element$spacing(8)
															]),
														_List_fromArray(
															[
																mdgriffith$elm_ui$Element$text('Create'),
																A2(
																mdgriffith$elm_ui$Element$image,
																_List_fromArray(
																	[
																		mdgriffith$elm_ui$Element$width(
																		mdgriffith$elm_ui$Element$px(47)),
																		mdgriffith$elm_ui$Element$height(
																		mdgriffith$elm_ui$Element$px(54))
																	]),
																{eE: 'AR Quicklook button', fO: 'assets/arkit-icon.svg'})
															])),
													fj: elm$core$Maybe$Just(author$project$RALConfig$Export)
												})
											])) : A2(
										mdgriffith$elm_ui$Element$row,
										_List_fromArray(
											[
												mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
												mdgriffith$elm_ui$Element$padding(10)
											]),
										_List_fromArray(
											[
												A2(
												mdgriffith$elm_ui$Element$downloadAs,
												_List_Nil,
												{
													g8: 'myRAL.usdz',
													dk: A2(
														mdgriffith$elm_ui$Element$image,
														_List_fromArray(
															[
																mdgriffith$elm_ui$Element$width(
																mdgriffith$elm_ui$Element$px(47)),
																mdgriffith$elm_ui$Element$height(
																mdgriffith$elm_ui$Element$px(54))
															]),
														{eE: 'AR Quicklook button', fO: 'assets/arkit-icon.svg'}),
													iQ: model.ad
												})
											]))
									]))
							]))),
					mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
					mdgriffith$elm_ui$Element$alignLeft
				]),
			_List_fromArray(
				[
					A2(
					mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							mdgriffith$elm_ui$Element$pointer,
							mdgriffith$elm_ui$Element$htmlAttribute(
							mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onStart(
								A2(elm$core$Basics$composeR, author$project$RALConfig$touchList, author$project$RALConfig$StartMoveList))),
							mdgriffith$elm_ui$Element$htmlAttribute(
							mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onMove(
								A2(elm$core$Basics$composeR, author$project$RALConfig$touchList, author$project$RALConfig$MoveList))),
							mdgriffith$elm_ui$Element$htmlAttribute(
							mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onCancel(
								A2(elm$core$Basics$composeR, author$project$RALConfig$touchList, author$project$RALConfig$CancelMoveList))),
							mdgriffith$elm_ui$Element$htmlAttribute(
							mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onEnd(
								A2(elm$core$Basics$composeR, author$project$RALConfig$touchList, author$project$RALConfig$EndMoveList))),
							mdgriffith$elm_ui$Element$htmlAttribute(
							mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onDown(
								A2(
									elm$core$Basics$composeR,
									function ($) {
										return $.an;
									},
									author$project$RALConfig$StartMove))),
							mdgriffith$elm_ui$Element$htmlAttribute(
							mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onMove(
								A2(
									elm$core$Basics$composeR,
									function ($) {
										return $.an;
									},
									author$project$RALConfig$Move))),
							mdgriffith$elm_ui$Element$htmlAttribute(
							mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onUp(
								A2(
									elm$core$Basics$composeR,
									function ($) {
										return $.an;
									},
									author$project$RALConfig$EndMove)))
						]),
					mdgriffith$elm_ui$Element$html(
						A3(
							author$project$Scene3d$render,
							_List_Nil,
							{
								gj: elm$core$Maybe$Just(author$project$RALConfig$ambientLighting),
								gI: camera,
								g7: author$project$Scene3d$Exposure$fromEv100(14),
								hj: ianmackenzie$elm_units$Pixels$pixels(400),
								hD: A2(
									author$project$Scene3d$oneLight,
									author$project$RALConfig$sunlight,
									{gK: true}),
								iV: author$project$Scene3d$Chromaticity$daylight,
								iW: ianmackenzie$elm_units$Pixels$pixels(800)
							},
							model.c_))),
					A2(
					mdgriffith$elm_ui$Element$wrappedRow,
					_List_fromArray(
						[
							mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
							mdgriffith$elm_ui$Element$height(
							A2(mdgriffith$elm_ui$Element$maximum, 350, mdgriffith$elm_ui$Element$fill)),
							mdgriffith$elm_ui$Element$spacing(10),
							mdgriffith$elm_ui$Element$padding(10),
							mdgriffith$elm_ui$Element$scrollbarY
						]),
					A2(
						elm$core$List$map,
						function (c) {
							var colorRec = avh4$elm_color$Color$toRgba(c.aI);
							var colorSum = (colorRec.fA + colorRec.eN) + colorRec.es;
							var fgColor = (colorSum > 0.85) ? A3(avh4$elm_color$Color$rgb255, 5, 5, 5) : A3(avh4$elm_color$Color$rgb255, 240, 240, 240);
							return A2(
								mdgriffith$elm_ui$Element$Input$button,
								_List_fromArray(
									[
										mdgriffith$elm_ui$Element$width(
										mdgriffith$elm_ui$Element$px(300))
									]),
								{
									dk: A2(
										mdgriffith$elm_ui$Element$row,
										_List_fromArray(
											[
												mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
												mdgriffith$elm_ui$Element$spacing(10)
											]),
										_List_fromArray(
											[
												A2(
												mdgriffith$elm_ui$Element$el,
												_Utils_ap(
													A2(author$project$RALConfig$buttonStyle, c.aI, fgColor),
													_List_fromArray(
														[
															mdgriffith$elm_ui$Element$width(
															mdgriffith$elm_ui$Element$fillPortion(4)),
															mdgriffith$elm_ui$Element$height(
															mdgriffith$elm_ui$Element$px(50)),
															mdgriffith$elm_ui$Element$centerY
														])),
												mdgriffith$elm_ui$Element$text('RAL ' + c.bk)),
												A2(
												mdgriffith$elm_ui$Element$column,
												_List_fromArray(
													[
														mdgriffith$elm_ui$Element$width(
														mdgriffith$elm_ui$Element$fillPortion(6)),
														mdgriffith$elm_ui$Element$height(mdgriffith$elm_ui$Element$fill),
														mdgriffith$elm_ui$Element$spacing(5)
													]),
												_List_fromArray(
													[
														mdgriffith$elm_ui$Element$text(c.fd),
														A2(
														mdgriffith$elm_ui$Element$paragraph,
														_List_fromArray(
															[
																mdgriffith$elm_ui$Element$width(mdgriffith$elm_ui$Element$fill),
																mdgriffith$elm_ui$Element$Font$size(12)
															]),
														_List_fromArray(
															[
																mdgriffith$elm_ui$Element$text('Glanzgrad '),
																mdgriffith$elm_ui$Element$text(
																function () {
																	var _n0 = c.c6;
																	switch (_n0) {
																		case 0:
																			return '75 +/- 10 GE';
																		case 2:
																			return '35 +/- 5 GE';
																		case 3:
																			return '35 +/- 5 GE';
																		default:
																			return '75 +/- 10 GE';
																	}
																}())
															]))
													]))
											])),
									fj: elm$core$Maybe$Just(
										author$project$RALConfig$SelectRAL(c.bk))
								});
						},
						model.b4))
				])));
};
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {eL: fragment, eR: host, fq: path, fv: port_, fy: protocol, fz: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$element = _Browser_element;
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$RALConfig$main = elm$browser$Browser$element(
	{ht: author$project$RALConfig$init, ir: author$project$RALConfig$subscriptions, iP: author$project$RALConfig$update, iS: author$project$RALConfig$view});
_Platform_export({'RALConfig':{'init':author$project$RALConfig$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (userAgent) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (seedExtension) {
					return A2(
						elm$json$Json$Decode$andThen,
						function (seed) {
							return elm$json$Json$Decode$succeed(
								{d3: seed, d4: seedExtension, ee: userAgent});
						},
						A2(elm$json$Json$Decode$field, 'seed', elm$json$Json$Decode$int));
				},
				A2(
					elm$json$Json$Decode$field,
					'seedExtension',
					elm$json$Json$Decode$list(elm$json$Json$Decode$int)));
		},
		A2(elm$json$Json$Decode$field, 'userAgent', elm$json$Json$Decode$string)))(0)}});}(this));