import json
from pathlib import Path

file_path = Path("./openapi.json")
openapi_content = json.loads(file_path.read_text())

for path_data in openapi_content["paths"].values():
    for operation in path_data.values():
        tag = operation["tags"][0]
        operation_id = operation["operationId"]
        to_remove = f"api_v1_"
        new_operation_id = operation_id[len(to_remove) :]
        operation["operationId"] = new_operation_id
        print(to_remove)
        print(len(to_remove))
        print(operation["operationId"])
        print(new_operation_id)
        break
    break

file_path.write_text(json.dumps(openapi_content))
