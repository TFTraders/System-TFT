import chromadb
from chromadb.utils import embedding_functions

client = chromadb.Client()
default_ef = embedding_functions.DefaultEmbeddingFunction()
collection = client.create_collection(name="tft_ia", embedding_function=default_ef)

def entrenar_ia(documentos, ia):
    """
    Entrena la IA con una lista de documentos.
    :param documentos: Lista de textos a entrenar.
    :param ia: Nombre de la IA asociada.
    """
    try:
        ids = [f"doc{i+1}" for i in range(len(documentos))]
        metadatas = [{"source": "manual", "ia": ia} for _ in documentos]
        collection.add(
            documents=documentos,
            metadatas=metadatas,
            ids=ids
        )
        print(f"Entrenamiento completado para la IA: {ia}")
    except Exception as e:
        print(f"Error durante el entrenamiento: {e}")

def listar_roles():
    """
    Lista los roles disponibles en el sistema.
    """
    roles = ["Admin", "Alumno", "Inversionista", "Visitante", "Auditor"]
    print("Roles disponibles:")
    for role in roles:
        print(f"- {role}")

# Ejemplo de uso
if __name__ == "__main__":
    documentos = ["Documento de prueba 1", "Documento de prueba 2"]
    entrenar_ia(documentos, "IA Académica")
    listar_roles()
