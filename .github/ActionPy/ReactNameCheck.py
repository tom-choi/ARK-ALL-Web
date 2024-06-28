import os
import re
import pytest

def check_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # 檢查 useState 中的狀態變量命名是否以 m_ 開頭 (check start with let only)
    setFunction_pattern = r'let\s+\[(.*?),\s*\w+\]\s*=\s*useState'
    matches = re.findall(setFunction_pattern, content)
    for variables in matches:
        for var in variables.split(','):
            var = var.strip()
            if not var.startswith('m_'):
                print(f"Error: Variable '{var}' does not start with 'm_' in {file_path}")
                return False

    # 檢查 useState 中的設置函數命名是否以 set 開頭 (check start with let only)
    setFunction_pattern = r'let\s+\[(.*?),\s*(\w+)\]\s*=\s*useState'
    matches = re.findall(setFunction_pattern, content)
    for _, setFunction in matches:
        if not setFunction.startswith('set'):
            print(f"Error: Function '{setFunction}' does not start with 'set' in {file_path}")
            return False
    return True

@pytest.mark.parametrize("directory_path", ["components"])
def test_check_directory(directory_path):
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.js') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                assert(check_file(file_path))
                

# 指定要檢查的目錄路徑
directory_to_check = 'components'
test_check_directory(directory_to_check)