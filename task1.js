function unique(arr) {
    return Array.from(new Set(arr))
}

function valToBitArr(x, n) {
    var num = "" + parseInt(x).toString(2);

    var len = n - num.length;
    while (len > 0) {
        len--;
        num = "0" + num;
    }
    // console.log(num);
    return num;
}

function solve1() {
    var result = new Array(16);
    var delta = $('#delta').val();
    var id = $('#selbox option:selected').text() - 1;
    var tol = (1 << 6); // 枚举的输入对的一个
    console.log(delta, id);
    for (var x = 0; x < tol; x++) {
        var y = delta ^ x;
        var xx = sPermute(id, valToBitArr(x, 6).split(''));
        var yy = sPermute(id, valToBitArr(y, 6).split(''));
        var res = xx ^ yy;
        if (typeof result[res] == "undefined") {
            result[res] = new Array();
        }
        result[res].push(x);
        result[res].push(y);
    }
    getTable(result);
}

function getTable(res) {
    var data = new Array();
    for (var i = 0; i < 16; i++) {
        res[i] = unique(res[i]);
        console.log(res[i]);
        data.push('<tr>');
        
        data.push('<td>');
        data.push(valToBitArr(i, 4));
        data.push('</td>');

        data.push('<td>');
        data.push(res[i].length);
        data.push('</td>');

        data.push('<td>');
        var len = res[i].length;
        if (len > 0) {
            data.push(valToBitArr(res[i][0], 6));
        }
        for (var j = 1; j < len; j++) {
            data.push(", " + valToBitArr(res[i][j], 6));
        }
        data.push('</td>');

        data.push('</tr>');
    }
    document.getElementById('tbbody').innerHTML = data.join('');
}