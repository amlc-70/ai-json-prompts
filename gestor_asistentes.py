import os
import json
from pathlib import Path

# Directorio donde se almacenan los asistentes
ASISTENTES_DIR = Path("prompts/asistentes")

def listar_asistentes():
    """Escanea la carpeta de asistentes y retorna una lista de archivos JSON encontrados."""
    if not ASISTENTES_DIR.exists():
        print(f"[-] El directorio {ASISTENTES_DIR} no existe.")
        return []
    
    # Filtra todos los archivos .json excluyendo los README u otros
    return list(ASISTENTES_DIR.glob("*.json"))

def cargar_asistente(ruta_archivo):
    """Carga y retorna el contenido de un JSON de asistente."""
    try:
        with open(ruta_archivo, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[-] Error al leer {ruta_archivo.name}: {e}")
        return None

def main():
    print("=" * 60)
    print(" 🤖 GESTOR DINÁMICO DE ASISTENTES IA (ai-json-prompts)")
    print("=" * 60)
    
    archivos = listar_asistentes()
    
    if not archivos:
        print("No se encontraron asistentes JSON en la ruta especificada.")
        return

    print(f"\n[+] Se encontraron {len(archivos)} asistente(s) registrado(s):\n")
    
    for idx, archivo in enumerate(archivos, 1):
        datos = cargar_asistente(archivo)
        if datos and "system_prompt" in datos:
            rol = datos["system_prompt"].get("rol", "Sin descripción")
            print(f"  {idx}. 📄 Archivo: {archivo.name}")
            print(f"     💡 Rol principal: {rol[:90]}...\n")

    # Interacción simple para probar la carga de un asistente específico
    seleccion = input("Introduce el número del asistente que deseas inspeccionar (o presiona Enter para salir): ").strip()
    
    if seleccion.isdigit():
        indice = int(seleccion) - 1
        if 0 <= indice < len(archivos):
            archivo_elegido = archivos[indice]
            datos_elegidos = cargar_asistente(archivo_elegido)
            
            print("\n" + "=" * 60)
            print(f" DETALLES TÉCNICOS DEL ASISTENTE: {archivo_elegido.name}")
            print("=" * 60)
            print(json.dumps(datos_elegidos, indent=4, ensure_ascii=False))
        else:
            print("[-] Número de selección inválido.")

if __name__ == "__main__":
    main()
