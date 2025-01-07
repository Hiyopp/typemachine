const fs = require('fs');

/**
 * 파일 전체를 대상으로 특정 단어를 다른 단어로 변환시켜주는 재귀함수. ----수정
 * 
 * @param {string} dir search 시작 경로
 * @param {string} text 읽어들일 단어
 */
function contentReader(dir, text) {
    const files = fs.readdirSync(dir); //현재 실행하고 있는 dir 경로에 위치한 file들.
    
    for(let k = 0; k < files.length; k++) {
        if (files[k] != '.git') {
            const nowDir = dir + "\\" + files[k]; //현재 실행하고 있는 파일의 위치.
            if (fs.statSync(nowDir).isDirectory())
                contentReader(nowDir, text); 
            else {
                const data = fs.readFileSync(nowDir);
                if (nowDir.replace('.', '') != __filename.replace(__dirname, '')) { //자기 자신 실행 금지
                    const textList = data.toString().replaceAll("=", ' = ').replaceAll(/\s+/g, ' ').split(' ');
                    for(let i = 0; i < textList.length - 2; i++) {
                        if (textList[i + 1] === '=' && textList[i + 2] === text)
                            //------여기서부터 수정(get 또는 GET이 있는 파일에서 /http블라가 있는 sequence point를 찾고 글자 다 실행 해서 api get으로 데이터 받아오기.)
                            console.log(textList[i]); 
                    }
                /**
                    fs.writeFileSync(nowDir, data.toString().replaceAll(
                        "Relative", "테스트" //전체 파일을 대상으로 앞의 문장을 뒤의 문장으로 변환
                ));
                */
                }
            }
        }
    }
}

module.exports.read = contentReader;