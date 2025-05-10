import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from PyPDF2 import PdfReader

# Obtener la ruta absoluta del archivo PDF
script_dir = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(script_dir, '../PDF_tft/Copia de Pensum académico TfT Nuevo Canva.pdf')

# Cargar el archivo PDF
reader = PdfReader(pdf_path)

# Extraer texto del PDF
def extract_text_from_pdf(reader):
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

pensum_text = extract_text_from_pdf(reader)

# Imprimir el texto extraído para depuración
print("Texto extraído del PDF:")
print(pensum_text)

# Preprocesar el texto
def preprocess_text(text):
    # Dividir el texto en secciones o fases según la lógica personalizada
    sections = text.split('\n')  # Dividir por salto de línea simple
    return [section.strip() for section in sections if section.strip()]

sections = preprocess_text(pensum_text)

# Verificar si hay suficientes secciones para agrupar
if len(sections) < 2:
    raise ValueError("No hay suficientes secciones para agrupar. Verifica el contenido del PDF o ajusta la lógica de preprocesamiento.")

# Vectorizar el texto
vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(sections)

# Ajustar dinámicamente el número de clústeres
num_phases = min(5, len(sections))  # Máximo 5 fases o el número de secciones disponibles
kmeans = KMeans(n_clusters=num_phases, random_state=42)
kmeans.fit(X)

# Mapear secciones a fases
phases = {i: [] for i in range(num_phases)}
for idx, label in enumerate(kmeans.labels_):
    phases[label].append(sections[idx])

# Guardar las fases en un archivo JSON
output_path = os.path.join(script_dir, '../PDF_tft/pensum_phases.json')
with open(output_path, 'w') as json_file:
    json.dump(phases, json_file, indent=4)

print("Las fases del Pensum han sido segmentadas y guardadas.")