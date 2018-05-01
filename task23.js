// 对arr数组改变n位
function changeText(arr, n) {
    var tag = Array(64).fill(false);
    var res = new Array();
    for (var i = 0; i < 64; i++) {
        res[i] = arr[i];
    }
    while (n > 0) {
        var id = Math.floor(Math.random() * 64) % 64; // 0-63随机
        if (!tag[id]) {
            tag[id] = true;
            n--;
            // console.log(arr[id], res[id], id);
            if (arr[id] == "1") {
                res[id] = "0";
            } else {
                res[id] = "1";
            }
            // console.log(arr[id], res[id]);
        }
    }
    // console.log(tag);
    res = res.join('');
    // console.log("arr : " + arr, "res : " + res);
    return res;
}

// 找arr1和arr2不同的位数
function checkDif(arr1, arr2) {
    var cnt = 0;
    for (var i = 0, n = arr1.length; i < n; i++) {
        if (arr1[i] != arr2[i]) {
            cnt++;
        }
    }
    console.log(cnt, arr1, arr2);
    return cnt;
}

function drawChart(count) {
    // console.log(count);

    var x = new Array(65);
    for (var i = 0; i < 65; i++) {
        x[i] = i;
    }

    var myChart = echarts.init(document.getElementById('chart'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'DES任务'
        },
        tooltip: {},
        legend: {
            data: ['密文改变位数']
        },
        xAxis: {
            data: x
        },
        yAxis: {
            type: 'value',
            name: '次数'
        },
        series: [{
            name: '密文改变位数',
            type: 'bar',
            data: count
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 参数是明文，密钥，任务，改变位数
function solveTask23(plainText, key, kind, n) {
    var initBitPlainText = DES.Byte2Bit(plainText).join("");
    var initBitKey = DES.Byte2Bit(key).join("");

    var initCipherText = encrypt(initBitPlainText, initBitKey);
    var count = Array(65).fill(0); // 计数
    var lun = 500; // 循环的轮次
    for (var i = 0; i < lun; i++) {
        if (kind == 2) { // 任务2,改变明文
            var dif = checkDif(initCipherText, encrypt(changeText(initBitPlainText, n), initBitKey));
            count[dif]++;
        } else { // 任务3,改变密钥
            var dif = checkDif(initCipherText, encrypt(initBitPlainText, changeText(initBitKey, n)));
            count[dif]++;
        }
    }
    drawChart(count);
}

function solve23() {
    var val = $('#sel23 option:selected').val();
    var bit = $('#selbit option:selected').text();
    var kind = 0;
    if (val == "task2") {
        kind = 2;
    } else if (val == "task3") {
        kind = 3;
    }
    var plainText = $('#plainText').val();
    var key = $('#key').val();
    // console.log(plainText, key, kind, bit);
    solveTask23(plainText, key, kind, bit);
}