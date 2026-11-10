import os
import json
from pathlib import Path

# Directorio base donde se almacenan las categorías de prompts
ROOT_PROMPTS_DIR = Path("prompts")

def listar_asistentes():
    """Escanea recursivamente la carpeta de prompts y retorna una lista de rutas de archivos JSON encontrados."""
    if not ROOT_PROMPTS_DIR.exists():
        print(f"[-] El directorio base {ROOT_PROMPTS_DIR} no existe.")
        return []
    
    # Busca recursivamente todos los archivos .json dentro de las subcarpetas
    return list(ROOT_PROMPTS_DIR.rglob("*.json"))

def cargar_asistente(ruta_archivo):
    """Carga y retorna el contenido de un JSON de asistente."""
    try:
        with open(ruta_archivo, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[-] Error al leer {ruta_archivo.name}: {e}")
        return None

def main():
    print("=" * 65)
    print(" 🤖 GESTOR DINÁMICO DE ASISTENTES IA (ai-json-prompts)")
    print("=" * 65)
    
    archivos = listar_asistentes()
    
    if not archivos:
        print("No se encontraron asistentes JSON en las rutas especificadas.")
        return

    print(f"\n[+] Se encontraron {len(archivos)} asistente(s) registrado(s) en total:\n")
    
    for idx, archivo in enumerate(archivos, 1):
        datos = cargar_asistente(archivo)
        categoria = archivo.parent.name
        if datos and "system_prompt" in datos:
            rol = datos["system_prompt"].get("rol", "Sin descripción")
            print(f"  {idx}. 📂 [{categoria.upper()}] 📄 {archivo.name}")
            print(f"     💡 Rol principal: {rol[:85]}...\n")

    # Interacción simple para probar la carga de un asistente específico
    seleccion = input("Introduce el número del asistente que deseas inspeccionar (o presiona Enter para salir): ").strip()
    
    if seleccion.isdigit():
        indice = int(seleccion) - 1
        if 0 <= indice < len(archivos):
            archivo_elegido = archivos[indice]
            datos_elegidos = cargar_asistente(archivo_elegido)
            
            print("\n" + "=" * 65)
            print(f" DETALLES TÉCNICOS: {archivo_elegido.parent.name}/{archivo_elegido.name}")
            print("=" * 65)
            print(json.dumps(datos_elegidos, indent=4, ensure_ascii=False))
        else:
            print("[-] Número de selección inválido.")

if __name__ == "__main__":
    main()
