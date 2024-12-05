import { imageUpload } from "../services/FileApiService";
import { useAuth } from "../context/AuthContext";

export default function useQuillImageReplacement() {
  const { authToken } = useAuth();

  const replaceImages = async (content, isModify) => {
    const srcArray = []; // 에디터 이미지들에서 src만 추출
    const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

    let endContent = content; // 에디터에 작성된 내용 -> url 바꿔 다시 저장

    // 이미지 src 추출
    while (gainSource.test(content)) {
      // 이미지가 포함되어 있다면
      const result = RegExp.$2;

      if (isModify && result.startsWith("https://")) {
        // 수정 모드일 때 이미 전환된 이미지라면 변환 X
        continue;
      }

      srcArray.push(result);
    }

    console.log("srcArray.length: ", srcArray.length);

    // base64 -> Blop
    for (let i = 0; i < srcArray.length; i++) {
      const result = srcArray[i];

      console.log(result);
      const byteString = atob(result.split(",")[1]); // data:image/jpeg;base64 제거

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let j = 0; j < byteString.length; j++) {
        ia[j] = byteString.charCodeAt(j);
      }
      const blob = new Blob([ia], { type: "image/jpeg" });
      const file = new File([blob], `image-${i}.jpg`);

      const formData = new FormData();
      formData.append("files[]", file);

      // 서버로 전송
      try {
        // 수정 : formData 서버로 보내 받은 url 저장
        const response = await imageUpload(formData, authToken);
        console.log("response.data: ", response);
        if (response) {
          endContent = endContent.replace(srcArray[i], response);
          console.log("endContent", endContent);
        }
      } catch (error) {
        console.log("이미지 업로드 실패", error);
      }
    }

    return endContent;
  };

  return { replaceImages };
}
