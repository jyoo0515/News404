function getmean(question) {
    if (question.trim() != '') {
        var requestJson = {
            'access_key': '142d3560-26b9-4166-913f-e11c113da9e2',
            'argument': {
                'question': question,
                'type': 'irqa'
            }
        };
        var options = {
            url: "http://aiopen.etri.re.kr:8000/WikiQA",
            method: 'POST',
            body: JSON.stringify(requestJson),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        };
        fetch("http://aiopen.etri.re.kr:8000/WikiQA", options)
            .then(response => response.json())
            .then(result => {
                if (result.result === 0) {
                    try {
                        var explain = "";
                        for(var i = 0; i<result.return_object.WiKiInfo.AnswerInfo.length; i++){
                            explain = explain+(i+1)+':'+JSON.stringify(result.return_object.WiKiInfo.AnswerInfo[i].answer)+'\n'
                            +JSON.stringify(result.return_object.WiKiInfo.AnswerInfo[i].url)+'\n'
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