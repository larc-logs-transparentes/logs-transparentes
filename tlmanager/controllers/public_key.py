import os 
from fastapi.responses import FileResponse , JSONResponse

def get_public_key():
    
    file_path = os.path.join(os.path.dirname(__file__), '..', 'keys', 'public_key.pem')
    file_path = os.path.abspath(file_path)

    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename="public_key.pem", status_code = 200)
    else:
        return JSONResponse({'status': 'error', 'message': 'Chave não encontrada'}, status_code = 400)