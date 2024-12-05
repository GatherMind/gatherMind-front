import { imageUpload } from "../services/FileApiService";
import { useAuth } from "../context/AuthContext";

export default function useQuillImageReplacement() {
  const { authToken } = useAuth();

  const replaceImages = async (content, isModify) => {
    const srcArray = []; // 에디터 이미지들에서 src만 추출
    const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

    let endContent = content; // 에디터에 작성된 내용 -> url 바꿔 다시 저장

    // 이미지 src 추출
    let match;
    while ((match = gainSource.exec(content)) !== null) {
      const result = match[2]; // src 값 추출

      if (isModify && result.startsWith("https://")) {
        // 수정 모드에서 이미 URL로 변환된 이미지는 건너뛴다
        continue;
      }

      srcArray.push(result);
    }

    console.log("srcArray.length: ", srcArray.length);

    // base64 -> Blop
    for (let i = 0; i < srcArray.length; i++) {
      const result = srcArray[i];

      try {
        if (result.startsWith("data:image")) {
          // Base64 문자열만 처리
          const byteString = atob(result.split(",")[1]); // Base64 헤더 제거
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let j = 0; j < byteString.length; j++) {
            ia[j] = byteString.charCodeAt(j);
          }
          const blob = new Blob([ia], { type: "image/jpeg" });
          const file = new File([blob], `image-${i}.jpg`);

          const formData = new FormData();
          formData.append("files[]", file);

          // 파일 업로드 및 URL로 변환
          const response = await imageUpload(formData, authToken);
          if (response) {
            endContent = endContent.replace(result, response);
            console.log("변환된 내용:", endContent);
          }
        } else {
          console.log("Base64가 아닌 이미지, 건너뜀:", result);
        }
      } catch (error) {
        console.log("이미지 처리 중 오류:", result, error);
      }
    }

    return endContent;
  };

  return { replaceImages };
}
