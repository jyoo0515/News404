const { default: axios } = require("axios");

async function getMean(question) {
    if (question.trim() != '') {
        return axios({
            method: 'post',
            url: 'http://aiopen.etri.re.kr:8000/WikiQA',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            data: {
                'access_key': '142d3560-26b9-4166-913f-e11c113da9e2',
                'argument': {
                    'question': question,
                    'type': 'irqa'
                }
            }})
            .then(response => response.data)
            .then(result => {
                if (result.result === 0) {
                    try {
                        var explain = [];
                        for (var i = 0; i < result.return_object.WiKiInfo.AnswerInfo.length; i++) {
                            explain.push({ 'mean': result.return_object.WiKiInfo.AnswerInfo[i].answer });
                        }
                        return explain;
                    } catch (error) {
                        alert("잘못된 입력이에요");
                    }
                }
                else {
                    alert("잘못된 입력이에요");
                }
            });
    }
}

module.exports = getMean;