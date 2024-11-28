import { useState } from "react";
import axios from "axios";

export default function useQuillImageReplacement() {
    const [urlArray, setUrlArray] = useState([]); // 서버에서 받아온 url 저장

    const replaceImages = async (content) => {
        const srcArray = []; // 에디터 이미지들에서 src만 추출
        const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

        let endContent = content; // 에디터에 작성된 내용 -> url 바꿔 다시 저장

        // 이미지 src 추출
        while (gainSource.test(content)) { // 이미지가 포함되어 있다면
            const result = RegExp.$2;
            console.log("src 추출: ", result);
            srcArray.push(result);
        }

        // base64 -> Blop
        for (let i=0; i<srcArray.length; i++) {
            const result = srcArray[i];

            const byteString = atob(result.split(',')[1]); // data:image/jpeg;base64 제거 

            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let j=0; j<byteString.length; j++) {
                ia[j] = byteString.charCodeAt(j);
            }
            const blob = new Blob([ia], {type: 'image/jpeg'});
            const file = new File([blob], `image-${i}.jpg`);

            const formData = new FormData();
            formData.append('files[]', file);

            // 서버로 전송
            try {
                const config = { header: {'content-type': 'multipart/form-data'} };

                // 수정 : formData 서버로 보내 받은 url 저장
                // const response = await axios.post('', formData, config);
                // if (response.data.success) {
                //     setUrlArray(response.data.url);
                //     endContent = endContent.replace(srcArray[i], response.data.url[i]);
                // }

                // 더미 데이터 (테스트용)
                const dummyUrl = [ 'https://love.seoul.go.kr/tmda/Pds/Board/seoul_news_write/article_201907_02_1200.jpg',
                    'https://image.dongascience.com/Photo/2022/04/5d6ab340ff699601433170bcbdc65c54.jpg'];
                setUrlArray(dummyUrl); // 서버에서 받은 url로 수정
                endContent = endContent.replace(srcArray[i], dummyUrl[i]); // 수정된 url로 다시 저장

            } catch (error) {
                console.log('이미지 업로드 실패', error);
            }
        }

        return endContent;
    };

    return {urlArray, replaceImages};
};