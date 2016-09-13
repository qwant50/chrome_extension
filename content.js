if ((document.location.href).match(/^http:\/\/seasonvar.ru/)) {

    let commands = [
        "$('body script').remove();",
        "$('head script').remove();",
        "$('body span').remove();",
        "$('.td-for-left-block').hide();",
        "$('noindex').remove();",
        "$('.td-for-content iframe').remove();",
        "$('.td-for-content div:eq(3) div[align=center]').remove();",
        "$('#avp_zid_456').remove();"
    ];

    commands.forEach((expr) => {
        if (eval(expr)) {
            chrome.extension.sendMessage('content.js', function (backMessage) {
                console.log('.sendMessage');
            });
        }
    });
    console.log($('#avp_zid_456').remove());

}


