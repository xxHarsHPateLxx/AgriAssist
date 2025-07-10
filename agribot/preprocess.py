# preprocess.py

import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

DOCS_DIR = "docs"
INDEX_DIR = "faiss_index"

def load_documents(folder_path):
    documents = []
    for file in os.listdir(folder_path):
        if file.lower().endswith(".pdf"):
            path = os.path.join(folder_path, file)
            print(f"📄 Loading: {file}")
            loader = PyPDFLoader(path)
            documents.extend(loader.load())
    return documents

def preprocess_and_save():
    docs = load_documents(DOCS_DIR)
    if not docs:
        print("❌ No PDFs found in folder.")
        return

    print(f"✂️ Splitting {len(docs)} documents...")
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    chunks = splitter.split_documents(docs)

    print(f"🔗 Embedding {len(chunks)} chunks...")
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectordb = FAISS.from_documents(chunks, embedding=embeddings)

    vectordb.save_local(INDEX_DIR)
    print(f"✅ FAISS index saved to '{INDEX_DIR}'")

if __name__ == "__main__":
    preprocess_and_save()
