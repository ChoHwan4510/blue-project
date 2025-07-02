with open("labels.txt", "r", encoding="utf-8") as f: #라벨 주석 필터링
    labels = [
        line.strip()
        for line in f
        if line.strip() and not line.strip().startswith("#")
    ]
    
with open("tags.txt", "r", encoding="utf-8") as f: #폴더명 주석 필터링
    folder_names = [
        line.strip()
        for line in f
        if line.strip() and not line.strip().startswith("#")
    ]