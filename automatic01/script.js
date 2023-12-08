document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('processButton').addEventListener('click', function() {
        var inputText = document.getElementById('pasteArea').value;
        processText(inputText.trim()); // 添加.trim()来去除首尾空格
    });

    document.body.addEventListener('click', function(event) {
        // 复制功能实现
        if (event.target.tagName === 'BUTTON' && event.target.textContent === '复制') {
            var text = event.target.previousElementSibling.value;
            navigator.clipboard.writeText(text).then(() => {
                // 可选：显示复制成功信息
                console.log('Text copied to clipboard');
            }).catch(err => {
                // 可选：显示错误信息
                console.error('Error in copying text: ', err);
            });
        }
    });
});

function processText(text) {
    var outputArea = document.getElementById('outputArea');
    outputArea.innerHTML = '';

    var columns = ['货品编码/商家SKU', '货品名称', '条形码/批文编号/备案编号', '毛重', '净重', '产地', '品牌', '规格', '图片', '人民币成本'];
    var values = text.split('\t'); // 使用制表符分割文本

    columns.forEach(function(column, index) {
        var value = values[index] || '';
        var div = document.createElement('div');
        var input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        var button = document.createElement('button');
        button.textContent = '复制';

        div.textContent = column + ': ';
        div.appendChild(input);
        div.appendChild(button);
        if (column === '图片' && value) {
            var imageLinks = value.split(';');
            imageLinks.forEach(function(link) {
                var img = document.createElement('img');
                img.src = link;
                img.className = 'product-image'; // 添加类名以便用CSS控制样式
                div.appendChild(img);
            });
        }
        

        outputArea.appendChild(div);
    });
}

// ... 现有的代码 ...

document.getElementById('convertButton').addEventListener('click', function() {
    var inputLink = document.getElementById('linkInput').value;
    convertLink(inputLink);
});

document.getElementById('copyLinkButton').addEventListener('click', function() {
    var convertedLink = document.getElementById('convertedLink');
    convertedLink.select(); // 选择文本
    document.execCommand('copy'); // 执行复制操作
    //alert('链接已复制到剪贴板'); // 可选：提供复制成功提示
});

function convertLink(link) {
    var convertedLink = document.getElementById('convertedLink');
    var match = link.match(/(\d+)\.html/); // 使用正则表达式提取数字

    if (match && match[1]) {
        var itemId = match[1];
        var newLink = 'https://item.jd.com/' + itemId + '.html';
        convertedLink.value = newLink; // 更新输入框的值
    } else {
        convertedLink.value = '无效的链接'; // 或其他错误消息
    }
}

// ... 现有的代码 ...
