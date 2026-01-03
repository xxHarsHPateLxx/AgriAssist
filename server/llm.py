from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_mistralai.chat_models import ChatMistralAI
from langchain_mistralai import MistralAIEmbeddings
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Load the vector store
# embeddings = OllamaEmbeddings(model="nomic-embed-text:v1.5") 
embeddings = MistralAIEmbeddings(
    model="mistral-embed",
)
# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
faiss_index_path = os.path.join(script_dir, "faiss_index")

vector_store = FAISS.load_local(faiss_index_path, embeddings, allow_dangerous_deserialization=True)

# Create retriever
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3},
)

# Initialize LLM
# llm = OllamaLLM(model="llama3.2:1b")

llm = ChatMistralAI(model="mistral-medium-2508", temperature=0.7)

# Create prompt template
system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer the question. "
    "If it is some general knowledge question, answer it based on your knowledge. " 
    "Also dont mention that the information is from the documents provided or refer to any 'text' in the response. " \
    "if its a greeting then greet back politely. if is question is not related to agriculture then politely refuse to answer. " \
    "if query is 'Hello' then respond with 'Hello! How] can I assist you today?'\n\n"
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

# Create the chain
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# # Query the chain
# if __name__ == "__main__":
#     query = "How much does agriculture contribute to gdp?"
#     result = rag_chain.invoke({"input": query})
#     print(f"Question: {query}")
#     print(f"\nAnswer: {result['answer']}")
