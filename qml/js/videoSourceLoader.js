Qt.include("VideoParser.js");
Qt.include("SinaParser.js");
Qt.include("YoukuParser.js");
Qt.include("QQParser.js");

var sid, type, model;

function loadSource(t, s, m){
    sid = s; type = t; model = m;

    var parser;
    if (type === "sina")
        parser = new SinaParser();
    else if (type === "youku")
        parser = new YoukuParser();
    else if (type === "qq")
        parser = new QQParser();

    if (parser == undefined){
        addMessage("未支持的视频源:"+type);
    } else {
        parser.start(sid);
    }
}

function addMessage(msg){
    model.append({"text": msg});
}

VideoParser.prototype.success = function(url){
            if (acsettings.usePlatformPlayer){
                addMessage("正在打开本地播放器...");
                utility.launchPlayer(url);
                exit();
            } else {
                addMessage("正在打开播放器...");
                createPlayer(url);
            }
        }

VideoParser.prototype.error = function(message){
            addMessage("视频解析失败> <");
        }
