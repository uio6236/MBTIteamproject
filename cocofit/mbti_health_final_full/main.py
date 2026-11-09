import os
import json
import random
import requests
from flask import Flask, request, jsonify, send_from_directory, render_template
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv
from flask_cors import CORS  # 🔥 추가

# .env 키 로드
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# 폴더 설정
UPLOAD_FOLDER = "data"
VECTOR_STORE_PATH = "faiss_index"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Flask 앱 초기화
app = Flask(
    __name__,
    static_folder="static/dist",
    template_folder="static/dist"
)
CORS(app)
# 문서 임베딩 함수
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def load_and_embed_documents():
    documents = []
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.endswith(".pdf"):
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            reader = PdfReader(filepath)
            text = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            splits = text_splitter.create_documents([text], metadatas=[{"source": filename}])
            documents.extend(splits)
    if documents:
        vectorstore = FAISS.from_documents(documents, embedding)
        vectorstore.save_local(VECTOR_STORE_PATH)

# 기본 라우트 - React 앱 index.html 제공
@app.route("/")
def serve_react():
    return send_from_directory(app.template_folder, "index.html")

# 정적 파일 서빙
@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# PDF 업로드
@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():
    uploaded_file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
    uploaded_file.save(filepath)
    load_and_embed_documents()
    return jsonify({"filename": uploaded_file.filename})

# 질문 응답
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "").strip()
    mbti = data.get("mbti", "ISFJ")

    if question == "":
        default_tips = [
            "💧 하루에 1.5L 이상의 물을 마시는 것이 좋습니다!",
            "🧘‍♀️ 1시간 이상 앉아 있었다면 5분은 서서 스트레칭해 주세요.",
            "👀 20분마다 모니터에서 눈을 떼고 먼 곳을 20초간 바라보세요.",
            "🍎 인스턴트 음식보단 신선한 채소나 과일을 한 끼에 꼭 챙겨보세요.",
            "🚶‍♂️ 하루에 30분 이상 가벼운 산책을 하는 것이 건강에 좋아요.",
            "😴 수면은 최소 7시간 이상 확보하는 것이 면역력에 좋습니다.",
            "🌞 햇빛을 쬐는 건 비타민D 합성에 좋아요! 가볍게 바깥을 걸어보세요."
        ]
        return jsonify({"answer": random.choice(default_tips), "sources": []})

    try:
        vectorstore = FAISS.load_local(
            VECTOR_STORE_PATH,
            embedding,
            allow_dangerous_deserialization=True
        )
        docs = vectorstore.similarity_search(question, k=3)
        context = "\n\n".join([doc.page_content for doc in docs])
    except Exception:
        context = ""

    mbti_prompt = f"""
    너는 건강, 운동, 식습관만 대답하는 말동무 챗봇이야. 질문이 이 주제를 벗어나면 아래처럼만 말해:
    👉 "그건 내가 도와줄 수 없는 부분이야. 건강에 대해 궁금한 게 있다면 얼마든지 물어봐!"

    대답은 간단하고 실용적으로, 너무 길지 않게, 친근한 말투로 해줘. 말투는 사용자의 MBTI({mbti})를 참고해서 맞춰줘.

    질문: {question}

    참고 문서:
    {context}

    답변:
    """

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    payload = {"contents": [{"parts": [{"text": mbti_prompt}]}]}

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        answer = response.json()["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        answer = "답변 생성에 실패했습니다. 다시 시도해주세요."

    return jsonify({"answer": answer, "sources": []})

if __name__ == "__main__":
    load_and_embed_documents()
    app.run(debug=True)
