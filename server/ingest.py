from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
import faiss
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from langchain_mistralai import MistralAIEmbeddings
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

pdfs = [
    "docs/farmerbook.pdf", "docs/Farming Schemes.pdf"
]



loaders = [PyPDFLoader(pdf) for pdf in pdfs]
docs = []
for loader in loaders:
    docs.extend(loader.load())

print(f"Loaded {len(docs)} documents")
# print(f"{docs[1].page_content}\n")
# print(docs[1].metadata)


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200, add_start_index=True
)
all_splits = text_splitter.split_documents(docs)

print(len(all_splits))


# embeddings = OllamaEmbeddings(model="nomic-embed-text:v1.5")
embeddings = MistralAIEmbeddings(
    model="mistral-embed",
)

# vector_1 = embeddings.embed_query(all_splits[0].page_content)
# vector_2 = embeddings.embed_query(all_splits[1].page_content)

# assert len(vector_1) == len(vector_2)
# print(f"Generated vectors of length {len(vector_1)}\n")
# print(vector_1[:10])



embedding_dim = len(embeddings.embed_query("hello world"))
index = faiss.IndexFlatL2(embedding_dim)

vector_store = FAISS(
    embedding_function=embeddings,
    index=index,
    docstore=InMemoryDocstore(),
    index_to_docstore_id={},
)

ids = vector_store.add_documents(documents=all_splits)

vector_store.save_local("faiss_index")






  
 


