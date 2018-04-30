// 对arr数组改变n位
function changeText(arr, n) {
    var tag = Array(64).fill(false);
    var res = new Array(64);
    for (var i = 0; i < 64; i++) {
        res[i] = arr[i];
    }
    while (n > 0) {
        var id = Math.random() * 64 % 64; // 0-63随机
        if (!tag[id]) {
            tag[id] = true;
            n--;
            res[id] = 1 - arr[id]; // 取反
        }
    }
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
    return cnt;
}

// 参数是明文，密钥，任务，改变位数
function solveTask(plainText, key, kind, n) {
    var initCipherText = encrypt(plainText, key);

    var count = Array(64).fill(0); // 计数
    for (var i = 0; i < 1000; i++) {
        if (kind == 2) { // 任务2,改变明文
            var dif = checkDif(initCipherText, encrypt(changeText(plainText, n), key));
            count[dif]++;
        } else { // 任务3,改变密钥
            var dif = checkDif(initCipherText, encrypt(plainText, changeText(key, n)));
            count[dif]++;
        }
    }
    return count;
}