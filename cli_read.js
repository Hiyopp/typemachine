#!/usr/bin/env node
const fs = require('fs');

/**
 * 파일 전체를 대상으로 특정 단어를 다른 단어로 변환시켜주는 재귀함수.
 * 
 * @param {string} dir
 */
function contentChanger(dir) {
    const files = fs.readdirSync(dir); //현재 실행하고 있는 dir 경로에 위치한 file들.
    
    for(let k = 0; k < files.length; k++) {
        if (files[k] != '.git') {
            const nowDir = dir + "\\" + files[k]; //현재 실행하고 있는 파일의 위치.
            if (fs.statSync(nowDir).isDirectory())
                contentChanger(nowDir); 
            else {
                const data = fs.readFileSync(nowDir);
                if (nowDir.replace('.', '') != __filename.replace(__dirname, '')) //자기 자신 변경 금지
                    fs.writeFileSync(nowDir, data.toString().replaceAll(
                        "hello world", "" //전체 파일을 대상으로 앞의 문장을 뒤의 문장으로 변환
                    ));
            }
        }
    }
}

contentChanger('.');