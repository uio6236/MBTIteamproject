// upload_data.js

// 1. 필요한 모듈 가져오기
const admin = require('firebase-admin'); // Firebase Admin SDK
const fs = require('fs'); // Node.js 파일 시스템 모듈 (파일 읽기용)

// 2. Firebase Admin SDK 초기화
// 🔥 중요: './path/to/your-service-account-key.json' 부분을
//    실제로 다운로드한 서비스 계정 키 파일의 정확한 경로로 바꿔주세요.
const serviceAccount = require('./coco-fit-firebase-adminsdk-fbsvc-385ff4a200.json'); // 예시 경로

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // 만약 Firestore 데이터베이스 URL을 지정해야 한다면 (일반적으로는 credential만으로 충분)
  // databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com" // YOUR_PROJECT_ID를 실제 프로젝트 ID로 변경
});

// 3. Firestore 데이터베이스 객체 가져오기
const db = admin.firestore();

// 4. JSON 파일에서 데이터 읽는 함수
function readJsonFile(filePath) {
  // fs.readFileSync는 파일을 동기적으로 읽어옵니다.
  // 파일 경로(filePath)에 있는 파일의 내용을 읽어 문자열로 반환합니다.
  const rawData = fs.readFileSync(filePath);
  // JSON.parse는 문자열 형태의 JSON 데이터를 JavaScript 객체로 변환합니다.
  return JSON.parse(rawData);
}

// 5. 'allSports' 컬렉션에 운동 데이터 업로드하는 함수
async function uploadSports() {
  // './sports_data.json' 파일에서 운동 데이터를 읽어옵니다.
  // 이 파일 경로는 upload_data.js 파일 기준 상대 경로입니다. 필요시 수정하세요.
  const sportsData = readJsonFile('./sports_data.json');
  // Firestore에 여러 문서를 한 번의 작업으로 쓰기 위한 '배치(batch)' 객체를 생성합니다.
  // 배치를 사용하면 여러 쓰기 작업을 원자적으로 (모두 성공하거나 모두 실패하도록) 처리할 수 있고, 네트워크 요청 횟수를 줄일 수 있습니다.
  const batch = db.batch();

  // sportsData 배열의 각 운동 항목(sport)에 대해 반복합니다.
  sportsData.forEach(sport => {
    // 'allSports' 컬렉션에 새로운 문서를 만듭니다. 문서 ID는 sport.id 값을 사용합니다.
    const docRef = db.collection('allSports').doc(sport.id);
    // 배치에 'set' 작업을 추가합니다. docRef 위치에 sport 객체의 내용을 저장합니다.
    // Firestore에는 { title: "...", description: "...", imageName: "..." } 형태의 데이터가 저장됩니다.
    batch.set(docRef, {
      title: sport.title,
      description: sport.description,
      imageName: sport.imageName // 이미지 파일 이름만 저장
    });
  });

  // 배치에 추가된 모든 쓰기 작업을 한 번에 실행합니다.
  await batch.commit();
  console.log('Sports data uploaded successfully!');
}

// 6. 'allFoods' 컬렉션에 음식 데이터 업로드하는 함수 (uploadSports와 유사)
async function uploadFoods() {
  const foodsData = readJsonFile('./foods_data.json'); // './foods_data.json' 파일 경로
  const batch = db.batch();
  foodsData.forEach(food => {
    const docRef = db.collection('allFoods').doc(food.id);
    batch.set(docRef, {
      title: food.title,
      description: food.description,
      imageName: food.imageName // 이미지 파일 이름만 저장
    });
  });
  await batch.commit();
  console.log('Foods data uploaded successfully!');
}

// 7. 'mbtiRecommendations' 컬렉션에 MBTI별 추천 데이터 업로드하는 함수
async function uploadMbtiRecommendations() {
  const mbtiData = readJsonFile('./mbti_recommendations_data.json'); // './mbti_recommendations_data.json' 파일 경로
  const batch = db.batch();
  mbtiData.forEach(mbtiRec => {
    // 'mbtiRecommendations' 컬렉션에 문서를 만듭니다. 문서 ID는 MBTI 유형(mbtiRec.id)을 사용합니다.
    const docRef = db.collection('mbtiRecommendations').doc(mbtiRec.id);
    // 해당 MBTI 문서에 추천 운동 ID 목록과 추천 음식 ID 목록을 배열로 저장합니다.
    batch.set(docRef, {
      recommendedSportIds: mbtiRec.recommendedSportIds,
      recommendedFoodIds: mbtiRec.recommendedFoodIds
    });
  });
  await batch.commit();
  console.log('MBTI recommendations data uploaded successfully!');
}

// 8. 메인 실행 함수
async function main() {
  try {
    // 순차적으로 각 데이터 업로드 함수를 호출합니다.
    await uploadSports();
    await uploadFoods();
    await uploadMbtiRecommendations();
    console.log('All data uploaded!');
  } catch (error) {
    // 오류 발생 시 콘솔에 에러 메시지를 출력합니다.
    console.error('Error uploading data:', error);
  }
}

// 9. 스크립트 실행 시 main 함수 호출
main();